document.addEventListener('DOMContentLoaded', () => {


    const taskForm = document.getElementById('task-form'); // Listen from this form / Event
    const taskInput = document.getElementById('task-input'); // Data will come from this Variable
    const taskList = document.getElementById('task-list'); // Data will be displayed here



    // Load tasks from local storage
    // Check if the tasks is existing in the local storage / if it exist get its value
    // and store it to the variable tasks / else create an empty array
    //Creation of the tasks Key for Local Storage on the Browser
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   
    // Function to render tasks
    // Display Task Value from the Local Storage
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleComplete(${index})">Complete</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to add a task
    // The Marites Function that listens to the event submit
    // or when you click the button submit
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //Linis data
        const taskText = taskInput.value.trim();

        if (taskText) {

            tasks.push({ text: taskText, completed: false });

            localStorage.setItem('tasks', JSON.stringify(tasks));

            taskInput.value = '';
            renderTasks();
        }
    });

    // Function to toggle task completion
    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;

        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTasks();
    };

    // Function to delete a task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTasks();
    };

    // Initial render
    renderTasks();
});
