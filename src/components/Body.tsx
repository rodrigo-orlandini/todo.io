import React, { ReactNode } from 'react';
import { VStack } from 'native-base';

interface BodyProps {
    children: ReactNode;
}

const Body = ({ children }: BodyProps) => {

    return (
        <VStack 
            testID='body'
            borderTopRadius='3xl'
            backgroundColor="white"
            padding="8"
            marginTop={-30}
            flex={1}
        >
            {children}
        </VStack>
    );
}

export default Body;