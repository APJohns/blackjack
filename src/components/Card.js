function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

class Card {
  constructor() {
    const suits = ['clubs', 'spades', 'hearts', 'diamonds'];
    const names = ['king', 'queen', 'jack'];
    this.value = randomInt(2, 12);
    if (this.value === 10) {
      this.name = names[randomInt(0, names.length)];
    } else if (this.value === 11) {
      this.name = 'ace';
    } else {
      this.name = String(this.value);
    }
    this.suit = suits[randomInt(0, suits.length)];
  }
}

export default Card;