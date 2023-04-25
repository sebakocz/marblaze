import Phaser from 'phaser';
import { generateHills } from '@src/map/generateHills';
import Vector2 = Phaser.Math.Vector2;
import GameObject = Phaser.GameObjects.GameObject;

const BALL_COLOR = 0x1f4f8b;
const GROUND_COLOR = 0x228b22;

interface Hill {
  x: number;
  y: number;
}

export default class MainScene extends Phaser.Scene {
  goal?: GameObject;
  ball?: GameObject;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('goal', 'assets/goalflag.png');
  }

  create() {
    const category = this.matter.world.nextCategory();
    const graphics = this.add.graphics();
    const hills = generateHills(
      this.game.config.width as number,
      this.game.config.height as number
    );
    const curve = this.createGroundCurve(hills);

    graphics.fillStyle(GROUND_COLOR);
    this.createGroundPolygons(hills, category);
    this.drawAndFillGroundCurve(graphics, curve);

    this.createBall();
    this.createGoal();
  }

  createGoal() {
    const goal = this.add.sprite(850, 50, 'goal');
    const shape = {
      type: 'rectangle',
      x: 500,
      y: 50,
      width: 100,
      height: 500,
    };

    this.matter.add.gameObject(goal, {
      shape,
    });
    goal.setOrigin(0.2, 0.5);
    goal.setData('type', 'goal');
    goal.setScale(0.2);

    this.matter.world.on('collisionstart', (event: any) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        // if the goal collides with ball, end the game
        if (
          (pair.bodyA === this.ball?.body && pair.bodyB === this.goal?.body) ||
          (pair.bodyA === this.goal?.body && pair.bodyB === this.ball?.body)
        ) {
          this.endGame();
          break;
        }
        if (pair.bodyA === this.goal?.body || pair.bodyB === this.goal?.body) {
          this.goal.body.isStatic = true;
          break;
        }
      }
    });

    this.goal = goal;
  }

  endGame() {
    console.log('Goal reached!');
    this.scene.restart();
  }

  createGroundCurve(hills: Hill[]) {
    const curvePoints = hills.flatMap((hill) => [hill.x, hill.y]);
    return new Phaser.Curves.Spline(curvePoints);
  }

  createGroundPolygons(hills: Hill[], category: number) {
    const sides = 4;
    const size = 10;
    const distance = size / 2;
    const stiffness = 0.1;
    const options = {
      friction: 0,
      frictionAir: 0,
      restitution: 0,
      ignoreGravity: true,
      inertia: Infinity,
      isStatic: true,
      angle: 0,
      collisionFilter: { category },
    };

    const segments = 128;
    const curve = this.createGroundCurve(hills);
    const points = curve.getPoints(segments);

    for (let i = 0; i < points.length - 1; i++) {
      const startPoint = points[i];
      const endPoint = points[i + 1];

      options.angle = Phaser.Math.Angle.Between(
        startPoint.x,
        startPoint.y,
        endPoint.x,
        endPoint.y
      );

      const previous = this.matter.add.polygon(
        startPoint.x,
        startPoint.y,
        sides,
        size,
        options
      );

      const current = this.matter.add.polygon(
        endPoint.x,
        endPoint.y,
        sides,
        size,
        options
      );

      this.matter.add.constraint(previous, current, distance, stiffness);
    }
  }

  drawAndFillGroundCurve(
    graphics: Phaser.GameObjects.Graphics,
    curve: Phaser.Curves.Spline
  ) {
    const segments = 128;
    graphics.lineStyle(15, GROUND_COLOR, 1);
    curve.draw(graphics, segments);
    const points = curve.getPoints(segments);

    // Add points to close the polygon at the bottom of the screen
    const screenHeight = this.game.config.height as number;
    const screenWidth = this.game.config.width as number;
    points.push(new Vector2(screenWidth, screenHeight));
    points.push(new Vector2(0, screenHeight));

    // Fill the closed polygon
    graphics.fillPoints(points, true);
  }

  createBall() {
    const ball = this.add.circle(100, 0, 50, BALL_COLOR);
    this.matter.add.gameObject(ball, {
      shape: 'circle',
      radius: 50,
      restitution: 0.1,
    });
    this.ball = ball;
  }
}
