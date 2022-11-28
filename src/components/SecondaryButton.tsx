
import React from "react";
import { Pressable, Heading, ChevronRightIcon, CloseIcon } from 'native-base';

import CalendarIcon from '../assets/Calendar.svg';

interface SecondaryButtonProps {
    text: string;
    onPress: () => void;
    icon?: "go" | "calendar" | "close";
    color?: "white" | "red.700";
}

const SecondaryButton = ({ text, onPress, icon, color="white" }: SecondaryButtonProps) => {
    return (
        <Pressable 
            backgroundColor={color === "white" ? "darkBlue.700" : "red.500"}
            justifyContent="center" 
            alignItems="center" 
            marginTop={4}
            paddingX="3"
            paddingY="2"
            rounded="xl"
            shadow={1}
            flexDirection="row"
            _pressed={{ opacity: 0.9 }}
            onPress={onPress}
        >
            <Heading fontSize="sm" color={color}>{text}</Heading>

            {icon === "go" && (
                <ChevronRightIcon color={color} size="4" marginLeft="3" />
            )}
            {icon === "close" && (
                <CloseIcon color={color} size="4" marginLeft="3" />
            )}
            {icon === "calendar" && (
                <CalendarIcon color={color} width={16} height={16} style={{ marginLeft: 12 }} />
            )}
        </Pressable>
    );
}

export default SecondaryButton;