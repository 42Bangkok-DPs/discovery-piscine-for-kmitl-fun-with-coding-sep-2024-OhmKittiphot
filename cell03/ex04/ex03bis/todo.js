function getCookies(name) {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
    }, {});
    return cookies[name] ? JSON.parse(decodeURIComponent(cookies[name])) : [];
}

function setCookies(name, value) {
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};path=/`;
}

let todoList = getCookies('todoList');
const $ftList = $('#ft_list');

function renderList() {
    $ftList.empty();
    $.each(todoList, (index, todo) => {
        const $todoDiv = $('<div>').text(todo);
        $todoDiv.on('click', () => removeTodo(index));
        $ftList.append($todoDiv);
    });
}

$('#newBtn').on('click', () => {
    const newTodo = prompt('Enter new TO DO:');
    if (newTodo) {
        todoList.unshift(newTodo);
        setCookies('todoList', todoList);
        renderList();
    }
});

function removeTodo(index) {
    if (confirm('Do you want to remove this TO DO?')) {
        todoList.splice(index, 1);
        setCookies('todoList', todoList);
        renderList();
    }
}

renderList();