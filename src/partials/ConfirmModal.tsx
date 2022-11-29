import React from 'react';
import { Heading, HStack } from 'native-base';

import ModalShape, { GenericModalProps } from '../components/Modal';
import Button from '../components/Button';

interface ConfirmModalProps extends GenericModalProps {
    text: string;
    setConfirmation: (confirm: boolean) => void;
}

const ConfirmModal = ({ visible, setVisible, text, setConfirmation }: ConfirmModalProps) => {

    const handleConfirm = () => {
        setConfirmation(true);
        setVisible(false);
    }

    const handleCancel = () => {
        setConfirmation(false);
        setVisible(false);
    }

    return (
        <ModalShape visible={visible} setVisible={setVisible}>
            <Heading fontSize="sm">{text}</Heading>

            <HStack width="full" justifyContent="space-between" marginTop={4}>
                <Button text='CANCELAR' onPress={handleCancel} color="red.700" />
                <Button text='CONFIRMAR' onPress={handleConfirm} />
            </HStack>
        </ModalShape>
    );
}

export default ConfirmModal;