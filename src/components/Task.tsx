import React, { useState } from "react";
import { HStack, Text, Pressable } from "native-base";

import { TaskProps } from "../models/task";

import { useRealm } from '../hooks/useRealm';

import Flag from '../components/Flag';

interface TaskComponentProps {
    data: TaskProps
}

const Task = ({ data }: TaskComponentProps) => {

    const { tasks, completeTask } = useRealm();

    const [checked, setChecked] = useState<boolean>(data.isDone);

    const onCheck = () => {
        const task = tasks.filter((item: TaskProps) => item.id === data.id)[0];

        completeTask({ task });
        setChecked(!checked);
    }

    return (
        <Pressable onPress={onCheck}>
            <HStack marginTop={2} alignItems="center" flexWrap="wrap">
                <Pressable 
                    width="4"
                    height="4"
                    backgroundColor={checked ? "blue.300" : "gray.100"}
                    rounded="full"
                    borderWidth={1}
                    borderColor="blue.300"
                    marginBottom={2}
                    onPress={onCheck}
                />

                <Text fontSize="md" marginLeft={2}>{data.name}</Text>

                <Flag date={data.expirationDate} />
            </HStack>
        </Pressable>
    );
}

export default Task;