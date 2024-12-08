import { Scene } from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text: Phaser.GameObjects.Text;

    constructor() {
        super('Game');
    }

    create() {
        this.input.on('pointerdown', () => {
            this.scene.start('MainMenu');

        });

        this.background = this.add.image(512, 384, 'game-backbround').setScale(0.6);
    }
}