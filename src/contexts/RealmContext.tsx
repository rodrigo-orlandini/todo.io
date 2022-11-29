import { createContext, ReactNode, useState, useEffect } from 'react';
import Realm from 'realm';
import dayjs from 'dayjs';

import { bootstrap } from '../libs/realm';
import { Omit } from '../libs/omit';
import { notify } from '../libs/notifee';
import { getNextWeekdayDate, days } from '../libs/dateHandler';

import { FolderProps } from '../models/folder';
import { TaskProps } from '../models/task';

export interface RealmContextDataProps {
    isLoading: boolean;
    folders: FolderProps[];
    tasks: TaskProps[];
    createFolder: ({ name, tasks }: CreateFolderProps) => FolderProps | boolean;
    createTask: ({ name, frequency, folderId }: CreateTaskProps) => TaskProps | boolean;
    deleteTask: ({ task }: DeleteTaskProps) => void;
    deleteFolder: ({ folder }: DeleteFolderProps) => void;
    completeTask: ({ task }: CompleteTaskProps) => void;
}

interface RealmProviderProps {
    children: ReactNode
}

interface CreateFolderProps extends Omit<FolderProps, 'id' | 'createdAt'> {}

interface CreateTaskProps extends Omit<TaskProps, 'id' | 'createdAt' | 'isDone'> { 
    folderId: number;
}

interface CompleteTaskProps {
    task: TaskProps;
}

interface DeleteFolderProps {
    folder: FolderProps;
}

interface DeleteTaskProps {
    task: TaskProps;
}

export const RealmContext = createContext({} as RealmContextDataProps);

export const RealmContextProvider = ({ children }: RealmProviderProps) => {

    const [realm, setRealm] = useState<Realm>();
    const [folders, setFolders] = useState<FolderProps[]>([]);
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const init = async () => {
        setIsLoading(true);

        const realm = await bootstrap();

        //@ts-ignore
        const tasks: TaskProps[] = realm.objects("Task");  
        //@ts-ignore
        const folders: FolderProps[] = realm.objects("Folder");

        setRealm(realm);
        setTasks(tasks);
        setFolders(folders);

        setIsLoading(false);
    }

    const createFolder = ({ name, tasks=[] }: CreateFolderProps) => {
        setIsLoading(true);

        var folder: FolderProps = {} as FolderProps;
        realm?.write(() => {
            folder = realm.create("Folder", {
                id: getCurrentFolderId() + 1,
                name,
                createdAt: new Date(),
                tasks
            });
        });

        if(realm) {
            //@ts-ignore
            setFolders(realm.objects("Folder"));
        }

        setIsLoading(false);
        return folder;
    }

    const createTask = ({ name, frequency, expirationDate, folderId }: CreateTaskProps) => {
        var task: TaskProps = {} as TaskProps;
        const taskFolder = folders.filter((folder: FolderProps) => folder.id === folderId)[0];

        realm?.write(() => {
            task = realm.create("Task", { 
                id: getCurrentTaskId() + 1,
                name: frequency === "once" ? name : `${name} (1)`,
                frequency,
                isDone: false,
                createdAt: new Date(),
                expirationDate
            });
            taskFolder.tasks?.push(task);
        });

        return task;
    }

    const completeTask = async ({ task }: CompleteTaskProps) => {
        if(task.frequency === "once") {
            realm?.write(() => {
                task.isDone = true;
            });
        } else {
            const selectedDate = task.frequency.split(',');
            const day = selectedDate.sort((a, b) => days.indexOf(a) - days.indexOf(b))[0];

            // @ts-ignore
            const followDate = getNextWeekdayDate(day);

            const name = task.name;
            const numberIndex = name.indexOf("(");

            realm?.write(() => {
                task.name = `${name.slice(0, numberIndex).trim()} (${Number(name.slice(numberIndex + 1, name.length - 1)) + 1})`;
                task.createdAt = new Date();
                task.isDone = false;
                task.expirationDate = followDate;
            });

            await notify(followDate, task);
        }


        //@ts-ignore
        setTasks(realm?.objects("Task"));
    }

    const deleteTask = ({ task }: DeleteTaskProps) => {
        realm?.write(() => {
            realm.delete(task);
        });

        //@ts-ignore
        setTasks(realm?.objects("Task"));
    }

    const deleteFolder = ({ folder }: DeleteFolderProps) => {
        realm?.write(() => {
            realm.delete(folder.tasks);
            realm.delete(folder);
        });

        //@ts-ignore
        setFolders(realm?.objects("Folder"));
    }

    const getCurrentTaskId = (): number => {
        const id = tasks.length > 0 ? tasks[(tasks.length - 1)].id : 0;
        return id ? id : 0;
    }

    const getCurrentFolderId = (): number => {
        const id = folders.length > 0 ? folders[(folders.length - 1)].id : 0;
        return id ? id : 0;
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <RealmContext.Provider value={{
            isLoading,
            folders,
            tasks,
            createFolder,
            createTask,
            deleteFolder,
            deleteTask,
            completeTask
        }}>
            { children }
        </RealmContext.Provider>
    )
}