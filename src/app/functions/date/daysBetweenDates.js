export default function daysBetweenDates(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const diffInMs = new Date() - inputDate;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}