export function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        stretch = Math.cos(cy),
        nx = cx + ((cos * (x - cx)) + (sin * (y - cy))) * stretch,
        ny = cy + ((cos * (y - cy)) - (sin * (x - cx)));
    return [nx, ny];
}