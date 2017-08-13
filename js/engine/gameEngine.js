import { EasyLevelSettings, HardLevelSettings } from "@accessors/settings";
import GameNode from "./node";
import _ from "lodash";

export default class GameEngine {
  // games assets initializing
  static determineDifficulty(difficulty, images) {
    return this.startNewGame(HardLevelSettings, images);
  }
  static startNewGame(LevelBasedSettings, images) {
    let repetition = LevelBasedSettings.getRepetitionNumber();
    if (images.length < LevelBasedSettings.getSideSize()) {
      images = LevelBasedSettings.getImages(); // if images are not retrieved from flickr api successfully or number of images is less than required, get default images
    }
    let shuffledImages = this.prepareArray(images, repetition);
    let nodes = this.convertArrayToNodes(shuffledImages);
    let game = {
      nodes: nodes
    };
    return game;
  }
  static prepareArray(array, repetition) {
    let arrayCopy = this.cloneArray(array);
    let newArray = this.appendArraysWithRepetition(
      array,
      arrayCopy,
      repetition
    );
    let shuffledArray = this.shuffleArray(newArray);
    return shuffledArray;
  }
  static cloneArray(array) {
    let arrayCopy = Array(array.length);
    arrayCopy = array.slice();
    return arrayCopy;
  }
  static appendArraysWithRepetition(firstArray, secondArray, repetition) {
    let newArray = [];
    Array.prototype.push.apply(newArray, firstArray);
    let repetitionCount = repetition - 1;
    while (repetitionCount > 0) {
      Array.prototype.push.apply(newArray, secondArray);
      repetitionCount--;
    }
    return newArray;
  }
  static shuffleArray(array) {
    let i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  static convertArrayToNodes(array) {
    let nodes = [];
    array.forEach(function(element) {
      nodes.push(new GameNode(element));
    });
    return nodes;
  }
  // games logic
  static checkGameEnd(nodes) {
    let availableMoves = nodes.filter(node => {
      return !node.isBurnt();
    });
    if (availableMoves.length > 0) {
      return false;
    }
    return true;
  }
  static checkAvailability(nodes) {
    let revealedNodes = nodes.filter(node => {
      return node.isHead() && !node.isBurnt();
    });
    // we dont want more than two cards to be revealed in the same time, or do we?
    return revealedNodes.length < 2;
  }
  static blockNodes(nodes) {
    nodes.forEach(node => {
      node.block();
    });
  }
  static unBlockNodes(nodes) {
    nodes.forEach(node => {
      node.unBlock();
    });
  }
  static selectedNode(node, nodes) {
    if (!this.checkFirstRoll(nodes)) {
      node.unTail();
      this.checkMatchingNodes(node, nodes);
    }
  }
  static checkFirstRoll(nodes) {
    let headNodes = nodes.filter(function(node) {
      return node.isHead() && !node.isBurnt();
    });
    return headNodes.length == 1; // assuming first roll is only one card played
  }
  static checkMatchingNodes(selectedNode, nodes) {
    let matchedNodes = nodes.filter(node => {
      return (
        !node.isBurnt() && //not played yet
        node.getImageUrl() === selectedNode.getImageUrl() && //identical
        node.isHead() // revealed
      );
    });
    if (matchedNodes.length === 2) {
      // mark those identical as played and burned
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].getImageUrl() === selectedNode.getImageUrl()) {
          nodes[i].burn();
        }
      }
    } else {
      // unreveal those un identical
      for (var i = 0; i < nodes.length; i++) {
        if (!nodes[i].isBurnt() && nodes[i].isHead()) {
          nodes[i].tailNode();
        }
      }
    }
  }
}
