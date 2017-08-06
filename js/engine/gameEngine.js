import { EasyLevelSettings, HardLevelSettings } from '@accessors/settings';
import GameNode from './node';

class GameEngine {
    static tempValuesGenerator() {
        let game = this.determineDifficulty("easy");
        return game;
    }

    static determineDifficulty(difficulty) {
        if (difficulty === EasyLevelSettings.getLevelName()) {
            return startNewGame(EasyLevelSettings);
        }
        else {
            return startNewGame(HardLevelSettings);
        }
    }
    static startNewGame(LevelBasedSettings) {
        let repetition = LevelBasedSettings.getRepetitionNumber();
        let images = LevelBasedSettings.getImages();

        let shuffledImages = this.prepareArray(images, repetition);
        let nodes = convertArrayToNodes(shuffledImages);
        let game = {
            nodes: nodes,
            score: 0
        }
        return game;
    }
    static prepareArray(array, repetition) {
        let arrayCopy = this.cloneArray(array);
        let newArray = this.appendArraysWithRepetition(array, arrayCopy, repetition);
        let shuffledArray = this.shuffleArray(newArray);
        return shuffledArray;
    }
    static cloneArray(array) {
        let arrayCopy = Array(array.length);
        arrayCopy = array.slice();
        return arrayCopy;
    }
    static appendArraysWithRepetition(firstArray, secondArray, repetition) {
        let repetitionCount = repetition - 1;
        while (repetitionCount > 0) {
            Array.prototype.push.apply(firstArray, secondArray);
            repetitionCount--;
        }
        return firstArray;
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
    convertArrayToNodes(array) {
        let nodes = [];
        array.forEach(function (element) {
            nodes.push(new GameNode(element));
        });
        return nodes;
    }
}

