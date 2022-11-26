import React from 'react';
import { Heading, HStack, Text, VStack } from 'native-base'

import { FolderProps } from '../models/folder'
import { TaskProps } from '../models/task';

import IconButton from '../components/IconButton';
import EmptyTask from '../components/EmptyTask';
import Task from '../components/Task';

interface FolderDataProps {
    data: FolderProps;
}

const Folder = ({ data }: FolderDataProps) => {

    const countTasks: number = data.tasks ? 
        data.tasks?.length - data.tasks?.filter((task: TaskProps) => task.isDone).length : 
        0;

    return (
        <VStack marginBottom={8}>
            <HStack justifyContent="space-between">
                <HStack alignItems="center">
                    <Heading marginRight={4} fontSize="xl">
                        { data.name }
                    </Heading>

                    <IconButton iconName='down' onPress={() => console.log("here")}/>
                </HStack>

                <HStack alignItems="center">
                    <IconButton iconName='add' onPress={() => console.log("here")}/>

                    <Text marginLeft={6} fontSize="md">{ countTasks }</Text>
                </HStack>
            </HStack>

            { countTasks === 0 ? (
                <EmptyTask />
            ) : (
                <VStack>
                    { data.tasks
                        ?.filter((item: TaskProps) => !item.isDone)
                        .map((item: TaskProps, index: number) => (
                            <Task data={item} key={index}/>
                        )
                    )}
                </VStack>
            )}
        </VStack>
    );
}

export default Folder;