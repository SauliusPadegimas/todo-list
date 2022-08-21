export default function timeRemaining(date) {
    const currentTime = Date.parse(new Date());
    const remaining = Date.parse(date) - currentTime;
    if (remaining < 0) return 'expired';
    return convertMsToHM(remaining);
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    // apvalinam minutes pagal sekundes, nes sekundziu nerodysim
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    return `(hh:mm) ${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}  