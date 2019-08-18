// Your code here

function createEmployeeRecord(arr){
    return {firstName: arr[0], familyName: arr[1], title: arr[2], 
        payPerHour: arr[3], timeInEvents: [], timeOutEvents: [], } 
}

function createEmployees(arr){
   return arr.map( employee => createEmployeeRecord(employee))
}

function createTimeInEvent(empRecord, timestamp){
      let  [date1, time1] = timestamp.split(' ')
    let timeIn = {type: 'TimeIn', hour: parseInt(time1), date: date1}
    empRecord.timeInEvents.push(timeIn)
    return empRecord
}

function createTimeOutEvent(empRecord, timestamp){
    let  [date1, time1] = timestamp.split(' ')
  let timeIn = {type: 'TimeOut', hour: parseInt(time1), date: date1}
  empRecord.timeOutEvents.push(timeIn)
  return empRecord
}


function hoursWorkedOnDate(empRecord, timestamp){

   let timeIn = (empRecord.timeInEvents.filter(date => date.date === timestamp))[0].hour
    let timeOut = (empRecord.timeOutEvents.filter(date => date.date === timestamp))[0].hour


    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(empRecord, timestamp){
    let hoursWorked = hoursWorkedOnDate(empRecord, timestamp)
    return hoursWorked * empRecord.payPerHour
}

function allWagesFor(empRecord){
   let totalWages = empRecord.timeInEvents.map(event => wagesEarnedOnDate(empRecord, event.date))
   return totalWages.reduce((total, wage) => total + wage )
}

function calculatePayroll(empRecords){
    let wagesForAll = empRecords.map(worker => allWagesFor(worker))
  return  wagesForAll.reduce((total, i) => total + i)
}



function createEmployeeRecords(arr){
   return arr.map(worker => createEmployeeRecord(worker))
}

function findEmployeebyFirstName(arr, name){
 return arr.filter(worker => worker.firstName === name)[0] 
}




