'use strict';

import timeRemaining from "./Time.mjs";

export default class UI {
    static outputEl = document.getElementById('output');
    static formEl = document.forms[0];
    static popFormEl = document.forms[1];
    static erorrMsgEl = document.querySelector('.errorMsg');

    static makeTodoDiv(todo) {
        //  <div class="container">
        const containerDiv = document.createElement('div');
        containerDiv.className = 'container';
        containerDiv.dataset.id = todo.id;
        //       <div class="upper">
        const upperDiv = document.createElement('div');
        upperDiv.className = 'upper';
        //       <h6>2002-11-23 12:32</h6>
        const h6ElTime = document.createElement('h6');
        h6ElTime.textContent = todo.time//.toLocaleTimeString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        //       <h6><i class="fa-solid fa-clock-rotate-left"></i> time remaining</h6>
        const h6ElRemaining = document.createElement('h6');
        h6ElRemaining.innerHTML = `<i class="fa-solid fa-clock-rotate-left"></i> ${timeRemaining(todo.time)} `;
        //      </div>
        upperDiv.append(h6ElTime, h6ElRemaining);
        /* <span> Morning DnB<i class="fa-solid fa-pen-to-square list-btn edit-btn"></i><i
                  class="fa-solid fa-trash list-btn delete-btn"></i></span> */
        const memoEl = document.createElement('span');
        memoEl.innerHTML = ` ${todo.text}<i class="fa-solid fa-pen-to-square list-btn edit-btn"></i><i
    class="fa-solid fa-trash list-btn delete-btn"></i>`
        //   </div>
        containerDiv.append(upperDiv, memoEl);
        return containerDiv;
    }

    static showTodosHtml(array) {
        UI.outputEl.innerHTML = '';
        array.forEach(todo => {
            const todoDiv = UI.makeTodoDiv(todo);
            UI.outputEl.append(todoDiv);
        });
    }

    static showPopUp(todo) {
        // return new Promise((resolve) => {
        UI.popFormEl.style.display = 'block';
        UI.popFormEl.elements[0].value = todo.time.split(' ').join('T');
        UI.popFormEl.elements[1].value = todo.text;
        // resolve();})

    }
}