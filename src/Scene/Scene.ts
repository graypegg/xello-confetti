import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Material, Vector3, BoxGeometry } from 'three'
import { ConfettiParticles } from 'types'
import { ResizeWatcher } from '../ResizeWatcher'
import { FrameRenderer } from './FrameRenderer'
import { Baker } from '../Baker/Baker'
import { Animator } from './Animator'

function getRandomMaterial (): Material {
  const colours = [
    new MeshBasicMaterial({ color: '#6A93D8' }),
    new MeshBasicMaterial({ color: '#D95C9F' }),
    new MeshBasicMaterial({ color: '#52B886' }),
    new MeshBasicMaterial({ color: '#F8AA24' }),
    new MeshBasicMaterial({ color: '#F86243' })
  ]
  return colours[Math.floor(Math.random() * colours.length)]
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
  private particles: ConfettiParticles = {}

  private Baker: Baker = null
  private ResizeWatcher: ResizeWatcher = null
  private FrameRenderer: FrameRenderer = null
  private Animator: Animator = null

  constructor () {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 20
    this.camera.position.y = 16
    this.renderer = new WebGLRenderer({ alpha: true })
  }

  mount (element: HTMLElement | ShadowRoot) {
    this.Baker = new Baker()
    this.initConfetti()
    this.Baker.start()

    this.FrameRenderer = new FrameRenderer(this.particles, this.renderer, this.scene, this.camera)
    this.FrameRenderer.resize(window.innerWidth, window.innerHeight)
    this.FrameRenderer.mount(element)

    this.Animator = new Animator(this.FrameRenderer, this.Baker)

    this.ResizeWatcher = new ResizeWatcher()
    this.ResizeWatcher.onResize((width, height) => {
      this.FrameRenderer.resize(width, height)
    })
  }

  start () {
    this.Animator.start()
  }

  stop() {
    this.Animator.stop()
    Object.keys(this.particles).forEach(objectId => {
      const mesh = this.particles[objectId]
      const vector = this.Baker.getScreenFrame(0).find(frame => frame.meshId === objectId).vector
      this.placeConfetti(mesh, vector)
    })
  }

  kill () {
    this.stop()
    Object.keys(this.particles).forEach((objectId) => {
      this.scene.remove(this.particles[objectId])
    })
    this.particles = {}
    if (this.Baker) this.Baker.stop()
    if (this.ResizeWatcher) this.ResizeWatcher.stop()
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
    this.Baker.latestScreenFrame.push({
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
}