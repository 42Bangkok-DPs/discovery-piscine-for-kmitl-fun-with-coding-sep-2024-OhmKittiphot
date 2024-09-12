// Function to get cookies
function getCookies(name) {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {});
    return cookies[name] ? JSON.parse(decodeURIComponent(cookies[name])) : [];
}

// Function to save cookies
function setCookies(name, value) {
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};path=/`;
}

// Load TO DO list from cookies
let todoList = getCookies('todoList');
const ftList = document.getElementById('ft_list');

// Function to render the list
function renderList() {
    ftList.innerHTML = '';
    todoList.forEach((todo, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.textContent = todo;
        todoDiv.addEventListener('click', () => removeTodo(index));
        ftList.appendChild(todoDiv);
    });
}

// Add new TO DO
document.getElementById('newBtn').addEventListener('click', () => {
    const newTodo = prompt('Enter new TO DO:');
    if (newTodo) {
        todoList.unshift(newTodo);
        setCookies('todoList', todoList);
        renderList();
    }
});

// Remove TO DO
function removeTodo(index) {
    if (confirm('Do you want to remove this TO DO?')) {
        todoList.splice(index, 1);
        setCookies('todoList', todoList);
        renderList();
    }
}

// Initial rendering
renderList();
