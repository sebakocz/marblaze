import Phaser from 'phaser';
import { generateHills } from '@src/map/generateHills';

const BALL_COLOR = 0x1f4f8b;
const GROUND_COLOR = 0x228b22;

interface Hill {
  x: number;
  y: number;
}

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
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

    const segments = 256;
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
    const segments = 256;
    graphics.lineStyle(15, GROUND_COLOR, 1);
    curve.draw(graphics, segments);

    curve.points.push(
      new Phaser.Math.Vector2(
        this.game.config.width as number,
        this.game.config.height as number
      )
    );
    curve.points.push(
      new Phaser.Math.Vector2(0, this.game.config.height as number)
    );
    graphics.fillPoints(curve.getPoints(segments), true);
  }

  createBall() {
    const ball = this.add.circle(100, 0, 50, BALL_COLOR);
    this.matter.add.gameObject(ball, {
      shape: 'circle',
      radius: 50,
      restitution: 0.1,
    });
  }
}
