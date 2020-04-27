import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, Material, Vector3, BoxGeometry } from 'three'
import { ConfettiParticles } from 'types'
import { ResizeWatcher } from '../ResizeWatcher'
import { FrameRenderer } from './FrameRenderer'
import { Baker } from '../Baker/Baker'
import { Animator } from './Animator'
import { TextureStore } from './Texture'
import { MaterialStore } from './Material';
import { ConfettiTheme } from '../types';
import { ConfettiParticle } from './ConfettiParticle';
import { SizeStore } from './Size';

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
  private SizeStore: SizeStore = new SizeStore()

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
    if (theme.size) this.SizeStore.store(theme.size)
    if (theme.textures) theme.textures.forEach(textureRef => this.TextureStore.store(textureRef))
    if (theme.materials) {
      this.MaterialStore.clear()
      theme.materials.forEach(materialRef => this.MaterialStore.store(materialRef))
    }

    this.expandConfetti()
  }

  start () {
    this.Animator.start()
  }

  stop() {
    this.Animator.stop()
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
      const particle = new ConfettiParticle()
      this.particles[particle.uuid] = particle
      this.Baker.addParticleToAnimation(particle)
    }

    this.expandConfetti()
  }

  /**
   * Textures and expands particles to confetti.
   */
  private expandConfetti () {
    Object.keys(this.particles).forEach(uuid => {
      this.particles[uuid].material = this.MaterialStore.getRandom()
      this.particles[uuid].expand(this.SizeStore.size)
    })
  }
}