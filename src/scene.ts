import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Material, Vector3, BoxGeometry } from 'three'
import { ConfettiParticles, ConfettiParticleFrame } from 'types'
import { ResizeWatcher } from './resize-watcher'
import Worker from './bake.worker'

function getRandomMaterial (): Material {
  const colours = [
    new MeshBasicMaterial({ color: '#6A93D8' }),
    new MeshBasicMaterial({ color: '#D95C9F' }),
    new MeshBasicMaterial({ color: '#52B886' }),
    new MeshBasicMaterial({ color: '#F8AA24' }),
    new MeshBasicMaterial({ color: '#F86243' })
  ]
  return colours[Math.floor(Math.random() * (colours.length))]
}

function getRandomVector (): Vector3 {
  const getRandomDimension = () => Math.ceil(Math.random() * 100)/250
  const xDimension = getRandomDimension() * (Math.random() > 0.5 ? -1 : 1)
  const yDimension = ((1 / ((Math.abs(xDimension) < 0.15 ? 0.15 : Math.abs(xDimension)))) / 5) * getRandomDimension()
  return new Vector3(xDimension, yDimension, getRandomDimension()).add(new Vector3(0.1, 0, 0))
}

function getRandomBoxGeometry (): BoxGeometry {
  const getRandomDimension = () => (Math.random() * 0.2) + 0.6
  return new BoxGeometry(getRandomDimension() + 0.2, 0.05, getRandomDimension() - 0.2)
}

export class ConfettiScene {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private timers: number[] = []
  private frame: number = 0
  private bakingWorker: Worker = null
  private bakingWorkerReady = false
  private particleFrameBuffer: ConfettiParticleFrame[][] = [[]]
  private particles: ConfettiParticles = {}
  private resizeWatcher: ResizeWatcher = null

  constructor () {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new WebGLRenderer({ alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  mount (element: HTMLElement | ShadowRoot) {
    element.appendChild(this.renderer.domElement)
    this.bakingWorker = new (Worker as any)()
    this.bakingWorker.addEventListener('message', (event: MessageEvent) => this.commit(event.data))
    this.initConfetti()
    if (this.latestFrameBuffer) {
      this.bakingWorker.postMessage(this.latestFrameBuffer)
    }
  }

  start () {
    const waitForBakingWorker = setInterval(() => {
      if (this.bakingWorker && this.particles && this.bakingWorkerReady) {
        this.scene.visible = true
        this.camera.position.z = 20
        this.camera.position.y = 16
        this.tick()
        this.timers.push(window.setInterval(this.tick.bind(this), 15))
        clearInterval(waitForBakingWorker)
      }
    }, 200)
    this.resizeWatcher = new ResizeWatcher()
    this.resizeWatcher.onResize((height, width) => {
      this.camera.aspect = width / height
      this.renderer.setSize(width, height)
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.scene.visible = false
    this.timers.forEach(timer => clearInterval(timer))
    this.timers = []
    this.renderer.render(this.scene, this.camera)
    this.frame = 0
    const firstFrame = this.currentFrameBuffer
    Object.keys(this.particles).forEach(objectId => {
      const mesh = this.particles[objectId]
      const vector = firstFrame.find(frame => frame.meshId === objectId).vector
      this.placeConfetti(mesh, vector)
    })
    if (this.resizeWatcher) this.resizeWatcher.stop()
    this.resizeWatcher = null
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
    for (let i=0; i < 750; i++) {
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
    if (this.particleFrameBuffer.length <= 250) {
      this.bakingWorker.postMessage(nextFrame)

      if (this.particleFrameBuffer.length > 100) {
        this.bakingWorkerReady = true
      }
    }
    this.particleFrameBuffer.push(nextFrame)
  }

  private renderBuffer () {
    if (this.currentFrameBuffer) {
      this.currentFrameBuffer.forEach((particleFrame) => {
        if (!particleFrame.frame.flags.remove) {
          this.particles[particleFrame.meshId].position.set(
            particleFrame.frame.position.x,
            particleFrame.frame.position.y,
            particleFrame.frame.position.z
          )
          this.particles[particleFrame.meshId].rotation.set(
            particleFrame.frame.rotation.x,
            particleFrame.frame.rotation.y,
            particleFrame.frame.rotation.z
          )
        } else {
          this.scene.remove(this.particles[particleFrame.meshId])
        }
      })
      this.frame++

      requestAnimationFrame(() => {
        this.renderer.render(this.scene, this.camera)
      })
    } else {
      console.warn('Ahead of frame buffer!')
    }
  }

  private tick () {
    if (this.frame > 250) this.stop()
    else {
      this.renderBuffer()
    }
  }
}