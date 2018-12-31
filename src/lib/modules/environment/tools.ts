export function formatDate(date) {
    date = new Date(date);
    var monthNames = [
        "Jan", "Feb", "M&auml;r",
        "Apr", "Mai", "Jun", "Jul",
        "Aug", "Sep", "Okt",
        "Nov", "Dez"
    ];

    const hours = date.getHours() + 1;
    const minutes = date.getMinutes() + 1;
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return hours + ":" + minutes + " - " + day + ' ' + monthNames[monthIndex] + ' ' + year;
}