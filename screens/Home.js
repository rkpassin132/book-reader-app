import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';
import {Text, View, Button, Badge, Center} from 'native-base';
import { useIsFocused } from "@react-navigation/native";
import recentBookStorage from '../services/RecentBookStorage';
import EmptyData from '../components/EmptyData';
import StyleVariables from '../styles/StyleVariables';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import {getRecommendedBooks, getTrendingBooks} from '../services/api/BookAPI';
import Constant from '../utils/Constant';
import {imageData} from '../services/Common';
import Chips from '../components/Chips';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home(props) {
  const isFocused = useIsFocused();
  const [book, setBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState({
    loading: false,
    books: [],
  });

  const [treadingBooks, setTreadingBooks] = useState({
    loading: false,
    books: [],
  });

  useEffect(() => {
    if(book != null){
      trendingBook();
    }
  }, []);

  useEffect(() => {
    console.log("Home page")
    recentBookStorage.getRecentBook().then(book => {
      if (book) {
        setBook(book);
        recommendedBook();
      }
    });
  }, [props, isFocused]);

  const trendingBook = () => {
    setTreadingBooks({...treadingBooks, loading: true});
    getTrendingBooks(Constant.horizontal_book_limit).then(res => {
      if (res.data.success) {
        setTreadingBooks({loading: false, books: res.data.books});
      } else {
        setTreadingBooks({...treadingBooks, loading: false});
      }
    });
  };

  const recommendedBook = () => {
    setRecommendedBooks({...recommendedBooks, loading: true});
    getRecommendedBooks(Constant.horizontal_book_limit).then(res => {
      if (res.data.success) {
        setRecommendedBooks({loading: false, books: res.data.books});
      } else {
        setRecommendedBooks({...recommendedBooks, loading: false});
      }
    });
  };

  return (
    <ScrollView style={{backgroundColor: StyleVariables.bodyBackground}}>
      {book == null ? (
        <EmptyData
          navigation={props.navigation}
          image={require('../assets/images/reading.png')}
          text="Start reading now"
          button="Read"
          buttonNavigate="Explore"
        />
      ) : (
        <View>
          <View>
            <ImageBackground
              source={imageData(book.images[0].image)}
              style={{height: 250}}>
              <View style={styles.bgImg}>
                <Text fontSize={'md'} color={'white'}>
                  Your Current Reading
                </Text>
              </View>

              <View style={styles.bgImgSection}>
                <Text fontSize={'lg'} color={'white'} bold padding={1}>
                  {book.title}
                </Text>
                <Text
                  fontSize={'sm'}
                  color={'#ffeb3b'}
                  opacity={0.9}
                  isTruncated
                  noOfLines={3}
                  padding={0.5}>
                  {book.discription_about}
                </Text>
              </View>
            </ImageBackground>
            <View style={styles.recentActionSection}>
              <View flex={1}>
                <Chips
                  title={book.category.category}
                  icon={book.category.iconCategory}
                  onPress={() => {}}
                />
              </View>
              <TouchableNativeFeedback
                onPress={() =>
                  props.navigation.navigate('SingleBook', {book: book})
                }
                background={TouchableNativeFeedback.Ripple('#c7c7c7')}>
                <Center style={styles.readBtn}>
                  <Text
                    fontSize={'md'}
                    flex={2}
                    color={'white'}
                    textAlign={'center'}>
                    Read
                  </Text>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    style={{color: 'white', flex: 1}}
                  />
                </Center>
              </TouchableNativeFeedback>
            </View>
          </View>
          <HorizontalScrollSection
            {...props}
            title="Recommended for you"
            data={recommendedBooks}
            bookType={Constant.book_type.recommended}
          />
          <HorizontalScrollSection
            {...props}
            title="Trending"
            data={treadingBooks}
            bookType={Constant.book_type.category}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  readBtn: {
    display: 'flex',
    flexDirection: 'row',
    width: 100,
    padding: 10,
    color: 'white',
    backgroundColor: StyleVariables.AppColor,
    shadowRadius: 3,
    borderRadius: 25,
    opacity: 0.93,
  },
  bgImg: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    backgroundColor: StyleVariables.AppColor,
  },
  bgImgSection: {
    position: 'absolute',
    bottom: 0,
    width:"100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    bottom: 0,
    backgroundColor: '#004aadad',
  },
  discriptionText: {
    color: '#ffeb3b',
    padding: 0.5,
    opacity: 0.9,
  },
  recentActionSection: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
