import Phaser from 'phaser';

export default class Goal extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 850, 50, 'goal');
    scene.add.existing(this);

    const shape = {
      type: 'rectangle',
      x: 500,
      y: 50,
      width: 100,
      height: 500,
    };

    scene.matter.add.gameObject(this, { shape });
    this.setOrigin(0.2, 0.5);
    this.setData('type', 'goal');
    this.setScale(0.2);
  }
}
