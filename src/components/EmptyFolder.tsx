import React from 'react';
import { Center, Text } from 'native-base';

const EmptyFolder = () => {
    return (
        <Center flex={1}>
            <Text textAlign="center" fontSize="md" color="gray.900">
                Você ainda não possui pastas. Toque no ícone '+' para adicionar.
            </Text>
        </Center>
    );
}

export default EmptyFolder;