import { setFilters } from './filters'
import { createTodo } from './todos'
import { renderTodos } from './view'

renderTodos()

document.querySelector('#search-text').addEventListener('input', (event) => {
    setFilters({
        searchText: event.target.value
    })
    renderTodos()
})

document.querySelector('#new-todo').addEventListener('submit', (event) => {
    event.preventDefault()
    const text = event.target.elements.text.value.trim()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
    }
    event.target.elements.text.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', (event) => {
    setFilters({
        hideCompleted: event.target.checked
    })
    renderTodos()
})

window.addEventListener('storage', (event) => {
    if (event.key === 'todos') {
        renderNotes()
    }
})