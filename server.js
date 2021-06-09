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

function viewRoles() {

    let query = "SELECT * FROM role";

    connection.query(query, (error, response) => {
        if (error) throw error;

        console.table(response);

        mainMenu();
    });
};

function viewEmployees() {

    let query = "SELECT * FROM employee";

    connection.query(query, (error, response) => {
        if (error) throw error;

        console.table(response);

        mainMenu();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter department name"
        }])
        .then(function (answer) {
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    name: answer.name,
                },
                function (error, response) {
                    if (error) throw error;
                    console.log("Successfully created new departemrnt");
                    mainMenu();
                }
            )
        })
};

function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter role title"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter role salary"
        },
        {
            name: "department",
            type: "input",
            message: "Enter department ID"
        },
    ])
        .then(function (answer) {
            connection.query(
                `INSERT INTO role SET ?`,
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department,
                },
                function (error, response) {
                    if (error) throw error;
                    console.log("Successfully created new role");
                    mainMenu();
                }
            )
        })
};

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter employee's first name"
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter employee's last name"
        },
        {
            name: "roleID",
            type: "input",
            message: "Enter employee's role ID"
        },
    ])
        .then(function (answer) {
            connection.query(
                `INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.roleID
                },
                function (error, response) {
                    if (error) throw error;
                    console.log("Successfully created new employee");
                    mainMenu();
                }
            )
        })
};

function updateEmployeeRole() {

    inquirer.prompt([
      {
        name: "employeeID",
        type: "input",
        message: "Enter employee's ID"
      },
      {
        name: "roleID",
        type: "input",
        message: "Enter employee's new role ID"
      }
    ]).then(function (answer) {
      connection.query(
        `UPDATE employee SET ? WHERE ?`,
        [
          {
            role_id: answer.roleID,
            id: answer.employeeID
          },
        ],
        function (error, response) {
          if (error) throw error;
          console.log("Successfully updated employee role");
          mainMenu();
        }
      )
    })
  }

