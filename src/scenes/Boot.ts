import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg.gif');
        this.load.image('game-backbround', 'assets/game-bg.jpg');
        this.load.image('door-card', 'assets/door-card.png');
    }

    create() {
        this.scene.start('Preloader');
    }
}
