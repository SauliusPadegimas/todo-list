'use strict';

import App from "./modules/App.mjs";
import Todo from "./modules/Todo.mjs";
import UI from "./modules/UI.mjs";


//          #### EVENTS ON PAGE LOAD ####
let sortCounter = 0;
const app = new App();
UI.showTodosHtml(app.array)


//           %%%% EVENT- LISTENERS %%%%

// papildymo mygtukas
UI.formEl.addEventListener('submit', e => {
    e.preventDefault();
    UI.erorrMsgEl.style.display = 'none';
    const time = new Date(UI.formEl.elements[0].value).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const memo = UI.formEl.elements[1].value;
    if (time == 'Invalid Date' || memo == '') {
        UI.erorrMsgEl.style.display = 'inline-block';
    }
    else {
        const todo = new Todo(time, memo);
        app.addTodo(todo);
        UI.showTodosHtml(app.array);
    }
    //isvalom forma
    UI.formEl.elements[0].value = ''
    UI.formEl.elements[1].value = ''
})

UI.outputEl.addEventListener('click', (event) => {
    // delete mygtukas
    if (event.target.className.includes('delete-btn')) {
        event.target.parentElement.parentElement.style.backgroundColor = 'lightcoral';
        const id = event.target.parentElement.parentElement.dataset.id;
        app.removeTodo(id);
        setTimeout(() => UI.showTodosHtml(app.array), 1000)
    }
    // edit mygtukas
    if (event.target.className.includes('edit-btn')) {
        const id = event.target.parentElement.parentElement.dataset.id;
        app.todoToEdit = app.array.find(todo => todo.id == id);
        UI.showPopUp(app.todoToEdit)

    }
});

// paspaudimas EDIT formos išorėje panaikina EDIT formos rodymą
document.body.addEventListener('click', (event) => {
    if (!event.target.className.includes('popup') && UI.popFormEl.style.display == 'block' && !event.target.className.includes('edit-btn')) {
        UI.popFormEl.style.display = 'none';
    }
})

// EDIT forms pateikimas
UI.popFormEl.addEventListener('submit', event => {
    event.preventDefault();
    const time = new Date(UI.popFormEl.elements[0].value).toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const text = UI.popFormEl.elements[1].value;
    app.updateMemory(time, text);
    UI.showTodosHtml(app.array);
    UI.popFormEl.style.display = 'none';
})
// SORT mygtuko paspaudimas
UI.sortBtnEl.addEventListener('click', () => {
    sortCounter++;
    const direction = sortCounter % 2 ? 'asc' : 'desc';
    const arrow = sortCounter % 2 ? '<i class="fa-solid fa-angle-up"></i>' : '<i class="fa-solid fa-angle-down"></i>';
    app.sortArr(direction);
    UI.sortBtnEl.innerHTML = arrow;
    UI.showTodosHtml(app.array);
})

