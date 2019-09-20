import './scene'
import { ConfettiScene } from './scene'

class XelloConfetti extends HTMLElement {
  private mountRoot: ShadowRoot | null = null
  
  connectedCallback() {
    this.mountRoot = this.attachShadow({ mode: 'open' })

    const scene = new ConfettiScene()
    scene.mount(this.mountRoot)

    scene.start()
    setTimeout(() => {
      scene.stop()
    }, 1000)
  }
}

customElements.define('xello-confetti', XelloConfetti)