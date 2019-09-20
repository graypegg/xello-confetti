import { Mesh, Vector3 } from 'three'

export interface ConfettiParticleFrame {
  meshId: keyof ConfettiParticles;
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

export interface ConfettiParticles {
  [objectId: string]: Mesh
}