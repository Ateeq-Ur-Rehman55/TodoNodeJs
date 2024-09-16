let relevent;
let id;
let next_id;
const { count } = require('node:console');
const fs = require('node:fs');
// console.log("Enter relevent no. ")
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function option() {
    rl.question(` ======= Welcome to our todo app ========
    1. Create todo
    2. Update todo
    3. Read todo
    4. Delete todo
    5. Search todo
    6. Quit
    Enter relevent no. `, relevent => {
        console.log(relevent)
        if (relevent == 6) {
            console.log("program exit!")
            rl.close()
        }
        else if (relevent == 1) {
            rl.question(`Enter todo: `, todo => {
                createTodo(todo)
            })
        } else if (relevent == 2) {
            if (!fs.existsSync('todo.json')) {
                console.log("file doesn't exist first Enter 1 for create it.")
                option()
            } else {
                rl.question(`Enter id which you want to update: `, id => {
                    rl.question(`Enter todo: `, todo => {
                        updateTodo(id, todo)
                    })
                })
            }
        } else if (relevent == 3) {
            readTodo()
        } else if (relevent == 4) {
            if (!fs.existsSync('todo.json')) {
                console.log("file doesn't exist first Enter 1 for create it.")
                option()
            } else {
                rl.question(`id? `, id => {
                    deleteTodo(id)
                })
            }
        } else if (relevent == 5) {
            if (!fs.existsSync('todo.json')) {
                console.log("file doesn't exist first Enter 1 for create it.")
                option()
            } else {
                rl.question(`Id? `, id => {
                    searchTodo(id)
                })
            }
        } else {
            console.log("Invalid input! try again...")
            option()
        }
    })
}

function createTodo(todo) {
    let arr = []
    if (!fs.existsSync('todo.json')) {
        let obj = {
            "id": 1,
            "todo": todo
        }
        arr.push(obj)
        let done = JSON.stringify(arr)
        fs.writeFile("todo.json", done, err => {
            if (err) throw err;
            console.log("todo saved");
            option()
        });
        console.log("todo created ")
    } else {
        fs.readFile('todo.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            }
            // console.log(data.length)
            if (data.length - 2 == 0){
                next_id = 1
                let obj = {
                    "id": next_id,
                    "todo": todo
                }
            }
             else if (data.length > 0) {
                new_data = JSON.parse(data)
                // console.log(new_data)
                for (let item of new_data) {
                    arr.push(item)
                }
                next_id = new_data[new_data.length - 1]["id"] + 1;
            } else if (data.length == 0) {
                next_id = 1
            }
            // console.log(arr)
            let obj = {
                "id": next_id,
                "todo": todo
            }
            arr.push(obj)
            let done = JSON.stringify(arr)
            fs.writeFile("todo.json", done, err => {
                if (err) throw err;
                console.log("todo updated");
                option()
            });
        }
        )
    }
}


function updateTodo(id, todo) {
    let arr = []
    let counter = 0
    fs.readFile('todo.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        // console.log(data)
        else if (data.length > 0) {
            new_data = JSON.parse(data)
            // console.log(new_data)
            for (let i = 0; i < new_data.length; i++) {
                if (id == new_data[i]["id"]) {
                    new_data[i]["todo"] = todo;
                    counter++
                }
                arr.push(new_data[i])
            }
            if (counter == 0) {
                console.log("id not found")
                option()
            }
            else {
                console.log("todo updated")
                option()
            }
        }
        // console.log(arr)
        let done = JSON.stringify(arr)
        fs.writeFile("todo.json", done, err => {
            if (err) throw err;
        });
    }
    )
}

function readTodo() {
    if (!fs.existsSync('todo.json')) {
        console.log("file doesn't exist first Enter 1 for create it.")
        option()
    } else {
        let arr = []
        fs.readFile('todo.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            }
            // console.log(data)
            if (data.length > 0) {
                new_data = JSON.parse(data)
                // console.log(new_data)
                for (let i = 0; i < new_data.length; i++) {
                    console.log(`Id: ${new_data[i]["id"]} , Todo: ${new_data[i]["todo"]}`)
                }
                option()
            }
        })
    }
}

function deleteTodo(id) {
    let arr = []
    let counter = 0
    fs.readFile('todo.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        // console.log(data)
        else if (data.length > 0) {
            new_data = JSON.parse(data)
            // console.log(new_data)
            for (let i = 0; i < new_data.length; i++) {
                if (id != new_data[i]["id"]) {
                    arr.push(new_data[i])
                } else if (id == new_data[i]["id"]) {
                    counter++
                }
            }
        }
        // console.log(arr)
        let done = JSON.stringify(arr)
        if (counter == 0) {
            console.log("id not found")
            option()
        } else {
            console.log("Deleted")
            option()
        }

        fs.writeFile("todo.json", done, err => {
            if (err) throw err;
            // console.log("todo updated");
        });
    }
    )
    // console.log("todo updated")
}

function searchTodo(id) {
    let arr = []
    let counter = 0
    // console.log(id)
    fs.readFile('todo.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
        // console.log(data)
        else if (data.length > 0) {
            new_data = JSON.parse(data)
            // console.log(id)
            for (let item of new_data) {
                if (id == item.id) {
                    console.log(`At the id ${id} the todo is ${item.todo}`)
                    counter++
                }
            }
            if (counter == 0) {
                console.log("id not found")
                option()
            } else {
                option()
            }
        }
    })
}

option()
