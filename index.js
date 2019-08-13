function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployees(employees) {
  return employees.map(employee => {
    return createEmployeeRecord(employee);
  });
}

function createTimeInEvent(employee, timeIn) {
  const clockEvent = {
    type: 'TimeIn',
    hour: parseInt(timeIn.split(' ')[1], 10),
    date: timeIn.split(' ')[0],
  };
  employee.timeInEvents.push(clockEvent);
  return employee;
}

function createTimeOutEvent(employee, timeOut) {
  const clockEvent = {
    type: 'TimeOut',
    hour: parseInt(timeOut.split(' ')[1]),
    date: timeOut.split(' ')[0],
  };
  employee.timeOutEvents.push(clockEvent);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.filter(
    clockEvent => clockEvent.date === date,
  )[0].hour;

  const timeOut = employee.timeOutEvents.filter(
    clockEvent => clockEvent.date === date,
  )[0].hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(clockEvent => clockEvent.date);
  return datesWorked
    .map(date => {
      return wagesEarnedOnDate(employee, date);
    })
    .reduce((a, b) => a + b, 0);
}

function calculatePayroll(employees) {
  return employees
    .map(employee => allWagesFor(employee))
    .reduce((a, b) => a + b, 0);
}

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee));
}

function findEmployeebyFirstName(employees, name) {
  return employees.find(employee => employee.firstName === name);
}
