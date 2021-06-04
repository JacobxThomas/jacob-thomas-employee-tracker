const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const express = require("express")
require("dotenv").config()

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
