import { ConfettiParticleFrame } from 'scene'
import { Vector3 } from 'three'

addEventListener('message', event => {
  const particles = event.data as ConfettiParticleFrame[]

  const nextFrame = particles.map((particle) => {
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

    particle.vector = new Vector3(
      particle.vector.x,
      particle.vector.y,
      particle.vector.z
    ).add(new Vector3(0, -0.01, 0))

    if (particle.frame.position.y < -2) {
      particle.frame.flags.remove = false
    }
    return particle
  })

  postMessage(nextFrame);
})
