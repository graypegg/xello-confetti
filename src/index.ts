import './Scene/Scene'
import { ConfettiScene } from './Scene/Scene'
import { ConfettiTheme } from './types';

class XelloConfetti extends HTMLElement {
  private mountRoot: ShadowRoot | null = null
  private scene: ConfettiScene;

  private paramSize: ConfettiTheme['size'] = {
    base: 0.6,
    variance: 0.2,
    ratio: 0.4
  }

  private paramTextures: ConfettiTheme['textures'] = []

  private paramMaterials: ConfettiTheme['materials'] = [
    { colour: '#6A93D8' },
    { colour: '#D95C9F' },
    { colour: '#52B886' },
    { colour: '#F8AA24' },
    { colour: '#F86243' }
  ]
  
  connectedCallback () {
    this.mountRoot = this.attachShadow({ mode: 'open' })
    this.scene = new ConfettiScene()
    this.scene.mount(this.mountRoot)
    const stylesheet = document.createElement('style')
    stylesheet.innerText = `
      @media (prefers-reduced-motion: reduce) {
        canvas {
          display: none;
        }
      }
    `
    this.mountRoot.appendChild(stylesheet)
  }

  disconnectedCallback () {
    this.scene.kill()
  }

  public play () {
    this.clear()
    this.scene.start()
  }

  public clear () {
    this.scene.stop()
  }
}

customElements.define('xello-confetti', XelloConfetti)