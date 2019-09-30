import debounce from 'lodash/fp/debounce'

type ResizeMethod = (height: number, width: number) => void

export class ResizeWatcher {
  private height = 0
  private width = 0
  private methods: ResizeMethod[] = []
  private eventInstance: () => void = null

  constructor () {
    this.eventInstance = debounce(200)(this.tick.bind(this))
    window.addEventListener('resize', this.eventInstance)
  }

  private tick () {
    this.height = window.innerHeight
    this.width = window.innerWidth

    this.methods.forEach((method) => {
      const height = this.height
      const width = this.width
      setTimeout(() => {
        method(height, width)
      })
    })
  }

  public onResize (method: ResizeMethod) {
    this.methods.push(method)
  }

  public stop () {
    window.removeEventListener('resize', this.eventInstance)
    this.eventInstance = null
    this.methods = []
  }
}