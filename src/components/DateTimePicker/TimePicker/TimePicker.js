import React, {useState, createRef, useEffect} from "react";
import {GetTimeStatus} from "../hooks/GetTimeStatus";
import { Body1 } from "***";

export const TimePicker = (props) => {
    const [timeStatus, setTimeStatus] = useState({});
    const [isOpenPopup, setIsOpenPopup] = useState(false);


    const changeStatePopup = () => {
        setIsOpenPopup(!isOpenPopup);
    };
    useEffect(() => {
        const forms = document.getElementsByTagName('form');
        const form = (forms && forms.length) ? forms[0] : null;
        if (!form) {
            return null;
        }

        const formId = form.getAttribute('id');
        //const selectedCity = document.getElementById('new-pora_delivery_place_code');
        const selectedCity = props.city;
        if (!selectedCity) {
            return null;
        }

        const cityCode = selectedCity.value;
        //let city = document.getElementById('new-pora_delivery_place_code').textContent;
        let city = props.city;

        if (props.date && city) {
            GetTimeStatus(city, props.date).then((data) => {
                setTimeStatus(data)
            });
        }

    }, [props.date]);
    const changeTime = (event) => {
        const timeSlotId = event.target.getAttribute("timeSlotId")
        props.setSelectedTime(event.target.innerHTML, timeSlotId);
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
                            : props.error ? "time-piker-wrapper__input--error"
                                : "time-piker-wrapper__input"
                    }
                    onFocus={changeStatePopup}
                    readOnly={true}
                    placeholder="Время"
                    value={props.selectedTime ? props.selectedTime : "Время"}
                />
                <div
                    className="time-piker-popup"
                    style={isOpenPopup ? {display: "flex"} : {display: "none"}}
                >
                    {
                        props.city ? (
                                timeStatus.length ? Object.entries(timeStatus).map(([key, value], index) => {
                                    if (value.isAvailable) {
                                        return (
                                            <div
                                                key={index}
                                                timeSlotId={value.timeSlotId}
                                                className={
                                                    "time-piker-popup__time-btn_tp" +
                                                    (value.name === props.selectedTime ? " active" : "")
                                                }
                                                onClick={changeTime}
                                            >
                                                {value.name.slice(0, 5) + ' - ' + value.name.slice(-5)}
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={index} className="time-piker-popup__time-btn_tp disabled">
                                                {value.name.slice(0, 5) + ' - ' + value.name.slice(-5)}
                                            </div>
                                        );
                                    }
                                }) : <Body1>Выберите сначала дату доставки</Body1>
                        )
                        : <Body1>Выберите сначала город доставки</Body1>
                    }
                </div>
            </div>
            {props.children}
        </div>
    );
};
