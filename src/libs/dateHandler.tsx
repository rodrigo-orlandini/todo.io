import dayjs from "dayjs";
import ptBR from 'dayjs/locale/pt-br';

export const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

export const getSortedDays = () => {
    const today = dayjs(new Date()).locale(ptBR).format('ddd').toUpperCase();
    const index = days.indexOf(today);

    let sortedDays = [];
    for(let i = 0; i < 7; i++) {
        let addIndex = index + i + 1;
        
        if(addIndex >= 7) {
            addIndex = addIndex - 7;
        }

        sortedDays.push(days[addIndex]);
    }

    return sortedDays;
}

export const getNextWeekdayDate = (day: "DOM" | "SEG" | "TER" | "QUA" | "QUI" | "SEX" | "SAB") => {
    const followDate = new Date(String(
        dayjs(new Date()).add(
            getSortedDays().indexOf(day) + 1
            , 'day'
        ))
    );

    followDate.setMilliseconds(0);

    return followDate;
}