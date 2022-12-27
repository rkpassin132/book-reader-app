import React from 'react';
import HorizontalScrollSection from '../HorizontalScrollSection';

export default function SearchResult(props) {
  return (
    <>
      {props.categoryBooksData.show && (
        <HorizontalScrollSection
          {...props}
          title="Search by category"
          data={props.categoryBooksData}
        />
      )}
      {props.titleBooksData.show && (
        <HorizontalScrollSection
          {...props}
          title="Search list"
          data={props.titleBooksData}
        />
      )}
    </>
  );
}
