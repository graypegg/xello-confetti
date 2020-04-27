import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Material, Vector3, BoxGeometry } from 'three'
import { ConfettiParticles } from 'types'
import { ResizeWatcher } from '../ResizeWatcher'
import { FrameRenderer } from './FrameRenderer'
import { Baker } from '../Baker/Baker'
import { Animator } from './Animator'
import { TextureStore } from './Texture'
import { MaterialStore } from './Material';
import { ConfettiTheme } from '../types';

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
  private TextureStore: TextureStore = new TextureStore()
  private MaterialStore: MaterialStore = new MaterialStore(this.TextureStore)

  constructor () {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 20
    this.camera.position.y = 16
    this.renderer = new WebGLRenderer({ alpha: true })
  }

  mount (element: HTMLElement | ShadowRoot) {
    this.setTheme({
      size: {
        base: 0.6,
        variance: 0.2,
        ratio: 0.4
      },
      textures: [
        { id: 'hmm', url: '/wah.png' }
      ],
      materials: [
        { colour: '#6A93D8' },
        { colour: '#D95C9F' },
        { colour: '#52B886' },
        { colour: '#F8AA24' },
        { colour: '#F86243' }
      ]
    })

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

  setTheme (theme: Partial<ConfettiTheme>) {
    if (theme.textures) theme.textures.forEach(textureRef => this.TextureStore.store(textureRef))
    this.MaterialStore.clear()
    if (theme.materials) theme.materials.forEach(materialRef => this.MaterialStore.store(materialRef))

    this.textureConfetti()
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
      const confettiMesh = new Mesh(geometry)
      this.placeConfetti(confettiMesh, getRandomVector())
    }

    this.textureConfetti()
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

  private textureConfetti () {
    Object.keys(this.particles).forEach(uuid => {
      this.particles[uuid].material = this.MaterialStore.getRandom()
    })
  }
}