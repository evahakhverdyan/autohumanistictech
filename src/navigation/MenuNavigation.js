import React, { useRef } from 'react';
import Menu, { MenuItem } from 'react-native-material-menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { clearUser } from '../redux/actions/User';
import { useDispatch } from 'react-redux';

const MenuNavigation = ({ color }) => {

    const dispatch = useDispatch();
    const menu = useRef();

    const hideMenu = () => menu.current.hide();

    const showMenu = () => menu.current.show();

    const signOut = async () => {
        hideMenu();
        await dispatch(clearUser());
    }

    return (
        <View style={styles.container}>
            <Menu style={styles.menuV}
                  ref={menu}
                  button={
                      <MaterialCommunityIcons name='menu' color={color} size={26}
                            onHidden={hideMenu}
                            onPress={showMenu}
                      />
                  }>
                <MenuItem
                    children={
                        <View style={styles.logOut}>
                            <MaterialCommunityIcons name='logout' color='#fff' size={20}/>
                            <Text style={styles.menuText}>Выйти</Text>
                        </View>}
                    onPress={signOut} />
            </Menu>
        </View>
    )
}
export default MenuNavigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuV: {
        flex: 1,
        backgroundColor: '#007bff',
        borderRadius: 5,
        height: 50
    },
    logOut: {
        flexDirection: 'row',
        paddingTop: Platform.select({ ios: 5}),
        paddingLeft: Platform.select({ ios: 15})
    },
    menuText: {
        marginLeft: 15,
        fontSize: 17,
        color: '#fff'
    },

});
