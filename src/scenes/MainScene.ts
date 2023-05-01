import Phaser from 'phaser';
import { generateHills } from '@src/map/generateHills';
import Ball from '@src/entities/Ball';
import Goal from '@src/entities/Goal';
import Ground from '@src/entities/Ground';

export default class MainScene extends Phaser.Scene {
  goal?: Phaser.Physics.Matter.Sprite;
  ball?: Phaser.Physics.Matter.Sprite;
  ground?: Ground;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('goal', 'assets/goalflag.png');
  }

  create() {
    const hills = generateHills(
      this.game.config.width as number,
      this.game.config.height as number
    );

    this.ground = new Ground(this, hills);
    this.ball = new Ball(this).element;
    this.goal = new Goal(this).element;

    this.ball.setOnCollideWith(this.goal, () => {
      this.endGame();
    });

    this.goal.setOnCollideWith(this.matter.world.getAllBodies(), () => {
      this.goal?.setStatic(true);
    });
  }

  endGame() {
    this.scene.restart();
  }
}
