import React, { memo } from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

registerLocale("ru", ru);

const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

export const scrollTop = (id) => {
    let elem = document.getElementById(id);
    let pageYOffset = window.pageYOffset;
    let distanceToTop = elem.getBoundingClientRect().top;
    let screenWidth = window.screen.width;
    if (screenWidth < 768) {
        setTimeout(() => {
            window.scrollTo(0, pageYOffset + distanceToTop - 5);
        }, 50);
    }
};

export const Calendar = memo((props) => {
    var today = new Date(),
        tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const changeDate = (date) => {
        if (props.city) {
            props.setSelectedDate(date);
        }
    };
    const getHolidays = () => {
        let result = [];

        let cityName = getCity();
        if (cityName && cityName !== 'Город') {
            checkBusyDays(cityName).then((data) => {
                if (data !== []) {
                    data.forEach(function (item, i) {
                        result.push(item);
                    });
                }
            });
            return result;
        } else {
            return result;
        }
    };
    const disableHoliday = (day) => {
        if (day.getDay() === 0) {
            return "react-datepicker__day--disabled";
        }
    };
    const getMaxDay = () => {
        let now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 365);
    };

    const checkBusyDays = async (cityName) => {
        let startDate = new Date();
        let endDate = new Date();
        let result = [];
        endDate.setDate(endDate.getDate() + 30);
        startDate = startDate.toISOString().substr(0, 10);
        endDate = endDate.toISOString().substr(0, 10);
        let url = `***`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            data.forEach(function (item, i) {
                if (!item.is_available) {
                    let dateToPush = new Date(item.date);
                    result.push(new Date(dateToPush.getFullYear(), dateToPush.getMonth(), dateToPush.getDate()));
                }
            });
        } catch (error) {
        }

        endDate = new Date();
        endDate.setDate(endDate.getDate() + 31);
        for (let ii = 0; ii < 365; ii++) {
            result.push(new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));
            endDate.setDate(endDate.getDate() + 1);
        }
        return result;
    };

    const getCity = () => {
        let city = props.city;
        if (city === 'Выбрать' || !city) {
            return null;
        }
        return city;
    };

    return (
        <div className="date-wrapper" onClick={() => scrollTop('delivery-date-picker')}>
            <DatePicker
                locale="ru"
                placeholderText="Дата"
                onChange={changeDate}
                className={props.error ? "form__select-day--error" : "form__select-day"} 
                minDate={tomorrow}
                maxDate={getMaxDay()}
                selected={props.selectedDate}
                dateFormat="dd.MM.yyyy"
                dayClassName={(date) => disableHoliday(date)}
                excludeDates={getHolidays()}
                renderCustomHeader={({date, changeMonth}) => (
                    <div className="calendar">
                        <div
                            className="calendar__arrow-left"
                            onClick={() => changeMonth(date.getMonth() - 1)}
                        />
                        <div className="calendar__month">{months[date.getMonth()]}</div>
                        <div
                            className="calendar__arrow-right"
                            onClick={() => changeMonth(date.getMonth() + 1)}
                        />
                    </div>
                )}
                inputtype="numeric"
                pattern="[0-9]*"
            />
            <div className="date-wrapper__error">
                {props.error ? props.error : false}
            </div>
        </div>
    );
});
