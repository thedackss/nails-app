import { useState } from "react";
import {
    DateTimePickerAndroid,
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface props {
    /** Indicates if the user can select dates that alerady past */
    allowPast?: boolean;
}

/**
 * @returns funtions to handle the Date and Time pickers
 * @author Diego Zamora
 * @link https://github.com/xDacksx/
 */
export const useDatePicker = ({ allowPast }: props = {}) => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const t = new Date();

    const [myDate, setMyDate] = useState<Date>(d);
    const [time, _setTime] = useState<Date>(t);

    const { open } = DateTimePickerAndroid;

    /**
     * Changes the date state of the picker
     * @param _event
     * @param date Date where the Time or Date picker will be set
     */
    function onChangeDate(_event: DateTimePickerEvent, date: Date | undefined) {
        if (date) {
            const hours = time.getHours();
            const minutes = time.getMinutes();

            date.setHours(hours, minutes, 0, 0);

            setMyDate(date);
        }
    }
    /**
     * Changes the time state of the picker
     * @param _event
     * @param date Date where the Time or Date picker will be set
     */
    function onChangeTime(_event: DateTimePickerEvent, date: Date | undefined) {
        if (date) {
            const year = myDate.getFullYear();
            const month = myDate.getMonth();
            const day = myDate.getDate();

            date.setFullYear(year);
            date.setMonth(month);
            date.setDate(day);

            setMyDate(date);
        }
    }
    /**
     * Opens the picker on the mode selected
     * @param mode mode of the picker
     */
    function showMode(mode: "date" | "time") {
        open({
            value: new Date(),
            mode,
            is24Hour: true,
            onChange: mode === "date" ? onChangeDate : onChangeTime,
            minimumDate: !allowPast ? new Date() : undefined,
        });
    }

    /** Open the picker on date mode */
    function showDatePicker() {
        showMode("date");
    }
    /** Open the picker on time mode */
    function showTimePicker() {
        showMode("time");
    }
    /**
     *
     * @param date date to transform into string
     * @returns date in `year`, `month` `day` format
     * @example '2002, November 29'
     */
    function DateToString(date: Date): string {
        const currentYear = new Date().getFullYear();

        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        let myDate;

        if (currentYear === year) myDate = `${month} ${day}`;
        else myDate = `${year}, ${month} ${day}`;

        return myDate;
    }
    /**
     *
     * @param date date to transform into string
     * @returns date in `hours`:`minutes` `status` format
     * @example '03:25 PM'
     */
    function TimeToString(date: Date): string {
        let hour = date.getHours();
        const minute = date.getMinutes();
        const status = hour > 11 ? "PM" : "AM";

        hour = hour % 12 || 12;
        if (minute < 10) return `${hour}:0${minute} ${status}`;
        else return `${hour}:${minute} ${status}`;
    }

    return {
        showDatePicker,
        showTimePicker,
        date: myDate,
        DateToString,
        TimeToString,
    };
};
