'use strict';

import App from "./modules/App.mjs";
import Todo from "./modules/Todo.mjs";
import UI from "./modules/UI.mjs";



const app = new App();
init();


UI.formEl.addEventListener('submit', e => {
    e.preventDefault();
    const time = new Date(UI.formEl.elements[0].value).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const memo = UI.formEl.elements[1].value;
    const todo = new Todo(time, memo);
    app.addTodo(todo);
    UI.showTodosHtml(app.array);
})

UI.outputEl.addEventListener('click', (event) => {
    // delete mygtukas
    if (event.target.className.includes('delete-btn')) {
        const id = event.target.parentElement.parentElement.dataset.id
        console.log('id ===', id);
        console.log(id == 2)
        app.removeTodo(id);
        init();
    }
    // edit mygtukas
    if (event.target.className.includes('edit-btn')) {
        const id = event.target.parentElement.parentElement.dataset.id;
        App.todoToEdit = app.array.find(todo => todo.id == id);
        UI.showPopUp(App.todoToEdit)

    }
});

document.body.addEventListener('click', (event) => {
    if (!event.target.className.includes('popup') && UI.popFormEl.style.display == 'block' && !event.target.className.includes('edit-btn')) {
        UI.popFormEl.style.display = 'none';
    }
})

UI.popFormEl.addEventListener('submit', event => {
    event.preventDefault();
    const time = new Date(UI.popFormEl.elements[0].value).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const text = UI.popFormEl.elements[1].value;
    app.updateMemory(time, text);
    init();
    UI.popFormEl.style.display = 'none';
})

function init() {
    UI.showTodosHtml(app.array);
}