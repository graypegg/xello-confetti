import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, PlaneGeometry, Material, Vector3, BoxGeometry, Plane, ConeGeometry } from 'three'
import { ConfettiParticles, ConfettiParticleFrame } from 'types'

function getRandomMaterial (): Material {
  const getRandomByte = () => Math.ceil(Math.random() * 255)
  return new MeshBasicMaterial({ color: (getRandomByte() + (getRandomByte() << 8) + (getRandomByte() << 16)) })
}

function getRandomVector (): Vector3 {
  const getRandomDimension = () => Math.ceil(Math.random() * 100)/220
  return new Vector3(getRandomDimension() * (Math.random() > 0.5 ? -1 : 1), getRandomDimension(), getRandomDimension())
}

function getRandomBoxGeometry (): BoxGeometry {
  const getRandomDimension = () => (Math.random() * 0.6) + 0.4
  return new BoxGeometry(getRandomDimension() + 0.1, 0.05, getRandomDimension() - 0.1)
}

export class ConfettiScene {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private particleFrames: ConfettiParticleFrame[] = []
  private particles: ConfettiParticles = {}
  private timer: number = null
  private frame: number = 0
  private bakingWorker: Worker = null

  constructor () {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new WebGLRenderer({ alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  mount (element: HTMLElement | ShadowRoot) {
    element.appendChild(this.renderer.domElement)
  }

  start () {
    this.bakingWorker = new Worker('./bake.ts', { type: 'module' });
    this.bakingWorker.addEventListener('message', (event) => this.commit(event.data))
    this.placeConfetti()
    this.camera.position.z = 15
    this.camera.position.y = 12
    this.timer = setInterval(this.tick.bind(this), 30)
  }

  stop() {
    if (this.bakingWorker) this.bakingWorker.terminate()
    this.bakingWorker = null
    Object.keys(this.particles).forEach((objectId) => {
      this.scene.remove(this.particles[objectId])
    })
    this.particles = {}
    this.particleFrames = []
    if (this.timer !== null) clearInterval(this.timer)
    this.renderer.render(this.scene, this.camera)
    this.frame = 0
  }

  private placeConfetti () {
    for (let i=0; i < 1000; i++) {
      const geometry = getRandomBoxGeometry()
      const material = getRandomMaterial()
      const confettiMesh = new Mesh(geometry, material)
      confettiMesh.position.x = 1
      confettiMesh.position.y = 0

      this.particles[confettiMesh.uuid] = confettiMesh
      this.particleFrames.push({
        meshId: confettiMesh.uuid,
        vector: getRandomVector(),
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
  }

  private commit (nextFrame: ConfettiParticleFrame[]) {
    this.particleFrames = nextFrame.reduce((particleFrames, particleFrame) => {
      if (!particleFrame.frame.flags.remove) {
        this.particles[particleFrame.meshId].position.x = particleFrame.frame.position.x
        this.particles[particleFrame.meshId].position.y = particleFrame.frame.position.y
        this.particles[particleFrame.meshId].position.z = particleFrame.frame.position.z
        this.particles[particleFrame.meshId].rotation.x = particleFrame.frame.rotation.x
        this.particles[particleFrame.meshId].rotation.y = particleFrame.frame.rotation.y
        this.particles[particleFrame.meshId].rotation.z = particleFrame.frame.rotation.z
        return particleFrames.concat([particleFrame])
      } else {
        this.scene.remove(this.particles[particleFrame.meshId])
        return particleFrames
      }
    }, [] as ConfettiParticleFrame[])

    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
      this.frame++
    })
  }

  private tick () {
    if (this.frame > 200) this.stop()
    else {
      this.bakingWorker.postMessage(this.particleFrames)
    }
  }
}