import Phaser from 'phaser';

export interface Hill {
  x: number;
  y: number;
}

export const generateHills = (width: number, height: number) => {
  const hillCount = 10;
  const hillHeight = height / 2;
  const randomFactor = 0.3;

  return Array.from({ length: hillCount }).map((e, i) => {
    const x = (width / (hillCount - 1)) * i;
    const y =
      hillHeight +
      (Math.sin((Math.PI / (hillCount - 1)) * i) * hillHeight) / 2 +
      Math.random() * hillHeight * randomFactor -
      (hillHeight * randomFactor) / 2;
    return new Phaser.Math.Vector2(x, y);
  });
};
