import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import HorizontalScrollSection from '../components/HorizontalScrollSection';
import {getNewlyBooks, getTrendingBooks} from '../services/api/BookAPI';
import {getBookCategories} from '../services/api/BookCategoryAPI';
import {getSearchBookByCategory} from '../services/api/BookSearchAPI';
import StyleVariables from '../styles/StyleVariables';
import Constant from '../utils/Constant';

export default function Explore(props) {
  const [treadingBooks, setTreadingBooks] = useState({
    loading: false,
    books: [],
  });
  const [newlyBooks, setNewlyBooks] = useState({loading: false, books: []});
  const [categoriesBooks, setCategoriesBooks] = useState({categories: []});
  let tempCategoriesBooks;

  useEffect(() => {
    setCategoriesBooks({categories: []});
    trendingBook();
    newlyBook();
    getCategory();
  }, []);

  const trendingBook = () => {
    setTreadingBooks({...treadingBooks, loading: true});
    getTrendingBooks(Constant.horizontal_book_limit)
      .then(res => {
        if (res.data.success) {
          setTreadingBooks({loading: false, books: res.data.books});
        } else {
          setTreadingBooks({...treadingBooks, loading: false});
        }
      })
      .catch(err => {
      });
  };

  const newlyBook = () => {
    setNewlyBooks({...newlyBooks, loading: true});
    getNewlyBooks(Constant.horizontal_book_limit)
      .then(res => {
        if (res.data.success) {
          setNewlyBooks({loading: false, books: res.data.books});
        } else {
          setNewlyBooks({...newlyBooks, loading: false});
        }
      })
      .catch(err => {
      });
  };

  const getCategoryBooks = (categories, total, count) => {
    if (count >= total) return;

    let category = categories[count];
    if (count == 0) tempCategoriesBooks = [];
    else tempCategoriesBooks = tempCategoriesBooks;

    getSearchBookByCategory(category._id, Constant.horizontal_book_limit).then(
      res1 => {
        tempCategoriesBooks.push({
          category: category,
          data: {loading: false, books: res1.data.books},
        });
        setCategoriesBooks({categories: tempCategoriesBooks});
        getCategoryBooks(categories, total, count + 1);
      },
    );
  };

  const getCategory = async () => {
    let res = await getBookCategories(4);
    getCategoryBooks(res.data.categories, 4, 0);
  };

  return (
    <ScrollView style={{backgroundColor: StyleVariables.bodyBackground}}>
      <HorizontalScrollSection
        {...props}
        title="Trending"
        data={treadingBooks}
        bookType={Constant.book_type.trending}
      />
      <HorizontalScrollSection
        {...props}
        title="Newly added"
        data={newlyBooks}
        bookType={Constant.book_type.trending}
      />
      {categoriesBooks.categories.map(({category, data}) => {
        return (
          <HorizontalScrollSection
            {...props}
            key={category._id}
            title={category.category}
            data={data}
            bookType={Constant.book_type.category}
            search={category._id}
          />
        );
      })}
    </ScrollView>
  );
}
