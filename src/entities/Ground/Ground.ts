import Phaser from 'phaser';
import Vector2 = Phaser.Math.Vector2;
import { Hill } from '@src/entities/Ground/generateHills';

const GROUND_COLOR = 0x228b22;

export default class Ground extends Phaser.GameObjects.Graphics {
  curve: Phaser.Curves.Spline;
  constructor(scene: Phaser.Scene, hills: Hill[]) {
    super(scene);
    scene.add.existing(this);

    const category = scene.matter.world.nextCategory();
    const curve = this.createGroundCurve(hills);

    this.fillStyle(GROUND_COLOR);
    this.createGroundPolygons(scene, hills, category);
    this.drawAndFillGroundCurve(curve);

    this.curve = curve;
  }

  createGroundCurve(hills: Hill[]): Phaser.Curves.Spline {
    const curvePoints = hills.flatMap((hill) => [hill.x, hill.y]);
    return new Phaser.Curves.Spline(curvePoints);
  }

  createGroundPolygons(
    scene: Phaser.Scene,
    hills: Hill[],
    category: number
  ): void {
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

      const previous = scene.matter.add.polygon(
        startPoint.x,
        startPoint.y,
        sides,
        size,
        options
      );

      const current = scene.matter.add.polygon(
        endPoint.x,
        endPoint.y,
        sides,
        size,
        options
      );

      scene.matter.add.constraint(previous, current, distance, stiffness);
    }
  }

  drawAndFillGroundCurve(curve: Phaser.Curves.Spline): void {
    const segments = 128;
    this.lineStyle(15, GROUND_COLOR, 1);
    curve.draw(this, segments);
    const points = curve.getPoints(segments);

    // Add points to close the polygon at the bottom of the screen
    const screenHeight = this.scene.game.config.height as number;
    const screenWidth = this.scene.game.config.width as number;
    points.push(new Vector2(screenWidth, screenHeight));
    points.push(new Vector2(0, screenHeight));

    // Fill the closed polygon
    this.fillPoints(points, true);
  }
}
