import React from 'react';
import { Pressable, AddIcon, ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon } from 'native-base';

interface IconButtonProps {
    iconName: "add" | "up" | "down" | "back" ;
    onPress: () => void;
}

const IconButton = ({ iconName, onPress }: IconButtonProps) => {

    return (
        <Pressable 
            testID='icon' 
            onPress={onPress} 
            padding={1}
        >
            { iconName === "add" && (
                <AddIcon color="gray.900" size="4" testID="plus" />
            )}
            { iconName === "up" && (
                <ChevronUpIcon color="gray.900" size="4" testID="arrow" />
            )}
            { iconName === "down" && (
                <ChevronDownIcon color="gray.900" size="4" testID="arrow" />
            )}
            { iconName === "back" && (
                <ChevronLeftIcon color="gray.900" size="4" testID="arrow" />
            )}
        </Pressable>
    );
}

export default IconButton