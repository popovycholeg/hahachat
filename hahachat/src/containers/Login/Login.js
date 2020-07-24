import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18next from 'i18next';

// import { HOST } from 'react-native-dotenv'
import {styles} from './styles';
import LoginCard from '../../components/LoginCard/LoginCard';
import LanguageButton from '../../components/LanguageButton/LanguageButton';
// import Loader from './сomponents/Loader';

const LoginScreen = (props) => {
  const [userName, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const logRegWidth =  (Math.round(Dimensions.get('window').width) * 0.8) * 0.6;

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    const dataToSend = { username: "admin", password: "admin" };

    fetch(`${global.HOST}/api/token/login/`, {
      method: 'POST',
      body: dataToSend,
    }).then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 1) {
          AsyncStorage.setItem('token', responseJson.auth_token);
          // props.navigation.navigate('Chat');
        } else {
          setErrortext('Please check your email id or password');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <ImageBackground
      source={require('../../images/base.png')}
      style={styles.bgImage}>
      {/* <Loader loading={loading} /> */}
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <Image
            source={{uri: '../../images/logo.png'}} // https://reactjs.org/logo-og.png // TODO
            style={{width: "80%", height: 100, borderWidth: 1, borderColor: "red", alignSelf: "center"}}
          />
          <LoginCard>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder={i18next.t("Nickname")}
                placeholderTextColor="#000"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder={i18next.t("Password")}
                placeholderTextColor="#000"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <LanguageButton lang='En' size={{height: 55, width: 55}}/>
              <LanguageButton lang='Ua' size={{height: 55, width: 55}}/>
              <LanguageButton lang='Ru' size={{height: 55, width: 55}}/>
            </View>
            <View style={styles.logReg}>
              <LanguageButton 
                lang={i18next.t("Enter")} 
                size={{height: 35, width: logRegWidth}} 
                onPress={() => handleSubmitPress()}/>
            </View>
            <View style={styles.logReg}>
              <LanguageButton 
                lang={i18next.t("Registration")} 
                size={{height: 35, width: logRegWidth}} 
                onPress={() => props.navigation.navigate("Register")}/>
            </View>
          </LoginCard>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};
export default LoginScreen;
