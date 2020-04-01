import { AsyncStorage } from 'react-native';
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar';

export const fetchCalendarResults = () => {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults);
}

export const submitEntry = ({ key,entry }) => {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export const removeEntry = key => {
    AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(result => {
            const data = JSON.parse(result);
            delete data[key];
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY,data);
        })
}