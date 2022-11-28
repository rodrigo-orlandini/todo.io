import React, { ReactNode } from 'react';
import { Box, Modal } from 'native-base';

import IconButton from './IconButton';

export interface GenericModalProps {
    visible: boolean;
    setVisible: (visibility: boolean) => void;
}

interface ModalProps extends GenericModalProps{
    children: ReactNode;
}

const ModalShape = ({ visible, setVisible, children }: ModalProps) => {

    return (
        <Modal 
            flex={1} 
            justifyContent="center" 
            alignItems="center" 
            width="full"
            height="full"
            isOpen={visible} 
            onClose={() => setVisible(false)}
            size="lg"
        >
            <Modal.Content
                borderRadius="3xl"
                backgroundColor="white"
            >
                <IconButton 
                    iconName='back' 
                    onPress={() => setVisible(false)}
                    style={{ marginTop: 8, marginLeft: 8 }}
                />
                
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}

export default ModalShape;