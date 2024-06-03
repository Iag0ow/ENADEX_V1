export const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const convertToSeconds = (timeString) => {
    const [hrs, mins, secs] = timeString.split(':').map(Number);
    return (hrs * 3600) + (mins * 60) + secs;
};

export function calculateRemainingTime(initializeDate, durationInSeconds) {
    const createdAt = new Date(initializeDate);
    const currentTime = new Date();
    const elapsedTimeInSeconds = Math.floor((currentTime - createdAt) / 1000);
    const remainingTimeInSeconds = Math.max(durationInSeconds - elapsedTimeInSeconds, 0);
    return remainingTimeInSeconds;
  }