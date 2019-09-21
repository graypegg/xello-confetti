import { Vector3 } from 'three'
import { ConfettiParticleFrame } from 'types'

addEventListener('message', event => {
  const particles = event.data as ConfettiParticleFrame[]

  const nextFrame = particles.reduce((particles, particle) => {
    if (particle.frame.flags.remove) return particles
    const weightedVector = new Vector3(
      particle.vector.x,
      particle.vector.y * 3,
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
    ).add(new Vector3(
      0
      -0.005,
      particle.vector.z * -0.02
    ))

    if (particle.frame.position.y < -2 || Math.abs(particle.frame.position.x) > 30) {
      particle.frame.flags.remove = true
    }

    return particles.concat([particle])
  }, [] as ConfettiParticleFrame[])

  postMessage(nextFrame, null);
})
