import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  StyleSheet,
} from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {toHHMMSS} from '../services/Common';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const volumeControlTime = 3000;

export default function AudioPlayer(props) {
  const {url} = props;
  const [paused, setPaused] = useState(true);
  const rateList = ['0.25', '0.5', '0.75', '1.0', '1.25', '1.5', '1.75', '2'];

  const videoRef = useRef(null);
  const controlTimer = useRef(0);

  const [totalLength, setTotalLength] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [volumeControl, setVolumeControl] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [rate, setRate] = useState(3);

  const onSeek = time => {
    time = Math.round(time);
    videoRef && videoRef.current.seek(time);
    setCurrentPosition(time);
    setPaused(false);
  };

  const fixDuration = data => {
    setLoading(false);
    setTotalLength(Math.floor(data.duration));
  };

  const setTime = data => {
    setCurrentPosition(Math.floor(data.currentTime));
  };

  const togglePlay = () => {
    setPaused(!paused);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  const toggleVolumeControl = () => {
    setVolumeTimer(!volumeControl);
    LayoutAnimation.easeInEaseOut();
    setVolumeControl(!volumeControl);
  };

  const setVolumeTimer = (setTimer = true) => {
    clearTimeout(controlTimer.current);
    controlTimer.current = 0;
    if (setTimer) {
      controlTimer.current = setTimeout(() => {
        LayoutAnimation.easeInEaseOut();
        setVolumeControl(false);
      }, volumeControlTime);
    }
  };

  const onVolumeChange = vol => {
    setVolumeTimer();
    setVolume(vol);
  };

  const resetAudio = () => {
    if (!repeat) {
      setPaused(true);
    }
    setCurrentPosition(0);
  };

  const changeRate = () => {
    if (rate + 1 < rateList.length) {
      setRate(rate + 1);
    } else {
      setRate(0);
    }
  };

  return (
    <View>
      <Video
        source={{uri: url}}
        headers={props.headers}
        rate={parseFloat(rateList[rate])}
        ref={videoRef}
        playInBackground={false}
        audioOnly={true}
        playWhenInactive={false}
        paused={paused}
        onEnd={resetAudio}
        onLoad={fixDuration}
        onLoadStart={() => setLoading(true)}
        onProgress={setTime}
        volume={volume}
        repeat={repeat}
        style={{height: 0, width: 0}}
      />

      <View>
        <View style={styles.rowContainer}>
          {(loading && (
            <View style={{margin: 18}}>
              <ActivityIndicator size="large" color="#FFF" />
            </View>
          )) || (
            <>
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                  style={styles.iconContainer}
                  onPress={props.skipPrevious}>
                  <MaterialIcons
                    name="skip-previous"
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.iconContainer, styles.playBtn]}
                  onPress={togglePlay}>
                  <MaterialIcons
                    name={paused ? 'play-circle-filled' : 'pause-circle-filled'}
                    style={{fontSize: 70, color: 'white'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                  style={styles.iconContainer}
                  onPress={props.skipNext}>
                  <MaterialIcons
                    name="skip-next"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={Math.max(totalLength, 1, currentPosition + 1)}
                  minimumTrackTintColor={'#fff'}
                  maximumTrackTintColor={'grey'}
                  onSlidingComplete={onSeek}
                  value={currentPosition}
                  thumbTintColor={'#fff'}
                  thumbStyle={{width: 10}}
                />
                <View style={styles.durationContainer}>
                  <Text style={styles.timeText}>
                    {toHHMMSS(currentPosition)}
                  </Text>
                  <Text style={styles.timeText}>{toHHMMSS(totalLength)}</Text>
                </View>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                  style={[
                    styles.iconContainer,
                    {flex: 1, alignItems: 'center'},
                  ]}
                  onPress={toggleRepeat}>
                  <MaterialIcons
                    name="loop"
                    style={styles.icon}
                  />
                  {!repeat && <View style={styles.crossLine} />}
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                  style={{flex: 1}}
                  onPress={changeRate}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: '700',
                    }}>
                    {rateList[rate]}
                  </Text>
                </TouchableOpacity>
                <View
                  style={[
                    styles.volumeControlContainer,
                    volumeControl
                      ? {paddingHorizontal: 12}
                      : {backgroundColor: 'transparent'},
                    {flex: volumeControl ? 3 : 1},
                  ]}>
                  <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
                    style={styles.iconContainer}
                    onPress={toggleVolumeControl}>
                    <MaterialIcons
                      name={volume === 0 ? 'volume-off' : 'volume-up'}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  {volumeControl && (
                    <Slider
                      style={styles.volumeSlider}
                      minimumValue={0}
                      maximumValue={1}
                      minimumTrackTintColor={'#fff'}
                      maximumTrackTintColor={'grey'}
                      thumbTintColor={'#fff'}
                      onSlidingComplete={onVolumeChange}
                      value={volume}
                    />
                  )}
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
    position: 'relative',
  },
  playBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    width: '100%',
  },
  slider: {
    height: 30,
    width: '100%',
    marginBottom: 3,
  },
  durationContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  crossLine: {
    position: 'absolute',
    transform: [{rotate: '-60deg'}],
    top: 15,
    width: 30,
    height: 1,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  volumeControlContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#00000099',
    paddingHorizontal: 16,
    borderRadius: 50,
    height: 40,
  },
  volumeSlider: {
    width: '50%',
  },
  timeText: {
    color: '#fff',
    fontSize: 18,
  },
  icon: {fontSize: 30, color: 'white'},
});
