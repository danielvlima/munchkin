import Card from "./Card";

export default class Player {
  private cards: Card[];
  private position: 'left' | 'right' | 'top' | 'bottom';
  constructor(position: 'left' | 'right' | 'top' | 'bottom') {
    this.cards = [];
    this.position = position;

  }

  getCards() {
    return this.cards;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  getPosition() {
    return this.position;
  }
}