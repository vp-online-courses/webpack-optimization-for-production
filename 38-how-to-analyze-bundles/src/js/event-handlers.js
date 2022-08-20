import { renderTodos, clearNewTodoInput, getTodoId } from './ui'
import { getAllTodos, addTodo, removeTodo, updateTodo } from './data'
import { capitalize } from 'lodash-es'
import { trim } from './helpers'
import { Modal } from 'bootstrap'
import $ from 'jquery'

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
    $('#modal-delete-button').data('todo-id', id)
    const deleteTodoModal = Modal.getOrCreateInstance(
        document.getElementById('modal-delete-todo')
    )
    deleteTodoModal.show()
}

export function confirmRemoveEventHandler() {
    const id = $('#modal-delete-button').data('todo-id')
    removeTodo(id)
    renderTodos(getAllTodos())
    const deleteTodoModal = Modal.getOrCreateInstance(
		document.getElementById('modal-delete-todo')
	)
    deleteTodoModal.hide()
}

export function toggleTodoEventListener(event) {
    const id = getTodoId(event.target)
    const isCompleted = event.target.checked
    updateTodo(id, isCompleted)
    renderTodos(getAllTodos())
}
