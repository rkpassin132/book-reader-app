import React from 'react';
import {ScrollView, Text, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import StyleVariables from '../styles/StyleVariables';

export default function AboutUs() {
  return (
    <ScrollView style={{backgroundColor:StyleVariables.bodyBackground}}>
      <Onboarding
        pages={[
          {
            backgroundColor: StyleVariables.bodyBackground,
            image: (
              <Image
                style={[styles.image]}
                source={require('../assets/images/welcome1.png')}
              />
            ),
            title: 'Welcome to Book Reader',
            subtitle: "Indian's largest book reading app.",
          },
          {
            backgroundColor: StyleVariables.bodyBackground,
            image: (
              <Image
                style={[styles.image]}
                source={require('../assets/images/welcome2.png')}
              />
            ),
            title: 'Listen book',
            subtitle:
              'Engaging book to build lasting knowledge that can be revised easily anytime anywhere',
          },
          {
            backgroundColor: StyleVariables.bodyBackground,
            image: (
              <Image
                style={[styles.image]}
                source={require('../assets/images/welcome3.png')}
              />
            ),
            title: 'Offline download',
            subtitle: 'Read or listen any time',
          },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    image:{
      width: "80%",
      top: "0%",
      resizeMode: 'contain',
      height: 240,
    },
    welcome1img:{
    },
    welcome2img:{
    },
    welcome3img:{
    }

});