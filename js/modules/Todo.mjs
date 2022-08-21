import App from "./App.mjs";

export default class Todo {

    constructor(timeIn, textIn) {
        this.time = timeIn;
        this.text = textIn;
        this.id = ++App.counter;
    }
}