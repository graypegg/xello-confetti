import { ConfettiParticles, ConfettiParticleFrame } from 'types'
import { Renderer, Scene, Camera } from 'three'

export class FrameRenderer {
  constructor (
    private particles: ConfettiParticles,
    private renderer: Renderer,
    private scene: Scene,
    private camera: Camera
  ) { }

  public render (buffer: ConfettiParticleFrame[]) {
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
}