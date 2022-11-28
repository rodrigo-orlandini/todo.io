import React from "react";
import { Pressable, Heading } from 'native-base';

interface PrimaryButtonProps {
    text: string;
    onPress: () => void;
}

const PrimaryButton = ({ text, onPress }: PrimaryButtonProps) => {
    return (
        <Pressable 
            backgroundColor="darkBlue.700" 
            justifyContent="center" 
            alignItems="center" 
            width="full" 
            paddingY="4"
            rounded="xl"
            shadow={2}
            _pressed={{ width: '99%', marginLeft: 'px', opacity: 0.9 }}
            onPress={onPress}
        >
            <Heading fontSize="md" color="white">{text}</Heading>
        </Pressable>
    );
}

export default PrimaryButton;