export function dBValues(dB) {
    let colorOnMap;
    let circleSize;
    let circleOpacity;
    if(dB <= -60 && dB >= -69) {
            colorOnMap = '#CC8822';
            circleSize = 120;
            circleOpacity = 0.34;
        } else if(dB <= -70 && dB >= -79) {
            colorOnMap = '#888822';
            circleSize = 140;
            circleOpacity = 0.32;
        } else if(dB <= -80 && dB >= -89) {
            colorOnMap = '#88CC22';
            circleSize = 160;
            circleOpacity = 0.30;
        } else if(dB <= -90 && dB >= -99) {
            colorOnMap = '#22CC22';
            circleSize = 180;
            circleOpacity = 0.28;
        } else if(dB <= -100 && dB >= -109) {
            colorOnMap = '#22CC88';
            circleSize = 200;
            circleOpacity = 0.26;
        } else if(dB <= -110 && dB >= -119) {
            colorOnMap = '#228888';
            circleSize = 220;
            circleOpacity = 0.24;
        } else if(dB <= -120 && dB >= -129) {
            colorOnMap = '#2288CC';
            circleSize = 240;
            circleOpacity = 0.22;
        } else if(dB <= -130 && dB >= -139) {
            colorOnMap = '#2222CC';
            circleSize = 260;
            circleOpacity = 0.2;
        } else {
            colorOnMap = '#CC2222';
            circleSize = 100;
            circleOpacity = 0.36;
        }
    return {
        colorOnMap: colorOnMap,
        circleSize: circleSize,
        circleOpacity: circleOpacity
    };
}

export function geoDistance(lat1, lon1, lat2, lon2) {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
    return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}