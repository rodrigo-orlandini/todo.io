import React from 'react';
import { Center, Text } from 'native-base';

const EmptyTask = () => {
    return (
        <Center marginTop={4}>
            <Text textAlign="center" fontSize="xs" color="gray.900">
                Adicione tarefas a esta pasta tocando em '+'.
            </Text>
        </Center>
    );
}

export default EmptyTask;