import debounce from 'lodash/fp/debounce'

type ResizeMethod = (width: number, height: number) => void

export class ResizeWatcher {
  private width = 0
  private height = 0
  private methods: ResizeMethod[] = []
  private eventInstance: () => void

  constructor () {
    this.eventInstance = debounce(200)(this.tick.bind(this))
    window.addEventListener('resize', this.eventInstance)
    this.eventInstance()
  }

  private tick () {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.methods.forEach((method) => {
      const width = this.width
      const height = this.height
      setTimeout(() => {
        method(width, height)
      })
    })
  }

  public onResize (method: ResizeMethod) {
    this.methods.push(method)
  }

  public stop () {
    window.removeEventListener('resize', this.eventInstance)
    this.methods = []
  }
}