import React from 'react';
import { Heading, HStack, useToast } from 'native-base';

import ModalShape, { GenericModalProps } from '../components/Modal';
import Input, { GenericInputProps } from '../components/Input';
import SecondaryButton from '../components/SecondaryButton';

import { useRealm } from '../hooks/useRealm';

interface CreateFolderModalProps extends GenericModalProps, GenericInputProps {}

const CreateFolderModal = ({ visible, setVisible, value, setValue }: CreateFolderModalProps) => {

    const { createFolder } = useRealm();
    const toast = useToast();

    const handleCreateFolder = () => {
        if(value.trim().length === 0) {
            return toast.show({
                title: "Dê um nome para sua pasta.",
                placement: "top",
                backgroundColor: "red.700"
            });
        }

        createFolder({ name: value });
        setValue("");
        setVisible(false);
    }

    return (
        <ModalShape visible={visible} setVisible={setVisible}>
            <Heading fontSize="sm" color="darkBlue.700" marginBottom={2}>NOME DA PASTA</Heading>

            <Input value={value} setValue={setValue} placeholder='Nome da pasta'/>

            <HStack width="full" justifyContent="flex-end">
                <SecondaryButton text="CRIAR" onPress={handleCreateFolder} icon="go" />
            </HStack>
        </ModalShape>
    );
}

export default CreateFolderModal;