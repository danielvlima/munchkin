import { Scene } from 'phaser';
import Player from '../entities/Player';
import Card from '../entities/Card';
import cardsData from '../utils/cardsData';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    battleField: Phaser.GameObjects.Image;
    screenW: number;
    screenH: number;
    cardW: number;
    cardH: number;
    players: Player[];
    playersNumber: number;
    playerOneCoordinates: { x: number, y: number };
    cardsPile: Card[];
    cardsDiscard: Card[];
    playerHandObjects: Phaser.GameObjects.Group;
    battleFieldObjects: Phaser.GameObjects.Group;

    constructor() {
        super('Game');
        this.screenW = 0;
        this.screenH = 0;
        this.cardW = 100;
        this.cardH = 150;
        this.playersNumber = 4;
        this.players = [];
        this.playerOneCoordinates = { x: 200, y: 650 };
        this.cardsPile = [];
    }

    create() {
        this.screenW = this.sys.game.canvas.width;
        this.screenH = this.sys.game.canvas.height;
        this.playerHandObjects = this.add.group(); 4
        this.battleFieldObjects = this.add.group();
        this.background = this.add.image(512, 384, 'game-background').setScale(0.8);
        console.log(this.screenH);

        // this.battleField = this.physics.add.staticGroup();
        this.battleField = this.add.image(512, 384, 'battlefield').setInteractive().setScale(0.3);
        if (this.battleField.input) {
            this.battleField.input.dropZone = true;
        }

        // this.battleField.create(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'battlefield').setScale(0.3).refreshBody();
        // this.physics.add.existing(this.battleField);
        // const zona = this.add.zone(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, this.sys.game.canvas.width, this.sys.game.canvas.height).setInteractive();

        this.players.push(new Player('bottom'));
        this.players.push(new Player('top'));
        this.players.push(new Player('left'));
        this.players.push(new Player('right'));
        this.generateGameCards();
        this.cardsPile = this.shuffleCards(this.cardsPile);
        this.distributeCards();
        //create box object center of screen

        this.players.forEach(player => {
            this.organizePlayerHand(player);
        }
        );

    }

    update() {

    }

    organizePlayerHander2(player: Player) {
        let startY: number;
        let startX: number;
        let positionY: number;
        let positionX: number;

        const spaceBetweenCards = this.cardW * 1.01;
        const totalWidth = this.cardW * player.getCards().length + spaceBetweenCards;
        this.playerHandObjects.getChildren().forEach((cardObject, i) => {
            startY = this.screenH * 0.9;
            startX = (this.screenW - totalWidth + this.cardW) / 2;
            positionY = startY;
            positionX = startX + i * spaceBetweenCards + this.cardW / 2;
            (cardObject as Phaser.GameObjects.Image).x = positionX;
            (cardObject as Phaser.GameObjects.Image).y = positionY;
        });
    }

    organizePlayerHand(player: Player) {
        let startY: number;
        let startX: number;
        let positionY: number;
        let positionX: number;
        let cardObject: Phaser.GameObjects.Image;

        const spaceBetweenCards = this.cardW * 1.01;
        const totalWidth = this.cardW * player.getCards().length + spaceBetweenCards;
        console.log(player.getPosition());
        player.getCards().forEach((_, i) => {
            switch (player.getPosition()) {
                case 'bottom':
                    startY = this.screenH * 0.9;
                    startX = (this.screenW - totalWidth + this.cardW) / 2;
                    positionY = startY;
                    positionX = startX + i * spaceBetweenCards + this.cardW / 2;
                    cardObject = this.add.sprite(positionX, positionY, 'door-card-back').setDisplaySize(this.cardW, this.cardH);
                    this.playerHandObjects.add(cardObject);

                    //     (this.playerHandObjects.getChildren()[i] as Phaser.GameObjects.Image).x = positionX;
                    //     (this.playerHandObjects.getChildren()[i] as Phaser.GameObjects.Image).y = positionY;

                    // }
                    // this.playerHandObjects.add(this.add.sprite(positionX, positionY, 'door-card-back').setDisplaySize(this.cardW, this.cardH))
                    break;
                case 'top':
                    startY = this.screenH * 0.1;
                    startX = (this.screenW - totalWidth + this.cardW) / 2;
                    positionY = startY;
                    positionX = startX + i * spaceBetweenCards + this.cardW / 2;
                    cardObject = this.add.sprite(positionX, positionY, 'door-card-back').setDisplaySize(this.cardW, this.cardH).setFlipY(true);
                    break;
                case 'left':
                    startY = (this.screenH - totalWidth + this.cardW) / 2;
                    startX = this.screenW * 0.1;
                    positionY = startY + i * spaceBetweenCards + this.cardW / 2;
                    positionX = startX;
                    cardObject = this.add.sprite(positionX, positionY, 'door-card-back').setDisplaySize(this.cardW, this.cardH).setAngle(90);
                    break;
                case 'right':
                    startY = (this.screenH - totalWidth + this.cardW) / 2;
                    startX = this.screenW * 0.9;
                    positionY = startY + i * spaceBetweenCards + this.cardW / 2;
                    positionX = startX;
                    cardObject = this.add.sprite(positionX, positionY, 'door-card-back').setDisplaySize(this.cardW, this.cardH).setAngle(-90);
                    break;
            }

            cardObject.setInteractive();

            const cardObj = cardObject;

            this.moveCard(cardObj, player.getCards()[i]);

        });
    }

    moveCard(cardObject: Phaser.GameObjects.Image, card: Card) {
        const positionX = cardObject.x;
        const positionY = cardObject.y;
        this.input.setDraggable(cardObject);
        this.input.on('dragstart', () => {
            this.children.bringToTop(cardObject);
        }, this);


        // cardObject.on('drag', () => {
        //     cardObject.x = this.input.x;
        //     cardObject.y = this.input.y;
        // });

        this.input.on('dragenter', () => {

            this.battleField.setTint(0x00ff00);

        });
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY
        }
        );

        this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dropped: boolean) => {

            if (!dropped) {
                if (gameObject.input) {
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                }
            }
        });

        this.input.on('drop', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dropZone: Phaser.GameObjects.Image) => {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            if (gameObject.input) {
                gameObject.input.enabled = false;
            }
            this.playerHandObjects.remove(gameObject);
            this.battleFieldObjects.add(gameObject);
            this.removeCardFromArray(this.players[0].getCards(), card);
            // this.organizePlayerHand(this.players[0]);
            this.organizePlayerHander2(this.players[0]);
            ;
        });

    }

    distributeCards() {
        this.players.forEach(player => {
            for (let i = 0; i < 5; i++) {
                this.giveCardToPlayer(this.cardsPile, player);
            }
        });
    }

    removeCardFromArray(cards: Card[], cardToRemove: Card): Card[] {
        return cards.filter(card => card !== cardToRemove);
    }

    giveCardToPlayer(origin: Card[], player: Player, card?: Card) {
        if (card) {
            card.setCurrentZone('hand');
            player.addCard(card);
            this.removeCardFromArray(origin, card);
            return
        }

        const randomIndex = Math.floor(Math.random() * origin.length);
        const cardToPlayer = origin[randomIndex];
        cardToPlayer.setCurrentZone('hand');
        player.addCard(cardToPlayer);
        this.removeCardFromArray(origin, origin[randomIndex]);
    }

    generateGameCards() {
        cardsData.forEach(cardData => {
            this.cardsPile.push(new Card(cardData.title, cardData.text, cardData.image, cardData.type));
        });
        const shuffledCards = this.shuffleCards(this.cardsPile);
        this.cardsPile = shuffledCards;
    }

    shuffleCards(cards: Card[]): Card[] {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    discardCard(origin: Card[], card: Card) {
        this.removeCardFromArray(origin, card);
        card.setCurrentZone('discard');
        this.cardsDiscard.push(card);
    }

}