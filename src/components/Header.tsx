import React from 'react';
import { Heading, useTheme } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const Header = () => {

    const { colors, sizes } = useTheme();

    return (
        <LinearGradient 
            testID='background' 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            colors={[colors.darkBlue[700], colors.darkBlue[600]]}
            style={{ height: sizes[32], padding: sizes[8] }}
        >
            <Heading
                fontSize="xl"
                color="white"
            >
                todo.io
            </Heading>
        </LinearGradient>
    );
}

export default Header;