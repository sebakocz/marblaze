import Phaser from 'phaser';

const BALL_RADIUS = 16;
const BALL_COLOR = 0x42a5f5;

const BACKGROUND_COLOR = 0xffeb3b;

export default class PrettyBallScene extends Phaser.Scene {
  ball!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({ key: 'PrettyBallScene' });
  }

  create() {
    this.createBackground();
    this.createBall();

    // Add event listeners
    this.ball.setInteractive();
    this.ball.on('pointerdown', () => this.startGame());
  }

  createBackground() {
    this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);
  }

  createBall() {
    const graphics = this.add.graphics();
    graphics.fillStyle(BALL_COLOR);
    graphics.fillCircle(BALL_RADIUS, BALL_RADIUS, BALL_RADIUS);
    graphics.generateTexture('ball', BALL_RADIUS * 2, BALL_RADIUS * 2);

    this.ball = this.physics.add.sprite(400, 300, 'ball');
    this.ball.body.enable = false;

    this.ball.setVelocity(Phaser.Math.Between(-400, 400), 20);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1, 1);

    graphics.destroy();
  }

  startGame() {
    this.ball.body.enable = true;

    // Remove the pointerdown listener
    this.ball.off('pointerdown');
  }
}
