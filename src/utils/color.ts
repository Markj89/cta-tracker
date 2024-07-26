export const getColorByStation = (stationColor: string) => {
    let color;
    switch (stationColor) {
        case "pink":
            color = '#e27ea6';
            break;
        case 'blue':
            color = '#00a1de';
            break;
        case 'g':
            color = '#009b3a';
            break;
        case 'brn':
            color = '#62361b';
            break;
        case 'p':
            color = '#522398';
            break;
        case 'y':
            color = '#f9e300';
            break;
        case 'red':
            color = '#c60c30';
            break;
        case 'org':
            color = '#f9461c';
            break;
        default:
            color = '#565a5c';
            break;
    }
    return color;
};