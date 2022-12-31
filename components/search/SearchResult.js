import React from 'react';
import Constant from '../../utils/Constant';
import HorizontalScrollSection from '../HorizontalScrollSection';

export default function SearchResult(props) {
  return (
    <>
      {props.categoryBooksData.show && (
        <HorizontalScrollSection
          {...props}
          title="Search by category"
          data={props.categoryBooksData}
          bookType={Constant.book_type.category}
          search={props.searchData.category._id}
        />
      )}
      {props.titleBooksData.show && (
        <HorizontalScrollSection
          {...props}
          title="Search list"
          data={props.titleBooksData}
          bookType={Constant.book_type.search_by_title}
          search={props.searchData.title}
        />
      )}
    </>
  );
}
