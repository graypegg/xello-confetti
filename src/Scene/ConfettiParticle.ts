import { Mesh, BoxGeometry, Vector3 } from 'three'
import { ConfettiTheme } from '../types'

const getRandomDimension = (base: number, variance: number) => (Math.random() * variance) + base

export class ConfettiParticle extends Mesh {
  constructor () {
    super()
    this.position.x = 1
    this.position.y = 0
  }

  expand (size: ConfettiTheme['size']) {
    const factor = getRandomDimension(size.base, size.variance)
    this.geometry = new BoxGeometry(factor, 0.05, factor * size.ratio)
  }
}