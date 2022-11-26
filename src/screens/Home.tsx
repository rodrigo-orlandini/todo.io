import React from 'react';
import { AddIcon, FlatList, Heading, HStack, VStack, Text, Divider } from 'native-base';

import Header from '../components/Header';
import Body from '../components/Body';
import Folder from '../components/Folder';
import EmptyFolder from '../components/EmptyFolder';
import Button from '../components/Button';
import Loading from '../components/Loading';

import { FolderProps } from '../models/folder';

import { useRealm } from '../hooks/useRealm';

const Home = () => {

    const { isLoading, folders } = useRealm();

    return (
        <VStack flex={1}>
            <Header />

            <Body>
                <HStack justifyContent="space-between">
                    <Heading fontSize="xl">Minhas pastas</Heading>

                    <HStack alignItems="center">
                        <AddIcon color="gray.900" size="4" />
                        <Text fontSize="md" marginLeft={6} color="gray.900">{ folders.length || 0 }</Text>
                    </HStack>
                </HStack>

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
                                />
                            )}
                            ListEmptyComponent={() => <EmptyFolder />}
                            showsVerticalScrollIndicator={false}
                        />
                    </VStack>
                )}

                <Button 
                    text='Ver meu desempenho'
                    onPress={() => console.log("DESEMPENHO")}
                />
            </Body>
        </VStack>
    );
}

export default Home;