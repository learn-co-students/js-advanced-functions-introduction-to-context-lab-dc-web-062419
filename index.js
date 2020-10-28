// Your code here
let createEmployeeRecord = function(r){
    return {
        firstName: r[0],
        familyName: r[1],
        title: r[2],
        payPerHour: r[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


let createEmployees = function(arr){
    return arr.map(function(r){
        return createEmployeeRecord(r)
    })
}

let createTimeInEvent = function(em, time){
    let [date, hour] = time.split(' ')

    em.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return em

}


let createTimeOutEvent = function(emp, stamp){
    let [date, hour] = stamp.split(' ')

    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return emp
}

let hoursWorkedOnDate = function(em, time){
    let inEvent = em.timeInEvents.find(function(e){
        return e.date === time
    })

    let outEvent = em.timeOutEvents.find(function(e){
        return e.date === time
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(em, time){
    let wage = hoursWorkedOnDate(em, time)
        * em.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(em){
    let dt = em.timeInEvents.map(function(e){
        return e.date
    })

    let pay = dt.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(em, d)
    }, 0)

    return pay
}

let createEmployeeRecords = function(k) {
    return k.map(function(r){
      return createEmployeeRecord(r)
    })
  }

  let findEmployeebyFirstName = function(arr, firstName) {
    return arr.find(function(r){
      return r.firstName === firstName
    })
  }
  
  let calculatePayroll = function(array){
      return array.reduce(function(n, r){
          return n + allWagesFor(r)
      }, 0)
  }
  