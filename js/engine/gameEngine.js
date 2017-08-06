class myClass {

    static tempValuesGenerator() {
        const easyDifficulty = {
            sideSize: 2,
            repetition: 2,
            cells: {
                images: [
                    'https://dummyimage.com/60x60/613c61/cccdd9.png&text=1',
                    'https://dummyimage.com/60x60/807780/cccdd9.png&text=2'
                ]
            }
        }
        const hardDifficulty = {
            sideSize: 8,
            repetition: 2,
            cells: {
                images: [
                    'https://dummyimage.com/60x60/613c61/cccdd9.png&text=1',
                    'https://dummyimage.com/60x60/807780/cccdd9.png&text=2',
                    'https://dummyimage.com/60x60/262326/cccdd9.png&text=3',
                    'https://dummyimage.com/60x60/150042/cccdd9.png&text=4',
                    'https://dummyimage.com/60x60/820e1c/cccdd9.png&text=5',
                    'https://dummyimage.com/60x60/0994f0/cccdd9.png&text=6',
                    'https://dummyimage.com/60x60/0c9e7c/cccdd9.png&text=7',
                    'https://dummyimage.com/60x60/d99503/cccdd9.png&text=8'
                ]
            }
        }
        let game = this.startNewGame(easyDifficulty);
        return game;
    }

    static startNewGame(difficulty) {
        let images = difficulty.cells.images;
        let repetition = difficulty.repetition;
        shuffledImages = this.prepareArray(images, repetition);


        let game = {
            array: shuffledImages,
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
}




//console.log(myClass.tempValuesGenerator());

