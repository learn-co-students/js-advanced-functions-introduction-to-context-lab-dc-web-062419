// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

let createEmployees = function(employeeData) {
  return employeeData.map(function(employee) {
    return createEmployeeRecord(employee);
  });
};

let createTimeInEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
};

let createTimeOutEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return employee;
};

let hoursWorkedOnDate = function(employee, selectedDate) {
  let inEvent = employee.timeInEvents.find(function(e) {
    return e.date === selectedDate;
  });
  let outEvent = employee.timeOutEvents.find(function(e) {
    return e.date === selectedDate;
  });
  return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function(employee, selectedDate) {
  let wage = hoursWorkedOnDate(employee, selectedDate) * employee.payPerHour;
  return parseFloat(wage.toString());
};

let allWagesFor = function(employee) {
  let eligibleDates = employee.timeInEvents.map(function(e) {
    return e.date;
  });
  let payable = eligibleDates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);
  return payable;
};

let calculatePayroll = function(array) {
  return array.reduce(function(memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
};

let createEmployeeRecords = function(records) {
  return records.map(function(employee) {
    return createEmployeeRecord(employee);
  });
};

let findEmployeebyFirstName = function(arrayOfRecords, firstName) {
  return arrayOfRecords.find(function(rec) {
    return rec.firstName === firstName;
  });
};
