import Hangman from './hangman'
import getPuzzle from './request'

const puzzleEL = document.querySelector('#puzzle')
const guessesEL = document.querySelector('#guesses')

let game

const render = () => {
    puzzleEL.innerHTML = ''
    game.puzzle.split('').forEach((letter) => {
        const letterEL = document.createElement('span')
        letterEL.textContent = letter
        puzzleEL.appendChild(letterEL)
    })

    guessesEL.textContent = game.statusMessage
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game = new Hangman(puzzle, 5)
    render()
}

window.addEventListener('keypress', (event) => {
    const guess = String.fromCharCode(event.charCode)
    game.makeGuess(guess)
    render()
})

document.querySelector('#reset').addEventListener('click', startGame)

startGame()