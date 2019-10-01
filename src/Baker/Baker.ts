import Worker from './bake.worker'
import { ConfettiParticleFrame } from 'types'

export class Baker {
  private worker = new (Worker as any)() as Worker
  private screenFrameBuffer: ConfettiParticleFrame[][] = [[]]
  public ready = false
  
  public start (): void {
    if (this.latestScreenFrame) {
      this.worker.addEventListener('message', (event: MessageEvent) => this.commit(event.data))
      this.fetch(this.latestScreenFrame)
    } else {
      throw Error('Baker - There is no initial frame to work with!')
    }
  }

  public stop (): void {
    this.worker.terminate()
    this.screenFrameBuffer = [[]]
  }

  public fetch (buffer: ConfettiParticleFrame[]): void {
    this.worker.postMessage(buffer)
  }

  public getScreenFrame (frame: number): ConfettiParticleFrame[] {
    return this.screenFrameBuffer[frame]
  }

  public get latestScreenFrame(): ConfettiParticleFrame[] {
    return this.screenFrameBuffer[this.screenFrameBuffer.length - 1]
  }

  private commit(newFrames: ConfettiParticleFrame[][]): void {
    if (this.screenFrameBuffer.length <= 350) {
      this.worker.postMessage(newFrames[newFrames.length - 1])

      if (this.screenFrameBuffer.length > 100) {
        this.ready = true
      }
    }

    this.screenFrameBuffer = this.screenFrameBuffer.concat(newFrames)
  }
}