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

    const [pmv, setPMV] = React.useState(0);
    const [prev, setPrev] = React.useState(0);
    const pmvAnim = new Animated.Value(0);
    const [edit, setEdit] = React.useState(false);
    const [bio, setBio] = React.useState('');
    const [user, setUser] = React.useState(props.user);

    useEffect(() => {
        pmvAnim.setValue(prev * (-vw));
        Animated.timing(pmvAnim, {
            toValue: pmv * (-vw),
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setPrev(pmv);
        });
    }, [pmv]);

    if (fontsLoaded) {
        return (
            <View style={[styles.container, { backgroundColor: (edit) ? '#FFFFFF' : "#F6F8F9" }]}>
                {edit && <View style={[styles.profileHeader, { justifyContent: 'flex-start', gap: 0.02 * vh }]}>
                    <TouchableOpacity onPress={() => { setEdit(false) }}>
                        <Back height={0.02 * vh} width={0.02 * vh}></Back>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 0.016 * vh, lineHeight: 0.02 * vh }}>Back to profile</Text>
                </View>}
                {!edit && <View style={styles.profileHeader}>
                    <TouchableOpacity onPress={() => { props.backHome() }}>
                        <Back height={0.02 * vh} width={0.02 * vh}></Back>
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 0.016 * vh, lineHeight: 0.02 * vh }}>{user.name}</Text>
                    <TouchableOpacity>
                        <Link height={0.02 * vh} width={0.02 * vh}></Link>
                    </TouchableOpacity>
                </View>}
                <View style={styles.profile}>
                    <Image source={cover} style={styles.banner}></Image>
                    {edit && <TouchableOpacity style={{
                        width: 0.14 * vh,
                        height: 'auto',
                        paddingHorizontal: 0.024 * vh,
                        paddingVertical: 0.01 * vh,
                        backgroundColor: '#FFFFFF',
                        borderRadius: vh,
                        borderColor: '#000000',
                        borderWidth: 1,
                        position: 'absolute',
                        right: 0.016 * vh,
                        top: 0.052 * vh,
                    }}>
                        <Text style={{
                            fontFamily: 'Nunito_800ExtraBold',
                            color: '#000000',
                            width: 'auto',
                            textAlign: 'center',
                            fontSize: 0.016 * vh,
                            letterSpacing: -0.2,
                        }}>Edit banner</Text>
                    </TouchableOpacity>}
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
                                }} onPress={() => { setEdit(!edit) }}>
                                    <Text style={{
                                        fontFamily: 'Nunito_800ExtraBold',
                                        color: '#448D57',
                                        width: 'auto',
                                        textAlign: 'center',
                                        fontSize: 0.016 * vh,
                                        letterSpacing: -0.2,
                                    }}>{(edit) && `Save`}{(!edit) && `Edit profile`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {!edit && <View style={{
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
                        </View>}
                        {!edit && <View>
                            <Text style={{
                                fontFamily: 'Nunito_400Regular',
                                fontSize: 0.016 * vh,
                                lineHeight: 0.018 * vh,
                                marginTop: -0.004 * vh,
                                marginBottom: 0.008 * vh,
                            }}>{user.bio}</Text>
                        </View>}
                        {!edit && <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: 'auto',
                            width: vw - 40,
                        }}>
                            <Text style={[styles.statTitle, { textAlign: 'left' }]}><Text style={styles.statNum}>{user.posts}</Text> posts cooked</Text>
                            <Text style={[styles.statTitle, { textAlign: 'center' }]}><Text style={styles.statNum}>{user.followers}</Text> Followers</Text>
                            <Text style={[styles.statTitle, { textAlign: 'right' }]}><Text style={styles.statNum}>{user.following}</Text> Following</Text>
                        </View>}
                        {!edit && <View style={{
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
                        </View>}
                        {!edit && <View style={{
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
                        </View>}
                    </View>
                    {!edit && <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: 'auto',
                        width: vw,
                        backgroundColor: '#FFFFFF',
                        marginVertical: 6,
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                    }}>
                        <TouchableOpacity style={[styles.pmv, { alignItems: 'flex-start' }]} onPress={() => { setPMV(0) }}>
                            <Text style={[styles.pmvtext, {
                                color: (pmv == 0) ? '#448D57' : '#000000',
                                fontFamily: (pmv == 0) ? 'Nunito_700Bold' : 'Nunito_400Regular',
                            }]}>Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.pmv, { alignItems: 'center' }]} onPress={() => { setPMV(1) }}>
                            <Text style={[styles.pmvtext, {
                                color: (pmv == 1) ? '#448D57' : '#000000',
                                fontFamily: (pmv == 1) ? 'Nunito_700Bold' : 'Nunito_400Regular',
                            }]}>Bookmarks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.pmv, { alignItems: 'flex-end' }]} onPress={() => { setPMV(2) }}>
                            <Text style={[styles.pmvtext, {
                                color: (pmv == 2) ? '#448D57' : '#000000',
                                fontFamily: (pmv == 2) ? 'Nunito_700Bold' : 'Nunito_400Regular',
                            }]}>Votes</Text>
                        </TouchableOpacity>
                    </View>}
                    {!edit && <View style={{
                        width: vw,
                        overflow: 'hidden',
                    }}>
                        <Animated.View style={{
                            width: 3 * vw,
                            height: 0.4 * vh,
                            flexDirection: 'row',
                            transform: [{ translateX: pmvAnim }],

                        }}>
                            <View style={{
                                width: vw,
                            }}>
                                {(user.posts == 0) && <View style={{
                                    backgroundColor: '#FFFFFF',
                                    width: vw,
                                    height: 0.2 * vh,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        fontFamily: 'Nunito_800ExtraBold',
                                        fontSize: 0.02 * vh,
                                        lineHeight: 0.024 * vh,
                                    }}>Cook your first post today!</Text>
                                    <Text style={{
                                        fontFamily: 'Nunito_400Regular',
                                        fontSize: 0.016 * vh,
                                        lineHeight: 0.02 * vh,
                                    }}>Or you'll get cooked lol?</Text>
                                    <TouchableOpacity style={{
                                        marginVertical: 0.02 * vh,
                                        backgroundColor: '#448D57',
                                        paddingHorizontal: 0.048 * vh,
                                        paddingTop: 0.012 * vh,
                                        paddingBottom: 0.008 * vh,
                                        borderRadius: vh,
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Nunito_800ExtraBold',
                                            fontSize: 0.02 * vh,
                                            lineHeight: 0.024 * vh,
                                            color: '#FFFFFF',
                                        }}>Start cooking!</Text>
                                    </TouchableOpacity>
                                </View>}
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
                            <View>
                                <View style={styles.notice}>
                                    <Lock height={0.032 * vh}></Lock>
                                    <View style={{
                                        height: 'auto',
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Nunito_700Bold',
                                            fontSize: 0.022 * vh,
                                            lineHeight: 0.024 * vh,
                                            marginBottom: -2,
                                        }}>Your bookmarks are private.</Text>
                                        <Text style={{
                                            fontFamily: 'Nunito_400Regular',
                                            fontSize: 0.016 * vh,
                                            lineHeight: 0.02 * vh,
                                            color: '#949292',
                                        }}>Only you can see which posts you bookmarked.</Text>
                                    </View>
                                </View>
                                <ScrollView>
                                    <View style={{ width: vw, height: 'auto', gap: 0.012 * vh, }}>
                                        {props.postList.map((post) => {
                                            if (post.bookmark) {
                                                return (<Post key={post.id} user={user} postInfo={post} updatePost={props.updatePost} />);
                                            }
                                            return null;
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                            <View>
                                <View style={styles.notice}>
                                    <Lock height={0.032 * vh}></Lock>
                                    <View style={{
                                        height: 'auto',
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Nunito_700Bold',
                                            fontSize: 0.022 * vh,
                                            lineHeight: 0.024 * vh,
                                            marginBottom: -2,
                                        }}>Your votes are private.</Text>
                                        <Text style={{
                                            fontFamily: 'Nunito_400Regular',
                                            fontSize: 0.016 * vh,
                                            lineHeight: 0.02 * vh,
                                            color: '#949292',
                                        }}>Only you can see which posts you upvoted/downvoted.</Text>
                                    </View>
                                </View>
                                <ScrollView>
                                    <View style={{ width: vw, height: 'auto', gap: 0.012 * vh, }}>
                                        {props.postList.map((post) => {
                                            if (post.vote !== 0) {
                                                return (<Post key={post.id} user={user} postInfo={post} updatePost={props.updatePost} />);
                                            }
                                            return null;
                                        })}
                                    </View>
                                </ScrollView>
                            </View>
                        </Animated.View>
                    </View>}
                    {edit && <View style={styles.form}>
                        <View style={{
                            width: 0.9 * vw,
                            height: 'auto',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            gap: 10,
                            alignItems: 'center',
                        }}>
                            <View style={[styles.input, { width: (0.9 * vw - 10) / 2 }]}>
                                <Text style={styles.input_title}>Name</Text>
                                <View style={[styles.input_form, { width: '100%' }]}>
                                    <TextInput style={styles.input_text} placeholder="Quan Nguyen"></TextInput>
                                </View>
                            </View>
                            <View style={[styles.input, { width: (0.9 * vw - 10) / 2 }]}>
                                <Text style={styles.input_title}>Username</Text>
                                <View style={[styles.input_form, { width: '100%' }]}>
                                    <TextInput style={styles.input_text} placeholder="coolfarmer"></TextInput>
                                </View>
                            </View>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.input_title}>College</Text>
                            <View style={[styles.input_form, { width: '100%' }]}>
                                <TextInput style={styles.input_text} placeholder="VNU-HCM High School for the Gifted"></TextInput>
                            </View>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.input_title}>Major</Text>
                            <View style={[styles.input_form, { width: '100%' }]}>
                                <TextInput style={styles.input_text} placeholder="VNU-HCM High School for the Gifted"></TextInput>
                            </View>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.input_title}>Bio</Text>
                            <View style={[styles.input_form, { width: '100%' }]}>
                                <TextInput style={styles.input_text} placeholder="(What other farmers should think about you...)" value={bio} onChangeText={(newBio) => {
                                    if (newBio.length > 150) {
                                        alert("Too much nigga");

                                    } else {
                                        setBio(newBio);
                                    }
                                }}></TextInput>
                            </View>
                            <Text style={{
                                fontFamily: 'Nunito_400Regular',
                                fontSize: 0.016 * vh,
                                marginTop: -0.006 * vh,
                            }}>{bio.length}/150</Text>
                        </View>
                        <View style={styles.input}>
                            <Text style={styles.input_title}>Socials</Text>
                            <View style={styles.social}>
                                <Instagram width={'8%'} height={40} />
                                <View style={[styles.input_form, { width: '90%' }]}>
                                    <TextInput style={styles.input_text} placeholder="Instagram link" value={bio}></TextInput>
                                </View>
                            </View>
                            <View style={styles.social}>
                                <Snapchat width={'8%'} height={40} />
                                <View style={[styles.input_form, { width: '90%' }]}>
                                    <TextInput style={styles.input_text} placeholder="Snapchat link" value={bio}></TextInput>
                                </View>
                            </View>
                            <View style={styles.social}>
                                <X width={'8%'} height={40} />
                                <View style={[styles.input_form, { width: '90%' }]}>
                                    <TextInput style={styles.input_text} placeholder="X/Twitter link" value={bio}></TextInput>
                                </View>
                            </View>
                            <View style={styles.social}>
                                <LinkedIn width={'8%'} height={40} />
                                <View style={[styles.input_form, { width: '90%' }]}>
                                    <TextInput style={styles.input_text} placeholder="LinkedIn link" value={bio}></TextInput>
                                </View>
                            </View>
                            <View style={styles.social}>
                                <Facebook width={'8%'} height={40} />
                                <View style={[styles.input_form, { width: '90%' }]}>
                                    <TextInput style={styles.input_text} placeholder="Facebook link" value={bio}></TextInput>
                                </View>
                            </View>
                        </View>
                    </View>}
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