import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { sortValuesAZ, sortValuesZA } from './sort'

let notes = []

const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (error) {
        console.log('Encounter an error while fetching data from localStorage....')
        return []
    }
}

const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

const getNotes = () => notes

const createNote= () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes()
    return id
} 

const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => sortValuesZA(a.updatedAt, b.updatedAt))
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => sortValuesZA(a.createdAt, b.createdAt))
    } else {
        return notes.sort((a, b) => sortValuesAZ(a.title, b.title))
    }
}

const updateNote = (id, update) => {
    const note = notes.find((note) => note.id === id)
    if (!note) {
        return
    }
    if (typeof update.title === 'string') {
        note.title = update.title
        note.updatedAt = moment().valueOf()
    }
    if (typeof update.body === 'string') {
        note.body = update.body
        note.updatedAt = moment().valueOf()
    }
    saveNotes()
    return note
} 

notes = loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote }