import CardType from "../enums/CardType";

export default class Card {
  private title: string;
  private text: string;
  private image: string;
  private type: CardType;
  private positionX: number;
  private positionY: number;
  private cardObject: Phaser.GameObjects.Image;
  constructor() {

  }

  setCardObject(cardObject: Phaser.GameObjects.Image) {
    this.cardObject = cardObject;
  }

  getCardObject() {
    return this.cardObject;
  }

  setPositionX(positionX: number) {
    this.positionX = positionX;
  }

  getPositionX() {
    return this.positionX;
  }

  setPositionY(positionY: number) {
    this.positionY = positionY;
  }

  getPositionY() {
    return this.positionY;
  }

}