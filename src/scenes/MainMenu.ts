import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    startButton: GameObjects.Text;
    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background').setScale(0.5);

        this.logo = this.add.image(512, 300, 'logo').setScale(0.4);
        //quero um branco menos claro
        // this.logo.setTintFill(0xFFFFFF);
        this.logo.setTintFill(0xa6aa3e);


        this.startButton = this.add.text(512, 460, 'Iniciar Jogo', {
            fontFamily: 'monospace', fontSize: 40, color: '#a6aa3e',
            align: 'center', resolution: 1.5,
        }).setOrigin(0.5).setInteractive();
        this.startButton.on('pointerdown', () => {

            this.scene.start('Game');

        });
        // this.input.on('gameobjectdown', () => {
        //     this.scene.start('Game');
        // });
    }
    update() {

    }

}
