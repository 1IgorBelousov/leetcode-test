const tasks = [];
const list = document.querySelector('.task-list')

function createTask(task) {
    let deleteBtn = document.querySelector('.delete-btn')
    let nodeLi = document.createElement('li')
    let span = document.createElement('span')
    span.innerText = task.text
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.class = 'taskCheckbox'
    if (task.isComplited) {
        span.style.textDecoration = 'line-through'
        checkbox.checked = true
        deleteBtn.hidden = false
    }

    checkbox.onchange = () => {
        checkbox.checked ? span.style.textDecoration = 'line-through' : span.style.textDecoration = 'none'
        tasks.forEach(task => {
            if (task.text == span.innerText) {
                task.isComplited = !task.isComplited
                renderList()
            }
        })

    }

    nodeLi.appendChild(span)
    nodeLi.appendChild(checkbox)

    if (task.isDeleted) {
        deleteBtn.hidden = true
        console.log('asfshlgkdsGDL')
        let restorBtn = document.createElement('button')
        restorBtn.innerText = 'Restore'
        restorBtn.onclick = () => {
            tasks.forEach(task => {
                if (task.text == span.innerText) {
                    task.isDeleted = !task.isDeleted
                    showTrash()
                }
            })
        }
        nodeLi.appendChild(restorBtn)
    }

    return nodeLi
}

function renderList() {
    let deleteBtn = document.querySelector('.delete-btn')
    deleteBtn.hidden = true
    list.innerHTML = ''
    for (const task of tasks) {
        if (!task.isDeleted) list.appendChild(createTask(task))
    }
}


function addTask() {
    const text = document.querySelector('.input').value
    const data = {
        id: Date.now(),
        text: text,
        isComplited: false,
        isDeleted: false
    }
    tasks.push(data)
    renderList(data)
}

function deleteTask() {
    tasks.forEach((task) => {
        if (task.isComplited) task.isDeleted = true
    })
    renderList()

    console.log(tasks)
}


function showTrash() {
    list.innerHTML = ''
    tasks.filter(task => task.isDeleted == true).forEach((task) => {
        list.appendChild(createTask(task))
    })
    if (list.innerHTML == '') renderList()
}
const createBtn = document.querySelector('.create-btn')
createBtn.addEventListener('click', addTask)
const checkboxAll = document.querySelector('.checkboxAll')
checkboxAll.onchange = () => {
    checkboxAll.checked ? tasks.forEach(task => task.isComplited = true) : tasks.forEach(task => task.isComplited = false)
    renderList()
}

const deleteBtn = document.querySelector('.delete-btn')
deleteBtn.addEventListener('click', deleteTask)
const trashBtn = document.querySelector('.trash-btn')
trashBtn.addEventListener('click', showTrash)



renderList()