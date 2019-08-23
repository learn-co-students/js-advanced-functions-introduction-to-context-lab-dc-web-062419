// Your code here
function createEmployeeRecord(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployees = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}



let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e) {
       return e.date === soughtDate
    })

    let outEvent = employee.timeOutEvents.find(function(e){
       return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}


let wagesEarnedOnDate = function(employee, dateSought){
   let hours = hoursWorkedOnDate(employee, dateSought)
  return  (hours * employee.payPerHour)
}


let allWagesFor = function(employee){
    let times = employee.timeInEvents.map(function(event){
        return event.date
    })

    let totalPay = times.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return totalPay
}

let createEmployeeRecords = function(arrays){
   return arrays.map(function(row){
        return createEmployeeRecord(row)
    })
}

let findEmployeebyFirstName = function(srcArray, firstName){
   return srcArray.find(function(employee) {
        return employee.firstName === firstName
    })
}

let calculatePayroll = function(arrays){
    return arrays.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}