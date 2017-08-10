export default class GameNode {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.halted = true; // blocked until timer starts
    this.tail = true; // head or tail
    this.burnt = false; // already matched
  }

  getImageUrl() {
    return this.imageUrl;
  }
  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }
  isHalted() {
    return this.halted === true;
  }
  block() {
    this.halted = true;
  }
  unBlock() {
    this.halted = false;
  }
  isTail() {
    return this.tail === true;
  }
  isHead() {
    return this.tail === false;
  }
  flipNode() {
    this.tail = !this.tail;
  }
  tailNode() {    
    this.tail = true;
  }
  unTail() {
    this.tail = false;
  }
  isBurnt() {
    return this.burnt === true;
  }
  burn() {
    this.burnt = true;
  }
}
