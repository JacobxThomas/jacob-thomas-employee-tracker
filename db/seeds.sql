use employee_db;
 insert into department (name) values
 ("Accounting"),
 ("Sales"),
 ("Human Resources");

 insert into role (title, salary, department_id) values
 ("Accountant", 50000, 1),
 ("Payroll Administrator", 45000, 1),
 ("Sales Staff", 50000, 2),
 ("Sales Leader", 60000, 2),
 ("Office Administrator:", 40000, 3),
 ("HR Director", 65000, 3);

 insert into employee (first_name, last_name, role_id, manager_id) values 
 ("John", "Brown", 1, null),
 ("Samantha", "Vickers", 2, null),
 ("Steven", "Johnson", 3, null),
 ("Patrick", "Clancy", 4, null),
 ("Diana", "Moss", 5, null),
 ("Elizabeth", "Shaw", 6, null);