class taskList extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" })
        this.shadow = shadow

        shadow.innerHTML = `
        <style>
        main {
            display: grid;
            justify-content: center;
        }
        
        #text {
            width: 300px;
            height: 45px;
            padding-left: 20px;
        
            background-color: #2b2d2f;
            color: whitesmoke;
        
            border: 2px solid #3b3f42;
            border-radius: 5px;
        
            outline: none;
            outline-color: currentcolor;
        
            cursor: pointer;
            transition: 0.5s;
        }
        
        
        #text:hover {
            border: 2px solid #61686d;
        }
        
        .btn {
            background-color: #2b2d2f;
            color: whitesmoke;
        
            border: 2px solid #3b3f42;
            border-radius: 5px;
        
            cursor: pointer;
            transition: 0.5s;
        }
        
        button {
            width: 50px;
            height: 30px;
        }
        
        #btnSubmit {
            width: 100px;
            height: 51px;
        }
        
        .btn:hover {
            background-color: #46494c;
            border: 2px solid #61686d;
        }
        
        .list{
            display: grid;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        
        .task {
            display: flex;
            justify-content: space-around;
            align-items: center;
        
            background-color: #1b1b1b;
            border: 2px solid #2e2e2e;
            border-radius: 10px;
            box-shadow: 5px 5px 5px #000;
        
            text-align: center;
            width: 300px;
        }
        </style> 

        <main>
            <div class="form">
                <input type="text" id="text" placeholder="Write task">
                <button class="btn" id="btnSubmit">Add task</button>
            </div>
            <div class="list"></div>
        </main> 
        `;

        shadow.querySelector("#btnSubmit").addEventListener("click", this.addTask.bind(this))

        this.tasks = [];
        this.render();

    }

    addTask() {
        const textValue = this.shadow.querySelector("#text").value
        if (textValue !== '') {
            this.tasks.push({ text: textValue, completed: false })
            this.render();
            console.log(this.tasks)
        }
    }

    completeTask(event) {
        this.tasks[event].completed = !this.tasks[event].completed;
        this.render();
        console.log(this.tasks);
    }

    deleteTask(event) {
        this.tasks.splice(event, 1);
        this.render();
        console.log(this.tasks);
    }

    render() {
        const listTasks = this.shadow.querySelector(".list");
        listTasks.innerHTML = "";

        this.tasks.forEach((task) => {
            const taskItem = document.createElement("div");
            taskItem.className = 'task'

            taskItem.innerHTML = `
                <input type="checkbox" class='check' ${task.completed ? 'checked' : ''}/>
                <p>${task.text}</p>
                <button class='btn'>Delete</button>
            `

            const inputCheck = taskItem.querySelector(".check");
            inputCheck.addEventListener("change", () => this.completeTask(this.tasks.indexOf(task)));

            const deleteButton = taskItem.querySelector(".btn");
            deleteButton.addEventListener("click", () => this.deleteTask(this.tasks.indexOf(task)));

            listTasks.appendChild(taskItem);
        });
    }
}

customElements.define("task-list", taskList)