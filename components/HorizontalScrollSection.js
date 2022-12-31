import {Button, Text, View, Icon} from 'native-base';
import {
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import StyleVariables from '../styles/StyleVariables';
import BookCard from './book/BookCard';
import EmptyData from './EmptyData';

export default function HorizontalScrollSection(props) {
  const navigateMore = () =>{
    let sendData = { title:props.title, bookType:props.bookType };
    if(props.search) sendData = { ...sendData, search:props.search }; 
    props.navigation.navigate('MoreBook', sendData);
  }

  return (
    <View style={{marginVertical: 20, paddingHorizontal: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2, justifyContent: 'flex-start'}}>
          <Text bold color={'black'} fontSize={'lg'}>
            {props.title}
          </Text>
          <View
            style={{
              width: '20%',
              height: 4,
              backgroundColor: '#ffc107',
              marginTop: 2,
            }}></View>
        </View>
        {props.data.books.length > 0 && (
          <TouchableNativeFeedback
            onPress={navigateMore}
            background={TouchableNativeFeedback.Ripple('#eee')}>
            <View style={{flex: 1, justifyContent: 'flex-end', paddingVertical:10}}>
              {/* <Button variant="ghost"> */}
                <Text textAlign={"center"} color={StyleVariables.AppColor}>More</Text>
              {/* </Button> */}
            </View>
          </TouchableNativeFeedback>
        )}
        {props.data.loading && (
          <ActivityIndicator style={{flex: 1}} color="#0000ff" />
        )}
      </View>
      <View>
        {props.data.books.length > 0 ? (
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={300}
            snapToAlignment={'center'}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
            {props.data.books.map(book => (
              <BookCard key={book._id} navigation={props.navigation} book={book} />
            ))}
          </ScrollView>
        ) : (
          <EmptyData
            image={require('../assets/images/reading.png')}
            imagehHeight={120}
            text=""
          />
        )}
      </View>
    </View>
  );
}
