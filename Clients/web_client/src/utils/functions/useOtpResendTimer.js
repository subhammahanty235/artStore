import { useState, useEffect } from "react";

function useOtpResendTimer(sec) {
    const [totalSeconds, setTotalSeconds] = useState(sec);
    const [minutes, setMinutes] = useState(Math.floor(sec / 60));
    const [seconds, setSeconds] = useState(sec % 60);
    const [active, setActive] = useState(false);
    const [timerFinished, setTimerFinished] = useState(false);

    useEffect(() => {
        let timerId;
        if (active && totalSeconds > 0) {
            timerId = setInterval(() => {
                setTotalSeconds((prev) => prev - 1);
            }, 1000);
        } else if (totalSeconds === 0) {
            setActive(false);
            setTimerFinished(true);
            setTotalSeconds(sec);
            setMinutes(Math.floor(sec / 60));
            setSeconds(sec % 60);
        }

        return () => clearInterval(timerId);
    }, [active, totalSeconds, sec]);

    useEffect(() => {
        const minutesRemaining = Math.floor(totalSeconds / 60);
        const secondsRemaining = totalSeconds % 60;
        setMinutes(minutesRemaining);
        setSeconds(secondsRemaining);
    }, [totalSeconds]);

    const startTimer = () => {
        setActive(true);
        setTimerFinished(false);
    };

    const resetTimer = () => {
        setActive(false);
        setTotalSeconds(sec);
        setMinutes(Math.floor(sec / 60));
        setSeconds(sec % 60);
        setTimerFinished(false);
    };

    const formatTime = (value) => {
        return value < 10 ? "0" + value : value;
    };

    return {
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
        active,
        timerFinished,
        startTimer,
        resetTimer,
    };
}

export default useOtpResendTimer;
