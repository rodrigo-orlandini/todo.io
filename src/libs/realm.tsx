import Realm from 'realm';

import { TaskSchema } from '../models/task';
import { FolderSchema } from '../models/folder';

export const bootstrap = async () => {
    return await Realm.open({
        path: "todoiodb",
        schema: [TaskSchema, FolderSchema]
    });
}