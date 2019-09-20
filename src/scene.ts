import { Scene, PerspectiveCamera, WebGLRenderer, MeshBasicMaterial, Mesh, PlaneGeometry, Material, Vector3, BoxGeometry, Plane, ConeGeometry } from 'three'

function getRandomMaterial (): Material {
  const getRandomByte = () => Math.ceil(Math.random() * 255)
  return new MeshBasicMaterial({ color: (getRandomByte() + (getRandomByte() << 8) + (getRandomByte() << 16)) })
}

function getRandomVector (): Vector3 {
  const getRandomDimension = () => Math.ceil(Math.random() * 100)/220
  return new Vector3(getRandomDimension() * (Math.random() > 0.5 ? -1 : 1), getRandomDimension(), getRandomDimension())
}

function getRandomBoxGeometry (): BoxGeometry {
  const getRandomDimension = () => (Math.random() * 0.6) + 0.4
  return new BoxGeometry(getRandomDimension() + 0.1, 0.05, getRandomDimension() - 0.1)
}

export interface ConfettiParticle {
  mesh: Mesh;
  vector: Vector3;
  frame: {
    position: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    flags: {
      remove: boolean;
    }
  }
}

export class ConfettiScene {
  private scene: Scene
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer
  private particles: ConfettiParticle[] = []
  private timer: number = null
  private frame: number = 0

  constructor () {
    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new WebGLRenderer({ alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  mount (element: HTMLElement | ShadowRoot) {
    element.appendChild(this.renderer.domElement)
  }

  start () {
    this.placeConfetti()
    this.camera.position.z = 15
    this.camera.position.y = 12
    this.timer = setInterval(this.tick.bind(this), 30)
  }

  stop() {
    this.particles.forEach((particle) => {
      this.scene.remove(particle.mesh)
    })
    this.particles = []
    if (this.timer !== null) clearInterval(this.timer)
    this.renderer.render(this.scene, this.camera)
    this.frame = 0
  }

  private placeConfetti () {
    for (let i=0; i < 300; i++) {
      const geometry = getRandomBoxGeometry()
      const material = getRandomMaterial()
      const confettiMesh = new Mesh(geometry, material)
      confettiMesh.position.x = 1
      confettiMesh.position.y = 0

      this.particles.push({
        mesh: confettiMesh,
        vector: getRandomVector(),
        frame: {
          position: {
            x: confettiMesh.position.x,
            y: confettiMesh.position.y,
            z: confettiMesh.position.z
          },
          rotation: {
            x: confettiMesh.rotation.x,
            y: confettiMesh.rotation.y,
            z: confettiMesh.rotation.z
          },
          flags: {
            remove: false
          }
        }
      })
      this.scene.add(confettiMesh)
    }
  }

  private tick () {
    this.particles = this.particles.map((particle) => {
      const weightedVector = new Vector3(
        particle.vector.x,
        particle.vector.y * 2,
        particle.vector.z / 2
      )
      particle.frame.position.x += weightedVector.x
      particle.frame.position.y += weightedVector.y
      particle.frame.position.z += weightedVector.z
      const angleZ = weightedVector.angleTo(new Vector3(1, 1, 0))
      const angleY = weightedVector.angleTo(new Vector3(1, 0, 1))
      const angleX = weightedVector.angleTo(new Vector3(0, 1, 1))
      particle.frame.rotation.z = angleZ
      particle.frame.rotation.y = angleY
      particle.frame.rotation.x = angleX
      particle.vector.add(new Vector3(0, -0.01, 0))

      if (particle.frame.position.y < -2) {
        particle.frame.flags.remove = true
      }
      return particle
    })

    this.particles = this.particles.reduce((particles, particle) => {
      if (!particle.frame.flags.remove) {
        particle.mesh.position.x = particle.frame.position.x
        particle.mesh.position.y = particle.frame.position.y
        particle.mesh.position.z = particle.frame.position.z
        particle.mesh.rotation.x = particle.frame.rotation.x
        particle.mesh.rotation.y = particle.frame.rotation.y
        particle.mesh.rotation.z = particle.frame.rotation.z
        return particles.concat([particle])
      } else {
        this.scene.remove(particle.mesh)
        return particles
      }
    }, [] as ConfettiParticle[])

    if (this.frame > 200) this.stop()

    requestAnimationFrame(() => {
      this.renderer.render(this.scene, this.camera)
      this.frame++
    })
  }
}