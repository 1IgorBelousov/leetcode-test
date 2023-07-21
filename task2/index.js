const tasks = [];
const list = document.querySelector('.task-list')
const deleteBtn = document.querySelector('.delete-btn')
const input = document.querySelector('.input')
const createBtn = document.querySelector('.create-btn')
createBtn.addEventListener('click', addTask)
const checkboxAll = document.querySelector('.checkboxAll')
checkboxAll.addEventListener('change', () => {
    tasks.forEach(task => task.isComplited = checkboxAll.checked)
    activeTasks()
})

deleteBtn.addEventListener('click', deleteTask)
const activelistBtn = document.querySelector('.active-btn')
activelistBtn.addEventListener('click', activeTasks)
const trashBtn = document.querySelector('.trash-btn')
trashBtn.addEventListener('click', trash)



function createTask(task) {
    let nodeLi = document.createElement('li')
    nodeLi.id = task.id
    let span = document.createElement('span')
    span.textContent = task.text
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.class = 'taskCheckbox'
    if (task.isComplited) {
        span.style.textDecoration = 'line-through'
        checkbox.checked = true
    }

    checkbox.addEventListener('change', () => {
        span.style.textDecoration = checkbox.checked ? 'line-through' : 'none'
        const currentTask = tasks.find(task => task.id == nodeLi.id)
        currentTask.isComplited = !currentTask.isComplited
        checkAll()
    })


    nodeLi.appendChild(span)
    nodeLi.appendChild(checkbox)

    if (task.isDeleted) {
        const restorBtn = document.createElement('button')
        restorBtn.textContent = 'Restore'
        restorBtn.addEventListener('click', () => {
            const currentTask = tasks.find(task => task.id == nodeLi.id)
            currentTask.isDeleted = false
            trash()
        })
        nodeLi.appendChild(restorBtn)
    }

    return nodeLi
}

function renderList(arrayOfTasks) {
    list.innerHTML = ''
    arrayOfTasks.map(task => {
        list.appendChild(createTask(task))
    })
}


function addTask() {
    const text = input.value

    if (tasks.find(task => task.text == text)) {
        alert('Such task already exists!')
        return
    }
    const data = {
        id: Date.now(),
        text: text,
        isComplited: false,
        isDeleted: false
    }
    tasks.push(data)
    renderList(tasks)
}

function deleteTask() {
    tasks.forEach((task) => {
        if (task.isComplited) task.isDeleted = true
    })
    activeTasks()
}


function trash() {
    const deletedTasks = tasks.filter(task => task.isDeleted == true)

    if (deletedTasks.length == 0) {
        list.innerHTML = `<h3>There are no deleted tasks!</h3>`
    } else {
        list.innerHTML = ''
        renderList(deletedTasks)
    }

}

function activeTasks() {
    const activeTasks = tasks.filter(task => task.isDeleted == false)
    if (activeTasks.length == 0) {
        list.innerHTML = `<h3>There are no active tasks!</h3>`
    } else {
        list.innerHTML = ''
        renderList(activeTasks)
    }
    checkAll()
}

function checkAll() {
    const filtered = tasks.filter(task => task.isDeleted == false)
    deleteBtn.hidden = filtered.some(task => task.isComplited == true) ? false : true

    if (filtered.some(task => task.isComplited == true)) {
        checkboxAll.indeterminate = true
    } else {
        checkboxAll.indeterminate = false
    }
    if (filtered.length != 0 && filtered.every(task => task.isComplited == true)) {
        checkboxAll.indeterminate = false
        checkboxAll.checked = true
    } else {
        checkboxAll.checked = false
    }
}




activeTasks()