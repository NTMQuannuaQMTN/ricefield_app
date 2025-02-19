import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "@babel/core";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const UserLogo = require("../assets/images/roundIcon.png");
import Back from "../assets/images/back.svg";
import Arrow from "../assets/images/green_arrow.svg";

export default function NewPostCont(props: any) {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_600SemiBold,
    Nunito_500Medium,
    Nunito_400Regular,
  });

  const rotateAnim = new Animated.Value(0);
  const spaceAnim = new Animated.Value(0);
  const [spaceToggle, setSpaceToggle] = useState(0);
  const [space, setSpace] = useState("Select a space");

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

  const interpolateRotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  if (fontsLoaded) {

    return (
      <View style={{
        position: 'absolute',
        top: 0, left: 0, width: vw, height: vh,
        backgroundColor: '#FFFFFF',
        zIndex: 1,
      }}>
        <View style={[styles.profileHeader, { justifyContent: 'flex-start', gap: 0.02 * vh }]}>
          <TouchableOpacity onPress={() => { props.new() }}>
            <Back height={0.02 * vh} width={0.02 * vh}></Back>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 0.016 * vh, lineHeight: 0.02 * vh }}>Cook a post</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 0.02 * vh,
          paddingVertical: 0.012 * vh,
          gap: 0.012 * vh,
          alignItems: 'center',
        }}>
          <Image source={UserLogo} style={{
            width: 0.056 * vh,
            height: 0.056 * vh,
            borderRadius: vh
          }}></Image>
          <Text style={{
            fontSize: 0.02 * vh,
            lineHeight: 0.024 * vh,
            fontFamily: 'Nunito_400Regular',
          }}>
            <Text style={{
              fontFamily: 'Nunito_700Bold'
            }}>You</Text>
            <Text style={{
              fontFamily: 'Nunito_400Regular'
            }}> in </Text>
          </Text>
          <TouchableOpacity style={{
            width: '60%',
            height: 'auto',
            borderColor: '#448D57',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: vh,
            marginLeft: -0.01 * vh,
            paddingHorizontal: 0.02 * vh,
            paddingTop: 0.005 * vh,
            paddingBottom: 0.003 * vh,
            marginTop: -0.001 * vh,
          }} onPress={() => { setSpaceToggle(1 - spaceToggle) }}>
            <Text style={{
              fontFamily: 'Nunito_800ExtraBold',
              color: '#448D57',
              fontSize: 0.02 * vh,
              lineHeight: 0.024 * vh,
            }}>{space}</Text>
            <Animated.View style={{ transform: [{ rotate: interpolateRotate, }] }}>
              <Arrow width={0.024 * vh} height={0.024 * vh} marginTop={-0.002 * vh}></Arrow>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View style={[styles.modalContent, { position: 'absolute', top: 0.06 * vh, left: 0.15 * vh, width: '60%', shadowColor: '#000000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 0.01 * vh }, shadowRadius: 0.01 * vh, opacity: spaceAnim, zIndex: 1, borderColor: '#448D57', borderWidth: 1 }]}>
            <TouchableOpacity style={styles.option} onPress={() => { setSpace("News"); setSpaceToggle(0) }}>
              <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => { setSpace("Questions"); setSpaceToggle(0) }}>
              <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Questions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => { setSpace("Rant"); setSpaceToggle(0) }}>
              <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Rant</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => { setSpace("Confession"); setSpaceToggle(0) }}>
              <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Confession</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => { setSpace("Meme"); setSpaceToggle(0) }}>
              <Text style={[styles.optionText, { fontFamily: 'Nunito_500Medium' }]}>Meme</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <TextInput placeholder="Add a title" style={{
          width: vw - 0.04 * vh,
          marginLeft: 0.02 * vh,
          height: 'auto',
          fontFamily: 'Nunito_800ExtraBold',
          fontSize: 0.024 * vh,
          color: '#949292',
        }}></TextInput>
        <View style={{
          width: vw - 0.04 * vh,
          marginLeft: 0.02 * vh,
          height: 0.24 * vh,
          marginTop: 0.004 * vh,
          paddingHorizontal: 0.016 * vh,
          paddingVertical: 0.016 * vh,
          borderRadius: 0.02 * vh,
          borderColor: '#448D57',
          borderWidth: 1,
          gap: 0,
          justifyContent: 'flex-start',
        }}>
          <TextInput multiline
          placeholder={'Yoo, what\'s cooking rn??'} style={{
            fontFamily: 'Nunito_400Regular',
            fontSize: 0.02 * vh,
            lineHeight: 0.024 * vh,
            color: '#949292',
            width: '100%',
            height: 'auto',
          }}></TextInput>
        </View>
      </View>
    );
  } else {
    return (<View></View>);
  }
}

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    paddingTop: 0.055 * vh,
    paddingBottom: 0.01 * vh,
    boxSizing: 'content-box',
    paddingHorizontal: 0.02 * vh,
    borderColor: '#F6F8F9',
    borderBottomWidth: 5,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 0.02 * vh,
    paddingHorizontal: 0.016 * vh,
    paddingVertical: 0.012 * vh,
    gap: 0.012 * vh,
  },
  option: {
    width: 'auto',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontSize: 0.02 * vh,
    lineHeight: 0.024 * vh,
    fontFamily: 'Nunito_400Regular',
    color: '#448D57',
  },
});
