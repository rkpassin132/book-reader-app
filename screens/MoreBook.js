import React, {useEffect, useState} from 'react';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import BookCard from '../components/book/BookCard';
import StyleVariables from '../styles/StyleVariables';
import Constant from '../utils/Constant';
import {getNewlyBooks, getTrendingBooks} from '../services/api/BookAPI';
import {
  getSearchBookByCategory,
  getSearchBookByTitle,
} from '../services/api/BookSearchAPI';
import Header from '../components/Header';

export default function MoreBook(props) {
  const [booksData, setBooksData] = useState({loading: false, books: []});
  const {title, bookType} = props.route.params;

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    setBooksData({...booksData, loading: true});
    let res = {data: {success: false}};
    switch (bookType) {
      case Constant.book_type.trending:
        res = await getTrendingBooks();
        break;
      case Constant.book_type.newly:
        res = await getNewlyBooks();
        break;
      case Constant.book_type.category:
        res = await getSearchBookByCategory(props.route.params.search);
        break;
      case Constant.book_type.newly:
        res = await getSearchBookByTitle(props.route.params.search);
        break;
      default:
        break;
    }
    if (res.data.success) {
      setBooksData({
        loading: false,
        books: [...res.data.books, ...res.data.books],
      });
    } else {
      setBooksData({...booksData, loading: false});
    }
  };

  return (
    <>
      <Header title={title} navigation={props.navigation} />
      <ScrollView style={{backgroundColor: StyleVariables.bodyBackground}}>
        {booksData.loading && (
          <ActivityIndicator style={{flex: 1}} color="#0000ff" />
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {booksData.books.map(book => (
            <BookCard
              key={book._id}
              navigation={props.navigation}
              book={book}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
