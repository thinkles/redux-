const jsonfile = require('jsonfile');
const todoData = require("./todo");

const file = 'src/data/todo.json';

// 定义Mock数据
const data = todoData();

// 将Mock数据写入JSON文件中
jsonfile.writeFile(file, data, {spaces: 2}, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Data has been written to ${file}`);
    }
});
