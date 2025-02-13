import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "@babel/core";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function Notification(props: any) {
    const [username, setUsername] = React.useState(props.notiInfo.username);
    const [action, setAction] = React.useState(props.notiInfo.action);
    const [time, setTime] = React.useState(props.notiInfo.time);
    const [seen, setSeen] = React.useState(props.notiInfo.seen);

    const roundIcon = require("../assets/images/roundIcon.png");

    return (
        <TouchableOpacity style={[styles.classes, { paddingLeft: 0.05 * vw, gap: 0.036 * vw, backgroundColor: (seen) ? "#FFFFFF" : "#86EFAC" }]}
            onPress={() => { setSeen(true) }}>
            <Image source={roundIcon} style={{ width: 0.044 * vh, height: 0.044 * vh, borderRadius: 0.05 / 2 * vh }}></Image>
            <View>
                <Text style={{
                    fontSize: 0.020 * vh,
                    lineHeight: 0.024 * vh,
                    fontFamily: 'Nunito_400Regular',
                    marginTop: 0.002 * vh,
                    marginBottom: -2
                }}><Text style={{ fontFamily: 'Nunito_700Bold' }}>{username}</Text> {(action === 1) ? "is following you" :
                    (action === 2) ? "upvoted your post" :
                        (action === 3) ? "downvoted your post" :
                            (action === 4) ? "replied to your post" :
                                (action === 5) ? "recooked your post" : "mentioned you"}</Text>
                <Text style={{ fontSize: 0.016 * vh, lineHeight: 0.02 * vh, fontFamily: 'Nunito_400Regular', marginTop: -2 }}>{time}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
    }
});