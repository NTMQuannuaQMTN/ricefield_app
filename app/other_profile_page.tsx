import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';

const roundIcon = require("../assets/images/roundIcon.png");
const cover = require("../assets/images/cover.png");
import School from "../assets/images/school.svg";
import Major from "../assets/images/major.svg";
import GradYear from "../assets/images/gradyear.svg";
import Instagram from "../assets/images/instagram.svg";
import Snapchat from "../assets/images/snapchat.svg";
import X from "../assets/images/x.svg";
import LinkedIn from "../assets/images/linkedin.svg";
import Facebook from "../assets/images/facebook.svg";
import Lock from "../assets/images/lock.svg";
import Back from "../assets/images/back.svg";
import Link from "../assets/images/link.svg";
import Post from "./post";
import Copied from "./copied_modal";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

export default function MyProfilePage(props: any) {
    let [fontsLoaded] = useFonts({
        Nunito_800ExtraBold,
        Nunito_700Bold,
        Nunito_600SemiBold,
        Nunito_500Medium,
        Nunito_400Regular,
    });

    const pmvAnim = new Animated.Value(0);
    const [follow, setFollow] = React.useState(false);
    const [bio, setBio] = React.useState('');
    const [user, setUser] = React.useState(props.user);
    const [copied, setCopied] = React.useState(false);

    useEffect(() => {
        if (copied) {
            setTimeout(() => { setCopied(false) }, 1000);
        }
    }, [copied]);

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    if (fontsLoaded) {
        return (
            <View style={[styles.container, { backgroundColor: "#F6F8F9" }]}>
                <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={() => { props.backHome() }}>
                        <Back height={0.02 * vh} width={0.02 * vh}></Back>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 0.016 * vh, lineHeight: 0.02 * vh }}>{user.name}</Text>
                    <TouchableOpacity onPress={() => setCopied(true)}>
                        <Link height={0.02 * vh} width={0.02 * vh}></Link>
                    </TouchableOpacity>
                    {copied && <Copied content={"Profile link copied!"}></Copied>}
                </View>
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
                            <View>
                                <TouchableOpacity style={{
                                    width: 0.24 * vw,
                                    height: 'auto',
                                    paddingHorizontal: 0.012 * vh,
                                    paddingVertical: 0.004 * vh,
                                    borderRadius: vh,
                                    borderColor: '#448D57',
                                    borderWidth: 1,
                                    backgroundColor: (follow) ? '#FFFFFF' : '#448D57'
                                }} onPress={() => { setFollow(!follow) }}>
                                    <Text style={{
                                        fontFamily: 'Nunito_800ExtraBold',
                                        color: (follow) ? '#448D57' : '#FFFFFF',
                                        width: 'auto',
                                        textAlign: 'center',
                                        fontSize: 0.016 * vh,
                                        letterSpacing: -0.2,
                                    }}>{(follow) && `Following`}{(!follow) && `Follow`}</Text>
                                </TouchableOpacity>
                            </View>
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
                            }}>{user.name}</Text>
                            <Text style={{
                                fontFamily: 'Nunito_400Regular',
                                fontSize: 0.018 * vh,
                                lineHeight: 0.02 * vh,
                                width: 'auto',
                                color: '#949292',
                                marginTop: -0.002 * vh,
                            }}>@{user.username}</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontFamily: 'Nunito_400Regular',
                                fontSize: 0.016 * vh,
                                lineHeight: 0.018 * vh,
                                marginTop: -0.004 * vh,
                                marginBottom: 0.008 * vh,
                            }}>{user.bio}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 'auto',
                            width: vw - 40,
                        }}>
                            <Text style={[styles.statTitle, { textAlign: 'left' }]}><Text style={styles.statNum}>{user.posts}</Text> posts cooked</Text>
                            <Text style={[styles.statTitle, { textAlign: 'center' }]}><Text style={styles.statNum}>{user.followers}</Text> Followers</Text>
                            <Text style={[styles.statTitle, { textAlign: 'right' }]}><Text style={styles.statNum}>{user.following}</Text> Following</Text>
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
                                <Text style={styles.educationText}>{user.school}</Text>
                            </View>
                            <View style={{
                                width: 'auto',
                                flexDirection: 'row',
                                marginRight: 0.008 * vh,
                                gap: 0.008 * vh,
                                alignItems: 'center',
                            }}>
                                <Major height={0.024 * vh}></Major>
                                <Text style={styles.educationText}>{user.major}</Text>
                            </View>
                            <View style={{
                                width: 'auto',
                                flexDirection: 'row',
                                gap: 0.008 * vh,
                                alignItems: 'center',
                            }}>
                                <GradYear height={0.024 * vh}></GradYear>
                                <Text style={styles.educationText}>{user.gradyear}</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableOpacity onPress={() => {
                                if (user.instagram === "") {
                                    alert("No Instagram");
                                } else {
                                    Linking.openURL(user.instagram);
                                }
                            }}><Instagram></Instagram></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (user.snapchat === "") {
                                    alert("No Snapchat");
                                } else {
                                    Linking.openURL(user.snapchat);
                                }
                            }}><Snapchat></Snapchat></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (user.x === "") {
                                    alert("No X/Twitter");
                                } else {
                                    Linking.openURL(user.x);
                                }
                            }}><X></X></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (user.linkedin === "") {
                                    alert("No LinkedIn");
                                } else {
                                    Linking.openURL(user.linkedin);
                                }
                            }}><LinkedIn></LinkedIn></TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (user.facebook === "") {
                                    alert("No Facebook");
                                } else {
                                    Linking.openURL(user.facebook);
                                }
                            }}><Facebook></Facebook></TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: 'auto',
                        width: vw,
                        backgroundColor: '#FFFFFF',
                        marginVertical: 6,
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                    }}>
                        <Text style={[styles.pmvtext, {
                            color: '#448D57',
                            fontFamily: 'Nunito_700Bold',
                        }]}>Posts</Text>
                    </View>
                    <View style={{
                        width: vw,
                        height: 'auto',
                        flexDirection: 'row',
                    }}>
                        <View style={{
                            width: vw,
                        }}>
                            <ScrollView>
                                <View style={{ width: vw, height: 'auto', gap: 0.012 * vh, }}>
                                    {props.postList.map((post) => {
                                        if (post.id.substring(0, post.id.indexOf("p")) === user.id) {
                                            return (<Post key={post.id} user={user} postInfo={post} updatePost={props.updatePost} />);
                                        } return null;
                                    })}
                                </View>
                            </ScrollView>
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
    container: {
        flex: 1,
        width: vw,
        height: vh,
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
        paddingHorizontal: 0.02 * vh,
    },
    profile: {
        width: vw,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
        backgroundColor: '#F6F8F9',
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
        width: (vw - 50) / 3,
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
    },
    pmv: {
        width: (vw - 40) / 3,
        height: 'auto',
        justifyContent: 'center',
    },
    pmvtext: {
        width: 'auto',
        fontSize: 0.016 * vh,
        lineHeight: 0.018 * vh,
        letterSpacing: 0.3,
    },
    notice: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0.03 * vw,
        paddingVertical: 0.01 * vh,
        gap: 0.02 * vw,
        backgroundColor: '#A5E5BE',
    },
    form: {
        width: vw,
        height: 'auto',
        paddingTop: 0.012 * vh,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        gap: 0.01 * vh,
    },
    input: {
        width: 0.9 * vw,
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 0.008 * vh,
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
        letterSpacing: -0.4,
    },
    social: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '2%',
    }
});