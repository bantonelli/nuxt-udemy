import Vue from 'vue';

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const numberEndings = {
    st: [1, 21, 31],
    nd: [2, 22],
    rd: [3, 23],
    th: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30]
}

const dateFilter = (value) => {
    return formatDate(value);
}

function getDay(day) {
    var numberDay = parseInt(day);
    for (var key in numberEndings) {
        if (numberEndings[key].indexOf(numberDay) != -1) {
            return `${numberDay}${key}`;
        }
    }
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = getDay(date.getDate());
    const formattedDate = `${months[month]} ${day} ${year}`;
    return formattedDate;
}

Vue.filter('date', dateFilter);