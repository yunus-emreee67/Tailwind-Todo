const form = document.querySelector('#todo-form')
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clerButton = document.querySelector("#clear-todos")

eventListeners()

function eventListeners() { // Tüm Event Listenerlar
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosUI)
    secondCardBody.addEventListener("click", deleteTodo)
}
function deleteTodo(e) {
    console.log(e.target);
    if (e.target.className === "fas fa-trash-alt pl-3") {
        console.log("silindi galiba");
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("light", "niye sildin ya")

    }
}
function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index) {
        if (todo === deletetodo) {
            todos.splice(index,1) // arrayden değeri silmek için
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos))
}


function loadAllTodosUI() {
    let todos = getTodosFromStorage()

    todos.forEach(function (todo) {
        addTodoToUI(todo)
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {

        /*  <div class="alert bg-light-ylw my-2 pt-2 lg:h-10 md:h-10 sm:h-14 md:text-sm lg:text-lg" style="color: #EC7357;">
            <strong style="color: #754F44;" >Nabuyun Bea!</strong> Önce İnputu Doldur.
        </div>*/
        showAlert("light", "Nabuyun Bea! Önce İnputu Doldur.")

    } else {

        addTodoToUI(newTodo)
        addTodoStorage(newTodo)
        showAlert("light", "ekledik işte tatava yapma.")
    }


    e.preventDefault()
}
function getTodosFromStorage() { //storagedan bütün todoları alacak
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []

    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}
function addTodoStorage(newTodo) {
    let todos = getTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))

}
function showAlert(type, message) {
    const alert = document.createElement("div")
    // const strong = document.createElement("strong")
    alert.className = `alert strong bg-${type}-ylw my-2 p-2  lg:h-10 md:h-10 sm:h-14 md:text-sm lg:text-lg`
    // strong.className ="strong"
    // strong.textContent = "sadas"


    alert.textContent = message

    console.log(alert);
    // console.log(strong);
    // firstCardBody.appendChild(strong)
    firstCardBody.appendChild(alert)
    setTimeout(function () {
        alert.remove()
    }, 1500)



}
function addTodoToUI(newTodo) {

    // list item oluşturma
    const listItem = document.createElement("li")
    // link oluşturma
    const link = document.createElement("a")
    link.href = "#"
    link.className = "delete-item"
    link.innerHTML = " <i class='fas fa-trash-alt pl-3'></i>"

    listItem.className = "list-group-item bg-flise h-12 py-3 my-5 text-center uppercase  rounded-t-lg px-3 "

    // text note 

    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link)

    // todo liste list itemi ekleme
    todoList.appendChild(listItem)
    todoInput.value = ""

    console.log(listItem);
    console.log("fuck you system");
}