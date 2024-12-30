import React, { useEffect } from "react";
import { StyleSheet, Animated, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity } from "react-native";
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

const logoIcon = require("../assets/images/tpIcon.png");
const testPic = require("../assets/images/testpic.jpg");

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Index() {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_400Regular,
  });

  const [isVisible, setIsVisible] = React.useState(true);
  const [key, setKey] = React.useState(1);
  const [keyText, setKeyText] = React.useState("Key highlight 1");
  const [descText, setDescText] = React.useState("Further describe the 1st key highlight in 2 lines");
  const moveAnim = new Animated.Value(0);
  const fadeAnim = new Animated.Value(1);

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
        <Animated.View
          style={[styles.views, { backgroundColor: '#FFFFFF' }]}
        >
          <Image source={testPic} style={{ backgroundColor: '#000000', width: 0.8 * vw, height: 0.6 * vh, objectFit: 'cover' }} />
          <Text id="key_highlight" style={styles.key_highlight}>{keyText}</Text>
          <Text id="desc_highlight" style={styles.desc_highlight}>{descText}</Text>
          <View style={styles.status_cont}>
            <View style={styles.status_ele}></View>
            <View style={styles.status_ele}></View>
            <View style={styles.status_ele}></View>
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
                <TouchableOpacity style={[styles.button, { borderColor: '#448D57', borderWidth: 2 }]}>
                  <Text style={[styles.button_text, { color: '#448D57' }]}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#448D57' }]} onPress={nextKey}>
                  <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Next</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.button_view}>
                <TouchableOpacity style={[styles.button_login, { backgroundColor: '#448D57' }]}>
                  <Text style={[styles.button_text, { color: '#FFFFFF' }]}>Get Started</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
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
  }
});