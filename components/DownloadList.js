import React from 'react';
import {Box, FlatList} from 'native-base';
import DownloadListItem from './DownloadListItem';

export default function DownloadList(props) {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Aafreen Khan',
    },
  ];
  return (
    <Box>
      <FlatList
        data={data}
        renderItem={({item}) => <DownloadListItem book={item} />}
        keyExtractor={item => item.id}
      />
    </Box>
  );
}
