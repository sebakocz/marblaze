import Phaser from 'phaser';
import { generateHills } from '@src/map/generateHills';
import Ball from '@src/entities/Ball';
import Goal from '@src/entities/Goal';
import Ground from '@src/entities/Ground';

export default class MainScene extends Phaser.Scene {
  goal?: Goal;
  ball?: Ball;
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
    this.ball = new Ball(this);
    this.goal = new Goal(this);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.ball.setOnCollideWith(this.goal, () => {
      this.endGame();
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.goal.setOnCollideWith(this.matter.world.getAllBodies(), () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.goal.body.isStatic = true;
    });
  }

  endGame() {
    this.scene.restart();
  }
}
