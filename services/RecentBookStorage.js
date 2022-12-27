import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBookById } from './api/BookAPI';

export default recentBookStorage = {
  setRecentBook,
  getRecentBook,
  removeRecentBook,
};

async function setRecentBook(value = null, getData = false) {
  if (getData) {
    let res = await getBookById(book._id);
    if (res.data.success) {
      return AsyncStorage.setItem(
        '@user_recent_book',
        JSON.stringify(res.data.book),
      );
    }
  }
  return AsyncStorage.setItem('@user_recent_book', JSON.stringify(value));
}

async function getRecentBook() {
  let book = await AsyncStorage.getItem('@user_recent_book');
  return book ? JSON.parse(book) : null;
}

function removeRecentBook() {
  return AsyncStorage.removeItem('@user_recent_book');
}
