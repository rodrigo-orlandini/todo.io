import { TaskProps } from "./task";

export const FolderSchema = {
    name: "Folder",
    properties: {
        id: "int",
        name: "string",
        createdAt: "date",
        tasks: "Task[]"
    },
    primaryKey: "id"
}

export interface FolderProps {
    id?: number;
    name: string;
    createdAt: Date;
    tasks?: TaskProps[];
}