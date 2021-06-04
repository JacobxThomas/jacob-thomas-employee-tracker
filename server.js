const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
<<<<<<< HEAD
const express = require("express")
require("dotenv").config()
=======

const connectionProperties = {
    host: "127.0.0.1",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_DB"
}
>>>>>>> 5cf1ac98ec5888d2f26cc93fe88dd1daf22fa756

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
const connectionProperties = {
    host: "127.0.0.1",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "employee_db"
}

const connection = mysql.createConnection(connectionProperties);

connection.connect(function (error) {
    if (error) {
        console.error("error");
        return;
    }
=======
connection.connect(function (err) {
    if (err) console.log("error");

>>>>>>> 5cf1ac98ec5888d2f26cc93fe88dd1daf22fa756
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
<<<<<<< HEAD
            "Update Employee Role",
            "Exit"
        ]
    })
        .then(function (answer) {
            switch (answer.menu) {
                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "View Employees":
                    viewEmployees();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    connection.end();
                    break;
                default:
                    break;
            }
        }
        )
};

function viewDepartments() {

    let query = "SELECT * FROM department";

    connection.query(query, (error, response) => {
        if (error) throw error;

        console.table(response);

        mainMenu();
    });
};
=======
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
>>>>>>> 5cf1ac98ec5888d2f26cc93fe88dd1daf22fa756
