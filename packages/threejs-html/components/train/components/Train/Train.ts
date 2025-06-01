import { Group, MathUtils } from 'three';
import { createMeshes } from './meshes';

const wheelSpeed = MathUtils.degToRad(24);

class Train extends Group {
  meshes: ReturnType<typeof createMeshes>;

  constructor() {
    super();

    this.meshes = createMeshes();

    this.add(
      this.meshes.cabin,
      this.meshes.chimney,
      this.meshes.nose,
      this.meshes.smallWheelRear,
      this.meshes.smallWheelCenter,
      this.meshes.smallWheelFront,
      this.meshes.bigWheelRear
    );
  }

  tick(delta: number) {
    this.meshes.bigWheelRear.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelRear.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelCenter.rotation.y += wheelSpeed * delta;
    this.meshes.smallWheelFront.rotation.y += wheelSpeed * delta;
  }
}

export { Train };
