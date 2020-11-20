'use strict';

// HackerRank의 'Time Conversion' 문제
// 12 hour format → 24 hour format

function timeConversion(s) {
    let result = '';
    let [hh, mm, ss, apm] = [s.substr(0,2), s.substr(3, 2), s.substr(6, 2), s.substr(8, 2)];
    if(apm === 'AM') {
        if(hh === '12') hh = '00';
    }
    else {
        if(hh !== '12') {
            const newHour = parseInt(hh) + 12;
            hh = newHour.toString();
        } 
    }
    result = `${hh}:${mm}:${ss}`;
    return result;
}

//---------test----------
const s = '12:01:00AM';
console.log(timeConversion(s)); // '00:01:00'
