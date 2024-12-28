import CardType from "../enums/CardType";

export default class Card {
  private title: string;
  private text: string;
  private image: string;
  private type: CardType;
  private positionX: number;
  private positionY: number;
  private currentZone: 'hand' | 'battlefield' | 'discard' | 'pile';
  constructor(title: string, text: string, imagePath: string, type: CardType) {
    this.title = title;
    this.text = text;
    this.type = type;
    this.image = imagePath;
    this.currentZone = 'pile';
    //setImage(image);
  }

  getTitle() {
    return this.title;
  }

  getText() {
    return this.text;
  }

  getImage() {
    return this.image;
  }

  getType() {
    return this.type;
  }

  setCurrentZone(zone: 'hand' | 'battlefield' | 'discard' | 'pile') {
    this.currentZone = zone;
  }

  getCurrentZone() {
    return this.currentZone;
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