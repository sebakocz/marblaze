import Phaser from 'phaser';
import config from './config';
import PrettyBallScene from './scenes/prettyBallScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [PrettyBallScene],
  })
);
