import { renderTodos, clearNewTodoInput, getTodoId } from './ui'
import { getAllTodos, addTodo, removeTodo, updateTodo } from './data'
import { capitalize } from 'lodash-es'
import { trim } from './helpers'

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

export async function removeTodoEventHandler(event) {
    const [{ Modal }, { default: $}] = await Promise.all([
        import(
            'bootstrap'
            /* webpackChunkName: "bootstrap" */
        ),
        import(
            'jquery'
            /* webpackChunkName: "jquery" */
        )
    ])
    const id = getTodoId(event.target)
    $('#modal-delete-button').data('todo-id', id)
    const deleteTodoModal = Modal.getOrCreateInstance(
        document.getElementById('modal-delete-todo')
    )
    deleteTodoModal.show()
}

export async function confirmRemoveEventHandler() {
    const [{ Modal }, { default: $}] = await Promise.all([
        import(
            'bootstrap'
            /* webpackChunkName: "bootstrap" */
        ),
        import(
            'jquery'
            /* webpackChunkName: "jquery" */
        )
    ])
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
