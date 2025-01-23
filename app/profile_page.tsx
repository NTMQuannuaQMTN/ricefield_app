import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';

const roundIcon = require("../assets/images/roundIcon.png");
const cover = require("../assets/images/cover.png");
import School from "../assets/images/school.svg";
import Major from "../assets/images/major.svg";
import GradYear from "../assets/images/gradyear.svg";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function ProfilePage() {
    let [fontsLoaded] = useFonts({
        Nunito_800ExtraBold,
        Nunito_700Bold,
        Nunito_600SemiBold,
        Nunito_500Medium,
        Nunito_400Regular,
    });

    if (fontsLoaded) {
        return (
            <View style={styles.profile}>
                <Image source={cover} style={styles.banner}></Image>
                <View style={styles.info}>
                    <View style={{
                        flexDirection: "row",
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: -0.045 * vh,
                    }}>
                        <Image source={roundIcon} style={{ borderRadius: '50%', width: 0.09 * vh, height: 0.09 * vh }}></Image>
                        <TouchableOpacity style={{
                            width: 'auto',
                            height: 'auto',
                            paddingHorizontal: 0.012 * vh,
                            paddingVertical: 0.004 * vh,
                            borderRadius: vh,
                            borderColor: '#448D57',
                            borderWidth: 1,
                        }}>
                            <Text style={{
                                fontFamily: 'Nunito_800ExtraBold',
                                color: '#448D57',
                                fontSize: 0.016 * vh,
                                letterSpacing: -0.2,
                            }}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        paddingVertical: 0.01 * vh,
                        marginTop: -0.012 * vh,
                    }}>
                        <Text style={{
                            fontFamily: 'Nunito_800ExtraBold',
                            fontSize: 0.024 * vh,
                            lineHeight: 0.03 * vh,
                            width: 'auto',
                        }}>QnRJ</Text>
                        <Text style={{
                            fontFamily: 'Nunito_400Regular',
                            fontSize: 0.018 * vh,
                            lineHeight: 0.02 * vh,
                            width: 'auto',
                            color: '#949292',
                            marginTop: -0.002 * vh,
                        }}>@tsgqnrj</Text>
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'Nunito_400Regular',
                            fontSize: 0.016 * vh,
                            lineHeight: 0.018 * vh,
                            marginTop: -0.004 * vh,
                            marginBottom: 0.008 * vh,
                        }}>Cool, genuine, happy, hardworking, chatty, dramatic, and awesome. Ricefield farmer, classes by day, party by night. Proud test subject for farmers :))</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 'auto',
                        width: vw - 50,
                    }}>
                        <Text style={styles.statTitle}><Text style={styles.statNum}>100</Text> posts cooked</Text>
                        <Text style={styles.statTitle}><Text style={styles.statNum}>100</Text> Followers</Text>
                        <Text style={styles.statTitle}><Text style={styles.statNum}>100</Text> Following</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        width: vw - 40,
                        flexWrap: 'wrap',
                        gap: 0.004 * vh,
                        marginBottom: 0.008 * vh,
                    }}>
                        <View style={{
                            width: vw - 40,
                            flexDirection: 'row',
                            gap: 0.008 * vh,
                            alignItems: 'center',
                        }}>
                            <School height={0.024 * vh}></School>
                            <Text style={styles.educationText}>VNUHCM High School for the Gifted</Text>
                        </View>
                        <View style={{
                            width: 'auto',
                            flexDirection: 'row',
                            marginRight: 0.008 * vh,
                            gap: 0.008 * vh,
                            alignItems: 'center',
                        }}>
                            <Major height={0.024 * vh}></Major>
                            <Text style={styles.educationText}>Mathematics</Text>
                        </View>
                        <View style={{
                            width: 'auto',
                            flexDirection: 'row',
                            gap: 0.008 * vh,
                            alignItems: 'center',
                        }}>
                            <GradYear height={0.024 * vh}></GradYear>
                            <Text style={styles.educationText}>2026</Text>
                        </View>
                    </View>
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
        height: 'auto',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 0.02 * vh,
        paddingBottom: 0.01 * vh,
        gap: 0.01 * vh,
    },
    statTitle: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 0.016 * vh,
        lineHeight: 0.018 * vh,
        color: '#448D57',
    },
    statNum: {
        fontFamily: 'Nunito_700Bold',
        color: '#000000',
        fontSize: 0.018 * vh,
        lineHeight: 0.02 * vh,
    },
    educationText: {
        fontFamily: 'Nunito_400Regular',
        lineHeight: 0.024 * vh,
        fontSize: 0.016 * vh,
        alignItems: 'center',
    }
});