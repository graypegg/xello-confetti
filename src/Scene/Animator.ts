import { FrameRenderer } from './FrameRenderer'
import { Baker } from 'Baker/Baker'
import { MAX_FRAMES } from '../consts'

const TARGET_FPS = 60

export class Animator {
  private frame = 0
  private droppedFrames = 0
  private timer: number = null
  private ready: boolean = true
  constructor (
    private FrameRenderer: FrameRenderer,
    private Baker: Baker
  ) { }

  public start () {
    if (this.ready) {
      this.ready = false
      const waitForBakingWorker = setInterval(() => {
        if (this.Baker.ready) {
          this.FrameRenderer.reveal()
          this.tick()
          this.timer = window.setInterval(this.tick.bind(this), 1000/TARGET_FPS)
          clearInterval(waitForBakingWorker)
          this.ready = true
        }
      }, 200)
    }
  }

  public stop () {
    this.FrameRenderer.clear()
    if (this.timer !== null) clearInterval(this.timer)
    this.timer = null
    this.frame = 0
    this.FrameRenderer.render(this.Baker.getScreenFrame(0))
  }

  private tick () {
    if ((this.frame + this.droppedFrames) > MAX_FRAMES) this.stop()
    else {
      const currentScreenFrame = this.Baker.getScreenFrame(this.frame)
      if (currentScreenFrame) {
        this.FrameRenderer.render(currentScreenFrame)
        this.frame++
      } else {
        console.warn('Ahead of frame buffer!')
        this.droppedFrames++
      }
    }
  }
}