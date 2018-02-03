export function dBColor(dB) {
    let colorOnMap;
    if(dB <= -60 && dB >= -69) {
            colorOnMap = '#CC8822';
        } else if(dB <= -70 && dB >= -79) {
            colorOnMap = '#888822';
        } else if(dB <= -80 && dB >= -89) {
            colorOnMap = '#88CC22';
        } else if(dB <= -90 && dB >= -99) {
            colorOnMap = '#22CC22';
        } else if(dB <= -100 && dB >= -109) {
            colorOnMap = '#22CC88';
        } else if(dB <= -110 && dB >= -119) {
            colorOnMap = '#228888';
        } else if(dB <= -120 && dB >= -129) {
            colorOnMap = '#2288CC';
        } else if(dB <= -130 && dB >= -139) {
            colorOnMap = '#2222CC';
        } else {
            colorOnMap = '#CC2222';
        }
    return colorOnMap;
}