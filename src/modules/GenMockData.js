// example data

/* Nested tables

Company < Project <  Tasks  < Assignees  < Company
                            < Teams

Company Table has
Name, Id,  address, number of employees, stock price, start date,

Project table has:
Name, Id, Importance, Estimation, Color, Associated company Id

Task:
Name, Id, Summary, Description, duration, associated Project,

Assignee
 Name, Id, Title, CompanyId

Team:
Name, Id, Color

*/

function companyCreate() {
}
