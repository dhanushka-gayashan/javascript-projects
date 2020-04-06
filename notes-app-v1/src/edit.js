import { initializeEditPage, generateLastEdited } from './view'
import { updateNote, removeNote } from './notes'

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

const nodeId = location.hash.substring(1)
initializeEditPage(nodeId)

titleElement.addEventListener('input', (event) => {
    const note = updateNote(nodeId, {
        title: event.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', (event) => {
    const note = updateNote(nodeId, {
        body: event.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

removeElement.addEventListener('click', (event) => {
    removeNote(nodeId)
    location.assign('index.html')
})

window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        initializeEditPage(nodeId)
    }
})