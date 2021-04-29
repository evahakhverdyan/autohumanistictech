import React, { useState, useEffect } from 'react';
import { TextInput, View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { Toast } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { setUnaccountUser, signInUser } from '../../redux/actions/User';
import SpinnerBlue from '../../components/Spinner';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const currentUser = useSelector(state => state.user.currentUser);

    const dispatch = useDispatch();

    const onSignIn = async () => {
        setIsLoading(true);
        await dispatch(signInUser(login, password));
        setIsLoading(false);
        setIsLogin(true);
    }

    useEffect(() => {
        let mounted = true;
        if(isLogin && !currentUser){
            if(mounted) {
                Toast.show({
                    text: 'Неправильный телефон или пароль!',
                    buttonText: 'Х',
                    duration: 5000,
                    type: 'danger'
                });
                setIsLogin(false);
            }
        }
        return () => mounted = false;

    }, [isLogin, currentUser]);

    const onSignInWithoutAccount = async () => dispatch(setUnaccountUser())

    return (
             <View style={styles.container}>
                <Image style={styles.image} source={require("../../assets/kurs_logo_w.png")} />
                <Text style={styles.title} >ХОЧУ ВОДИТЬ</Text>
                 {
                     isLoading
                         ? <View style={styles.spiner}><SpinnerBlue /></View>
                         : <>
                             <View key={'phone'} style={styles.inputView}>
                                 <TextInput
                                     style={styles.TextInput}
                                     placeholder="Телефон"
                                     onChangeText={(login) => setLogin(login)}
                                 />
                             </View>
                             <View key={'password'} style={styles.inputView}>
                                 <TextInput
                                     style={styles.TextInput}
                                     placeholder="Пароль"
                                     secureTextEntry={true}
                                     onChangeText={(password) => setPassword(password)}
                                 />
                             </View>
                             <TouchableOpacity key={'signOn'} style={styles.loginBtn} onPress={onSignIn}>
                                 <Text style={styles.loginText}>Войти</Text>
                             </TouchableOpacity>
                             <TouchableOpacity key={'sign'} onPress={onSignInWithoutAccount}>
                                 <Text style={styles.unAccount}>Войти как незарегестрированный пользователь</Text>
                             </TouchableOpacity>
                         </>
                 }
            </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    spiner: {
        width: "70%",
        height: 200,
        marginBottom: 20,
        alignItems: "center",
    },
    title: {
        marginBottom: 40,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#007bff'
    },
    image: {
        marginBottom: 40,
        width: 100,
        height: 100
    },
    inputView: {
        borderRadius: 5,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 1,
    },
    TextInput: {
        height: 50,
        width: "100%",
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    unAccount: {
        height: 30,
        marginTop: 40,
        marginBottom: 30,
        color: "#007bff"
    },
    loginBtn: {
        width: "70%",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#007bff",
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})
