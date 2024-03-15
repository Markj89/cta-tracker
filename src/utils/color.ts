export const findTrainColor = (stationColor: string) => {
    let color;
    switch (stationColor) {
        case "Pink":
            color = '#e27ea6';
            break;
        case 'Blue':
            color = '#00a1de';
            break;
        case 'G':
            color = '#009b3a';
            break;
        case 'Brn':
            color = '#62361b';
            break;
        case 'P':
            color = '#522398';
            break;
        case 'Y':
            color = '#f9e300';
            break;
        case 'Red':
            color = '#c60c30';
            break;
        case 'Org':
            color = '#f9461c';
            break;
        default:
            color = '#565a5c';
            break;
    }
    return color;
}