import {useEffect, useState} from 'react';
import {Center, ScrollView, Text, View} from 'native-base';
import {TouchableNativeFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  addToLibrary,
  removeFromLibrary,
} from '../../services/alert/LibraryAlert';
import StyleVariables from '../../styles/StyleVariables';
import {getBookViews} from '../../services/api/BookViewAPI';
import {
  getBookLikeCount,
  getIsBookLiked,
  removeBookLike,
  setBookLike,
} from '../../services/api/BookLikeAPI';
import {isUserBookLibrary} from '../../services/api/UserLibraryAPI';

export default function SingleBookOption(props) {
  const [viewsCount, setViewCount] = useState(0);
  const [likes, setLikes] = useState({isLiked: false, count: 0});
  const [isLibrary, setIsLibrary] = useState({added: false});

  useEffect(() => {
    isBookAddedToLibrary();
    getViews();
    checkLikes();
  }, [props.book._id]);

  const getViews = async () => {
    let res = await getBookViews(props.book._id);
    if (res.data.success) {
      setViewCount(res.data.views_count);
    }
  };

  const checkLikes = async () => {
    let res = await getBookLikeCount(props.book._id);
    let res1 = await getIsBookLiked(props.book._id);
    if (res.data.success && res1.data.success) {
      setLikes({isLiked: res1.data.like, count: res.data.likes_count});
    }
  };

  const likeBook = async () => {
    let res = await setBookLike(props.book._id);
    if (res.data.success && res.data.liked) {
      setLikes({isLiked: true, count: likes.count + 1});
      checkLikes();
    }
  };

  const unLikeBook = async () => {
    let res = await removeBookLike(props.book._id);
    if (res.data.success && res.data.deleted) {
      setLikes({isLiked: false, count: likes.count - 1});
      checkLikes();
    }
  };

  const isBookAddedToLibrary = async () => {
    let res = await isUserBookLibrary(props.book._id);
    if (res.data.success) {
      setIsLibrary({added: res.data.added});
    }
  };

  const addLibrary = async () => {
    addToLibrary(props.book._id).then(res => {
      if (res) {
        setIsLibrary({added: true});
      }
    });
  };

  const removeLibrary = () => {
    removeFromLibrary(props.book._id).then(res => {
      if (res) {
        setIsLibrary({added: false});
      }
    });
  };

  return (
    <>
      <ScrollView
        horizontal={true}
        decelerationRate={0}
        snapToInterval={300}
        snapToAlignment={'center'}
        style={{
          marginTop: 20,
          paddingVertical: 8,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: '#b8b7b7',
        }}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate('ReadBook', { book:props.book })}
          background={TouchableNativeFeedback.Ripple('#8b8b8b', true, 30)}>
          <Center style={{width: 80}}>
            <Ionicons name="reader" size={24} style={{color: '#333'}} />
            <Text fontSize={'xs'}>Read</Text>
          </Center>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate('PlayBook', { book:props.book })}
          background={TouchableNativeFeedback.Ripple('#8b8b8b', true, 30)}>
          <Center style={{width: 80}}>
            <Ionicons name="play-circle" size={24} style={{color: '#333'}} />
            <Text fontSize={'xs'}>Play</Text>
          </Center>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple('#8b8b8b', true, 30)}>
          <Center style={{width: 80}}>
            <Ionicons name={'eye'} size={24} style={{color: '#333'}} />
            <Text fontSize={'xs'}>{viewsCount}</Text>
          </Center>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={likes.isLiked ? unLikeBook : likeBook}
          background={TouchableNativeFeedback.Ripple('#8b8b8b', true, 30)}>
          <Center style={{width: 80}}>
            <MaterialIcons
              name={likes.isLiked ? 'thumb-up' : 'thumb-up-off-alt'}
              size={24}
              style={{color: likes.isLiked ? StyleVariables.AppColor : '#333'}}
            />
            <Text fontSize={'xs'}>{likes.count}</Text>
          </Center>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={isLibrary.added ? removeLibrary : addLibrary}
          background={TouchableNativeFeedback.Ripple('#8b8b8b', true, 30)}>
          <Center style={{width: 80}}>
            {isLibrary.added ? (
              <Ionicons
                name={'remove-circle-sharp'}
                size={24}
                style={{color: '#333'}}
              />
            ) : (
              <Ionicons name={'add-circle'} size={24} style={{color: '#333'}} />
            )}
            <Text fontSize={'xs'}>Library</Text>
          </Center>
        </TouchableNativeFeedback>
      </ScrollView>
    </>
  );
}
