import './scene'
import { ConfettiScene } from './scene'

class XelloConfetti extends HTMLElement {
  private mountRoot: ShadowRoot | null = null
  private scene: ConfettiScene;
  
  connectedCallback () {
    this.mountRoot = this.attachShadow({ mode: 'open' })
    this.scene = new ConfettiScene()
    this.scene.mount(this.mountRoot)
  }

  play () {
    this.clear()
    this.scene.start()
  }

  clear () {
    this.scene.stop()
  }
}

customElements.define('xello-confetti', XelloConfetti)