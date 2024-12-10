import { Scene } from 'phaser';
import Player from '../entities/Player';
import Card from '../entities/Card';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    battleField: Phaser.Physics.Arcade.StaticGroup;
    players: Player[];
    playersNumber: number;
    playerOneCoordinates: { x: number, y: number };

    constructor() {
        super('Game');
        this.playersNumber = 4;
        this.players = [];
        this.playerOneCoordinates = { x: 200, y: 650 };
    }

    create() {
        this.players.push(new Player('top'));
        this.players.push(new Player('left'));
        this.players.push(new Player('right'));
        this.players.push(new Player('bottom'));
        for (let i = 0; i < this.playersNumber; i++) {
            this.players[i].addCard(new Card());
            this.players[i].addCard(new Card());
            this.players[i].addCard(new Card());
            this.players[i].addCard(new Card());
            this.players[i].addCard(new Card());

            console.log("criando mao" + this.players[i]);

        }
        this.background = this.add.image(512, 384, 'game-backbround').setScale(0.6);
        //create box object center of screen

        this.battleField = this.physics.add.staticGroup();
        this.battleField.create(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'card').setScale(2).refreshBody();
        // this.distributeCards();
        this.players.forEach(player => {
            this.organizePlayerHand(player);
        });
    }

    update() {
    }

    //colocar cartas
    organizePlayerHand(player: Player) {
        const cardWidth = 100;
        const cardHeight = 150;
        let startY: number;
        let startX: number;
        let positionY: number;
        let positionX: number;

        const spaceBetweenCards = cardWidth * 1.01;
        const totalWidth = cardWidth * player.getCards().length + spaceBetweenCards;
        player.getCards().forEach((_, i) => {
            switch (player.getPosition()) {
                case 'bottom':
                    startY = this.sys.game.canvas.height * 0.9;
                    startX = (this.sys.game.canvas.width - totalWidth + cardWidth) / 2;
                    positionY = startY;
                    positionX = startX + i * spaceBetweenCards + cardWidth / 2;
                    this.physics.add.sprite(positionX, positionY, 'door-card').setDisplaySize(cardWidth, cardHeight)
                    break;
                case 'top':
                    startY = this.sys.game.canvas.height * 0.1;
                    startX = (this.sys.game.canvas.width - totalWidth + cardWidth) / 2;
                    positionY = startY;
                    positionX = startX + i * spaceBetweenCards + cardWidth / 2;
                    this.physics.add.sprite(positionX, positionY, 'door-card').setDisplaySize(cardWidth, cardHeight).setFlipY(true);
                    break;
                case 'left':
                    startY = (this.sys.game.canvas.height - totalWidth + cardWidth) / 2;
                    startX = this.sys.game.canvas.width * 0.1;
                    positionY = startY + i * spaceBetweenCards + cardWidth / 2;
                    positionX = startX;
                    this.physics.add.sprite(positionX, positionY, 'door-card').setDisplaySize(cardWidth, cardHeight).setAngle(90);
                    break;
                case 'right':
                    startY = (this.sys.game.canvas.height - totalWidth + cardWidth) / 2;
                    startX = this.sys.game.canvas.width * 0.9;
                    positionY = startY + i * spaceBetweenCards + cardWidth / 2;
                    positionX = startX;
                    this.physics.add.sprite(positionX, positionY, 'door-card').setDisplaySize(cardWidth, cardHeight).setAngle(-90);
                    break;
            }
        });
    }

    moveCard(card: Phaser.Physics.Arcade.Sprite, pointer: Phaser.Input.Pointer) {
        // card.on('drag', () => {
        //     card.x = this.input.x;
        //     card.y = this.input.y;

        // });

        // card.on('dragend', () => {
        //     if (this.physics.overlap(card, this.battleField)) {
        //         console.log('Card placed in the battlefield');
        //         card.x = 512;
        //         card.y = 384;
        //     } else {
        //         console.log('Card not in the battlefield');
        //         card.x = positionX;
        //         card.y = positionY;
        //     }
        // });
        // const card = this.physics.add.sprite(positionX, positionY, 'door-card').setDisplaySize(cardWidth, cardHeight).setInteractive({ draggable: true });
        // this.input.setDraggable(card);
    }

    // distribui cartas
    distributeCards() {
        // Verifica se há jogadores suficientes
        if (this.players.length < 2) {
            console.error('Need at least two players to distribute cards');
            return;
        }

        // Distribui cartas para cada jogador
        this.players.forEach(player => {
            player.addCard(new Card());
            player.addCard(new Card());
            player.addCard(new Card());
            player.addCard(new Card());
            player.addCard(new Card());
        });

        // Coloca as cartas na tela
        // this.putCards();
    }

}