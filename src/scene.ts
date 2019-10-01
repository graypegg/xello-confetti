import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Material, Vector3, BoxGeometry } from 'three'
import { ConfettiParticles, ConfettiParticleFrame } from 'types'
import { ResizeWatcher } from './resize-watcher'
import Worker from './bake.worker'
import { FrameRenderer } from './Scene/FrameRenderer'

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
  const xDimension = getRandomDimension() * (Math.random() > 0.5 ? -0.8 : 0.8)
  const yDimension = ((1 / ((Math.abs(xDimension) < 0.15 ? 0.15 : Math.abs(xDimension)))) / 5) * getRandomDimension() * 1.25
  return new Vector3(xDimension, yDimension, getRandomDimension() * 0.35)
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
  public playing: boolean = false

  private ResizeWatcher: ResizeWatcher = null
  private FrameRenderer: FrameRenderer = null

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
      this.FrameRenderer = new FrameRenderer(this.particles, this.renderer, this.scene, this.camera)
    }
  }

  start () {
    if (!this.playing) {
      this.playing = true
      const waitForBakingWorker = setInterval(() => {
        if (this.bakingWorker && this.particles && this.FrameRenderer && this.bakingWorkerReady) {
          this.scene.visible = true
          this.camera.position.z = 20
          this.camera.position.y = 16
          this.tick()
          this.timers.push(window.setInterval(this.tick.bind(this), 15))
          clearInterval(waitForBakingWorker)
        }
      }, 200)
      this.ResizeWatcher = new ResizeWatcher()
      this.ResizeWatcher.onResize((height, width) => {
        this.camera.aspect = width / height
        this.renderer.setSize(width, height)
        this.renderer.render(this.scene, this.camera)
      })
    }
  }

  stop() {
    this.playing = false
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
    if (this.ResizeWatcher) this.ResizeWatcher.stop()
    this.ResizeWatcher = null
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

  private commit (nextFrames: ConfettiParticleFrame[][]) {
    if (this.particleFrameBuffer.length <= 350) {
      this.bakingWorker.postMessage(nextFrames[nextFrames.length - 1])

      if (this.particleFrameBuffer.length > 100) {
        this.bakingWorkerReady = true
      }
    }

    this.particleFrameBuffer = this.particleFrameBuffer.concat(nextFrames)
  }

  private renderBuffer () {
    if (this.currentFrameBuffer) {
      this.FrameRenderer.render(this.currentFrameBuffer)
      this.frame++
    } else {
      console.warn('Ahead of frame buffer!')
    }
  }

  private tick () {
    if (this.frame > 350) this.stop()
    else {
      this.renderBuffer()
    }
  }
}