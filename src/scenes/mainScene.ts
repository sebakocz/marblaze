import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('ball', 'assets/ball.png');
  }

  create() {
    // Set up physics and enable gravity in the y-axis
    this.physics.world.gravity.y = 300;

    const ball = this.physics.add.image(400, 300, 'ball');

    // Set the scale of the ball to make it smaller
    ball.setScale(0.2);

    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);
    ball.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
