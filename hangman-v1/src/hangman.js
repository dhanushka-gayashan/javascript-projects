class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.gussedLetters = []
        this.status = 'playing'
    }

    get puzzle() {
        let puzzle = ''
        this.word.forEach(letter => {
            puzzle += this.gussedLetters.includes(letter) || letter === ' ' ? letter : '*'
        });
        return puzzle
    }

    makeGuess(guess) {
        if (this.status !== 'playing') {
            return
        }

        guess = guess.toLowerCase()
        const isUnique = !this.gussedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (isUnique) {
            this.gussedLetters.push(guess)
        }

        if (isUnique && isBadGuess) {
            this.remainingGuesses--
        }

        this.updateStatus()
    }

    updateStatus() {
        if (this.remainingGuesses === 0) {
            this.status = 'failed'
            return
        }

        const isFinished = this.word.every((letter) => this.gussedLetters.includes(letter) || letter === ' ')
        if (isFinished) {
            this.status = 'finished'
        }
    }

    get statusMessage() {
        let status = this.status

        if (status === 'playing') {
            status = `Guesses left : ${this.remainingGuesses}`
        } else if (status === 'failed') {
            status = `Nice try! The world was "${this.word.join('')}"`
        } else {
            status = `Great work! You guessed the word`
        }

        return status
    }
}

export { Hangman as default }