import crypto from 'crypto'
import ipRegex from 'ip-regex'
import Id from '../Id'
import buildMakeTask from './task'
import buildMakeSource from './source'

const makeSource = buildMakeSource( {isValidIp })
const makeTask = buildMakeTask( {Id, md5, makeSource, isValidDate, isValidTime, isValidInterval} )

export default makeTask

function isValidIp(ip) {
    return ipRegex({ exact: true }).test(ip)
}

function md5(text) {
    return crypto
        .createHash('md5')
        .update(text, 'utf-8')
        .digest('hex')
}

function isValidDate(date) {
    //solution provided by : https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date))
        return false;

    // Parse the date parts to integers
    var parts = date.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

function isValidTime(time) {
    if (time.length === 0) {
        return false;
    }
    var parts = time.split(":");
    var hour = parseInt(parts[0], 10);
    var minute = parseInt(parts[1], 10);

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        return false;
    }
    return true;
}

function isValidInterval(startTime, endTime) {
    var startParts = startTime.split(":");
    var startHour = parseInt(startParts[0], 10);
    var startMinute = parseInt(startParts[1], 10);

    var endParts = endTime.split(":");
    var endHour = parseInt(endParts[0], 10);
    var endMinute = parseInt(endParts[1], 10);

    if (startHour > endHour) {
        return false;
    }
    else if (startHour == endHour) {
        if (startMinute >= endMinute) { // can't be the same time
            return false;
        }
    }
    return true;
}