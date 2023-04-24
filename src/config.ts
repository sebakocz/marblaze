import Phaser from 'phaser';
import MainScene from './scenes/mainScene';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#ADD8E6',
  scale: {
    // has to be aspect ratio of 2:1
    width: 1000,
    height: 500,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 1 },
      // debug: true,
    },
  },
  scene: [MainScene],
};
