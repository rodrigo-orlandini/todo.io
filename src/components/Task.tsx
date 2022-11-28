import React, { useState, useEffect } from "react";
import { HStack, Text, Pressable } from "native-base";

import { TaskProps } from "../models/task";

import { useRealm } from '../hooks/useRealm';

import Flag from '../components/Flag';

import ConfirmModal from '../partials/ConfirmModal';

interface TaskComponentProps {
    data: TaskProps
}

const Task = ({ data }: TaskComponentProps) => {

    const { tasks, completeTask, deleteTask } = useRealm();

    const [confirmationModalVisibility, setConfirmationModalVisibility] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

    const onCheck = () => {
        const task = tasks.filter((item: TaskProps) => item.id === data.id)[0];

        completeTask({ task });
    }

    const handleDeleteTask = () => {
        deleteTask({ task: data });
        setDeleteConfirmation(false);
    }

    useEffect(() => {
        if(deleteConfirmation) {
            handleDeleteTask();
        }
    }, [deleteConfirmation]);

    return (
        <Pressable onPress={onCheck} delayLongPress={1500} onLongPress={() => setConfirmationModalVisibility(true)}>
            <HStack marginTop={2} alignItems="center" flexWrap="wrap">
                <Pressable 
                    width="4"
                    height="4"
                    backgroundColor="gray.100"
                    rounded="full"
                    borderWidth={1}
                    borderColor="blue.300"
                    marginBottom={2}
                    onPress={onCheck}
                />

                <Text fontSize="md" marginLeft={2}>{data.name}</Text>

                <Flag date={data.expirationDate} />
            </HStack>

            <ConfirmModal 
                visible={confirmationModalVisibility} 
                setVisible={setConfirmationModalVisibility}
                setConfirmation={setDeleteConfirmation}
                text="Você deseja realmente DELETAR esta tarefa?"
            />
        </Pressable>
    );
}

export default Task;