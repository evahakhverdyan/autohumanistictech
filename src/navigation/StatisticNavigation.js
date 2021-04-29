import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyErrors from '../screens/statistic/MyErrors';
import Statistic from '../screens/statistic/Statistic';

const Tab = createMaterialTopTabNavigator();

const StatisticNavigation =() => {
    return (
        <Tab.Navigator swipeEnabled={false}>
            <Tab.Screen name="Ошибки" component={MyErrors} />
            <Tab.Screen name="Статистика" component={Statistic} />
        </Tab.Navigator>
    );
}

export default StatisticNavigation;
