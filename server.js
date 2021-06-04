const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connectionProperties = {
    host: "127.0.0.1",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_DB"
}

const connection = mysql.createConnection(connectionProperties);

connection.connect(function (err) {
    if (err) console.log("error");

    console.log("~~~ EMPLOYEE MANAGEMENT SYSTEM ~~~");
    mainMenu();
});

function mainMenu() {
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Main Menu",
        choices: [
            "View Departments",
            "View Roles",
            "View Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role"]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View all employees":
                    viewAllEmp();
                    break;

                case "View all employees by department":
                    viewAllEmpByDept();
                    break;

                case "View all employees by role":
                    viewAllEmpByRole();
                    break;

                case "Add employee":
                    addEmp();
                    break;

                case "Add department":
                    addDept();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Update employee role":
                    updateEmpRole();
                    break;
            }

        }
        )
};
