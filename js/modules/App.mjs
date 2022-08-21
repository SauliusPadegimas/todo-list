"use strict";


export default class App {
    static counter = 1
    constructor() {
        this.todoToEdit = {};
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
        console.log('this.array ===', this.array);
        localStorage.setItem("todoArr", JSON.stringify(this.array));

        localStorage.setItem("todoCount", JSON.stringify(App.counter));
    }

    removeTodo(idIn) {
        this.array = this.array.filter(todo => todo.id != idIn);
        localStorage.setItem("todoArr", JSON.stringify(this.array));
    }

    updateMemory(timeIn, textIn) {
        this.todoToEdit.time = timeIn;
        this.todoToEdit.text = textIn;
        // this.todoToEdit.edit(timeIn, textIn);
        localStorage.setItem("todoArr", JSON.stringify(this.array));
    }

    sortArr(direction) {
        if (direction == "asc")
            this.array.sort((a, b) => {
                if (a.time < b.time) { return -1; }
                if (a.time > b.time) { return 1; }
                return 0;
            })

        if (direction == 'desc')
            this.array.sort((a, b) => {
                if (a.time < b.time) { return 1; }
                if (a.time > b.time) { return -1; }
                return 0;
            })

    }
}
