"use strict";


export default class App {
    static counter = 1
    static todoToEdit = {};
    constructor() {
        this.array = [];
        this.checkMemory();
    }
    checkMemory() {
        if (localStorage.getItem("todoArr")) {
            this.array = JSON.parse(localStorage.getItem("todoArr"));
            console.log(this.array);
        }
        if (localStorage.getItem("todoCount")) {
            App.counter = JSON.parse(localStorage.getItem("todoCount"));
        }
    }
    addTodo(todo) {
        this.array.push(todo);

        localStorage.setItem("todoArr", JSON.stringify(this.array));

        localStorage.setItem("todoCount", JSON.stringify(App.counter));
    }

    removeTodo(idIn) {
        this.array = this.array.filter(todo => todo.id != idIn);
        localStorage.setItem("todoArr", JSON.stringify(this.array));
    }

    updateMemory(timeIn, textIn) {
        console.log('before ===', this.array);
        console.log('  App.todoToEdit ===', App.todoToEdit);
        App.todoToEdit.time = timeIn;
        App.todoToEdit.text = textIn;
        console.log('after ===', this.array);
        localStorage.setItem("todoArr", JSON.stringify(this.array));
    }
}
