import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar } from 'native-base';
import RNBootSplash from 'react-native-bootsplash';

import Router from "./routes/Router";

import { RealmContextProvider } from "./contexts/RealmContext";

const App = () => {

	const init = () => {
		RNBootSplash.hide({ fade: true });
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<RealmContextProvider>
			<NativeBaseProvider>
				<StatusBar 
					barStyle="light-content"
					backgroundColor="transparent"
					translucent={true}
				/>

				<NavigationContainer>
					<Router />
				</NavigationContainer>
			</NativeBaseProvider>
		</RealmContextProvider>
	);
}

export default App;