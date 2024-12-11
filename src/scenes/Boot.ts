import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('menu-background', 'assets/bg-menu.png');
        this.load.image('game-background', 'assets/bg-game.png');
        this.load.image('door-card-back', 'assets/door-card-back.png');
        this.load.image('battlefield', 'assets/battlefield.png');
    }

    create() {
        this.scene.start('Preloader');
    }
}
