import React, { useEffect } from "react";
import { NativeBaseProvider, StatusBar } from 'native-base';
import RNBootSplash from 'react-native-bootsplash';

import Home from "./screens/Home";

import { RealmContextProvider } from "./contexts/RealmContext";

import { THEME } from "./style/theme";

const App = () => {

	const init = () => {
		RNBootSplash.hide({ fade: true });
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<RealmContextProvider>
			<NativeBaseProvider theme={THEME}>
				<StatusBar 
					barStyle="light-content"
					backgroundColor="transparent"
					translucent={true}
				/>
					<Home />
			</NativeBaseProvider>
		</RealmContextProvider>
	);
}

export default App;