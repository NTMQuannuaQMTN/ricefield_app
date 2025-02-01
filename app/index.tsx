import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "@babel/core";

import LogoHeadbar from "../assets/images/logoBeta.svg";
import Burger from "../assets/images/burger.svg";
import About from "../assets/images/about.svg";
import Connect from "../assets/images/connect.svg";
import Dict from "../assets/images/dict.svg";
import Report from "../assets/images/report.svg";
import Home from "../assets/images/home.svg";
import Class from "../assets/images/class.svg";
import Noti from "../assets/images/noti.svg";
import Profile from "../assets/images/profile.svg";
import Arrow from "../assets/images/arrow.svg";
import News from "../assets/images/news.svg";
import Questions from "../assets/images/question.svg";
import Rant from "../assets/images/rant.svg";
import Confession from "../assets/images/confess.svg";
import Meme from "../assets/images/meme.svg";
import Dot from "../assets/images/dot.svg";
import Back from "../assets/images/back.svg";
import Link from "../assets/images/link.svg";
const roundIcon = require("../assets/images/roundIcon.png");
const cover = require("../assets/images/cover.png");

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

import cookedClasses from "./data/classes.json";
import notiUser from "./data/noti.json";
import ProfilePage from "./profile_page";
/* 1. Follow, 2. Upvote, 3. Downvote, 4. Reply, 5. Recook, 6. Mention */

export default function Index() {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_600SemiBold,
    Nunito_500Medium,
    Nunito_400Regular,
  });

  const [burgerToggle, setBurgerToggle] = useState(false);
  const [spaceToggle, setSpaceToggle] = useState(0);
  const rotateAnim = new Animated.Value(0);
  const spaceAnim = new Animated.Value(0);
  const pagebarAnim = new Animated.Value(0);
  const [bar, setBar] = useState(0);
  const [prev, setPrev] = useState(0);
  const [myProfile, setMyProfile] = useState(0);
  const myProfileAnim = new Animated.Value(0);

  const sortedClasses = cookedClasses.sort((a, b) => {
    if (b.farmers !== a.farmers) {
      return b.farmers - a.farmers;
    }
    return b.posts - a.posts;
  });

  useEffect(() => {
    rotateAnim.setValue(1 - spaceToggle);
    Animated.timing(rotateAnim, {
      toValue: spaceToggle,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [spaceToggle]);

  useEffect(() => {
    spaceAnim.setValue(1 - spaceToggle);
    Animated.timing(spaceAnim, {
      toValue: spaceToggle,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [spaceToggle]);

  useEffect(() => {
    pagebarAnim.setValue(-prev * vw);
    Animated.timing(pagebarAnim, {
      toValue: -bar * vw,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setPrev(bar);
      setSpaceToggle(0);
    });
  }, [bar, burgerToggle]);

  const interpolateRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  useEffect(() => {
    myProfileAnim.setValue((1 - myProfile) * -vw);
    Animated.timing(myProfileAnim, {
      toValue: -myProfile * vw,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [myProfile]);

  if (fontsLoaded) {
    return (
      <SafeAreaProvider>
        <StatusBar backgroundColor='#FFFFFF' barStyle='default' />
        <Animated.View style={[{ width: 2 * vw, height: vh, flexDirection: 'row', transform: [{ translateX: myProfileAnim }] }]}>
          <View style={[styles.container, { opacity: (burgerToggle) ? 0.5 : 1}]}>
            <View style={styles.headbar}>
              <View style={styles.header}>
                <LogoHeadbar height={0.04 * vh} />
                <TouchableOpacity onPress={() => { setBurgerToggle(true) }}>
                  <Burger height={0.04 * vh}></Burger>
                </TouchableOpacity>
                <Modal
                  visible={burgerToggle}
                  transparent={true}
                  onRequestClose={() => setBurgerToggle(false)}
                >
                  <TouchableWithoutFeedback onPress={() => setBurgerToggle(false)}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.option} onPress={() => setBurgerToggle(false)}>
                          <About height={0.02 * vh} />
                          <Text style={styles.optionText}>About Ricefield</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => setBurgerToggle(false)}>
                          <Connect height={0.02 * vh} />
                          <Text style={styles.optionText}>Connect with us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => setBurgerToggle(false)}>
                          <Dict height={0.02 * vh} />
                          <Text style={styles.optionText}>Farmers' Dictionary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => setBurgerToggle(false)}>
                          <Report height={0.02 * vh} />
                          <Text style={styles.optionText}>Report an issue</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </View>
              <View style={[styles.header, { paddingHorizontal: 0, justifyContent: 'center' }]}>
                <TouchableOpacity style={[styles.pagebar]} onPress={() => { setBar(0) }}>
                  <View style={[styles.iconView, { backgroundColor: (bar === 0) ? '#FFD700' : '#FFFFFF' }]}>
                    <Home width={0.028 * vh} height={0.028 * vh} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pagebar]} onPress={() => { setBar(1) }}>
                  <View style={[styles.iconView, { backgroundColor: (bar === 1) ? '#FFD700' : '#FFFFFF' }]}>
                    <Class width={0.036 * vh} height={0.036 * vh} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pagebar]} onPress={() => { setBar(2) }}>
                  <View style={[styles.iconView, { backgroundColor: (bar === 2) ? '#FFD700' : '#FFFFFF' }]}>
                    <Noti width={0.029 * vh} height={0.029 * vh} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.pagebar]} onPress={() => { setMyProfile(1) }}>
                  <View style={[styles.iconView]}>
                    <Profile width={0.028 * vh} height={0.028 * vh} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Animated.View style={{
              width: 3 * vw,
              height: 'auto',
              flexDirection: 'row',
              transform: [{ translateX: pagebarAnim, }]
            }}>
              <View style={styles.content}>
                <TouchableOpacity style={{
                  width: '100%',
                  height: 'auto',
                  paddingTop: 15,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                }} onPress={() => { setSpaceToggle(1 - spaceToggle); }}>
                  <Text style={{
                    fontSize: 0.02 * vh,
                    lineHeight: 0.04 * vh,
                    fontFamily: 'Nunito_800ExtraBold',
                  }}>SPACES</Text>
                  <Animated.View style={{ transform: [{ rotate: interpolateRotate, }] }}>
                    <Arrow width={0.024 * vh} height={0.024 * vh}></Arrow>
                  </Animated.View>
                </TouchableOpacity>
                <Animated.View style={[styles.modalContent, { position: 'absolute', top: 0.06 * vh, left: 20, width: 0.35 * vw, shadowColor: '#000000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 0.01 * vh }, shadowRadius: 0.01 * vh, opacity: spaceAnim }]}>
                  <TouchableOpacity style={styles.option}>
                    <News height={0.02 * vh} />
                    <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>News</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <Questions height={0.02 * vh} />
                    <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Questions</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <Rant height={0.02 * vh} />
                    <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Rant</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <Confession height={0.02 * vh} />
                    <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Confession</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <Meme height={0.02 * vh} />
                    <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Meme</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.option}>
                    <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>All spaces</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
              <View style={styles.content}>
                <Text style={styles.pageTitle}>CLASSES BEING COOKED</Text>
                <View style={{
                  width: '100%',
                  flexDirection: 'row',
                  gap: 0.02 * vw,
                  paddingHorizontal: 20,
                }}>
                  <Text style={{
                    fontSize: 0.021 * vh,
                    lineHeight: 0.03 * vh,
                    fontFamily: 'Nunito_400Regular',
                  }}>Don't see your class?</Text>
                  <TouchableOpacity onPress={() => { Linking.openURL("https://forms.gle/P4zhqYnH6mAJkkFi9") }}>
                    <Text style={{
                      color: '#448D57',
                      fontSize: 0.021 * vh,
                      lineHeight: 0.03 * vh,
                      fontFamily: 'Nunito_700Bold',
                    }}>Request a class</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.scroll}>
                  {sortedClasses.map((cls, index) => (
                    <View key={index} style={styles.classes}>
                      <Text style={{
                        fontSize: 0.02 * vh,
                        fontFamily: 'Nunito_400Regular',
                      }}>{index + 1}</Text>
                      <View>
                        <Text style={{
                          fontSize: 0.022 * vh,
                          lineHeight: 0.024 * vh,
                          fontFamily: 'Nunito_700Bold',
                        }}>{cls.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                          <Text style={{
                            fontSize: 0.018 * vh,
                            lineHeight: 0.020 * vh,
                            fontFamily: 'Nunito_400Regular',
                          }}>{cls.farmers} farmers</Text>
                          <Dot width={0.005 * vh} height={0.005 * vh}></Dot>
                          <Text style={{
                            fontSize: 0.018 * vh,
                            lineHeight: 0.020 * vh,
                            fontFamily: 'Nunito_400Regular',
                          }}>{cls.posts} posts cooked today</Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={styles.content}>
                <Text style={styles.pageTitle}>Notifications</Text>
                <ScrollView style={styles.scroll}>
                  {notiUser.map((noti, index) => (
                    <TouchableOpacity key={index} style={[styles.classes, { paddingLeft: 0.05 * vw, gap: 0.036 * vw, backgroundColor: (noti.seen) ? "#FFFFFF" : "#86EFAC" }]}>
                      <Image source={roundIcon} style={{ width: 0.044 * vh, height: 0.044 * vh, borderRadius: 0.05 / 2 * vh }}></Image>
                      <View>
                        <Text style={{
                          fontSize: 0.020 * vh,
                          lineHeight: 0.024 * vh,
                          fontFamily: 'Nunito_400Regular',
                          marginTop: 0.002 * vh,
                          marginBottom: -2
                        }}><Text style={{ fontFamily: 'Nunito_700Bold' }}>{noti.username}</Text> {(noti.action === 1) ? "is following you" :
                          (noti.action === 2) ? "upvoted your post" :
                            (noti.action === 3) ? "downvoted your post" :
                              (noti.action === 4) ? "replied to your post" :
                                (noti.action === 5) ? "recooked your post" : "mentioned you"}</Text>
                        <Text style={{ fontSize: 0.016 * vh, lineHeight: 0.02 * vh, fontFamily: 'Nunito_400Regular', marginTop: -2 }}>{noti.time}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Animated.View>
          </View>
          <ProfilePage backHome={() => {setMyProfile(0)}}></ProfilePage>
        </Animated.View>
      </SafeAreaProvider>
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
  headbar: {
    width: vw,
    height: 'auto',
    paddingTop: 0.055 * vh,
    shadowColor: '#000000',
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 0.01 * vh },
    zIndex: 1,
  },
  header: {
    width: vw,
    height: 0.06 * vh,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 0.115 * vh,
    paddingRight: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 5,
  },
  option: {
    width: 'auto',
    height: 0.045 * vh,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontSize: 0.018 * vh,
    lineHeight: 0.045 * vh,
    fontFamily: 'Nunito_700Bold',
  },
  pagebar: {
    width: '25%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView: {
    width: 0.04 * vh,
    height: 0.04 * vh,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  content: {
    width: vw,
    height: 0.825 * vh,
    backgroundColor: '#F6F8F9',
  },
  pageTitle: {
    fontSize: 0.028 * vh,
    lineHeight: 0.04 * vh,
    fontFamily: 'Nunito_800ExtraBold',
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom: -8,
  },
  scroll: {
    width: vw,
    height: 'auto',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  classes: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 0.08 * vw,
    paddingVertical: 0.02 * vh,
    gap: 0.04 * vw,
    borderRadius: 0.04 * vw,
    marginBottom: 0.01 * vh,
  },
  profileHeader: {
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    paddingTop: 0.055 * vh,
    paddingBottom: 0.01 * vh,
    boxSizing: 'content-box',
    paddingHorizontal: 20,
  },
  profile: {
    width: vw,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: 0.11 * vh,
    objectFit: 'cover',
  },
  info: {
    width: '100%',
    height: 0.3 * vh,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 10,
  }
});