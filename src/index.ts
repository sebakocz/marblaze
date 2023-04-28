import Phaser from 'phaser';
import config from './config';
import MainScene from './scenes/MainScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [MainScene],
  })
);
