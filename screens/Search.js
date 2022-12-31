import React, {useEffect, useState} from 'react';
import StyleVariables from '../styles/StyleVariables';
import {ActivityIndicator, ScrollView} from 'react-native';
import SearchHeader from '../components/search/SearchHeader';
import SearchResult from '../components/search/SearchResult';
import SearchCategorySection from '../components/search/SearchCategorySection';
import {getBookCategories} from '../services/api/BookCategoryAPI';
import {
  getSearchBookByCategory,
  getSearchBookByTitle,
} from '../services/api/BookSearchAPI';
import Constant from '../utils/Constant';

export default function Search(props) {
  const [categories, setCategories] = useState({
    loading: false,
    categories: [],
  });
  const [categoryBooks, setCategoryBooks] = useState({
    loading: false,
    show:false,
    books: [],
  });
  const [titleBooks, setTitleBooks] = useState({loading: false, show:false, books: []});
  const [searchData, setSearchData] = useState({ category:"", title:"" });

  useEffect(() => {
    category();
  }, []);

  const category = () => {
    setCategories({...categories, loading: true});
    setTimeout(() => {}, 2000);
    getBookCategories().then(res => {
      if (res.data.success) {
        setCategories({loading: false, categories: res.data.categories});
      } else {
        setCategories({...categories, loading: false});
      }
    });
  };

  const getCategoryBooks = category => {
    setCategoryBooks({...categoryBooks, show:true, loading: true});
    setSearchData({ ...searchData, category:category });
    getSearchBookByCategory(category._id, Constant.horizontal_book_limit).then(
      res => {
        if (res.data.success) {
          setCategoryBooks({loading: false, show:true, books: res.data.books});
        } else {
          setCategoryBooks({...categoryBooks, loading: false});
        }
      },
    );
  };

  const getTitleBooks = search => {
    if(search == "" || search == null) {
      setTitleBooks({ books: [], show:false, loading:false });
      return;
    }
    setTitleBooks({...titleBooks, show:true, loading: true });
    setSearchData({ ...searchData, title:search });
    getSearchBookByTitle(search, Constant.horizontal_book_limit).then(res => {
      if (res.data.success) {
        setTitleBooks({loading: false, show:true, books: res.data.books});
      } else {
        setTitleBooks({...titleBooks, loading: false});
      }
    });
  };

  return (
    <>
      <SearchHeader {...props} getTitleBooks={getTitleBooks}/>
      <ScrollView style={{backgroundColor: StyleVariables.bodyBackground}}>
        {categoryBooks.loading || titleBooks.loading ? (
          <ActivityIndicator size={'large'} style={{flex: 1}} color="#0000ff" />
        ) : (
          <></>
        )}
        <SearchCategorySection
          {...props}
          data={categories}
          getCategoryBooks={getCategoryBooks}
        />
        <SearchResult
          {...props}
          categoryBooksData={categoryBooks}
          titleBooksData={titleBooks}
          searchData={searchData}
        />
      </ScrollView>
    </>
  );
}
