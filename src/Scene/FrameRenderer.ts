import { ConfettiParticles, ConfettiParticleFrame } from 'types'
import { Renderer, Scene, PerspectiveCamera } from 'three'

export class FrameRenderer {
  private lastRenderedScreenFrame: ConfettiParticleFrame[] = null

  constructor (
    private particles: ConfettiParticles,
    private renderer: Renderer,
    private scene: Scene,
    private camera: PerspectiveCamera
  ) { }

  public render (buffer: ConfettiParticleFrame[]) {
    this.lastRenderedScreenFrame = buffer
    buffer.forEach((particleFrame) => {
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

    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
    })
  }

  public resize (width: number, height: number) {
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.renderSavedBuffer()
  }

  public mount (element: HTMLElement | ShadowRoot) {
    element.appendChild(this.renderer.domElement)
    this.renderSavedBuffer()
  }

  public clear () {
    this.scene.visible = false
    this.renderSavedBuffer()
  }

  public reveal () {
    this.scene.visible = true
    this.renderSavedBuffer()
  }

  private renderSavedBuffer () {
    if (this.lastRenderedScreenFrame) this.render(this.lastRenderedScreenFrame)
  }
}