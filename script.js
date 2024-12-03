document.getElementById('create-task-btn').addEventListener('click', function() {
    $('#popup-form').modal('show');
});

document.getElementById('submit-task-btn').addEventListener('click', function() {
    const taskName = document.getElementById('task-name').value;
    const taskPoints = document.getElementById('task-points').value;
    const taskDate = new Date().toLocaleDateString();

    if (taskName && taskPoints) {
        const taskListPending = document.getElementById('task-list-pending');

        const taskItem = document.createElement('div');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.className = 'mr-3';
        taskCheckbox.addEventListener('change', function() {
            const currentPoints = parseInt(document.getElementById('points-value').textContent.split(': ')[1]);
            const newPoints = parseInt(taskPoints);

            if (this.checked) {
                document.getElementById('points-value').textContent = `Points: ${currentPoints + newPoints}`;
                taskLabel.classList.add('strikethrough');
                document.getElementById('task-list-completed').appendChild(taskItem);
            } else {
                document.getElementById('points-value').textContent = `Points: ${currentPoints - newPoints}`;
                taskLabel.classList.remove('strikethrough');
                document.getElementById('task-list-pending').appendChild(taskItem);
            }
        });

        const taskLabel = document.createElement('span');
        taskLabel.textContent = taskName;

        const taskDateLabel = document.createElement('span');
        taskDateLabel.className = 'mx-3';
        taskDateLabel.textContent = taskDate;

        const taskPointsLabel = document.createElement('span');
        taskPointsLabel.textContent = taskPoints;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn ml-3';
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', function() {
            const currentPoints = parseInt(document.getElementById('points-value').textContent.split(': ')[1]);
            const newPoints = parseInt(taskPoints);

            if (taskCheckbox.checked) {
                document.getElementById('points-value').textContent = `Points: ${currentPoints - newPoints}`;
            }

            taskItem.remove();
        });

        taskItem.appendChild(taskCheckbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(taskDateLabel);
        taskItem.appendChild(taskPointsLabel);
        taskItem.appendChild(deleteBtn);

        taskListPending.appendChild(taskItem);

        // Clear form and hide modal
        document.getElementById('task-name').value = '';
        document.getElementById('task-points').value = '';
        $('#popup-form').modal('hide');
    } else {
        alert('Please enter task name and points');
    }
});
