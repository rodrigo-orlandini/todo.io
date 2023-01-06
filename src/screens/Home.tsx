import React, { useState } from 'react';
import { FlatList, Heading, HStack, VStack, Text, Divider, Pressable } from 'native-base';

import Header from '../components/Header';
import Body from '../components/Body';
import Folder from '../components/Folder';
import EmptyFolder from '../partials/EmptyFolder';
import Loading from '../components/Loading';
import IconButton from '../components/IconButton';

import CreateFolderModal from '../partials/CreateFolderModal';
import CreateTaskModal from '../partials/CreateTaskModal';

import { FolderProps } from '../models/folder';

import { useRealm } from '../hooks/useRealm';

const Home = () => {

    const { isLoading, folders } = useRealm();

    const [createFolderModalVisibility, setCreateFolderModalVisibility] = useState<boolean>(false);
    const [createFolderName, setCreateFolderName] = useState<string>('');

    const [createTaskModalVisibility, setCreateTaskModalVisibility] = useState<boolean>(false);
    const [createTaskName, setCreateTaskName] = useState<string>('');

    const [folderId, setFolderId] = useState<number>(0);

    return (
        <VStack flex={1}>
            <Header />

            <Body>
                <Pressable
                    onPress={() => setCreateFolderModalVisibility(true)}
                    _pressed={{ opacity: 0.5 }}
                >
                    <HStack justifyContent="space-between">
                        <Heading fontSize="xl">Minhas pastas</Heading>

                        <HStack alignItems="center">
                            <IconButton iconName='add' onPress={() => setCreateFolderModalVisibility(true)}/>

                            <Text fontSize="md" marginLeft={6} color="gray.900">{ folders.length || 0 }</Text>
                        </HStack>
                    </HStack>
                </Pressable>

                <Divider color="darkBlue.700" marginTop={5} marginBottom={8} />

                {isLoading ? (
                    <Loading />
                ) : (
                    <VStack flex={1} marginBottom={8}>
                        <FlatList 
                            data={folders}
                            keyExtractor={(item: FolderProps) => String(item.id)}
                            renderItem={({ item }) => (
                                <Folder 
                                    data={item} 
                                    setFolderId={setFolderId}
                                    setCreateTaskModalVisibility={setCreateTaskModalVisibility}
                                />
                            )}
                            ListEmptyComponent={() => <EmptyFolder />}
                            showsVerticalScrollIndicator={false}
                        />
                    </VStack>
                )}
            </Body>

            <CreateFolderModal 
                visible={createFolderModalVisibility}
                setVisible={setCreateFolderModalVisibility}
                value={createFolderName}
                setValue={setCreateFolderName}
            />

            <CreateTaskModal 
                visible={createTaskModalVisibility}
                setVisible={setCreateTaskModalVisibility}
                value={createTaskName}
                setValue={setCreateTaskName}
                folderId={folderId}
            />
        </VStack>
    );
}

export default Home;