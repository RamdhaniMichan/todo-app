//Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//Event Listener
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteTodo)
filterOption.addEventListener("click", filterTodo)

//Function
function createTodoElement(todo){
    //membuat element baru tag div
    const todoDiv = document.createElement("div")
    //menambahkan class todo ke variable todoDiv
    todoDiv.classList.add("todo")

    //membuat element baru tag li
    const newTodo = document.createElement("li")
    //memasukan value/isi ke variable newTodo yang diambil dari parameter
    newTodo.innerText = todo
    newTodo.classList.add("todo-item")
    //memasukan element newTodo ke dalam todoDiv
    todoDiv.appendChild(newTodo)

    //button cek complete
    const completeButton = document.createElement("button")
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn")
    todoDiv.appendChild(completeButton)

    //button cek hapus
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //memasukan element todoDiv ke dalam todoList
    todoList.appendChild(todoDiv)
} 

//Reusable Code / satu fungsi yang dapat dipakai beberapa function yang sama
function getItemLocalStorage(){
    let todos

    if(localStorage.getItem("todos") == null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    return todos
}
function addTodo(event){
    event.preventDefault()
    
    if(todoInput.value){
        // const todoDiv = document.createElement("div")
        // todoDiv.classList.add("todo")
    
        // const newTodo = document.createElement("li")
        // newTodo.innerText = todoInput.value
        // newTodo.classList.add("todo-item")
        // todoDiv.appendChild(newTodo)
    
        // const completeButton = document.createElement("button")
        // completeButton.innerHTML = '<i class="fas fa-check"></i>'
        // completeButton.classList.add("complete-btn")
        // todoDiv.appendChild(completeButton)
    
        // const trashButton = document.createElement("button")
        // trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        // trashButton.classList.add("trash-btn")
        // todoDiv.appendChild(trashButton)
    
        // todoList.appendChild(todoDiv)

        createTodoElement(todoInput.value)
        
        //menambahkan data todo ke local storage
        addTodoLocalStorage(todoInput.value)
    
        todoInput.value = ""
    } else {
        alert("Input is required")
    }

    
}

function deleteTodo(e){
    e.preventDefault()
    
    if(e.target.classList.contains("trash-btn")){
        const parent = e.target.parentElement
        parent.classList.add("fall")
        deleteTodoLocalStorage(parent)
        parent.addEventListener("transitionend", ()=> {
            parent.remove()
        })
    }

    if(e.target.classList.contains("complete-btn")){
        const parent = e.target.parentElement

        parent.classList.toggle("completed")
    }
}

function filterTodo(e){
    const todos = todoList.childNodes
    
    todos.forEach((todo)=> {
        switch(e.target.value){
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break
        }
    })
}

function addTodoLocalStorage(todo){
    let todos = getItemLocalStorage()

    // if(localStorage.getItem("todos") == null){
    //     todos = []
    // } else {
    //     todos = JSON.parse(localStorage.getItem("todos"))
    // }

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos(){
    let todos = getItemLocalStorage()

    // if(localStorage.getItem("todos") == null){
    //     todos = []
    // } else {
    //     todos = JSON.parse(localStorage.getItem("todos"))
    // }

    todos.forEach((todo)=> {
    //     const todoDiv = document.createElement("div")
    // todoDiv.classList.add("todo")

    // const newTodo = document.createElement("li")
    // newTodo.innerText = todo
    // newTodo.classList.add("todo-item")
    // todoDiv.appendChild(newTodo)

    // const completeButton = document.createElement("button")
    // completeButton.innerHTML = '<i class="fas fa-check"></i>'
    // completeButton.classList.add("complete-btn")
    // todoDiv.appendChild(completeButton)

    // const trashButton = document.createElement("button")
    // trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    // trashButton.classList.add("trash-btn")
    // todoDiv.appendChild(trashButton)

    // todoList.appendChild(todoDiv)

        createTodoElement(todo)
    })

}

function deleteTodoLocalStorage(deleteElement){
    let todos = getItemLocalStorage()

    // if(localStorage.getItem("todos") == null){
    //     todos = []
    // } else {
    //     todos = JSON.parse(localStorage.getItem("todos"))
    // }
    
    const todoIndex = deleteElement.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)

    localStorage.setItem("todos" ,JSON.stringify(todos))
}