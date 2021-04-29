import React, { useState, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { emptyScreen } from '../helper'

import Profile from '../screens/main/Profile';
import Lessons from '../screens/main/Lessons';
import TopNavigation from './TopNavigation';
import StatisticNavigation from './StatisticNavigation';
import Topics from '../screens/main/Topics';
import { View, Text,  StyleSheet } from 'react-native';
import { Badge } from 'native-base';

const Tab = createBottomTabNavigator();

const BottomNavigation = ({ currentUser, unReadMessage, webRef }) => {

    return (
        <Tab.Navigator>
            {
                currentUser.id  && <Tab.Screen
                    name="Мои данные"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ color, size}) => (
                            <MaterialCommunityIcons name='account-box' color={color} size={26} />
                        )}}
                />
            }
            <Tab.Screen
                name="Уроки"
                component={Lessons}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name='car' color={color} size={26} />
                    )}}
            />
            <Tab.Screen
                name="Билеты"
                component={Topics}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name='book-open-page-variant' color={color} size={26} />
                    )}}
            />
            <Tab.Screen
                name="Результаты"
                component={StatisticNavigation}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name='chart-bar' color={color} size={26} />
                    )}}
            />
            {
                currentUser.id && <Tab.Screen
                    name="Экзамен"
                    component={TopNavigation}
                    options={{
                        tabBarIcon: ({color}) => (
                            <MaterialCommunityIcons name="school" color={color} size={26}/>
                        )}}
                />
            }
            <Tab.Screen
                name="Поддержка"
                component={emptyScreen}
                listeners={({navigation}) => ({
                    tabPress: (event) => {
                        if(webRef){
                            webRef.current.postMessage('readMessages');
                        }
                        event.preventDefault();
                        navigation.navigate('Chat');
                    }
                })}
                options={{
                    tabBarIcon: ({ color, focused, size}) => (
                        <View style={{flexDirection: 'row'}}>
                            <Ionicons name='ios-help-buoy' color={color} size={26} />
                            { unReadMessage > 0 && <Badge style={styles.unReadBadge}><Text style={{ color: 'white', fontSize: 10}}>{unReadMessage}</Text></Badge>
                            }
                        </View>
                    )}}
            />
        </Tab.Navigator>
    );
}
export default BottomNavigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    unReadBadge: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        position:'absolute',
        right: -8,
        zIndex:1,
        height:17,
        width:17
    },
    centeredView: {
        height: "100%",
        width: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
});

/*
<Tab.Screen
                name="Мои ошибки"
                component={MyErrors}
                options={{
                    tabBarIcon: ({ color, size}) => (
                        <Ionicons name='md-warning' color={color} size={26} />
                    )}}
            />
 */
