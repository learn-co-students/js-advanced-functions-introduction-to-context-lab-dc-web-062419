// Your code here
function createEmployeeRecord(array) {
   return { 
       firstName: array[0],
       familyName: array[1],
       title: array[2],
       payPerHour: array[3],
       timeInEvents: [],
       timeOutEvents: [],
     }
}

function createEmployees(array) {
    // array.forEach(el => createEmployeeRecord(el))
    return array.map((subArray) => createEmployeeRecord(subArray))
}

function createTimeInEvent(record, dateTimeSt) {
    let [date, hour] = dateTimeSt.split(' ')

    let timeObject = {
        hour: parseInt(dateTimeSt.split(' ')[1]),
        date: dateTimeSt.split(' ')[0],
        type: "TimeIn"
    }
    record.timeInEvents.push(timeObject)
    return record
}

function createTimeOutEvent(record, dateTimeSt) {
    // let [date, hour] = dateTimeSt.split(' ')

    let timeObject = {
        hour: parseInt(dateTimeSt.split(' ')[1]),
        date: dateTimeSt.split(' ')[0],
        type: "TimeOut"
    }
    record.timeOutEvents.push(timeObject)
    return record
}


function hoursWorkedOnDate(record, day) {
    let timeIn = record.timeInEvents.find((el) => {return el.date == day  })
    let timeOut = record.timeOutEvents.find((el) => {return el.date == day})

    // let timeIn = record.timeInEvents.find(function(el){return el.date == day})
    // let timeOut = record.timeOutEvents.find(function(el){return el.date == day})


    return (timeOut.hour - timeIn.hour) /100
}

function wagesEarnedOnDate(record, day) {
    let timeIn = record.timeInEvents.find((el) => {return el.date == day  })
    let timeOut = record.timeOutEvents.find((el) => {return el.date == day})

    return ( (timeOut.hour - timeIn.hour) /100 )*record.payPerHour
}


function allWagesFor(record) {
    let setOfDates = record.timeInEvents.map((e) =>  e.date)
    let setOfWages = setOfDates.map(day => wagesEarnedOnDate(record, day))
//     // return setOfWages.reduce(function(memo, num){return memo + num})
    function sumFunction(memo, num){return memo + num}
    return setOfWages.reduce(sumFunction)
}

function calculatePayroll(employees) {
    let setOfWages = employees.map(allWagesFor)
    function getSum(memo, num){return memo + num} 
    let totalWages =  setOfWages.reduce(getSum, 0)
    return totalWages
}

function createEmployeeRecords(csv) {
    return csv.map(function(row){ return createEmployeeRecord(row)} )
}

function findEmployeebyFirstName(employees, firstName) {
    let record = employees.find(record => record.firstName == firstName)
    return record
}