export function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        stretchx = Math.cos(cy),
        stretchy = Math.cos(cx),
        nx = cx + ((cos * (x - cx)) + (sin * (y - cy))) * stretchx,
        ny = cy + ((cos * (y - cy)) - (sin * (x - cx))) * stretchy;
    return [nx, ny];
}
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