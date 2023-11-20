// Array para armazenar as tarefas
let tasks = [{id: 1, title: "Tarefa 1", description: "Descrição da tarefa 1"}, {
    id: 2, title: "Tarefa 2", description: "Descrição da tarefa 2"
}, {id: 3, title: "Tarefa 3", description: "Descrição da tarefa 3"}];

function validateEmpty(field) {
    return !field.trim()
}

function isOnlyDigits(field) {
    return /^\d+$/.test(field)
}

function validateMinWidth(field, minWidth) {
    return field.length < minWidth
}

function printTask(task) {
    console.log(`Task de id ${task.id} com título "${task.title}" e descrição "${task.description}" `)
}

// Função para adicionar uma tarefa
function addTask() {
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    // Verifica se o título e descrição estão vazios
    if (validateEmpty(title) || validateEmpty(description)) {
        alert("O título e descrição são obrigatórios.");
        return "O título e descrição são obrigatórios.";
    }

    // Verifica se o título contém apenas números
    if (isOnlyDigits(title)) {
        alert("O título não pode conter apenas números.");
        return "O título não pode conter apenas números.";
    }

    // Verifica o comprimento mínimo do título
    if (validateMinWidth(title, 4)) {
        alert("O título deve ter no mínimo 4 caracteres.");
        return "O título deve ter no mínimo 4 caracteres.";
    }
    // Verifica o comprimento mínimo da descrição
    if (validateMinWidth(description, 20)) {
        alert("A descrição deve ter no mínimo 20 caracteres.");
        return "A descrição deve ter no mínimo 20 caracteres.";
    }

    // Verifica se há tarefas com título duplicado
    const duplicateTask = tasks.find(task => task.title === title);
    if (duplicateTask) {
        alert("Já existe uma tarefa com esse título.");
        return "Já existe uma tarefa com esse título.";
    }

    // Cria a tarefa e a adiciona ao array
    const newTask = {
        id, title, description
    };
    tasks.push(newTask);
    alert("Tarefa adicionada com sucesso!");
    //Reseta os dados atuais do form
    document.getElementById("form-add").reset();
    return "Tarefa adicionada com sucesso!";
}

// Função para listar todas as tarefas
function listTasks() {
    return tasks;
}

// Função para obter uma tarefa pelo ID
function getTaskById(id) {
    const taskId = parseInt(document.getElementById("taskId").value);

    if (!taskId) {
        alert("Por favor, insira um ID de tarefa válido!");
        return;
    }

    const task = tasks.find(task => task.id === taskId);

    if (task) {
        const taskDetails = `
                    <h2>Detalhes da Tarefa</h2>
                    <p>ID: ${task.id}</p>
                    <p>Título: ${task.title}</p>
                    <p>Descrição: ${task.description}</p>
                `;

        document.getElementById("output").innerHTML = taskDetails;
    } else {
        document.getElementById("output").innerHTML = "<p>Tarefa não encontrada!</p>";
    }
    return tasks.find(task => task.id === id);
}

// Função para editar uma tarefa

function editTask() {
    const selectedTaskId = document.getElementById("task").value;
    const newTitle = document.getElementById("title").value;
    const newDescription = document.getElementById("description").value;

    if (!selectedTaskId || !newTitle || !newDescription) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const selectedTask = tasks.find(task => task.id === parseInt(selectedTaskId));
    // Verifica se o título e descrição estão vazios
    if (validateEmpty(newTitle) || validateEmpty(newDescription)) {
        alert("O título e descrição são obrigatórios.");
    }

    // Verifica se o título contém apenas números
    if (isOnlyDigits(newTitle)) {
        alert("O título não pode conter apenas números.");
    }

    // Verifica o comprimento mínimo do título
    if (validateMinWidth(newTitle, 4)) {
        alert("O título deve ter no mínimo 4 caracteres.");
    }
    // Verifica o comprimento mínimo da descrição
    if (validateMinWidth(newDescription, 20)) {
        alert("A descrição deve ter no mínimo 20 caracteres.");
    }
    if (selectedTask) {
        selectedTask.title = newTitle;
        selectedTask.description = newDescription;

        // Exibe uma mensagem ou atualiza a interface para indicar que a tarefa foi editada
        document.getElementById("output").innerHTML = `<p>Tarefa editada com sucesso!</p>`;
    } else {
        alert("Tarefa não encontrada!");
    }
}

// Função para remover uma tarefa
function removeTask(id) {
    const selectedTaskId = document.getElementById("task").value;

    if (!selectedTaskId) {
        alert("Por favor, selecione uma tarefa!");
        return;
    }

    const taskIndex = tasks.findIndex(task => task.id === parseInt(selectedTaskId));

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);

        // Exibe uma mensagem ou atualiza a interface para indicar que a tarefa foi removida
        document.getElementById("output").innerHTML = `<p>Tarefa removida com sucesso!</p>`;
    } else {
        alert("Tarefa não encontrada!");
    }
}

// Função para adicionar uma tarefa com categoria
function addTaskWithCategory(id, title, description, category) {
    // Adiciona as validações da categoria (mínimo de 5 caracteres)
    if (category && category.length < 5) {
        return "A categoria deve ter no mínimo 5 caracteres.";
    }

    // Chama a função addTask anterior, adicionando a categoria à tarefa
    const result = addTask(id, title, description);
    if (result === "Tarefa adicionada com sucesso!") {
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks[taskIndex].category = category || null;
        return "Tarefa adicionada com sucesso com categoria!";
    }
    return result;
}

// Função para listar tarefas de uma categoria específica
function listTasksByCategory(category) {
    return tasks.filter(task => task.category === category);
}

// Função para adicionar uma tarefa com vencimento
function addTaskWithDueDate(id, title, description, category, dueDate) {
    // Adiciona as validações do vencimento
    const currentDate = new Date();
    if (dueDate && new Date(dueDate) < currentDate) {
        return "A data de vencimento não pode ser no passado.";
    }

    // Chama a função addTaskWithCategory anterior, adicionando o vencimento à tarefa
    const result = addTaskWithCategory(id, title, description, category);
    if (result.includes("Tarefa adicionada com sucesso")) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        tasks[taskIndex].dueDate = dueDate || null;
        return "Tarefa adicionada com sucesso com vencimento!";
    }
    return result;
}

// Função para verificar se uma tarefa está vencida
function checkTaskOverdue(task) {
    if (task.dueDate && new Date(task.dueDate) < new Date()) {
        return {...task, overdue: true};
    }
    return {...task, overdue: false};
}

// Função para listar tarefas vencidas
function listOverdueTasks() {
    return tasks.filter(task => checkTaskOverdue(task).overdue);
}

// Função para listar tarefas não vencidas
function listNonOverdueTasks() {
    return tasks.filter(task => !checkTaskOverdue(task).overdue);
}

// Função para retornar totalizadores
function taskCounters() {
    const totalTasks = tasks.length;
    const tasksWithoutCategory = tasks.filter(task => !task.category).length;
    const tasksByCategory = tasks.reduce((count, task) => {
        count[task.category] = (count[task.category] || 0) + 1;
        return count;
    }, {});
    const tasksWithoutDueDate = tasks.filter(task => !task.dueDate).length;
    const overdueTasks = listOverdueTasks().length;
    const nonOverdueTasks = listNonOverdueTasks().length;

    return {
        totalTasks, tasksWithoutCategory, tasksByCategory, tasksWithoutDueDate, overdueTasks, nonOverdueTasks
    };
}

// Função para marcar uma tarefa como removida (soft delete)
function markTaskAsRemoved(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].removed = true;
        return "Tarefa marcada como removida.";
    }
    return "Tarefa não encontrada.";
}

// Função para listar tarefas removidas
function listRemovedTasks() {
    return tasks.filter(task => task.removed);
}

// Função para recuperar uma tarefa removida
function restoreRemovedTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].removed = false;
        return "Tarefa recuperada com sucesso.";
    }
    return "Tarefa não encontrada.";
}


//Functions para o html
function actionWithReturn(result) {
    console.log(result())
}

function addTaskForm() {
    document.getElementById("output").innerHTML = `
                <h2>Adicionar Tarefa</h2>
                <form onsubmit="event.preventDefault(); addTask()" id="form-add">
                    <label for="id">Id:</label>
                    <input type="number" id="id" required>
                    <label for="title">Título:</label>
                    <input type="text" id="title" required>
                    <label for="description">Descrição:</label>
                    <textarea id="description" rows="4" required></textarea>
                    <input type="submit" value="Adicionar Tarefa">
                </form>
            `;
}

function listAllTasks() {
    let taskList = `
                <h2>Todas as Tarefas</h2>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                    </tr>
            `;

    tasks.forEach(task => {
        taskList += `
                    <tr>
                        <td>${task.id}</td>
                        <td>${task.title}</td>
                        <td>${task.description}</td>
                    </tr>
                `;
    });

    taskList += `</table>`;
    document.getElementById("output").innerHTML = taskList;
}

function editTaskForm() {
    let taskOptions = "<option value=''>Selecione uma tarefa</option>";

    tasks.forEach(task => {
        taskOptions += `<option value="${task.id}">${task.title}</option>`;
    });

    const form = `
                <h2>Editar Tarefa</h2>
                <form onsubmit="event.preventDefault(); editTask()">
                    <label for="task">Selecione a tarefa:</label>
                    <select id="task">${taskOptions}</select>
                    <label for="title">Novo Título:</label>
                    <input type="text" id="title">
                    <label for="description">Nova Descrição:</label>
                    <textarea id="description" rows="4"></textarea>
                    <input type="submit" value="Editar Tarefa">
                </form>
            `;

    document.getElementById("output").innerHTML = form;
}

function removeTaskForm() {
    let taskOptions = "<option value=''>Selecione uma tarefa</option>";

    tasks.forEach(task => {
        taskOptions += `<option value="${task.id}">${task.title}</option>`;
    });

    const form = `
                <h2>Remover Tarefa</h2>
                <form onsubmit="event.preventDefault(); removeTask()">
                    <label for="task">Selecione a tarefa:</label>
                    <select id="task">${taskOptions}</select>
                    <input type="submit" value="Remover Tarefa">
                </form>
            `;

    document.getElementById("output").innerHTML = form;
}

function getTaskByIdForm() {
    const form = `
                <h2>Obter Tarefa por ID</h2>
                <form onsubmit="event.preventDefault(); getTaskById()">
                    <label for="taskId">ID da Tarefa:</label>
                    <input type="number" id="taskId" required>
                    <input type="submit" value="Buscar Tarefa">
                </form>
            `;

    document.getElementById("output").innerHTML = form;
}