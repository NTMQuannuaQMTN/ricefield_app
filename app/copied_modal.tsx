import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "@babel/core";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

import Tick from '../assets/images/tick.svg';

export default function Copied(props: any) {
    let [fontsLoaded] = useFonts({
        Nunito_800ExtraBold,
        Nunito_700Bold,
        Nunito_600SemiBold,
        Nunito_500Medium,
        Nunito_400Regular,
    });

    if (fontsLoaded) {

        return (
            <Modal
                visible={true}
                transparent={true}
            >
                <TouchableWithoutFeedback>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }}>
                        <View style={{
                            width: 'auto',
                            height: 'auto',
                            paddingHorizontal: 0.01 * vh,
                            paddingTop: 0.012 * vh,
                            paddingBottom: 0.008 * vh,
                            gap: 0.01 * vh,
                            backgroundColor: '#FFFFFF',
                            borderColor: '#448D57',
                            borderWidth: 1,
                            borderRadius: vh,
                            flexDirection: 'row',
                        }}>
                            <Tick width={0.02 * vh} height={0.02 * vh}></Tick>
                            <Text style={{
                                fontFamily: 'Nunito_700Bold',
                                fontSize: 0.02 * vh,
                                lineHeight: 0.024 * vh,
                                letterSpacing: -0.04,
                                color: '#448D57',
                            }}>
                                {props.content}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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