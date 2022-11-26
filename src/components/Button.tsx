import React from "react";
import { Pressable, Heading, useTheme } from 'native-base';

interface ButtonProps {
    text: string;
    onPress: () => void;
}

const Button = ({ text, onPress }: ButtonProps) => {

    const { colors } = useTheme();

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

export default Button;