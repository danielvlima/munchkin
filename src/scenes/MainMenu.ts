import { Scene, GameObjects } from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    startButton: GameObjects.Text;
    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background').setScale(0.8);

        this.logo = this.add.image(512, 300, 'logo').setScale(0.8);
        //quero um branco menos claro
        // this.logo.setTintFill(0xFFFFFF);
        // this.logo.setTintFill(0xa6aa3e);

        //botao branco
        this.startButton = this.add.text(512, 430, 'Iniciar Jogo', {
            fontSize: '42px',
            color: '#ffffff',
            fontStyle: 'bold',
            padding: {
                x: 20,
                y: 10
            },
            resolution: 2,
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        this.startButton.on('pointerdown', () => {

            this.scene.start('Game');

        });

    }
    update() {

    }

}
