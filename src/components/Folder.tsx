import React, { useState, useEffect } from 'react';
import { Heading, HStack, Text, VStack, Pressable } from 'native-base'

import { FolderProps } from '../models/folder'
import { TaskProps } from '../models/task';

import IconButton from '../components/IconButton';
import EmptyTask from '../components/EmptyTask';
import Task from '../components/Task';

import ConfirmModal from '../partials/ConfirmModal';

import { useRealm } from '../hooks/useRealm';

interface FolderDataProps {
    data: FolderProps;
    setFolderId: (id: number) => void;
    setCreateTaskModalVisibility: (visibility: boolean) => void;
}

const Folder = ({ data, setFolderId, setCreateTaskModalVisibility }: FolderDataProps) => {

    const countTasks: number = data.tasks ? 
        data.tasks?.length - data.tasks?.filter((task: TaskProps) => task.isDone).length : 
        0;

    const { deleteFolder } = useRealm();

    const [confirmationModalVisibility, setConfirmationModalVisibility] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

    const handleAddTask = () => {
        setFolderId(data?.id || 0);
        setCreateTaskModalVisibility(true);
    }

    const handleDeleteFolder = () => {
        deleteFolder({ folder: data });
        setDeleteConfirmation(false);
    }

    useEffect(() => {
        if(deleteConfirmation) {
            handleDeleteFolder();
        }
    }, [deleteConfirmation]);

    return (
        <VStack marginBottom={8}>
            <Pressable 
                delayLongPress={1500} 
                onLongPress={() => setConfirmationModalVisibility(true)} 
                _pressed={{ opacity: 0.5 }}
            >
                <HStack justifyContent="space-between">
                    <HStack alignItems="center">
                        <Heading marginRight={4} fontSize="xl">
                            { data.name }
                        </Heading>

                        <IconButton iconName='down' onPress={() => console.log("here")}/>
                    </HStack>

                    <HStack alignItems="center">
                        <IconButton iconName='add' onPress={handleAddTask}/>

                        <Text marginLeft={6} fontSize="md">{ countTasks }</Text>
                    </HStack>
                </HStack>
            </Pressable>

            { countTasks === 0 ? (
                <EmptyTask />
            ) : (
                <VStack>
                    { data.tasks
                        ?.filter((item: TaskProps) => !item.isDone)
                        .map((item: TaskProps, index: number) => (
                            <Task data={item} key={index} />
                        )
                    )}
                </VStack>
            )}

            <ConfirmModal 
                visible={confirmationModalVisibility} 
                setVisible={setConfirmationModalVisibility}
                setConfirmation={setDeleteConfirmation}
                text="Você deseja realmente DELETAR esta pasta?"
            />
        </VStack>
    );
}

export default Folder;