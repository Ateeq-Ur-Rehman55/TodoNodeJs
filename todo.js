let relevent;
let arr = []
let id;
let next_id;
const fs = require('node:fs');
// console.log("Enter relevent no. ")
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
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
            rl.close()
        })
    } else if (relevent == 2) {
        rl.question(`Enter id which you want to update: `, id => {
            rl.question(`Enter todo: `, todo => {
                updateTodo(id, todo)
                rl.close()
            })
        })
    } else if (relevent == 3) {
        readTodo()
        rl.close()
    } else if (relevent == 4) {
        rl.question(`id? `, id => {
            deleteTodo(id)
            rl.close()
        })
    } else if (relevent == 5) {
        rl.question(`Id? `, id => {
            searchTodo(id)
            rl.close()
        })
    } else {
        console.log("Program is exiting...")
        rl.close()
    }
})

function createTodo(todo) {
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
        });
        console.log("todo created ")
    } else {
        fs.readFile('todo.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
            }
            // console.log(data)
            if (data.length > 0) {
                new_data = JSON.parse(data)
                // console.log(new_data)
                for (let i = 0; i < new_data.length; i++) {
                    arr.push(new_data[i])
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
            });
        }
        )
    }
}


function updateTodo(id, todo) {
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
                    counter += 1;
                }
                arr.push(new_data[i])
            }
            if (counter == 0) {
                console.log("Id not found")
            } else {
                console.log("updated successfully")
            }
        }
        // console.log(arr)
        let done = JSON.stringify(arr)
        fs.writeFile("todo.json", done, err => {
            if (err) throw err;
            // console.log("todo updated");
        });
    }
    )
}

function readTodo() {
    let data;
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

        }
    })
    console.log("todo read")
}

function deleteTodo(id) {
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
                    counter += 1
                }
            }
        }
        // console.log(arr)
        let done = JSON.stringify(arr)
        fs.writeFile("todo.json", done, err => {
            if (err) throw err;
            // console.log("todo updated");
        });
    }
    )
    // console.log("todo updated")
    if (counter == 0) {
        console.log("Id not found")
    } else {
        console.log("deleted successfully")
    }
}

function searchTodo(id) {
    // console.log(id)
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
                    console.log(`At the id ${id} the todo is ${new_data[i]["todo"]}`)
                    counter += 1
                }
            }
            if (counter == 0) {
                console.log("Id not found ")
            }
        }
    })
}
