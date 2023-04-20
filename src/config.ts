import Phaser from 'phaser';
import MainScene from './scenes/mainScene';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scale: {
    // has to be aspect ratio of 2:1
    width: 1000,
    height: 500,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [MainScene],
};
