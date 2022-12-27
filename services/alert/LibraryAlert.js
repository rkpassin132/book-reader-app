import {Alert, ToastAndroid} from 'react-native';
import {deleteUserLibrary, setUserLibrary} from '../api/UserLibraryAPI';

export function addToLibrary(book_id) {
  return new Promise((resolve, reject) => {
    Alert.alert('Add to library', 'Do you want to add this book to library ?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => resolve(false),
      },
      {
        text: 'OK',
        onPress: () => {
          setUserLibrary(book_id).then(res => {
            if (res.data.success) {
              ToastAndroid.show(res.data.message, 100);
              resolve(res.data.added);
            } else {
              resolve(false);
            }
          });
        },
      },
    ]);
  });
}

export function removeFromLibrary(book_id) {
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Remove from library',
      'Do you want to remobe book from library ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => resolve(false),
        },
        {
          text: 'OK',
          onPress: () => {
            deleteUserLibrary(book_id).then(res => {
              if (res.data.success) {
                ToastAndroid.show(res.data.message, 100);
                resolve(res.data.deleted);
              } else {
                resolve(false);
              }
            });
          },
        },
      ],
    );
  });
}
