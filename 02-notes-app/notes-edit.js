'use strict'

// Select Elements on Page
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const dateElement = document.querySelector('#last-edited')

// Note ID coming as a part of the URL
// Get Node ID from Location Object.
// Remove # Character from ID
const nodeId = location.hash.substring(1)

// Get Notes from LocalStorage Object
let notes = getSavedNotes()

// Find the Note belongs to ID
let note = notes.find((note) => note.id === nodeId)
if (!note) {
    location.assign('index.html')
}

// Set Exist Values
titleElement.value = note.title
bodyElement.value = note.body
dateElement.textContent = generateLastEdited(note.updatedAt)

// Update Note with new values 
titleElement.addEventListener('input', (event) => {
    note.title = event.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input', (event) => {
    note.body = event.target.value
    note.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(note.updatedAt)
    saveNotes(notes)
})

// Remove Notes
removeElement.addEventListener('click', (event) => {
    removeNote(nodeId)
    saveNotes(notes)
    location.assign('index.html')
})

// Sync Data Across Pages with Window Object 
// If someone change title or body of a note, then it refect to edit page of others who open same note
// This code run on open Edit page of others
window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
        notes = JSON.parse(event.newValue)
        note = notes.find((note) => note.id === nodeId)
        if (!note) {
            location.assign('index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
        dateElement.textContent = generateLastEdited(note.updatedAt)
    }
})