//selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listener

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);

//functions

function addTodo(event){
    event.preventDefault();
    //create div in ul
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //get existing todos from storage
    saveLocalTodos(todoInput.value);
    //create check button
    const CompleteButton = document.createElement('button');
    CompleteButton.innerHTML = '<i class = "fas fa-check"></i>';
    CompleteButton.classList.add('complete-btn');
    todoDiv.appendChild(CompleteButton);
    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear input value
    todoInput.value="";
}

function deleteCheck(event)
{
    const item = event.target;
    //delete Todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        // animation 
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    //check mark 
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    

}

function filterTodo(e){
    [...todoList.children].forEach(function(todo){
        switch(e.target.value){ 
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
            }
            break;
        case "uncompleted":
            if(!todo.classList.contains('completed')){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
            }
            break;
        }
    });

}

function saveLocalTodos(todo){
    //check existing todos
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify('todos'));
}

function getTodos() {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }
  function removeLocalTodos(todo) {
    let todos = [];
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }