import React, { useEffect, useState } from "react";
import { Linking, Modal, StyleSheet, Animated, Easing, Text, View, Image, ScrollView, Dimensions, StatusBar, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import CheckBox from 'expo-checkbox';
import { useFonts, Nunito_400Regular, Nunito_800ExtraBold, Nunito_600SemiBold, Nunito_700Bold, Nunito_500Medium } from '@expo-google-fonts/nunito';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { transform } from "@babel/core";

const vw = Dimensions.get('window').width;
const vh = Dimensions.get('window').height;

const UserLogo = require("../assets/images/roundIcon.png");
import Dot from "../assets/images/graydot.svg";
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

export default function Post(props: any) {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_600SemiBold,
    Nunito_500Medium,
    Nunito_400Regular,
  });

  const [vote, setVote] = React.useState(props.postInfo.vote);
  const [mark, setMark] = React.useState(props.postInfo.bookmark);
  const [action, setAction] = React.useState(false);
  const [react, setReact] = React.useState(props.postInfo.react);
  const [content, setContent] = React.useState(props.postInfo.content);
  const [user, setUser] = React.useState(props.user);
  const currentUser = (props.postInfo.id.substring(0, props.postInfo.id.indexOf("p")) === user.id);

  const handleVote = (newVote: number) => {
    const orgReact = react - vote;
    const newReact = orgReact + newVote;

    const updatedPost = {
      ...props.postInfo,
      vote: newVote,
      react: newReact
    };

    setVote(newVote);
    setReact(newReact);
    props.updatePost(updatedPost);
  };

  const handleBookmark = () => {
    const updatedPost = {
      ...props.postInfo,
      bookmark: !mark
    };

    setMark(!mark);
    props.updatePost(updatedPost);
  };

  useEffect(() => {
    setVote(props.postInfo.vote);
    setReact(props.postInfo.react);
    setMark(props.postInfo.bookmark);
  }, [props.postInfo]);

  if (fontsLoaded) {

    return (
      <View style={{
        flexDirection: 'row',
        padding: 0.016 * vh,
        backgroundColor: '#FFFFFF',
        gap: 0.012 * vh,
      }}>
        <TouchableOpacity style={{
          position: 'absolute',
          top: 0,
          right: 0,
          paddingHorizontal: 0.016 * vh,
          paddingVertical: 0.016 * vh,
        }} onPress={() => { setAction(true) }}>
          <ThreeDot width={0.024 * vh} height={0.024 * vh}></ThreeDot>

          <Modal
            visible={action}
            transparent={true}
            onRequestClose={() => setAction(false)}
          >
            <TouchableWithoutFeedback onPress={() => setAction(false)}>
              <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                paddingTop: 0.115 * vh,
                paddingRight: 20,
              }}>
                <View style={{
                  alignItems: 'center',
                  backgroundColor: '#F6F8F9',
                  paddingHorizontal: 0.024 * vh,
                  paddingBottom: 0.032 * vh,
                  paddingTop: 0.012 * vh,
                  width: vw,
                  height: 'auto',
                  position: 'absolute',
                  bottom: 0,
                }}>
                  <View style={{
                    backgroundColor: '#C2C1C1',
                    width: 0.2 * vw,
                    height: 0.01 * vh,
                    borderRadius: vw,
                    marginBottom: 0.016 * vh,
                  }}></View>
                  <View style={{
                    backgroundColor: '#FFFFFF',
                    width: 0.9 * vw,
                    height: 'auto',
                    borderRadius: 0.024 * vh,
                  }}>
                    {!currentUser &&
                      <TouchableOpacity style={styles.action}>
                        <CopyLink width={0.024 * vh} height={0.024 * vh}></CopyLink>
                        <Text style={[styles.actionText, { color: '#000000' }]}>Copy link to post</Text>
                      </TouchableOpacity>
                    }
                    {!currentUser &&
                      <TouchableOpacity style={styles.action}>
                        <Report width={0.024 * vh} height={0.024 * vh}></Report>
                        <Text style={[styles.actionText, { color: '#EAB308' }]}>Report post</Text>
                      </TouchableOpacity>
                    }
                    {currentUser &&
                      <TouchableOpacity style={styles.action}>
                        <Edit width={0.024 * vh} height={0.024 * vh}></Edit>
                        <Text style={[styles.actionText, { color: '#000000' }]}>Edit post</Text>
                      </TouchableOpacity>
                    }
                    {currentUser &&
                      <TouchableOpacity style={styles.action}>
                        <Delete width={0.024 * vh} height={0.024 * vh}></Delete>
                        <Text style={[styles.actionText, { color: '#FF0000' }]}>Delete post</Text>
                      </TouchableOpacity>
                    }
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.viewUser}>
          <Image source={UserLogo} style={{ width: 0.04 * vh, height: 0.04 * vh, borderRadius: vh }}></Image>
        </TouchableOpacity>
        <View>
          <Text style={{
            fontFamily: 'Nunito_400Regular',
            fontSize: 0.02 * vh,
            lineHeight: 0.024 * vh,
            color: '#949292',
          }}>
            <Text style={{
              fontFamily: 'Nunito_800ExtraBold',
              color: '#000000',
            }}>{props.postInfo.name} </Text>
            @{props.postInfo.username}
            <View style={{ height: 0.01 * vh }}><Dot width={0.016 * vh} height={0.008 * vh}></Dot></View>
            {props.postInfo.time}
          </Text>
          <Text style={{
            fontFamily: 'Nunito_400Regular',
            fontSize: 0.016 * vh,
            lineHeight: 0.02 * vh,
            marginTop: -0.002 * vh,
          }}>{props.postInfo.school}</Text>
          <TouchableOpacity style={{
            height: 'auto',
            borderWidth: 1,
            borderColor: '#448D57',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 0.012 * vh,
            paddingTop: 0.0036 * vh,
            paddingBottom: 0.0004 * vh,
            borderRadius: vw,
            marginTop: 0.008 * vh,
            marginBottom: 0.012 * vh,
            alignSelf: 'flex-start',
          }} onPress={props.setSpace}>
            <Text style={{
              fontSize: 0.02 * vh,
              lineHeight: 0.024 * vh,
              fontFamily: 'Nunito_800ExtraBold',
              color: '#448D57',
              width: 'auto',
            }}>{props.postInfo.spaces}</Text>
          </TouchableOpacity>
          <View style={styles.content}>
            {content.map((item, index) => {
              if (item[0] === "bold") {
                return (<Text key={index} style={styles.contentTitle}>{item[1]}</Text>);
              } else {
                return (<Text key={index} style={styles.contentPar}>{item[1]}</Text>);
              }
            })}
          </View>
          <View style={styles.reacts}>
            <View style={styles.reacts}>
              <View style={styles.reactBox}>
                <TouchableOpacity onPress={() => { handleVote((vote < 1) ? 1 : 0); }}>
                  {(vote != 1) && <Upvote width={0.024 * vh} height={0.024 * vh}></Upvote>}
                  {(vote == 1) && <Upvoted width={0.024 * vh} height={0.024 * vh}></Upvoted>}
                </TouchableOpacity>
                <Text style={styles.stats}>
                  {(react < 1000) ? react : (Math.round(react / 100) / 10) + 'k'}
                </Text>
                <TouchableOpacity onPress={() => { handleVote((vote > -1) ? -1 : 0); }}>
                  {(vote != -1) && <Downvote width={0.024 * vh} height={0.024 * vh}></Downvote>}
                  {(vote == -1) && <Downvoted width={0.024 * vh} height={0.024 * vh}></Downvoted>}
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <View style={styles.reactBox}>
                  <Comment width={0.024 * vh} height={0.024 * vh}></Comment>
                  <Text style={styles.stats}>
                    {(props.postInfo.comment < 1000) ? props.postInfo.comment : (Math.round(props.postInfo.comment / 100) / 10) + 'k'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.reacts}>
              <TouchableOpacity onPress={() => { handleBookmark() }}>
                <View style={styles.reactBox}>
                  {!mark && <Save width={0.024 * vh} height={0.024 * vh}></Save>}
                  {mark && <Saved width={0.024 * vh} height={0.024 * vh}></Saved>}
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.reactBox}>
                  <Share width={0.024 * vh} height={0.024 * vh}></Share>
                </View>
              </TouchableOpacity>
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