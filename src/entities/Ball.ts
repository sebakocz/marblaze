import Phaser from 'phaser';

const BALL_COLOR = 0x1f4f8b;

export default class Ball extends Phaser.GameObjects.Arc {
  constructor(scene: Phaser.Scene) {
    super(scene, 100, 0, 50, 0, 360, false, BALL_COLOR);
    scene.add.existing(this);
    scene.matter.add.gameObject(this, {
      shape: 'circle',
      radius: 50,
      restitution: 0.1,
    });
  }
}
