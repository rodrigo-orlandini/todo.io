import React from 'react';
import { Heading, HStack } from 'native-base';

import ModalShape, { GenericModalProps } from '../components/Modal';
import SecondaryButton from '../components/SecondaryButton';

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
                <SecondaryButton text='CONFIRMAR' onPress={handleConfirm} />
                <SecondaryButton text='CANCELAR' onPress={handleCancel} color="red.700" />
            </HStack>
        </ModalShape>
    );
}

export default ConfirmModal;