import Phaser from 'phaser';
import {
  ballBounce,
  ballFriction,
  ballRadius,
} from '@src/entities/Ball/sliderInputs';

const BALL_COLOR = 0x1f4f8b;

export default class Ball extends Phaser.GameObjects.Arc {
  element: Phaser.Physics.Matter.Sprite;

  constructor(scene: Phaser.Scene) {
    super(scene, 100, 0, ballRadius, 0, 360, false, BALL_COLOR);
    scene.add.existing(this);
    this.element = scene.matter.add.gameObject(this, {
      shape: 'circle',
      radius: ballRadius,
      restitution: ballBounce,
      friction: ballFriction,
    }) as Phaser.Physics.Matter.Sprite;
  }
}
