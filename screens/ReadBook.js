import {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  TouchableNativeFeedback,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {
  Actionsheet,
  Badge,
  Center,
  Divider,
  ScrollView,
  Text,
  useDisclose,
  View,
} from 'native-base';
import Header from '../components/Header';
import {getBookPdf} from '../services/api/BookContentAPI';
import StyleVariables from '../styles/StyleVariables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import recentBookStorage from '../services/RecentBookStorage';

export default function ReadBook(props) {
  const book = props.route.params.book;
  const [bookData, setBookData] = useState({loading: false, book: null});
  const [content, setContent] = useState({data: null});
  const [font, setFont] = useState(1);
  const fontSize = [15, 17, 19, 22];
  const {isOpen, onOpen, onClose} = useDisclose();

  useEffect(() => {
    getContent();
    recentBookStorage.setRecentBook(book, props.route.params.getData);
  }, []);

  const getContent = async () => {
    setBookData({...bookData, loading: true});
    let res = await getBookPdf(book._id);
    if (res.data.success) {
      setBookData({loading: false, book: res.data.book});
      if (res.data.book.pdfs.length > 0)
        setContent({data: res.data.book.pdfs[0]});
    } else {
      setBookData({...bookData, loading: false});
    }
  };

  const previous = () => {
    let index = content.data.page_no - 1;
    if (index > 0) {
      setContent({data: bookData.book.pdfs[index - 1]});
    } else {
      ToastAndroid.show('This is first page', ToastAndroid.SHORT);
    }
  };

  const next = () => {
    let index = content.data.page_no + 1;
    if (index <= bookData.book.pdfs.length) {
      setContent({data: bookData.book.pdfs[index - 1]});
    } else {
      ToastAndroid.show('This is last page', ToastAndroid.SHORT);
    }
  };

  const fontIncrease = () => {
    if (font + 1 < fontSize.length) setFont(font + 1);
  };
  const fontDecrease = () => {
    if (font - 1 >= 0) setFont(font - 1);
  };

  return (
    <>
      <Header title={book.title} navigation={props.navigation} />
      <ScrollView style={{backgroundColor: StyleVariables.bodyBackground}}>
        {bookData.loading && (
          <ActivityIndicator
            size={'large'}
            style={{marginTop: 20}}
            color="#0000ff"
          />
        )}
        {content.data != null && (
          <View padding={5}>
            <Text bold fontSize={'2xl'} color={'black'}>
              {content.data.heading}
            </Text>
            <Text fontSize={fontSize[font]} marginTop={4}>
              {content.data.content}
            </Text>
          </View>
        )}
      </ScrollView>
      {content.data != null && (
        <>
          <Center shadow={3} style={styles.footerContainer}>
            <TouchableNativeFeedback
              onPress={fontDecrease}
              background={TouchableNativeFeedback.Ripple('#EEE', true, 2)}>
              <Center style={{flex: 1, opacity: font > 0 ? 1 : 0.5}}>
                <Text fontSize={'lg'} color={'white'}>
                  A-
                </Text>
              </Center>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={fontIncrease}
              background={TouchableNativeFeedback.Ripple('#EEE', true, 2)}>
              <Center
                style={{
                  flex: 1,
                  opacity: font != fontSize.length - 1 ? 1 : 0.5,
                }}>
                <Text fontSize={'xl'} color={'white'}>
                  A+
                </Text>
              </Center>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={onOpen}
              background={TouchableNativeFeedback.Ripple('#EEE', true, 2)}>
              <View style={{flex: 2, alignItems: 'center'}}>
                <Badge colorScheme={'info'} fontSize={'lg'} borderRadius={5}>
                  {content.data.page_no}
                </Badge>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={previous}
              background={TouchableNativeFeedback.Ripple('#EEE', true, 2)}>
              <Center
                style={{flex: 1, opacity: content.data.page_no > 1 ? 1 : 0.5}}>
                <Ionicons
                  name="arrow-back"
                  style={{fontSize: 20, color: 'white'}}
                />
              </Center>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback
              onPress={next}
              background={TouchableNativeFeedback.Ripple('#EEE', true, 2)}>
              <Center
                style={{
                  flex: 1,
                  opacity:
                    content.data.page_no != bookData.book.pdfs.length ? 1 : 0.5,
                }}>
                <Ionicons
                  name="arrow-forward"
                  style={{fontSize: 20, color: 'white'}}
                />
              </Center>
            </TouchableNativeFeedback>
          </Center>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              {bookData.book.pdfs.map(pdf => {
                return (
                  <>
                    <Actionsheet.Item
                      onPress={() => {
                        setContent({data: pdf});
                        onClose();
                      }}
                      startIcon={
                        <Badge
                          colorScheme={'success'}
                          variant={'solid'}
                          borderRadius={1}>
                          {pdf.page_no}
                        </Badge>
                      }>
                      <Text fontSize={'md'}>{pdf.heading}</Text>
                    </Actionsheet.Item>
                    <Divider borderColor="gray.300" />
                  </>
                );
              })}
            </Actionsheet.Content>
          </Actionsheet>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: StyleVariables.AppColor,
    height: 60,
    padding: 5,
  },
});
