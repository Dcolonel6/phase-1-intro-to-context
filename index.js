// Your code here
function createEmployeeRecord(list){
    const [firstName, familyName, title, payperHour] = list

    return {
        'timeInEvents':[],
        'timeOutEvents':[],
        'firstName': firstName,
        'title': title,
        'payPerHour': payperHour,
        'familyName': familyName
    }
}

function createEmployeeRecords(employeesDetails){
    const employeeRecords = []
    for(const employeeList of employeesDetails){
        employeeRecords.push(createEmployeeRecord(employeeList))
    }
    return employeeRecords
}

function createTimeInEvent(employeeRecord,dateStamp){
    const [yearStr,monthStr,dayStr,timeStr] = dateStamp.split((/\s|-/))
    const timeObject = {
        'type': 'TimeIn',
        'hour': parseInt(timeStr,10),
        'date':`${yearStr}-${monthStr}-${dayStr}` 
    }
    employeeRecord['timeInEvents'].push(timeObject)
    return employeeRecord

}
function createTimeOutEvent(employeeRecord,dateStamp){
    const [yearStr,monthStr,dayStr,timeStr] = dateStamp.split((/\s|-/))
    const timeObject = {
        'type': 'TimeOut',
        'hour': parseInt(timeStr,10),
        'date':`${yearStr}-${monthStr}-${dayStr}` 
    }
    employeeRecord['timeOutEvents'].push(timeObject)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord,dateWithoutTime){
    const {timeInEvents, timeOutEvents } = employeeRecord
    const timeIn = timeInEvents.find(({date}) => date === dateWithoutTime)
    const timeOut = timeOutEvents.find(({date}) => date === dateWithoutTime)      
     
    return (parseInt(timeOut['hour']) - parseInt(timeIn['hour'])) / 100
}

function wagesEarnedOnDate(employeeRecord,dateStr){
    const hoursWorked = hoursWorkedOnDate(employeeRecord,dateStr)
    return hoursWorked * employeeRecord['payPerHour']

}

function allWagesFor(employeeRecord){
    
    const { timeInEvents } = employeeRecord
    const totalWage =  timeInEvents.reduce((acc,current)=>{
        return acc + wagesEarnedOnDate(employeeRecord,current['date'])
    },0)    
    return totalWage    
}

function calculatePayroll(employeeRecords){
    let sumOfPay = 0
    for(const employeeRecord of employeeRecords){
        sumOfPay += allWagesFor(employeeRecord)
    }
    return sumOfPay

}
