// javascript

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref,push, onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings= {
    databaseURL : "https://todoapp-with-firebase1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const todoInDB = ref(database, "todo")

onValue(todoInDB, snapshot => {
    if (snapshot.exists()){
        let todoArray = Object.entries(snapshot.val())
    
        clearTodoList()
    
        todoArray.forEach(item => {
            addTodoToList(item); // Access each item directly
        })
    } else {
        const todoListElement = document.getElementById("todoList")
        todoListElement.innerHTML = "no item yet..."
        //todoListElement.style.color = "white"
    }

})

function clearTodoList(){
    const todoListElement = document.getElementById("todoList")
    todoListElement.innerHTML = ""
    
}

export function addTodo() {
      const todoInput = document.getElementById("todo");
      const todoValue = todoInput.value;    
    // Check if the input is not empty
    if (todoValue.trim() !== "") {
        // Create a new list item (li)
        push(todoInDB, todoValue);        
        //addTodoToList(todoValue)
        clearInputTodo();        
    } else {
        alert("Please enter a task");
    }
      
}

function clearInputTodo(){
    const todoInput = document.getElementById("todo");
    todoInput.value = "";
}

function addTodoToList(item){
    const todoListElement = document.getElementById("todoList")
    //todoListElement.style.color = "white"
    const li = document.createElement("li");

        // Set the text of the list item to the input value
    li.textContent = item[1];
    li.addEventListener("click", ()=>{
        let text = `would you like to remove "${item[1]}" from the list`;
        if (confirm(text) == true) {
            let location = ref(database,`todo/${item[0]}`)
            remove(location)
        } 
    })
    todoListElement.appendChild(li);

}

window.addTodo = addTodo;