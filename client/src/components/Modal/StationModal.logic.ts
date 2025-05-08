export const formatArrivalTime = (arrivalTime: string) => {
    let presentTime = new Date()?.getTime();
    const difference = (new Date(arrivalTime).getTime() - presentTime);
    return new Date(difference).getMinutes();
};

export const formatEstimatedTime = (arrivalTime: string) => arrivalTime && new Date(arrivalTime)?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});