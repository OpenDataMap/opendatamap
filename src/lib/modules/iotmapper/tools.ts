export function dBValues(dB) {
    let colorOnMap;
    let circleSize;
    if(dB <= -85 && dB >= -89) {
            colorOnMap = '#CC8822';
            circleSize = 20;
        } else if(dB <= -90 && dB >= -94) {
            colorOnMap = '#888822';
            circleSize = 21.5;
        } else if(dB <= -95 && dB >= -99) {
            colorOnMap = '#88CC22';
            circleSize = 23;
        } else if(dB <= -100 && dB >= -104) {
            colorOnMap = '#22CC22';
            circleSize = 24.5;
        } else if(dB <= -105 && dB >= -109) {
            colorOnMap = '#22CC88';
            circleSize = 26;
        } else if(dB <= -110 && dB >= -114) {
            colorOnMap = '#228888';
            circleSize = 27.5;
        } else if(dB <= -115 && dB >= -119) {
            colorOnMap = '#2288CC';
            circleSize = 29;
        } else if(dB <= -120 && dB >= -150) {
            colorOnMap = '#2222CC';
            circleSize = 30.5;
        } else {
            colorOnMap = '#CC2222';
            circleSize = 15;
        }
    return {
        colorOnMap: colorOnMap,
        circleSize: circleSize
    };
}

export function geoDistance(lat1, lon1, lat2, lon2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
    return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}