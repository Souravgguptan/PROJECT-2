// const state = {
//     taskList: [
//         {
//             title: "",
//             url: "",
//             type: "",
//             descripion: ""
//         },
//          {
//             title: "",
//             url: "",
//             type: "",
//             descripion: ""
//         }, 
//         {
//             title: "",
//             url: "",
//             type: "",
//             descripion: ""
//         }
//     ]
// }

const state = {
    taskList: []
};

// DOM:
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__body");

// console.log(taskContents);
// console.log(taskModal)

const htmlTaskContent = ({id, title, description, type, url}) =>  
`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header gap-2">
                <button type="button" class="btn btn-outline-primary mr-2" name=${id}>
                    <i class="fa-solid fa-pencil" name=${id}></i>
                </button>
                 <button type="button" class="btn btn-outline-danger mr-2" name=${id} onclick="deleteTask.apply(this, arguments)">
                    <i class="fa-solid fa-trash" name=${id}></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    url ? `<img src=${url} alt='card image top' class="card-img-top md-3 rounded"/>` :
                        `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScujirQqIFjN5GuM1565_-DIX6OyU_96HzNBl_BAX8GL0JzMs8&s" alt='card image top' class="card-img-top md-3 rounded"/>`
                }
                <h4 class="task__card__title card-title">${title}</h4>
                <p class="description card-text">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge text-bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick="openTask.apply(this, arguments)">Open Task</button>
            </div>
        </div>
    </div>
`;


const htmlModalContent = ({id, title, description, url}) => {
    const date = new Date(parseInt(id));
    return `<div id=${id}>
        ${
            url ? `<img src=${url} alt='card image top' class="img-fluid rounded"/>` :
                    `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScujirQqIFjN5GuM1565_-DIX6OyU_96HzNBl_BAX8GL0JzMs8&s" alt='card image top' class="img-fluid rounded"/>`
        }
        </div>
        <strong class="text-sm text-muted">Created on: ${date.toDateString()}</strong>
        <h2 class="my-3">${title}</h2>
        <p class="lead">${description}</p>
    `
}


const updateLocalStorage = () => {
    localStorage.setItem("task", JSON.stringify({
        tasks: state.taskList,
    }))
}

const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    })
}


const handleSubmit = (event) => {
    const id = `${Date.now()}`;
    const input = {
        url: document.getElementById('imageUrl').value,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        type: document.getElementById('tags').value,
    };

    if(input.title == "" || input.description == "" || input.type=="" ){
        return alert("Please fill out all the mandatory fields")
    }

    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({...input, id}))

    state.taskList.push({...input, id});
    updateLocalStorage();
}



const openTask = (e) => {
    if(!e) e = window.event;

    const getTask = state.taskList.find(({id}) => id == e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
    // console.log("opentask activated");
}



const deleteTask = (e) => {
    if(!e) e = window.event;

    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    // console.log(targetId);
    // console.log(type);

    const removeTask = state.taskList.filter(({id})=> id!== targetId)
    // console.log(removeTask)
    state.taskList = removeTask;

    updateLocalStorage()

    if(type === "BUTTON"){
        // console.log(e.target.parentNode.parentNode.parentNode)
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        )
    }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode.parentNode
  )
}    


const searchTask = (e) => {
       if(!e) e = window.event;

       while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild)
       }

       const resultData = state.taskList.filter(({title})=> title.includes(e.target.value))
       console.log(resultData);

       resultData.map((cardData) => {
         taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
       })
}
