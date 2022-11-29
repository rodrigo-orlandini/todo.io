import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

import { TaskProps } from '../models/task';

import { getNextWeekdayDate, days } from './dateHandler';

export const notify = async (date: Date, task: TaskProps) => {
    if(date.getUTCHours() > 9 && task.frequency !== "once") {
		const selectedDate = task.frequency.split(',');
		const day = selectedDate.sort((a, b) => days.indexOf(a) - days.indexOf(b))[0];

		// @ts-ignore
		const followDate = getNextWeekdayDate(day);
		date = new Date(followDate);
    }

	date.setUTCHours(9);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime()
    }

    await notifee.createTriggerNotification({
        title: 'Você precisa fazer isso hoje!',
        body: task.name,
        android: {
			channelId: "todo.io",
			pressAction: {
				id: 'todoio',
			},
        }
    }, trigger);
}