const cache = {};

export const GetTimeStatus = async (office, date) => {
    let freeTime = {
        "10:00": true,
        "10:30": true,
        "11:00": true,
        "11:30": true,
        "12:00": true,
        "12:30": true,
        "13:00": true,
        "13:30": true,
        "14:00": true,
        "14:30": true,
        "15:00": true,
        "15:30": true,
        "16:00": true,
        "16:30": true,
    };

    let url;
    let response;
    let month;
    let day;
    let year;
    let data;
    month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    year = date.getFullYear();
    url = `***`;
    const cacheKey = month + "-" + office.id;
    try {
        if (!cache[cacheKey]) {
            response = await fetch(url);
            data = await response.json();
            cache[cacheKey] = data;
        }
        let selectedDay = `${year}-${month}-${day}`;
        let recordsInDay = cache[cacheKey].result[selectedDay];
        for (let record in recordsInDay) {
            let time = parseInt(record.slice(0, 2)) + record.slice(2, 5);
            if (recordsInDay[record] >= 2) {
                freeTime = {...freeTime, [time]: false};
            }
        }
    } catch (error) {
    }
    return freeTime;
};
