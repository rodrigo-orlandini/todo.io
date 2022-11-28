import React, { useState } from 'react';
import { Divider, FlatList, Heading, HStack, Pressable, Text, useTheme, useToast } from 'native-base';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import ModalShape, { GenericModalProps } from '../components/Modal';
import Input, { GenericInputProps } from '../components/Input';
import SecondaryButton from '../components/SecondaryButton';

import { useRealm } from '../hooks/useRealm';

interface CreateTaskModalProps extends GenericModalProps, GenericInputProps {
    folderId: number;
}

const CreateTaskModal = ({ visible, setVisible, value, setValue, folderId }: CreateTaskModalProps) => {

    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const current = new Date();

    const { createTask } = useRealm();
    const toast = useToast();

    const [selectedDate, setSelectedDate] = useState<string[]>([]);
    const [expirationDate, setExpirationDate] = useState<Date>(current);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const sortDaysInArray = () => {
        const today = dayjs(new Date()).locale(ptBR).format('ddd').toUpperCase();
        const index = days.indexOf(today);

        let sortedDays = [];
        for(let i = 0; i < 7; i++) {
            let addIndex = index + i;
            
            if(addIndex >= 7) {
                addIndex = addIndex - 7;
            }

            sortedDays.push(days[addIndex]);
        }

        return sortedDays;
    }

    const handleDaySelection = (day: string) => {
        if(selectedDate.includes(day)) {
            setSelectedDate(selectedDate.filter((item) => item !== day));
        } else {
            setSelectedDate([...selectedDate, day]);
        }
        setExpirationDate(current);
    }

    const handleClear = () => {
        setExpirationDate(current);
        setValue("");
        setSelectedDate([]);
    }

    const handleSelectDate = (event: DateTimePickerEvent, date: Date | undefined) => {
        setShowCalendar(false);
        
        const { type } = event;
        if(type === "set" && date) {
            date.setMilliseconds(0);

            setExpirationDate(date);
            setSelectedDate([]);
        }
    }

    const handleCreateTask = () => {
        if(value.trim().length === 0) {
            return toast.show({
                title: "Dê um nome para sua tarefa.",
                placement: "top",
                backgroundColor: "red.700",
            });
        }
        
        let frequency = 'once';
        
        if(selectedDate.length === 7) {
            frequency = 'daily';
        } else if(selectedDate.length !== 0) {
            frequency = selectedDate.sort((a, b) => days.indexOf(a) - days.indexOf(b)).join(',');
        }

        if(frequency === 'once' && expirationDate.getMilliseconds() !== 0) {
            return toast.show({
                title: "Escolha uma data ou repetições semanais para sua tarefa.",
                placement: "top",
                backgroundColor: "red.700"
            });
        }

        createTask({ 
            name: value,
            frequency,
            expirationDate,
            folderId 
        });

        setExpirationDate(current);
        setSelectedDate([]);
        setValue("");
        setVisible(false);
    }

    return (
        <ModalShape visible={visible} setVisible={setVisible}>
            <Heading fontSize="sm" color="darkBlue.700" marginBottom={2}>NOME DA TAREFA</Heading>

            <Input value={value} setValue={setValue} placeholder='Nome da pasta'/>

            <Heading fontSize="sm" color="darkBlue.700" marginTop={4}>
                DATA
                <Text fontSize="xs" fontFamily="body"> (semanal)</Text>
            </Heading>

            <HStack marginTop="2">
                <FlatList 
                    data={sortDaysInArray()}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <Pressable
                            backgroundColor={selectedDate.includes(item) ? "darkBlue.700" : "blue.500"}
                            justifyContent="center" 
                            alignItems="center" 
                            paddingX="3"
                            paddingY="2"
                            marginRight="2"
                            rounded="xl"
                            _pressed={{ opacity: 0.9 }}
                            onPress={() => handleDaySelection(item)}
                        >
                            <Heading 
                                color={selectedDate.includes(item) ? "white" : "darkBlue.700"}
                                fontSize="sm"
                            >
                                { item }
                            </Heading>
                        </Pressable>
                    )}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </HStack>

            <HStack width="full" justifyContent="center" alignItems="center" marginTop={4}>
                <Divider width="1/3" />
                <Heading fontSize="sm" marginX={2}>OU</Heading>
                <Divider width="1/3" />
            </HStack>

            <HStack width="full" justifyContent="space-between" flexWrap="wrap" marginBottom={6}>
                <SecondaryButton 
                    text={expirationDate.getMilliseconds() === 0 ? 
                        dayjs(expirationDate).locale(ptBR).format("DD[/]MM[/]YY") :
                        "SELECIONAR DATA"
                    } 
                    icon="calendar"
                    onPress={() => setShowCalendar(true)} 
                />
                <SecondaryButton text="LIMPAR" onPress={handleClear} icon="close" color='red.700'/>
            </HStack>

            <HStack width="full" justifyContent="flex-end">
                <SecondaryButton text="CRIAR" onPress={handleCreateTask} icon="go" />
            </HStack>

            {showCalendar && (
                <DateTimePicker 
                    value={expirationDate}
                    onChange={handleSelectDate}
                    minimumDate={current}
                    mode="date"
                />
            )}
        </ModalShape>
    );
}

export default CreateTaskModal;