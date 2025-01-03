import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold } from '@expo-google-fonts/nunito';

const logoIcon = require("../assets/images/tpIcon.png");
const testPic = require("../assets/images/testpic.jpg");
const roundIcon = require("../assets/images/roundIcon.png");
import HidePass from "../assets/images/hidepwd.svg";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Index() {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_600SemiBold,
    Nunito_400Regular,
  });

  const [isChecked, setIsChecked] = useState(false);
  const [passShown, setPassShown] = useState(false);
  const [loginToggle, setLoginToggle] = useState(0);
  const loginAnim = new Animated.Value(0);
  const fadeLoginAnim = new Animated.Value(1);
  const fadeRegAnim = new Animated.Value(0);

  useEffect(() => {
      loginAnim.setValue((1 - loginToggle) * (-0.09 * vh));
      Animated.timing(loginAnim, {
        toValue: loginToggle * (-0.09 * vh),
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, [loginToggle]);
  
    useEffect(() => {
      fadeLoginAnim.setValue(loginToggle);
      fadeRegAnim.setValue(1 - loginToggle);
      Animated.timing(fadeLoginAnim, {
        toValue: 1 - loginToggle,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      Animated.timing(fadeRegAnim, {
        toValue: loginToggle,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, [loginToggle]);

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <Animated.View style={{
          width: vw,
          height: 'auto',
          transform: [{ translateY: loginAnim, }]
        }}>
          <Animated.View style={[styles.views, { opacity: fadeLoginAnim }]}>
            <View style={styles.login_title}>
              <Image source={roundIcon} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
              <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>It's time to cook!</Text>
              <Text style={{ fontSize: 0.02 * vh, fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>Log in with your credentials</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.input_title}>College email</Text>
                <View style={[styles.input_form, { width: '100%' }]}>
                  <TextInput style={styles.input_text}></TextInput>
                </View>
              </View>
              <View style={styles.input}>
                <Text style={styles.input_title}>Password</Text>
                <View style={[styles.input_form, { paddingRight: 5 }]}>
                  <TextInput style={[styles.input_text, { width: 0.9 * vw - 0.06 * vh - 25, }]}></TextInput>
                  <TouchableOpacity style={[styles.input_form, { width: 0.06 * vh, height: 0.06 * vh, padding: 0, justifyContent: 'center' }]} onPress={() => { setPassShown(!passShown) }}>
                    {!passShown && (<HidePass width={0.02 * vh} height={0.02 * vh} />)}
                    {passShown && (<HidePass width={0.02 * vh} height={0.02 * vh} />)}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.remember}>
                <TouchableOpacity style={styles.check} onPress={() => { setIsChecked(!isChecked) }}>
                  <TouchableOpacity style={[styles.checkbox, (isChecked) ? { backgroundColor: '#448D57' } : { backgroundColor: '#FFFFFF' }]} onPress={() => { setIsChecked(!isChecked) }}></TouchableOpacity>
                  <Text style={[styles.input_title, { fontSize: 0.015 * vh, lineHeight: 0.018 * vh, }]}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.green_text_btn}>
                  <Text style={[styles.input_title, { fontSize: 0.015 * vh, lineHeight: 0.018 * vh, color: '#448D57', }]}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57', height: 0.06 * vh, marginTop: 0.04 * vh, marginBottom: -0.02 * vh, }]}>
                <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Log In</Text>
              </TouchableOpacity>
              <View style={{
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: vw,
                gap: 5,
                marginTop: 16,
              }}>
                <Text style={{
                  fontFamily: 'Nunito_600SemiBold',
                  fontSize: 0.02 * vh,
                  lineHeight: 0.03 * vh,
                }}>First time in the field?</Text>
                <TouchableOpacity onPress={() => { setLoginToggle(1) }}>
                  <Text style={{
                    fontFamily: 'Nunito_600SemiBold',
                    fontSize: 0.02 * vh,
                    lineHeight: 0.03 * vh,
                    color: '#448D57',
                  }}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
          <Animated.View style={[styles.views, { opacity: fadeRegAnim, marginTop: -0.91 * vh, }]}>
            <View style={styles.login_title}>
              <Image source={roundIcon} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
              <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>Howdy, Friend</Text>
              <Text style={{ fontSize: 0.02 * vh, fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>Create your farmer's identity</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.input_title}>Username</Text>
                <View style={[styles.input_form, { width: '100%' }]}>
                  <TextInput style={styles.input_text} placeholder="coolfarmer"></TextInput>
                </View>
              </View>
              <View style={styles.input}>
                <Text style={styles.input_title}>College email</Text>
                <View style={[styles.input_form, { width: '100%' }]}>
                  <TextInput style={styles.input_text} placeholder="farmer@yourschool.edu"></TextInput>
                </View>
              </View>
              <View style={styles.input}>
                <Text style={styles.input_title}>Password</Text>
                <View style={[styles.input_form, { paddingRight: 5 }]}>
                  <TextInput style={[styles.input_text, { width: 0.9 * vw - 0.06 * vh - 25, }]}></TextInput>
                  <TouchableOpacity style={[styles.input_form, { width: 0.06 * vh, height: 0.06 * vh, padding: 0, justifyContent: 'center' }]} onPress={() => { setPassShown(!passShown) }}>
                    {!passShown && (<HidePass width={0.02 * vh} height={0.02 * vh} />)}
                    {passShown && (<HidePass width={0.02 * vh} height={0.02 * vh} />)}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.input}>
                <Text style={styles.input_title}>Retype Password</Text>
                <View style={[styles.input_form, { width: '100%' }]}>
                  <TextInput style={styles.input_text}></TextInput>
                </View>
              </View>
              <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57', height: 0.06 * vh, marginTop: 0.02 * vh, marginBottom: -0.018 * vh, }]}>
                <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Create Account</Text>
              </TouchableOpacity>
              <View style={{
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                width: vw,
                gap: 5,
                marginTop: 16,
              }}>
                <Text style={{
                  fontFamily: 'Nunito_600SemiBold',
                  fontSize: 0.02 * vh,
                  lineHeight: 0.03 * vh,
                }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => { setLoginToggle(0) }}>
                  <Text style={{
                    fontFamily: 'Nunito_600SemiBold',
                    fontSize: 0.02 * vh,
                    lineHeight: 0.03 * vh,
                    color: '#448D57',
                  }}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    );
  } else {
    return (<View></View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: vw,
    height: vh,
  },
  views: {
    width: vw,
    height: vh,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  login_title: {
    width: vw,
    height: 0.2 * vh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: vw,
    height: 'auto',
    marginTop: 0.02 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    width: 0.9 * vw,
    height: 0.1 * vh,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
  input_title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 0.022 * vh,
    lineHeight: 0.025 * vh,
  },
  input_form: {
    height: 0.06 * vh,
    backgroundColor: '#F6F8F9',
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_text: {
    height: '100%',
    width: '100%',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 0.018 * vh,
  },
  remember: {
    width: 0.9 * vw,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  check: {
    width: 'auto',
    height: 0.018 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 10,
    width: 0.018 * vh,
    height: 0.018 * vh,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 3,
    marginTop: -1,
  },
  green_text_btn: {
    width: 'auto',
    height: '100%',
    backgroundColor: 'transparent',
  },
  button: {
    width: 0.2 * vh,
    height: 0.2 / 3 * vh,
    borderRadius: 0.2 * vw,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0.005 * vh,
  },
  button_login: {
    width: 0.02 * vw + 0.4 * vh,
    height: 0.2 / 3 * vh,
    borderRadius: 0.2 * vw,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0.005 * vh,
  },
  button_text: {
    fontSize: 0.022 * vh,
    lineHeight: 0.025 * vh,
    fontFamily: 'Nunito_800ExtraBold',
  }
});