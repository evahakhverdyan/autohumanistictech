import React, {useState, useRef, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Root } from 'native-base';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import { AUTO_AMO_URL } from '../config';
import { fetchUser } from '../redux/actions/User';

import BottomNavigation from '../navigation/BottomNavigation';
import Tickets from './main/Tickets';
import MenuNavigation from '../navigation/MenuNavigation'
import MyErrorDetail from './statistic/MyErrorDetail';
import Login from './auth/Login';
import Exam from './exam/Exam';
import Chat from './main/Chat';
import SpinnerBlue from '../components/Spinner';

const Stack = createStackNavigator();

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [unReadMessage, setUnReadMessage] = useState(0);
    const currentUser = useSelector(state => state.user.currentUser);

    const webRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        if(mounted) {
            const getUser = async () => {
                setIsLoading(true);
                await dispatch(fetchUser());
                setIsLoading(false);
            };
            getUser();
        }

        return () => mounted = false;
    }, [dispatch]);

    const onMessage = (event) => {
        if (event && event.nativeEvent && event.nativeEvent.data) {
            try {
                const result = JSON.parse(event.nativeEvent.data);

                if (result && result['method'] && result['method'] === 'badge'){
                    setUnReadMessage(result['count']);
                }
            }
            catch (e) {}
        }
    }

    return (
        isLoading
            ?  <SpinnerBlue />
            : <Root>
                <NavigationContainer >
                    {
                        currentUser?
                            <Stack.Navigator>
                                <Stack.Screen
                                    name={currentUser && currentUser.id ? "Мои данные": 'Уроки'}
                                    options={({ route, color, navigation }) => ({
                                        headerTitle:  getFocusedRouteNameFromRoute(route),
                                        headerRight: () => <MenuNavigation color={color} navigation={navigation} />

                                    })}>
                                    {props => <BottomNavigation
                                        {...props}
                                        currentUser={currentUser}
                                        unReadMessage={unReadMessage}
                                        webRef={webRef}
                                    /> }
                                </Stack.Screen>
                                <Stack.Screen name="Tickets" component={Tickets} />
                                <Stack.Screen name='MyErrorDetail' component={MyErrorDetail} />
                                <Stack.Screen name='Exam' component={Exam} />
                                <Stack.Screen name='Chat' component={Chat} />
                            </Stack.Navigator>
                            :
                            <Stack.Navigator initialRouteName="Login">
                                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                            </Stack.Navigator>
                    }
                </NavigationContainer>
                {
                    currentUser && <View style={{ width: 0, height: 0}}>
                        <WebView
                            style={{flex:1, width: 0, height: 0}}
                            ref={webRef}
                            scalesPageToFit
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            bounces={false}
                            startInLoadingState={true}
                            source={{uri: `${AUTO_AMO_URL}/chat.html` }}
                            onMessage={onMessage}
                        />
                    </View>
                }
            </Root>
    );
}

export default Main;
