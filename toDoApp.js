const icon=document.querySelector("#icon") ;
const moon=document.querySelector("#moon") ;

const todoForm=document.querySelector(".todo-form") ;
const inputToDo=document.querySelector("#inputToDo") ;
const button=document.querySelector("#addBtn") ;
const todoList=document.querySelector("#lists") ;
const messageElement=document.querySelector("#message") ;




//showMessage
const showMessage =(text,status)=>{
messageElement.textContent =text;
messageElement.classList.add(`bg-${status}`) ;
setTimeout(() => {
  messageElement.textContent="" ;
  messageElement.classList.remove(`bg-${status}`) ;
},1000);

}









//creat todo

const creatTodo=(todoId,todoValue)=>{

  const todoElement= document.createElement("li");
  todoElement.id=todoId ;
  todoElement.classList.add("li-style");
  todoElement.innerHTML=`
  <span> ${todoValue} </span>
  <span> <button class="dlt-btn" id="deleteButton">  <i class="fa fa-trash"> </i> </button></span>
  `
  todoList.appendChild(todoElement) ;
  const deleteButton=todoElement.querySelector("#deleteButton") ;

   deleteButton.addEventListener("click" ,deleteTodo) ;
}




//delete todo 

const deleteTodo=(e)=>{

  const selectedTodo=e.target.parentElement.parentElement.parentElement ;
  console.log(selectedTodo) ;

  todoList.removeChild(selectedTodo) ;
  showMessage("todo is deleted","danger") ;
  // const todoId=selectedTodo.id ;
  let todos=getToDoFromLocalStorage();
   todos=todos.filter((todo)=> todo.todoId !== selectedTodo.id) ;
  localStorage.setItem("mytodos",JSON.stringify(todos)) ;

}




//getToDoFromLocalStorage

getToDoFromLocalStorage=()=>{
 return localStorage.getItem("mytodos") ? JSON.parse
  (localStorage.getItem("mytodos")) :[] 

}







//add todo 

const addToDo =(e)=>{

    e.preventDefault() ;
    const todoValue=inputToDo.value ;
    

   //unique id 

     const todoId=Date.now().toString() ;

    creatTodo(todoId,todoValue);


    showMessage("todo is added " ,"sucess");



    //adding todo into local stroage 
    const todos=getToDoFromLocalStorage();
   
     todos.push({todoId,todoValue});
     localStorage.setItem("mytodos",JSON.stringify(todos)) ;

     inputToDo.value="" ;

}




//loadTodos
const loadTodo=() =>{
  console.log("The widow is loaded now");
  const todos=getToDoFromLocalStorage() ;
  todos.map((todo) =>creatTodo(todo.todoId,todo.todoValue));
}



//light function



const lightMode=()=>{
  
  const card =document.querySelector(".card") ;
  card.classList.add("card-two") ;
  // card.nextElementSibling.classList.remove("card-two") ;
  
}


const darkmode=()=>{
  
  const card =document.querySelector(".card") ;
  card.classList.remove("card-two") ;
    

}




//listener 

todoForm.addEventListener("submit",addToDo) ;
window.addEventListener("DOMContentLoaded", loadTodo ) ;
icon.addEventListener("click" ,lightMode)
moon.addEventListener("click" ,darkmode)
// button.addEventListener("click",add)
// inputToDo.addEventListener()