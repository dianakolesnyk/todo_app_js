const switcher = document.querySelectorAll("#theme-switcher img"); 
//to change the THEME
switcher[0].onclick = () => { 
    document.documentElement.setAttribute("data-theme","light"); 
    switcher[1].classList.add("active"); 
    switcher[0].classList.remove("active"); 
}
switcher[1].onclick = ()=>{
    document.documentElement.setAttribute("data-theme","dark"); 
    switcher[0].classList.add("active"); 
    switcher[1].classList.remove("active");

}     

//constantes da TODO list
const inputTask = document.querySelector("#to-do-input input"), 
      errorExist = document.getElementById('error'), 
      allTasks = document.querySelector("#to-do-tasks"), 
      itemsLeftDom = document.querySelector("#items-left-num"),  
      btnAllTasks = document.querySelector("#all-tasks"), 
      completedBtn = document.querySelector("#tasks-completed"),
      activeBtn = document.querySelector("#tasks-active"), 
      clearBtn = document.querySelector("#clear-completed"); 

 //global variables
 let itemsLeft=0, allTasksList ;
 check = () => allTasksList = document.querySelectorAll("#to-do-tasks >span"); // allTasksList agrupa tds os tasks
 
 setInterval(check,1000); // a funcao check ira ser repetida a cada segundo


//Add Tasks
inputTask.onkeyup = (e) => { 
    let task = document.createElement("span"),
        taskDelete = document.createElement("span"),
        taskChecker = document.createElement("span"),
        taskText = document.createTextNode(inputTask.value);
        taskChecker.className ="check-box"; 
        taskDelete.className = "delete"; 
    
    if (e.keyCode == 13) { // se for carregado o enter, o seguinte cod. irá ser executado.
        if(inputTask.value ===''){
            errorExist.style.display="block"; 
            errorExist.textContent = "Enter a task first!";
            return;
        }
        else{
            for(let i=0;i<allTasksList.length;i++){
                if(inputTask.value == allTasksList[i].childNodes[1].textContent){ // vai ao task container (aos spans tds), e vai ler o texto do 2 elemento
                 // console.log(allTasksList[i].childNodes[1])
                    inputTask.value = '';
                    errorExist.style.display = "block";
                    errorExist.textContent = "This task already exists";
                    return;
                }
            }
            errorExist.style.display = "none"; 
            allTasks.appendChild(task); 
            task.appendChild(taskChecker); 
            task.appendChild(taskText);
            task.appendChild(taskDelete); 
            inputTask.value = '';
            itemsLeft++;
            itemsLeftDom.textContent = itemsLeft; 
        }
    } else {
       return;
    }
 }


//Remove the Task and check if it it completed
document.addEventListener("click",(o) => {  

    if(o.target.classList.contains("delete")){ 
        o.target.parentElement.remove(); // vai eliminar o span principal

        if(!o.target.parentElement.childNodes[0].classList.contains("ischecked")){
           // errorExist.style.display = "none"; 
            itemsLeft--;
            itemsLeftDom.textContent = itemsLeft;
            errorExist.style.display = "none";
            return;
        }
     
    }
    //check
    if(o.target.classList.contains("check-box")){

        if(o.target.classList.contains("ischecked")){
            o.target.classList.remove("ischecked"); 
            itemsLeft++; 
            itemsLeftDom.textContent = itemsLeft;
            errorExist.style.display = "none";
        }
        else{ 
            o.target.classList.add("ischecked");
            itemsLeft--;
            itemsLeftDom.textContent = itemsLeft; 
            errorExist.style.display = "none";
        } 
    }
});



//filtre Buttons
btnAllTasks.onclick = () => {
    removeSelected();
    btnAllTasks.classList.add("selected");// selected terá a cor azul
    for(let i=0;i<allTasksList.length;i++){ 
        allTasksList[i].style.display = "block"; 
    }
}
activeBtn.onclick = ()=>{
    removeSelected();
   activeBtn.classList.add("selected");
    for(let i=0;i<allTasksList.length;i++){
        if(allTasksList[i].childNodes[0].classList.contains("ischecked")){ 
            allTasksList[i].style.display = "none"; 
        }else{
             allTasksList[i].style.display = "block";
        }           
    }  
}
completedBtn.onclick = ()=>{
    removeSelected();
  completedBtn.classList.add("selected");
    for(let i=0;i<allTasksList.length;i++){
        if(allTasksList[i].childNodes[0].classList.contains("ischecked")){
            allTasksList[i].style.display = "block";
        }
        else allTasksList[i].style.display = "none";
    }
}
clearBtn.onclick = () => {
    for(let i=0;i<allTasksList.length;i++){
        if(allTasksList[i].childNodes[0].classList.contains("ischecked")){
            allTasksList[i].remove();
        }
    }
}
removeSelected = ()=>{ // esta funcao foi criada para eliminar as classes selected, para eviar mais que um filtro selecionado
    clearBtn.classList.remove("selected");
    completedBtn.classList.remove("selected");
    activeBtn.classList.remove("selected");
    btnAllTasks.classList.remove("selected");
}
