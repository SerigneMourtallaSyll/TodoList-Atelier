//Setting task
document.querySelector('#form-Task').addEventListener('submit', saveTask);

function saveTask(e){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let task = {
        title,
        description
    }

    if(sessionStorage.getItem('tasks') === null){
        let tasks = [];
        tasks.push(task)
        sessionStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
        let tasks = JSON.parse(sessionStorage.getItem('tasks'));
        tasks.push(task);
        sessionStorage.setItem('tasks',JSON.stringify(tasks));
    }
    getTask();

    e.preventDefault();
    document.getElementById('form-Task').reset();

}

//get and display task
function getTask(){
    let tache = document.getElementById('tasks');
    tache.innerHTML = '';
    let tasks = JSON.parse(sessionStorage.getItem('tasks'));
    for(let task of tasks){
        let title = task.title;
        let description = task.description;
        
        tache.innerHTML += 
        `<div class="d-flex justify-content-around border py-3 taskContent">
                <div class="col pt-2">${title}</div>
                <div class="col pt-2">${description}</div>
                <div class="col d-flex">
                    <div class="col">
                        <i class="bi bi-pencil-square fs-md-4 editTask"></i>
                    </div>
                    <div class="col text-center pe-auto">
                        <i class="bi bi-trash3 fs-md-4 text-danger" onclick="deletetask('${title}')"></i>
                    </div>
                    <div class="col h-25 text-center">
                        <a href="#" class="btn btn-success pe-auto text-end done">Done</a>
                    </div>
                </div>
        </div>`
    }
}
getTask();


//Task completed action 
let task = document.querySelectorAll('.done');
task.forEach((element) => {
    element.addEventListener('click', function(e){
        let div = e.target.parentNode.parentNode.parentNode;
        div.style.backgroundColor = 'green';
        div.style.color = 'white';
    })
})

//Delete task action
function deletetask(title){
    let tasks = JSON.parse(sessionStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].title == title){
            tasks.splice(i , 1);
        }
    }
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();
}

//Edit task action
let editTask = document.querySelectorAll('.editTask');
// let tasks = JSON.parse(sessionStorage.getItem('tasks'));

editTask.forEach((element) => {
    element.addEventListener('click', function(e){
        let taskContent = e.target.parentNode.parentNode.parentNode;
        let editTitle = taskContent.firstElementChild.textContent;
        let editDesc = taskContent.firstElementChild.nextElementSibling.textContent;
        document.getElementById('title').value = editTitle;
        document.getElementById('description').value = editDesc;
        let saveButton = document.getElementById('save')
        saveButton.innerText = 'Save Change';
        saveButton.className = 'btn btn-primary btn-block col-md-4 w-100 saveChange';
        saveButton.style.backgroundColor = 'orange';
        let saveChange = document.querySelector('.saveChange');
        saveChange.addEventListener('click', function(){
            // tasks.editTitle = document.getElementById('title').value;
            // tasks.editDesc = document.getElementById('description').value;
            editTitle.innerText = document.getElementById('title').value;
            editDesc.innerText = document.getElementById('description').value;
            // getTask();
        })
        // e.preventDefault();
    })

})








