//select html elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//classes for circle/checkbox and completed vs not
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";

//list to hold to-do objects 
let LIST, id;
let data = localStorage.getItem('TODO');

function loadToDo(array) {
    array.forEach(item => {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}

//if some list exists / it is not the first time the user is here
if (data) {
    LIST = JSON.parse(data);
    loadToDo(LIST);
    id = LIST.length;
}
//if no data, if first time visit for user
else {
    LIST = [];
    id = 0;
}

function loadTodo(array) {
    array.forEach(element => {

    });
}

//clear local storage on clear button
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

//add a to-do
//template literals from ES6 - Babel can transpile for older browsers
function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? check : uncheck;
    const LINE = done ? lineThrough : '';
    const itemHTML = `<li class = "item">
                    <i class = "co fa ${DONE}" job = "complete" id="${id}"> </i> 
                    <p class = "text ${LINE}">${toDo}</p> 
                    <i class = "de fa fa-trash-o" job = "delete" id="${id}"> </i> 
                </li>`

    const position = "beforeend";
    list.insertAdjacentHTML(position, itemHTML);
}

//event listener for adding to-do list item (on enter key)
document.addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        const toDo = input.value;
        //check if input is empty (if enter was hit by accident)
        if (toDo) {
            //call addToDo if not empty
            addToDo(toDo, id, false, false);
            LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                })
                //reset input value
            input.value = '';
            id++;
        }
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }
});

//complete a toDo
function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove a todo item
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

//event listener for complete and delete
list.addEventListener("click", (event) => {
    let element = event.target;
    //need to check job attribute (if they clicked complete or delete)
    let job = element.attributes.job.value;
    console.log(job);
    if (job === "complete") {
        completeToDo(element);
    } else if (job === "delete") {
        removeToDo(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));

});

//date
let options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
}
let today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-us", options);