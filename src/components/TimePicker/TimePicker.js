import React, {useState, createRef, useEffect} from "react";
import "./index.css";
import "../../hooks/GetTimeStatus"
import {GetTimeStatus} from "../../hooks/GetTimeStatus";

export const TimePicker = (props) => {
    const time = [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
    ];
    const [timeStatus, setTimeStatus] = useState({})
    const [selectedTime, setSelectedTime] = useState("");
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const checkStatusTime = (time) => {
        if (timeStatus[time]) {
            return true
        } else {
            return false
        }
    };
    const changeStatePopup = () => {
        setIsOpenPopup(!isOpenPopup);
    };
    useEffect(() => {
        if (props.date && Object.entries(props.office).length > 0) {
            GetTimeStatus(props.office, props.date).then(data => {
                setTimeStatus(data)
            })
        }
    }, [props.date, props.office])
    const changeTime = (event) => {
        props.setSelectedTime(event.target.innerHTML);
        setIsOpenPopup(!isOpenPopup);
    };
    const closeModal = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpenPopup(false);
        }
    };

    document.addEventListener("click", closeModal);

    const ref = createRef();
    return (
        <div className="time-wrapper">
            <div ref={ref} className="time-piker-wrapper">
                <input
                    className={
                        isOpenPopup
                            ? "time-piker-wrapper__input content"
                            : "time-piker-wrapper__input"
                    }
                    onFocus={changeStatePopup}
                    readOnly={true}
                    placeholder="Время визита"
                    value={props.selectedTime ? props.selectedTime : "Время"}
                />
                <div
                    className="time-piker-popup"
                    style={isOpenPopup ? {display: "flex"} : {display: "none"}}
                >

                    {time.map((item, key) => {
                        if (checkStatusTime(item)) {
                            return (
                                <div
                                    key={key}
                                    className={
                                        "time-piker-popup__time-btn" +
                                        (item === props.selectedTime ? " active" : "")
                                    }
                                    onClick={changeTime}
                                >
                                    {item}
                                </div>
                            );
                        } else {
                            return (
                                <div key={key} className="time-piker-popup__time-btn disabled">
                                    {item}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            {props.children}
        </div>
    );
};
