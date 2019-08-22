let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2], 
        payPerHour: row[3], 
        timeInEvents: [],
        timeOutEvents: []  
    }  
}
let createEmployees = function(employeeRow){
    return employeeRow.map(function(row){
        return createEmployeeRecord(row)
    })
}
let createTimeInEvent = function(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}
let createTimeOutEvent = function(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}
let hoursWorkedOnDate = function(employee, checkDate){
    let signIn = employee.timeInEvents.find(function(e){
        return e.date === checkDate
    })
    let signOut = employee.timeOutEvents.find(function(e){
        return e.date === checkDate
    })
    return (signOut.hour - signIn.hour)/100
}
let wagesEarnedOnDate = function(employee, checkDate){
    let wages = hoursWorkedOnDate(employee, checkDate) * employee.payPerHour
    return parseFloat(wages.toString())
}
let allWagesFor = function(employee){
    let timeWorked = employee.timeInEvents.map(function(e){
        return e.date
    })
    let pay = timeWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0 )
    return pay
}
let calculatePayroll = function(array){
    return array.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    },0)
}

let createEmployeeRecords = function(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
  }
let findEmployeebyFirstName = function(employees, name) {
    return employees.find(employee => employee.firstName === name);
  }




