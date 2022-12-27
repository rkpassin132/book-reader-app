import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {Box, FlatList} from 'native-base';
import LibraryListItem from './LibraryListItem';
import {getAllUserLibrary} from '../services/api/UserLibraryAPI';
import { removeFromLibrary } from '../services/alert/LibraryAlert';

export default function LibraryList(props) {
  const [library, setLibrary] = useState({loading: false, data: []});

  useEffect(() => {
    libraries();
  }, []);

  const libraries = async () => {
    setLibrary({...library, loading: true});
    let res = await getAllUserLibrary();
    if (res.data.success) {
      setLibrary({data: res.data.libraries, loading: false});
    } else {
      setLibrary({...library, loading: false});
    }
  };

  const deleteBook = book_id => {
    setLibrary({...library, loading: true});
    removeFromLibrary(book_id).then(res => {
      if (res) {
        libraries();
      }else{
        setLibrary({...library, loading: false});
      }
    });
  };

  return (
    <Box>
      {library.loading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginVertical: 2}}
          color="#0000ff"
        />
      ):<></>}
      <FlatList
        data={library.data}
        renderItem={({item}) => (
          <LibraryListItem data={item} deleteBook={deleteBook} navigation={props.navigation} />
        )}
        keyExtractor={item => item.book._id}
      />
    </Box>
  );
}
