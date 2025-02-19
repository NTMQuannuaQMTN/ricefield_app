import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "@babel/core";
import Dot from "../assets/images/dot.svg";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;
import ThreeDot from "../assets/images/threedots.svg";
import Upvote from "../assets/images/upvote.svg";
import Upvoted from "../assets/images/upvoted.svg";
import Downvote from "../assets/images/downvote.svg";
import Downvoted from "../assets/images/downvoted.svg";
import Comment from "../assets/images/comment.svg";
import Save from "../assets/images/save.svg";
import Saved from "../assets/images/saved.svg";
import Share from "../assets/images/share.svg";
import CopyLink from "../assets/images/link.svg";
import Report from "../assets/images/report_yellow.svg";
import Edit from "../assets/images/edit.svg";
import Delete from "../assets/images/delete.svg";

export default function ClassListElement(props: any) {
    let [fontsLoaded] = useFonts({
        Nunito_800ExtraBold,
        Nunito_700Bold,
        Nunito_600SemiBold,
        Nunito_500Medium,
        Nunito_400Regular,
    });

    if (fontsLoaded) {

        return (
            <TouchableOpacity style={styles.classes}>
                <Text style={{
                    fontSize: 0.02 * vh,
                    fontFamily: 'Nunito_400Regular',
                }}>{props.rank}</Text>
                <View>
                    <Text style={{
                        fontSize: 0.022 * vh,
                        lineHeight: 0.024 * vh,
                        fontFamily: 'Nunito_700Bold',
                    }}>{props.class.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text style={{
                            fontSize: 0.018 * vh,
                            lineHeight: 0.020 * vh,
                            fontFamily: 'Nunito_400Regular',
                        }}>{props.class.farmers} farmers</Text>
                        <Dot width={0.005 * vh} height={0.005 * vh}></Dot>
                        <Text style={{
                            fontSize: 0.018 * vh,
                            lineHeight: 0.020 * vh,
                            fontFamily: 'Nunito_400Regular',
                        }}>{props.class.posts} posts cooked today</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (<View></View>);
    }
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
    },
});