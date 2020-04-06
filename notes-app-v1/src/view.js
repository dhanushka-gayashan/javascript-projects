import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

const generateNoteDOM = (note) => {
    const noteEL = document.createElement('a')
    const textEL = document.createElement('p')
    const statusEL = document.createElement('p')

    noteEL.href = `edit.html#${note.id}`
    noteEL.classList.add('list-item')

    note.title.length > 0 ? textEL.textContent = note.title : textEL.textContent = 'New Note'
    textEL.classList.add('list-item__title')
    noteEL.appendChild(textEL)

    statusEL.textContent = generateLastEdited(note.updatedAt)
    statusEL.classList.add('list-item__subtitle')
    noteEL.appendChild(statusEL)

    return noteEL
} 

const renderNotes = () => {
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    const notesEl = document.querySelector('#notes')
    notesEl.innerHTML = ''
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const div = generateNoteDOM(note)
            notesEl.appendChild(div)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (nodeId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#last-edited')

    const notes = getNotes()
    const note = notes.find((note) => note.id === nodeId)
    if (!note) {
        location.assign('index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage }