const apiBaseUrl = "/todoitems"; // API Base URL
const todoListElement = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const todoNameInput = document.getElementById("todo-name");

// Modal Elements
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
const editNameInput = document.getElementById("edit-name");
const editCompleteInput = document.getElementById("edit-complete");
const editIdInput = document.getElementById("edit-id");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
let deleteTodoId = null; // To store the ID for delete operations

// Fetch and display all todos
async function fetchTodos() {
    const response = await fetch(apiBaseUrl);
    const todos = await response.json();

    todoListElement.innerHTML = ""; // Clear the list before re-rendering

    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <div>
                <input type="checkbox" ${todo.isComplete ? "checked" : ""} onchange="toggleTodoComplete(${todo.id}, this.checked, '${todo.name.replaceAll("'", "\\'")}')" />
                <span style="text-decoration: ${todo.isComplete ? "line-through" : "none"};">${todo.name}</span>
            </div>
            <div>
                <button class="btn btn-sm btn-warning me-2" onclick="showEditModal(${todo.id}, '${todo.name.replaceAll("'", "\\'")}', ${todo.isComplete})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="showDeleteModal(${todo.id})">Delete</button>
            </div>
        `;

        todoListElement.appendChild(li);
    });
}

// Show Delete Modal
function showDeleteModal(id) {
    deleteTodoId = id; // Store the todo ID for deletion
    deleteModal.show(); // Open the modal using Bootstrap's modal API
}

// Confirm Delete
confirmDeleteBtn.addEventListener("click", async () => {
    if (deleteTodoId === null) return; // If no ID is set, exit

    try {
        // Make DELETE request to the API
        await fetch(`${apiBaseUrl}/${deleteTodoId}`, {
            method: "DELETE",
        });

        deleteTodoId = null; // Reset the ID after deletion
        deleteModal.hide(); // Hide the modal
        fetchTodos(); // Refresh the task list
    } catch (error) {
        console.error("Failed to delete todo:", error);
    }
});

// Show Edit Modal
function showEditModal(id, name, isComplete) {
    editIdInput.value = id;
    editNameInput.value = name;
    editCompleteInput.checked = isComplete;
    editModal.show();
}

// Save Changes from Edit Modal
document.getElementById("save-edit-btn").addEventListener("click", async () => {
    const id = editIdInput.value;
    const name = editNameInput.value.trim();
    const isComplete = editCompleteInput.checked;

    if (!name) {
        alert("Task name cannot be empty!");
        return;
    }

    try {
        // Always send id, name, and isComplete
        await fetch(`${apiBaseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, isComplete }),
        });

        editModal.hide();
        fetchTodos(); // Refresh the list
    } catch (error) {
        console.error("Failed to save changes:", error);
    }
});

// Toggle task completion and retain task name
async function toggleTodoComplete(id, isComplete, name) {
    try {
        // Always send the complete object: {id, name, isComplete}
        await fetch(`${apiBaseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, isComplete }),
        });

        fetchTodos(); // Refresh the list
    } catch (error) {
        console.error("Failed to toggle task completion:", error);
    }
}

// Add new todo
async function addTodo(event) {
    event.preventDefault();
    const name = todoNameInput.value.trim();

    if (!name) return;

    try {
        await fetch(apiBaseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, isComplete: false }),
        });

        todoNameInput.value = ""; // Clear the input
        fetchTodos(); // Refresh the todo list
    } catch (error) {
        console.error("Failed to add todo:", error);
    }
}

// Event handlers
todoForm.addEventListener("submit", addTodo);

// Fetch todos initially when page loads
fetchTodos();