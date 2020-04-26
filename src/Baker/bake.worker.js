import { Vector3 } from 'three/src/math/Vector3'

const ctx = self
export default ctx

ctx.addEventListener('message', event => {
  let frames = new Array(25).fill(null)
  frames[0] = event.data
  frames = frames.slice(1).reduce((newFrames, frame, index) => {
    if (index === 0) return newFrames
    return newFrames.concat([
      generateFrame(JSON.parse(JSON.stringify(newFrames[index - 1]))) // Yes, this IS actually the fastest way to deep clone a simple object
    ])
  }, [event.data])

  ctx.postMessage(frames)
})

function generateFrame (particles) {
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
      (particle.vector.x < 0 ? -1 : 1) * (Math.sin(particle.vector.y < 0 ? Math.abs(particle.frame.position.y * 2) : 0) * 0.02),
      particle.vector.y > -0.15 ? -0.008 : 0.01,
      0
    ))

    if (particle.frame.position.y < -2 || Math.abs(particle.frame.position.x) > 25) {
      particle.frame.flags.remove = true
    }

    return particles.concat([particle])
  }, [])

  return nextFrame
}