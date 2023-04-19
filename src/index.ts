import Phaser from 'phaser';
import config from './config';
import MainScene from './scenes/mainScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [MainScene],
  })
);
