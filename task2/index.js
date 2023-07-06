const tasks = []
const filter = () => true;
const tasksRoot = document.querySelector('ul');
const inputElement = document.querySelector('input');

tasksRoot.addEventListener('click', (e) => {
    const id = e.target.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');
    if (id) {
        switch(action) {
            case 'toggle':
                tasks.forEach(x => {
                    if(x.id == id) {
                        x.isComplited = !x.isComplited;
                    }
                });
                break;
            case 'delete':
                tasks.forEach(x => {
                    if(x.id == id) {
                        x.isDeleted = !x.isDeleted;
                    }
                });
                break;
        }
        renderList();
    }
});

document.querySelector('[data-action="filter-active"]', () => {
    console.log('active');
    filter = (x) => !x.isDeleted;
    renderList();
});

document.querySelector('#trash', () => {
    filter = (x) => x.isDeleted;
    renderList();
});


function addTask() {
    const text = inputElement.value;
    const data = {
        id: Date.now(),
        text: text,
        isComplited: false,
        isDeleted: false,
    }
    tasks.push(data)
    renderList();
}

function renderList() {
    tasksRoot.innerHTML = tasks.filter(x => filter(x)).reduce((acc, current) => {
        acc += renderItem(current);
        return acc;
    }, '');
}

function renderItem(item) {
    return `
        <li class="${item.isComplited ? 'completed' : ''}">
            ${item.text}
            <input data-id="${item.id}" data-action="toggle" type="checkbox" ${item.isComplited ? 'checked' : ''}/>
        </li>
    `;
}

const createButton = document.querySelector('button')

createButton.addEventListener('click', addTask)