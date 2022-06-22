export const GetTimeStatus = async (city, date) => {
    let freeTime = [
        {
            timeSlotId: 1,
            name: "10:00-14:00",
            isAvailable: false,
        },
        {
            timeSlotId: 2,
            name: "14:00-17:00",
            isAvailable: false,
        },
        {
            timeSlotId: 3,
            name: "17:00-21:00",
            isAvailable: false,
        },
    ];

    let url;
    let response;
    let month;
    let day;
    let year;
    let data;
    month =
        date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    year = date.getFullYear();
    let selectedDay = `${year}-${month}-${day}`;

    url = `***`;

    try {
        response = await fetch(url);
        data = await response.json();
        if (data.length !== 0) {
            freeTime = [];
        }
        data.forEach(function (item, i) {
            freeTime.push({
                timeSlotId: item.time_slot_id,
                name: item.name,
                isAvailable: item.isAvailable,
            });
        });
    } catch (error) {
    }

    return freeTime;
};
