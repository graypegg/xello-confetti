import { Mesh, Vector3 } from 'three'

declare var __webpack_public_path__: string;
declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

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