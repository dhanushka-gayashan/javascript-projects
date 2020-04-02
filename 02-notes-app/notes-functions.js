'use strict'

// Read exising notes from localStoroge 
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : [] 
    } catch (error) {
        console.log('Encounter an error while fetching data from localStorage....')
        return []
    }    
}

// Find and Remove Notes from Array List
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }    
}

// Genereate DOM Note Element
const generateNoteDOM = (note) => {
    const div = document.createElement('div')    
    const removeButton = document.createElement('button')  
    const textAnchor = document.createElement('a')

    removeButton.textContent = 'X'
    div.appendChild(removeButton)
    removeButton.addEventListener('click', (event) => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
    
    note.title.length > 0 ? textAnchor.textContent = note.title : textAnchor.textContent = 'New Note'
    textAnchor.href = `edit.html#${note.id}`
    div.appendChild(textAnchor)

    return div
} 

// Sort Values: A-Z
const sortValuesAZ = (valueA, valueB) => {
    if (valueA < valueB) {
        return -1
    } else if (valueA > valueB) {
        return 1
    } else {
        return 0
    }
}

// Sort Values: Z-A
const sortValuesZA = (valueA, valueB) => {
    if (valueA > valueB) {
        return -1
    } else if (valueA < valueB) {
        return 1
    } else {
        return 0
    }
}

// Sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => sortValuesZA(a.updatedAt, b.updatedAt))
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => sortValuesZA(a.createdAt, b.createdAt))
    } else {
        return notes.sort((a, b) => sortValuesAZ(a.title, b.title))
    }
}

// Render DOM Note Elements
const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''

    const sortedNotes = sortNotes(filteredNotes, filters.sortBy)

    sortedNotes.forEach((note) => {
        const div = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(div)
    })
}

// Save Notes into LocalStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Generte Last Edited Message 
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`