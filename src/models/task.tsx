export const TaskSchema = {
    name: "Task",
    properties: {
        id: "int",
        name: "string",
        isDone: "bool",
        createdAt: "date",
        expirationDate: "date",
        frequency: "string"
    },
    primaryKey: "id"
}

export interface TaskProps {
    id?: number;
    name: string;
    isDone: boolean;
    createdAt: Date;
    expirationDate: Date;
    frequency: string;
}