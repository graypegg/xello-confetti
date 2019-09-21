import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, PlaneGeometry, Material, Vector3, BoxGeometry, Plane, ConeGeometry, Vector } from 'three'
import { ConfettiParticles, ConfettiParticleFrame } from 'types'

function getRandomMaterial (): Material {
  const getRandomByte = (min: number, variation: number) => Math.ceil(Math.random() * variation) + min
  return new MeshBasicMaterial({ color: (getRandomByte(200, 55) + (getRandomByte(175, 80) << 8) + (getRandomByte(125, 130) << 16)) })
}

function getRandomVector (): Vector3 {
  const getRandomDimension = () => Math.ceil(Math.random() * 100)/220
  const xDimension = getRandomDimension() * (Math.random() > 0.5 ? -1 : 1)
  const yDimension = ((1 / ((Math.abs(xDimension) < 0.15 ? 0.15 : Math.abs(xDimension)))) / 5) * getRandomDimension()
  return new Vector3(xDimension, yDimension, getRandomDimension())
}

function getRandomBoxGeometry (): BoxGeometry {
  const getRandomDimension = () => (Math.random() * 0.6) + 0.4
  return new BoxGeometry(getRandomDimension() + 0.2, 0.05, getRandomDimension() - 0.2)
}

export class ConfettiScene {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private timer: number = null
  private frame: number = 0
  private bakingWorker: Worker = null
  private particleFrameBuffer: ConfettiParticleFrame[][] = [[]]
  private particles: ConfettiParticles = {}

  constructor () {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new WebGLRenderer({ alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  mount (element: HTMLElement | ShadowRoot) {
    element.appendChild(this.renderer.domElement)
    this.bakingWorker = new Worker('./bake.ts', { type: 'module' })
    this.bakingWorker.addEventListener('message', (event) => this.commit(event.data))
    this.initConfetti()
    if (this.latestFrameBuffer) {
      this.bakingWorker.postMessage(this.latestFrameBuffer)
    }
  }

  start () {
    if (this.bakingWorker && this.particles) {
      this.scene.visible = true
      this.camera.position.z = 15
      this.camera.position.y = 12
      this.tick()
      this.timer = setInterval(this.tick.bind(this), 20)
    } else {
      throw new Error('The web worker was not registered or did not catch up the buffer in time.')
    }
  }

  stop() {
    this.scene.visible = false
    if (this.timer !== null) clearInterval(this.timer)
    this.renderer.render(this.scene, this.camera)
    this.frame = 0
    const firstFrame = this.currentFrameBuffer
    Object.keys(this.particles).forEach(objectId => {
      const mesh = this.particles[objectId]
      const vector = firstFrame.find(frame => frame.meshId === objectId).vector
      this.placeConfetti(mesh, vector)
    })
  }

  kill () {
    this.stop()
    Object.keys(this.particles).forEach((objectId) => {
      this.scene.remove(this.particles[objectId])
    })
    this.particles = {}
    this.particleFrameBuffer = [[]]
    if (this.bakingWorker) this.bakingWorker.terminate()
    this.bakingWorker = null
  }

  private get currentFrameBuffer () {
    return this.particleFrameBuffer[this.frame]
  }

  private get latestFrameBuffer() {
    return this.particleFrameBuffer[this.particleFrameBuffer.length - 1]
  }

  private initConfetti () {
    for (let i=0; i < 1500; i++) {
      const geometry = getRandomBoxGeometry()
      const material = getRandomMaterial()
      const confettiMesh = new Mesh(geometry, material)
      this.placeConfetti(confettiMesh, getRandomVector())
    }
  }

  private placeConfetti(confettiMesh: Mesh, confettiVector: Vector3) {
    confettiMesh.position.x = 1
    confettiMesh.position.y = 0

    this.particles[confettiMesh.uuid] = confettiMesh
    this.latestFrameBuffer.push({
      meshId: confettiMesh.uuid,
      vector: confettiVector,
      frame: {
        position: {
          x: confettiMesh.position.x,
          y: confettiMesh.position.y,
          z: confettiMesh.position.z
        },
        rotation: {
          x: confettiMesh.rotation.x,
          y: confettiMesh.rotation.y,
          z: confettiMesh.rotation.z
        },
        flags: {
          remove: false
        }
      }
    })

    this.scene.add(confettiMesh)
  }

  private commit (nextFrame: ConfettiParticleFrame[]) {
    this.particleFrameBuffer.push(nextFrame)

    if (this.particleFrameBuffer.length <= 200) {
      this.bakingWorker.postMessage(nextFrame)
    }
  }

  private renderBuffer () {
    if (this.currentFrameBuffer) {
      this.currentFrameBuffer.forEach((particleFrame) => {
        if (!particleFrame.frame.flags.remove) {
          this.particles[particleFrame.meshId].position.x = particleFrame.frame.position.x
          this.particles[particleFrame.meshId].position.y = particleFrame.frame.position.y
          this.particles[particleFrame.meshId].position.z = particleFrame.frame.position.z
          this.particles[particleFrame.meshId].rotation.x = particleFrame.frame.rotation.x
          this.particles[particleFrame.meshId].rotation.y = particleFrame.frame.rotation.y
          this.particles[particleFrame.meshId].rotation.z = particleFrame.frame.rotation.z
        } else {
          this.scene.remove(this.particles[particleFrame.meshId])
        }
      })
      this.frame++

      requestAnimationFrame(() => {
        this.renderer.render(this.scene, this.camera)
      })
    }
  }

  private tick () {
    if (this.frame > 200) this.stop()
    else {
      this.renderBuffer()
    }
  }
}