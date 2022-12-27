import React, {Component} from 'react';
import { Image, StyleSheet, BackHandler } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


export default class Welcome extends Component{

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
      return true;
  };
    
  render(){

    const done = () =>{
      this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }
    const skip = () =>{
      this.props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    return(
      <>
      <Onboarding
          // bottomBarColor="#F4B51D"
          onDone={done}
          onSkip={skip}
          pages={[
              {
                  backgroundColor: '#fff',
                  image: <Image style={[styles.image]} source={require('../assets/images/welcome1.png')} />,
                  title: 'Welcome to Book Reader',
                  subtitle: "Indian's largest book reading app.",
              },
              {
                  backgroundColor: '#fff',
                  image: <Image style={[styles.image]} source={require('../assets/images/welcome2.png')} />,
                  title: 'Listen book',
                  subtitle: 'Engaging book to build lasting knowledge that can be revised easily anytime anywhere',
              },
              {
                  backgroundColor: '#fff',
                  image: <Image style={[styles.image]} source={require('../assets/images/welcome3.png')} />,
                  title: 'Offline download',
                  subtitle: 'Read or listen any time',
              }
              
          ]}
      />
      </>
    );
  }
}

  const styles = StyleSheet.create({
    image:{
      width: "80%",
      top: "0%",
      resizeMode: 'contain',
      height: 240,
    }
});