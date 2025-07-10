import dayjs from 'dayjs'

console.log(dayjs().format());
console.log(dayjs().format('YYYY-MM-DD'))
console.log(dayjs('2023-3-15').format('YYYY-MM-DD HH:mm:ss'));

console.log(dayjs('2025-05-20').daysInMonth());
console.log((dayjs('2024-11-9').startOf('month').format('YYYY-MM-DD')));

