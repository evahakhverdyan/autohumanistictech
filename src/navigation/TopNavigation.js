import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExamAttempt from '../screens/exam/ExamAttempt';
import Exam from '../screens/exam/Exam';
import { emptyScreen } from '../helper'

const Tab = createMaterialTopTabNavigator();

const TopNavigation =() => {
    return (
        <Tab.Navigator swipeEnabled={false}>
            <Tab.Screen name="Экзамен автошколы" component={ExamAttempt} />
            <Tab.Screen name="Пробный Экзамен" component={emptyScreen}
                listeners={({navigation}) => ({
                    tabPress: (event) => {
                        event.preventDefault();
                        navigation.navigate('Exam', { internal: false });
                    }
                })}
            />
        </Tab.Navigator>
    );
}

export default TopNavigation;
