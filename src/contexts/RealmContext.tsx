import { createContext, ReactNode, useState, useEffect } from 'react';
import Realm from 'realm';

import { bootstrap } from '../libs/realm';

import { FolderProps } from '../models/folder';
import { TaskProps } from '../models/task';

export interface RealmContextDataProps {
    isLoading: boolean;
    folders: FolderProps[];
    tasks: TaskProps[];
    createFolder: ({ data }: CreateFolderProps) => FolderProps | boolean;
    createTask: ({ data }: CreateTaskProps) => TaskProps | boolean;
    completeTask: ({ task }: CompleteTaskProps) => void;
}

interface RealmProviderProps {
    children: ReactNode
}

interface CreateFolderProps { 
    data: FolderProps;
}

interface CreateTaskProps { 
    data: TaskProps;
    folderId: number;
}

interface CompleteTaskProps {
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

    const createFolder = ({ data }: CreateFolderProps) => {
        var folder: FolderProps = {} as FolderProps;
        realm?.write(() => {
            folder = realm.create("Folder", { ...data });
        });
        return folder;
    }

    const createTask = ({ data, folderId }: CreateTaskProps) => {
        var task: TaskProps = {} as TaskProps;
        const taskFolder = folders.filter((folder: FolderProps) => folder.id === folderId)[0];

        realm?.write(() => {
            task = realm.create("Task", { ...data });
            taskFolder.tasks?.push(task);
        });

        return task;
    }

    const completeTask = ({ task }: CompleteTaskProps) => {
        realm?.write(() => {
            task.isDone = true;
        });
    }

    const getCurrentTaskId = (): number => {
        const id = tasks[(tasks.length - 1)].id
        return id ? id : 0;
    }

    const getCurrentFolderId = (): number => {
        const id = folders[(folders.length - 1)].id
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
            completeTask
        }}>
            { children }
        </RealmContext.Provider>
    )
}