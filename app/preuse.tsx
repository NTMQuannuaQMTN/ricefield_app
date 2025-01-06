import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold } from '@expo-google-fonts/nunito';

const logoIcon = require("../assets/images/tpIcon.png");
const testPic = require("../assets/images/testpic.jpg");
const roundIcon = require("../assets/images/roundIcon.png");
import HidePass from "../assets/images/hidepwd.svg";
const hotRice = require("../assets/images/hot-rice.png");

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Index() {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_600SemiBold,
    Nunito_400Regular,
  });

  const [isVisible, setIsVisible] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const movePage = new Animated.Value(0);
  const [key, setKey] = React.useState(1);
  const [keyText, setKeyText] = React.useState("Key highlight 1");
  const [descText, setDescText] = React.useState("Further describe the 1st key highlight in 2 lines");
  const moveAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(1);
  const moveCur = new Animated.Value(0);
  const moveOthers = new Animated.Value(0);
  const [isChecked, setIsChecked] = useState(false);
  const [passShown, setPassShown] = useState(false);
  const [loginToggle, setLoginToggle] = useState(0);
  const loginAnim = new Animated.Value(0);
  const fadeLoginAnim = new Animated.Value(1);
  const fadeRegAnim = new Animated.Value(0);
  const [loginPage, setLoginPage] = useState(0);
  const [forgotPage, setForgotPage] = useState(0);
  const [createPage, setCreatePage] = useState(0);
  const [doneText, setDoneText] = useState("");

  useEffect(() => {
    movePage.setValue(0);
    Animated.timing(movePage, {
      toValue: page * (-vw),
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [page]);

  useEffect(() => {
    if (loginPage == 0) {
      loginAnim.setValue((1 - loginToggle) * (-0.09 * vh));
      Animated.timing(loginAnim, {
        toValue: loginToggle * (-0.09 * vh),
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(loginAnim, {
        toValue: -0.09 * vh - loginPage * vh,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [loginToggle, loginPage]);

  useEffect(() => {
    if (loginPage == 0) {
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
    }
  }, [loginToggle, loginPage]);

  useEffect(() => {
    setLoginPage(0);
  }, [loginToggle]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 1000,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    })
  }, []);

  useEffect(() => {
    Animated.timing(moveAnim, {
      toValue: -vw * (key - 2) * (key - 1) / 2,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [key]);

  useEffect(() => {
    moveCur.setValue(((key + 1) % 3) * (0.016 + 0.028 / 3) * vh);
    Animated.timing(moveCur, {
      toValue: (key - 1) * (0.016 + 0.028 / 3) * vh,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [key])

  useEffect(() => {
    moveOthers.setValue(0);
    Animated.timing(moveOthers, {
      toValue: -(0.016 + 0.028 / 3) * vh,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [key])

  function nextKey() {
    if (key < 3) {
      setKey(key + 1);
      if (key + 1 === 1) {
        setKeyText("Key highlight 1");
        setDescText("Further describe the 1st key highlight in 2 lines");
      } else if (key + 1 === 2) {
        setKeyText("Key highlight 2");
        setDescText("Further describe the 2nd key highlight in 2 lines");
      } else {
        setKeyText("Key highlight 3");
        setDescText("Further describe the 3rd key highlight in 2 lines");
      }
    }
  }

  if (fontsLoaded) {
    return (
      <View
        style={styles.container}>
        {isVisible && (<Animated.View
          style={[styles.views,
          {
            position: 'absolute',
            zIndex: 1,
            backgroundColor: "#448D57",
            opacity: fadeAnim,
          }
          ]}
        >
          <Image source={logoIcon} style={{ width: 0.4 * vw, height: 0.4 * vw }} />
        </Animated.View>)}
        <Animated.View style={{
          width: 2 * vw,
          height: vh,
          flexDirection: "row",
          transform: [{ translateX: movePage }],
        }}>
          <View
            style={[styles.views, { backgroundColor: '#FFFFFF' }]}
          >
            <Image source={testPic} style={{ backgroundColor: '#000000', width: 0.8 * vw, height: 0.6 * vh, objectFit: 'cover' }} />
            <Text id="key_highlight" style={styles.key_highlight}>{keyText}</Text>
            <Text id="desc_highlight" style={styles.desc_highlight}>{descText}</Text>
            <View style={styles.status_cont}>
              <Animated.View style={[styles.status_ele, { right: 3 * (0.016 + 0.028 / 3) * vh - 1, backgroundColor: '#448D57', transform: [{ translateX: moveCur }] }]}></Animated.View>
              <Animated.View style={[styles.status_ele, { right: (key > 2) ? 3 * (0.016 + 0.028 / 3) * vh - 1 : 2 * (0.016 + 0.028 / 3) * vh - 1, backgroundColor: '#FFFFFF', transform: [{ translateX: (key != 2) ? 0 : moveOthers }] }]}></Animated.View>
              <Animated.View style={[styles.status_ele, { right: 1 * (0.016 + 0.028 / 3) * vh - 1, backgroundColor: '#FFFFFF', transform: [{ translateX: (key < 3) ? 0 : moveOthers }] }]}></Animated.View>
            </View>
            <View style={{
              width: vw,
              height: 0.08 * vh,
              overflow: 'hidden',
            }}>
              <Animated.View id="buttons" style={{
                width: 2 * vw,
                height: 0.08 * vh,
                flexDirection: 'row',
                transform: [{ translateX: moveAnim, }]
              }}>
                <View style={styles.button_view}>
                  <TouchableOpacity style={[styles.button, { borderColor: '#448D57', borderWidth: 2 }]}
                    onPress={() => { setPage(1); }}>
                    <Text style={[styles.button_text, { color: '#448D57' }]}>Skip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#448D57' }]} onPress={nextKey}>
                    <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Next</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.button_view}>
                  <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57' }]}
                    onPress={() => { setPage(1); }}>
                    <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Get Started</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </View>
          <Animated.View style={{
            width: vw,
            height: 'auto',
            transform: [{ translateY: loginAnim, }]
          }}>
            <Animated.View style={[styles.views, { opacity: fadeLoginAnim }]}>
              <View style={styles.login_title}>
                <Image source={roundIcon} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
                <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>It's time to cook!</Text>
                <Text style={{ fontSize: 0.02 * vh, textAlign: 'center', fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>Log in with your credentials</Text>
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
                    <TextInput style={[styles.input_text, { width: 0.9 * vw - 0.05 * vh - 25, }]}></TextInput>
                    <TouchableOpacity style={[styles.input_form, { width: 0.05 * vh, height: 0.05 * vh, padding: 0, justifyContent: 'center' }]} onPress={() => { setPassShown(!passShown) }}>
                      {!passShown && (<HidePass width={0.05 / 3 * vh} height={0.05 / 3 * vh} />)}
                      {passShown && (<HidePass width={0.05 / 3 * vh} height={0.05 / 3 * vh} />)}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.remember}>
                  <TouchableOpacity style={styles.check} onPress={() => { setIsChecked(!isChecked) }}>
                    <TouchableOpacity style={[styles.checkbox, (isChecked) ? { backgroundColor: '#448D57' } : { backgroundColor: '#FFFFFF' }]} onPress={() => { setIsChecked(!isChecked) }}></TouchableOpacity>
                    <Text style={[styles.input_title, { fontSize: 0.015 * vh, lineHeight: 0.018 * vh, }]}>Remember me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.green_text_btn}>
                    <Text style={[styles.input_title, { fontSize: 0.015 * vh, lineHeight: 0.018 * vh, color: '#448D57', }]}
                      onPress={() => { setLoginPage(1) }}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57', height: 0.06 * vh, marginTop: 0.04 * vh }]}
                  onPress={() => { setLoginPage(3); setDoneText("Welcome back to Ricefield!"); }}>
                  <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Log In</Text>
                </TouchableOpacity>
                <View style={{
                  height: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: vw,
                  gap: 5,
                  marginTop: -4,
                }}>
                  <Text style={{
                    fontFamily: 'Nunito_600SemiBold',
                    fontSize: 0.016 * vh,
                    lineHeight: 0.03 * vh,
                  }}>First time in the field?</Text>
                  <TouchableOpacity onPress={() => { setLoginToggle(1) }}>
                    <Text style={{
                      fontFamily: 'Nunito_600SemiBold',
                      fontSize: 0.016 * vh,
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
                <Text style={{ fontSize: 0.02 * vh, textAlign: 'center', fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>Create your farmer's identity</Text>
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
                    <TextInput style={[styles.input_text, { width: 0.9 * vw - 0.05 * vh - 25, }]}></TextInput>
                    <TouchableOpacity style={[styles.input_form, { width: 0.05 * vh, height: 0.05 * vh, padding: 0, justifyContent: 'center' }]} onPress={() => { setPassShown(!passShown) }}>
                      {!passShown && (<HidePass width={0.05 / 3 * vh} height={0.05 / 3 * vh} />)}
                      {passShown && (<HidePass width={0.05 / 3 * vh} height={0.05 / 3 * vh} />)}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.input}>
                  <Text style={styles.input_title}>Retype Password</Text>
                  <View style={[styles.input_form, { width: '100%' }]}>
                    <TextInput style={styles.input_text}></TextInput>
                  </View>
                </View>
                <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57', height: 0.06 * vh, marginTop: 0.02 * vh }]}
                  onPress={() => { setLoginPage(2) }}>
                  <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Create Account</Text>
                </TouchableOpacity>
                <View style={{
                  height: 'auto',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: vw,
                  gap: 5,
                  marginTop: -4,
                }}>
                  <Text style={{
                    fontFamily: 'Nunito_600SemiBold',
                    fontSize: 0.016 * vh,
                    lineHeight: 0.03 * vh,
                  }}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => { setLoginToggle(0) }}>
                    <Text style={{
                      fontFamily: 'Nunito_600SemiBold',
                      fontSize: 0.016 * vh,
                      lineHeight: 0.03 * vh,
                      color: '#448D57',
                    }}>Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            <Animated.View style={{
              width: 3 * vw,
              height: vh,
              flexDirection: 'row',
              transform: [{ translateX: - (forgotPage) * vw, }]
            }}>
              <View style={[styles.views,]}>
                <View style={styles.login_title}>
                  <Image source={roundIcon} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
                  <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>Forgot your password?</Text>
                  <Text style={{ fontSize: 0.02 * vh, fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>Don't worry. We got you!</Text>
                </View>
                <View style={styles.form}>
                  <View style={styles.input}>
                    <Text style={styles.input_title}>College email</Text>
                    <View style={[styles.input_form, { width: '100%' }]}>
                      <TextInput style={styles.input_text} placeholder="farmer@yourschool.edu"></TextInput>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57', height: 0.06 * vh, marginTop: 0.028 * vh, marginBottom: -0.02 * vh, }]}
                    onPress={() => { setForgotPage(1) }}>
                    <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.views,]}>
                <View style={styles.login_title}>
                  <TouchableOpacity onPress={() => { setForgotPage(2) }}>
                    <Image source={hotRice} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>Check your inbox!</Text>
                  <Text style={{ fontSize: 0.02 * vh, textAlign: 'center', fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>We have just sent you an verification link to your email. Verify to continue.</Text>
                </View>
              </View>
              <View style={[styles.views,]}>
                <View style={styles.login_title}>
                  <Image source={roundIcon} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
                  <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>Forgot your password?</Text>
                  <Text style={{ fontSize: 0.02 * vh, fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>Don't worry. We got you!</Text>
                </View>
                <View style={styles.form}>
                  <View style={styles.input}>
                    <Text style={styles.input_title}>New Password</Text>
                    <View style={[styles.input_form, { paddingRight: 5 }]}>
                      <TextInput style={[styles.input_text, { width: 0.9 * vw - 0.05 * vh - 25, }]}></TextInput>
                      <TouchableOpacity style={[styles.input_form, { width: 0.05 * vh, height: 0.05 * vh, padding: 0, justifyContent: 'center' }]} onPress={() => { setPassShown(!passShown) }}>
                        {!passShown && (<HidePass width={0.05 / 3 * vh} height={0.05 / 3 * vh} />)}
                        {passShown && (<HidePass width={0.05 / 3 * vh} height={0.05 / 3 * vh} />)}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.input_title}>Retype New Password</Text>
                    <View style={[styles.input_form, { width: '100%' }]}>
                      <TextInput style={styles.input_text}></TextInput>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57', height: 0.06 * vh, marginTop: 0.028 * vh, marginBottom: -0.02 * vh, }]}
                    onPress={() => { setLoginPage(3); setDoneText("Your password has been reset.") }}>
                    <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Finish</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            <Animated.View style={{
              width: 'auto',
              height: vh,
              flexDirection: 'row',
              transform: [{ translateX: - (createPage) * vw, }]
            }}>
              <View style={[styles.views,]}>
                <View style={styles.login_title}>
                  <TouchableOpacity onPress={() => { setCreatePage(1) }}>
                    <Image source={hotRice} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>Check your inbox!</Text>
                  <Text style={{ fontSize: 0.02 * vh, textAlign: 'center', fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>We have just sent you an verification link to your email. Verify to continue.</Text>
                </View>
              </View>
              <View style={[styles.views,]}>
                <View style={styles.login_title}>
                  <Image source={roundIcon} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
                  <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>Almost there, Farmer!</Text>
                  <Text style={{ fontSize: 0.02 * vh, fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>Finish your farmer's identity</Text>
                </View>
                <View style={styles.form}>
                  <View style={{
                    width: 0.9 * vw,
                    height: 'auto',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 10,
                    alignItems: 'center',
                  }}>
                    <View style={[styles.input, { width: (0.9 * vw - 10) / 2 }]}>
                      <Text style={styles.input_title}>First name</Text>
                      <View style={[styles.input_form, { width: '100%' }]}>
                        <TextInput style={styles.input_text} placeholder="Quan"></TextInput>
                      </View>
                    </View>
                    <View style={[styles.input, { width: (0.9 * vw - 10) / 2 }]}>
                      <Text style={styles.input_title}>Last name</Text>
                      <View style={[styles.input_form, { width: '100%' }]}>
                        <TextInput style={styles.input_text} placeholder="Nguyen"></TextInput>
                      </View>
                    </View>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.input_title}>Your school</Text>
                    <View style={[styles.input_form, { width: '100%' }]}>
                      <TextInput style={styles.input_text} placeholder="VNU-HCM High School for the Gifted"></TextInput>
                    </View>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.input_title}>Major</Text>
                    <View style={[styles.input_form, { width: '100%' }]}>
                      <TextInput style={styles.input_text} placeholder="Mathematics"></TextInput>
                    </View>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.input_title}>Graduation Year</Text>
                    <View style={[styles.input_form, { width: '100%' }]}>
                      <TextInput style={styles.input_text} placeholder="2026"></TextInput>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57', height: 0.06 * vh, marginTop: 0.028 * vh, marginBottom: -0.02 * vh, }]}
                    onPress={() => { setLoginPage(3); setDoneText("Welcome to Ricefield!"); }}>
                    <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Finish</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            <View style={[styles.views,]}>
              <View style={styles.login_title}>
                <TouchableOpacity>
                  <Image source={hotRice} style={{ width: 0.08 * vh, height: 0.08 * vh, marginBottom: 0.02 * vh, borderRadius: '50%', objectFit: 'contain' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 0.03 * vh, fontFamily: 'Nunito_800ExtraBold', lineHeight: 0.035 * vh }}>Back to the field!</Text>
                <Text style={{ fontSize: 0.02 * vh, textAlign: 'center', fontFamily: 'Nunito_400Regular', color: '#448D57', lineHeight: 0.025 * vh }}>{doneText}</Text>
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
  key_highlight: {
    fontSize: 0.028 * vh,
    lineHeight: 0.03 * vh,
    marginTop: 0.008 * vh,
    height: 0.03 * vh,
    width: 2 / 3 * vw,
    textAlign: 'center',
    fontFamily: 'Nunito_800ExtraBold',
  },
  desc_highlight: {
    fontSize: 0.02 * vh,
    lineHeight: 0.022 * vh,
    height: 0.044 * vh,
    width: 2 / 3 * vw,
    textAlign: 'center',
    marginTop: 0.028 * vh,
    marginBottom: 0.068 * vh,
    fontFamily: 'Nunito_400Regular',
  },
  status_cont: {
    width: 0.108 * vh,
    height: 0.028 * vh,
    borderRadius: 0.06 * vh,
    backgroundColor: '#CFD7D2',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0.016 * vh,
    marginBottom: 0.02 * vh,
  },
  status_ele: {
    position: 'absolute',
    width: 0.028 / 3 * vh,
    height: 0.028 / 3 * vh,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  button_view: {
    width: vw,
    height: 0.08 * vh,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 0.02 * vw,
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
  },
  login_title: {
    width: 0.75 * vw,
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
    gap: 10,
  },
  input: {
    width: 0.9 * vw,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
  input_title: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 0.018 * vh,
    lineHeight: 0.022 * vh,
  },
  input_form: {
    height: 0.05 * vh,
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
    marginTop: 10,
  },
  check: {
    width: 'auto',
    height: 0.018 * vh,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 5,
    width: 0.018 * vh,
    height: 0.018 * vh,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 3,
    marginTop: -2,
  },
  green_text_btn: {
    width: 'auto',
    height: '100%',
    backgroundColor: 'transparent',
  },
});