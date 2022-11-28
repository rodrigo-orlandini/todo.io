import React from 'react';
import { Input as NBInput } from 'native-base';

export interface GenericInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
}

const Input = ({ value, setValue, placeholder="" }: GenericInputProps) => {
    return (
        <NBInput
            borderWidth="0"
            borderRadius="xl"
            backgroundColor="gray.300"
            placeholder={placeholder}
            fontSize="md"
            color="gray.900"
            height={10}
            value={value}
            onChangeText={setValue}
        />
    );
}

export default Input;