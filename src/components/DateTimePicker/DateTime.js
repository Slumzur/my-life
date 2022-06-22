import React, { useState, useCallback, useEffect } from "react";
import {Calendar} from "./Calendar";
import {TimePicker} from "./TimePicker/TimePicker";
import {
    H4,
} from "***";

export const DateTime = (props) => {
    const [state, setState] = useState({
        selectedDate: null,
        selectedTime: null,
        timeSlotId: null,
        errorArray: {
            time_error: null,
            date_error: null,
        },
    });

    useEffect(() => {
        setState({...state, errorArray: {
                time_error: props.error?.delivery_time?.error,
                date_error: props.error?.delivery_date?.error
            }})
    }, [props.error?.delivery_time?.error, props.error?.delivery_date?.error]);

    const setSelectedDate = useCallback((date) => {
        props.getValues({
            date: formatDate(date),
            dateFullFormat: date,
            time: null,
            timeSlotId: null,
        });
        setState((prevState) => ({ ...prevState, selectedTime: null, selectedDate: date, timeSlotId: null }));
    }, []);

    const setSelectedTime = (time, id) => {
        props.getValues({
            date: formatDate(state.selectedDate),
            dateFullFormat: state.selectedDate,
            time: time,
            timeSlotId: id,
        });
        setState({...state, selectedTime: time, timeSlotId: id});
    };
    const formatDate = (date) => {
        let month = "" + (date.getMonth() + 1),
            day = "" + date.getDate(),
            year = date.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    };


    const handleSubmit = () => {
        let errorArr = {
            time_error: null,
            date_error: null,
        };

        if (!state.selectedDate || state.selectedDate === "") {
            errorArr = {
                ...errorArr,
                date_error: "Пожалуйста, укажите желаемую дату",
            };
        }
        if (!state.selectedTime || state.selectedTime === "") {
            errorArr = {
                ...errorArr,
                time_error: "Пожалуйста, укажите желаемое время",
            };
        }
        setState({
            ...state,
            errorArray: errorArr,
        });

    };

    return (
        <div className="form__select-wrapper select-wrapper" id="delivery-date-picker">
            <div className="select-wrapper__header-m"><H4>Укажите дату доставки</H4></div>
            <div className="select-wrapper__header-d"><H4>Укажите дату и время доставки</H4></div>
            <div className="select-wrapper__box">
                <Calendar
                    selectedDate={props.data ? props.data.selectedDate.fullFormatValue : state.selectedDate}
                    setSelectedDate={setSelectedDate}
                    error={state.errorArray.date_error}
                    city={props.city}
                />
                <div className="select-wrapper__header-m"><H4>Укажите время доставки</H4></div>
                <TimePicker
                    selectedTime={props.data ? props.data.selectedTime.value : state.selectedTime}
                    setSelectedTime={setSelectedTime}
                    date={props.data ? props.data.selectedDate.fullFormatValue : state.selectedDate}
                    city={props.city}
                    className="form__select-time"
                    error={state.errorArray.time_error}
                >
                    <div className="time-wrapper__error">
                        {state.errorArray.time_error ? state.errorArray.time_error : true}
                    </div>
                </TimePicker>
            </div>
            <div className="red-button-next step-button" onClick={handleSubmit} id={props.id}>
                Далее
            </div>
        </div>
    );
};
