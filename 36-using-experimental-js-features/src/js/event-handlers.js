import { renderTodos, clearNewTodoInput, getTodoId } from './ui'
import { getAllTodos, addTodo, removeTodo, updateTodo } from './data'
import { capitalize } from 'lodash'

function trim(value) {
    return value
        .replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/\s{2,}/g, ' ');
}

export function onLoadEventHandler() {
    renderTodos(getAllTodos())
}

export function newTodoEventHandler(event) {
    let text = event.target.value
    text = text |> trim |> capitalize
    addTodo({
        id: Date.now(),
        text: text,
        completed: false
    })
    renderTodos(getAllTodos())
    clearNewTodoInput()
}

export function removeTodoEventHandler(event) {
    const id = getTodoId(event.target)
    removeTodo(id)
    renderTodos(getAllTodos())
}

export function toggleTodoEventListener(event) {
    const id = getTodoId(event.target)
    const isCompleted = event.target.checked
    updateTodo(id, isCompleted)
    renderTodos(getAllTodos())
}
