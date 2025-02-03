const apiBaseUrl = "https://localhost:7219/todoitems"; // Minimal API base URL
const todoListElement = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoNameInput = document.getElementById("todo-name");

// Fetch and display all todo items
async function fetchTodos() {
    const response = await fetch(apiBaseUrl);
    const todos = await response.json();

    todoListElement.innerHTML = ""; // Clear the list before re-rendering

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${todo.name}
            <button onclick="deleteTodo(${todo.id})">Delete</button>
            <button onclick="updateTodoPrompt(${todo.id}, '${todo.name}', ${todo.isComplete})">Edit</button>
        `;

        todoListElement.appendChild(li);
    });
}

// Add a new todo item
async function addTodo(event) {
    event.preventDefault();
    const name = todoNameInput.value.trim();

    if (!name) return;

    await fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, isComplete: false })
    });

    todoNameInput.value = ""; // Clear the input field
    fetchTodos(); // Refresh the todo list
}

// Delete a todo item
async function deleteTodo(id) {
    const confirmDelete = confirm("Are you sure you want to delete this todo?");

    if (!confirmDelete) return;

    await fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE"
    });

    fetchTodos(); // Refresh the todo list
}

// Update a todo item
async function updateTodoPrompt(id, currentName, isComplete) {
    const newName = prompt("Update todo name:", currentName);
    if (newName === null || newName.trim() === currentName) return;

    await fetch(`${apiBaseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: newName.trim(), isComplete })
    });

    fetchTodos(); // Refresh the todo list
}

// Event listener for form submission
todoForm.addEventListener("submit", addTodo);

// Fetch the todos when the page loads
fetchTodos();