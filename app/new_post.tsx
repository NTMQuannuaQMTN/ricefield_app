import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "@babel/core";
import NewPostCont from "./new_post_content";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const UserLogo = require("../assets/images/roundIcon.png");

export default function NewPost(props: any) {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_600SemiBold,
    Nunito_500Medium,
    Nunito_400Regular,
  });

  if (fontsLoaded) {

    return (
      <View style={{
        flexDirection: 'row',
        padding: 0.01 * vh,
        backgroundColor: '#FFFFFF',
        gap: 0.01 * vh,
        width: 'auto',
        height: 'auto',
        marginBottom: 0.012 * vh,
        alignItems: 'center',
      }}>
        <Image source={UserLogo} style={{
            borderRadius: '50%',
            width: 0.056 * vh,
            height: 0.056 * vh,
        }}></Image>
        <TouchableOpacity style={{
            justifyContent: 'center',
            paddingTop: 0.012 * vh,
            paddingBottom: 0.008 * vh,
            paddingLeft: 0.016 * vh,
            backgroundColor: '#F6F8F9',
            borderRadius: vh,
            width: vw - 0.086 * vh,
            height: 'auto',
        }} onPress={() => {props.new()}}>
            <Text style={{
                fontSize: 0.02 * vh,
                lineHeight: 0.024 * vh,
                fontFamily: 'Nunito_400Regular',
            }}>Yoo, what's cooking rn??</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (<View></View>);
  }
}

const styles = StyleSheet.create({
  content: {
    gap: 0.006 * vh,
  },
  contentTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 0.022 * vh,
    lineHeight: 0.024 * vh,
  },
  contentPar: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 0.018 * vh,
    lineHeight: 0.02 * vh,
    width: vw - 0.084 * vh,
  },
  reacts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0.004 * vh,
    gap: 0.008 * vh,
  },
  reactBox: {
    flexDirection: 'row',
    paddingVertical: 0.006 * vh,
    paddingHorizontal: 0.01 * vh,
    width: 'auto',
    height: 'auto',
    borderRadius: vw,
    backgroundColor: '#E5E7EB',
    gap: 0.006 * vh,
    alignItems: 'center',
  },
  stats: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 0.016 * vh,
    lineHeight: 0.02 * vh,
  },
  action: {
    width: '100%',
    height: 0.06 * vh,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0.024 * vh,
    gap: 0.012 * vh,
  },
  actionText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 0.02 * vh,
    lineHeight: 0.024 * vh,
    marginBottom: -0.004 * vh,
  }
});