import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import routes from '../constants/routes';

import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routes.HOME} component={Home} />
        </Stack.Navigator>
    );
}

export default Router;