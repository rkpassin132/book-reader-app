import {useState, useEffect} from 'react';
import {ActivityIndicator, ToastAndroid} from 'react-native';
import {Center, Image, ScrollView, Text} from 'native-base';
import Header from '../components/Header';
import {getBookAudio} from '../services/api/BookContentAPI';
import StyleVariables from '../styles/StyleVariables';
import {imageData} from '../services/Common';
import AudioPlayer from '../components/AudioPlayer';
import Constant from '../utils/Constant';
import recentBookStorage from '../services/RecentBookStorage';

export default function PlayBook(props) {
  const book = props.route.params.book;
  const [bookData, setBookData] = useState({loading: false, book: null});
  const [content, setContent] = useState({data: null});

  useEffect(() => {
    getContent();
    recentBookStorage.setRecentBook(book, props.route.params.getData);
  }, []);

  const getContent = async () => {
    setBookData({...bookData, loading: true});
    let res = await getBookAudio(book._id);
    if (res.data.success) {
      setBookData({loading: false, book: res.data.book});
      if (res.data.book.audios.length > 0)
        setContent({data: res.data.book.audios[0]});
    } else {
      setBookData({...bookData, loading: false});
    }
  };

  const previousBtn = async () => {
    let index = content.data.page_no - 1;
    if (index > 0) {
      setContent({data: bookData.book.audios[index - 1]});
    } else {
      ToastAndroid.show('This is first page', ToastAndroid.SHORT);
    }
  };

  const nextBtn = async () => {
    let index = content.data.page_no + 1;
    if (index <= bookData.book.audios.length) {
      setContent({data: bookData.book.audios[index - 1]});
    } else {
      ToastAndroid.show('This is last page', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <Header title={''} navigation={props.navigation} />
      <ScrollView style={{backgroundColor: StyleVariables.AppColor}}>
        {bookData.loading && (
          <ActivityIndicator
            size={'large'}
            style={{marginTop: 20}}
            color="white"
          />
        )}
        <Center padding={5}>
          <Image
            source={imageData(props.route.params.book.images[0].image)}
            shadow={3}
            style={{width: 200, height: 200}}
            resizeMode="contain"
          />
          <Text
            bold
            fontSize={'2xl'}
            color={'white'}
            padding={1}
            paddingTop={2}>
            {book.title}
          </Text>
        </Center>
        {content.data != null && (
          <>
            <Center>
              <Text fontSize={20} color={'white'} padding={1} opacity={0.8}>
                Chapter {content.data.page_no}
              </Text>
            </Center>
            <Center style={{flex: 1, padding: 1, marginTop: 180}}>
              <AudioPlayer
                url={content.data.audio}
                headers={{Authorization: 'Bearer ' + Constant.token}}
                skipNext={nextBtn}
                skipPrevious={previousBtn}
              />
            </Center>
          </>
        )}
      </ScrollView>
    </>
  );
}
