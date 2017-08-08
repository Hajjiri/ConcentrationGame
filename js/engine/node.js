export default class GameNode {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.halted = false; // blocked until timer starts
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
  unBlockNode() {
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
  isBurnt() {
    return this.burnt === true;
  }
  burnNode() {
    this.burnt = true;
  }
}
