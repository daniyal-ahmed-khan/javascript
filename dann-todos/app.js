//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    if (todoInput.value === "") return alert("Enter some value in textfield.");
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; //setting the value
    newTodo.classList.add('todo-item');
    //ADD todo to local storage
    saveLocalTodos(todoInput.value);
    //add child to parent
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"> </i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append todo list
    todoList.appendChild(todoDiv);

    //clear text field
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target;
    
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement; // catches entire particular div having class 'todo'
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function(){
            todo.remove();  
        }) 
    }
     
    //check mark 
    if(item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed"); // applied to entire particular div with class 'todo'
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}
function saveLocalTodos(todo) {
    //Check do i already have here
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        //add child to parent
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class= "fas fa-check"> </i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class= "fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //append todo list
        todoList.appendChild(todoDiv);
    })
    
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoToDelete = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoToDelete), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}