import React, { useEffect } from "react";
import { StyleSheet, Animated, Text, View, Image, ScrollView, Dimensions, StatusBar } from "react-native";
const logoIcon = require("../assets/images/tpIcon.png");

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Index() {
  const [isVisible, setIsVisible] = React.useState(true);
  // const moveAnim1 = new Animated.Value(0);
  const fadeAnim = new Animated.Value(1);

  // useEffect(() => {
  //   Animated.timing(moveAnim1, {
  //     toValue: -vw,
  //     delay: 1000,
  //     duration: 250,
  //     useNativeDriver: true,
  //   }).start();
  // }, [])

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      delay: 2000,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
    })
  }, []);

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
      <Animated.ScrollView horizontal={true}
        style={{
          flexDirection: 'column',
          width: 3 * vw,
          height: vh,
        }}
      >
        <Animated.View
          style={[styles.views, { backgroundColor: '#FFFFFF' }]}
        >
          <Image source={logoIcon} style={{ backgroundColor: '#000000', width: 0.8 * vw, height: 0.5 * vh }} />
          <Text style={styles.texts}>Key highlight 1</Text>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
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
  texts: {
    fontSize: 28,
    fontWeight: 'bold',
  }
});