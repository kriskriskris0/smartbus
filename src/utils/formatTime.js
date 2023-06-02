export const formatTime = (time) => {
    if(!time){
        return time;
    }

    let hours = time.$H;
    let minutes = time.$m;

    if(hours <= 9){
        hours = `0${hours}`;
    }

    if(minutes <= 9){
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}