function openTab(event, tabName) {
    // Ensure tabName is not undefined
    if (!tabName) {
        console.error("Error: tabName is undefined!");
        return;
    }

    let tab = document.getElementById(tabName);
    if (!tab) {
        console.error(`Tab with ID '${tabName}' not found.`);
        return;
    }

    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tabContent => {
        tabContent.classList.remove('active');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tabButton => {
        tabButton.classList.remove('active');
    });

    // Show selected tab and add active class
    tab.classList.add('active');

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}
// Initialize first tab


// To-Do List
let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    if (input.value.trim() === '') return;

    todos.push({
        text: input.value,
        completed: false
    });

    input.value = '';
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function resetTodos() {
    todos = [];
    saveTodos();
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo.text}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}


// Budget Tracker
let budget = JSON.parse(localStorage.getItem('budget')) || {
    total: 0,
    expenses: []
};

function saveBudget() {
    localStorage.setItem('budget', JSON.stringify(budget));
}

function setBudget() {
    const input = document.getElementById('totalBudget');
    budget.total = Number(input.value);
    input.value = '';
    saveBudget();
    renderBudget();
}

function addExpense() {
    const nameInput = document.getElementById('expenseName');
    const amountInput = document.getElementById('expenseAmount');
    
    budget.expenses.push({
        name: nameInput.value,
        amount: Number(amountInput.value)
    });

    nameInput.value = '';
    amountInput.value = '';
    saveBudget();
    renderBudget();
}

function deleteExpense(index) {
    budget.expenses.splice(index, 1);
    saveBudget();
    renderBudget();
}

function resetBudget() {
    budget = { total: 0, expenses: [] };
    saveBudget();
    renderBudget();
}

function renderBudget() {
    const remaining = budget.total - budget.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const display = document.getElementById('budgetDisplay');
    const list = document.getElementById('expensesList');

    display.innerHTML = `<h3>Remaining Budget: ${remaining}</h3>`;
    list.innerHTML = '';
    
    budget.expenses.forEach((exp, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${exp.name}: -$${exp.amount} 
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Initial render

// Contacts Manager
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function addContact() {
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const date = document.getElementById('contactDate');

    if (!name.value || !email.value) return;

    contacts.push({
        name: name.value,
        email: email.value,
        date: date.value || new Date().toISOString().split('T')[0]
    });

    name.value = '';
    email.value = '';
    date.value = '';
    saveContacts();
    renderContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveContacts();
    renderContacts();
}

function resetContacts() {
    contacts = [];
    saveContacts();
    renderContacts();
}

function renderContacts() {
    const list = document.getElementById('contactsList');
    list.innerHTML = '';
    
    contacts.forEach((contact, index) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <h3>${contact.name}</h3>
            <p>${contact.email}</p>
            <small>${contact.date}</small>
            <button onclick="deleteContact(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
}

// Grocery List
let groceries = JSON.parse(localStorage.getItem('groceries')) || [];

function saveGroceries() {
    localStorage.setItem('groceries', JSON.stringify(groceries));
}

function addGrocery() {
    const input = document.getElementById('groceryItem');
    if (!input.value.trim()) return;

    groceries.push({
        item: input.value,
        purchased: false
    });

    input.value = '';
    saveGroceries();
    renderGroceries();
}

function deleteGrocery(index) {
    groceries.splice(index, 1);
    saveGroceries();
    renderGroceries();
}

function resetGroceries() {
    groceries = [];
    saveGroceries();
    renderGroceries();
}

function renderGroceries() {
    const list = document.getElementById('groceryList');
    list.innerHTML = '';
    
    groceries.forEach((grocery, index) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <span>${grocery.item}</span>
            <button onclick="deleteGrocery(${index})">Delete</button>
        `;
        list.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderTodos();
    renderBudget();
    renderContacts();
    renderGroceries();
    openTab(null, 'todo'); // Default tab
});