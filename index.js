function createEmployeeRecord(empArray){
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployees(empsArray){
    const newArray = empsArray.map(createEmployeeRecord)
    return newArray
}

function createTimeInEvent(empRec, startPunch){
    empRec.timeInEvents.push({
        type: "TimeIn",
        hour: Number(startPunch.split(" ")[1]),
        date: startPunch.split(" ")[0]
    })
    return empRec
}

function createTimeOutEvent(empRec, endPunch){
    empRec.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(endPunch.split(" ")[1]),
        date: endPunch.split(" ")[0]
    })
    return empRec
}

function hoursWorkedOnDate(empRec, date){
    const foundStart = empRec.timeInEvents.find(e => {return e.date === date})
    const foundEnd = empRec.timeOutEvents.find(e => {return e.date === date})
    return (foundEnd.hour - foundStart.hour)/100
}

function wagesEarnedOnDate(empRec, date){
    return hoursWorkedOnDate(empRec, date) * empRec.payPerHour
}

function allWagesFor(empRec){
    const allDates = empRec.timeInEvents.map(e => {return e.date})
    return allDates.reduce((wageTotal, e) => {
        return wageTotal + wagesEarnedOnDate(empRec, e)
    }, 0)
}

function createEmployeeRecords(empsArray){
    return empsArray.map(createEmployeeRecord)
}

function findEmployeebyFirstName(srcArray, firstName){
    return srcArray.find(empRec => {return firstName === empRec.firstName})
}

function calculatePayroll(empsArray){
    return empsArray.reduce((wagesTotal, empRec) => {
        return wagesTotal + allWagesFor(empRec)
    }, 0)
}