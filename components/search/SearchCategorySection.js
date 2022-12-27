import {Text, View} from 'native-base';
import {ScrollView, ActivityIndicator} from 'react-native';
import Chips from '../Chips';
import EmptyData from '../EmptyData';

export default function SearchCategorySection(props) {
  return (
    <View style={{marginVertical: 20, paddingHorizontal: 10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 2, justifyContent: 'flex-start'}}>
          <Text bold color={'black'} fontSize={'2xl'}>
            Categories
          </Text>
          <View
            style={{
              width: '20%',
              height: 4,
              backgroundColor: '#ffc107',
              marginTop: 2,
            }}></View>
        </View>
        {props.data.loading && (
          <ActivityIndicator style={{flex: 1}} color="#0000ff" />
        )}
      </View>
      <View>
        {props.data.categories.length > 0 ? (
          <ScrollView
            horizontal={true}
            snapToAlignment={'center'}
            style={{paddingVertical: 10}}
            contentInset={{
              top: 0,
              left: 30,
              bottom: 0,
              right: 30,
            }}>
            {props.data.categories.map(category => (
              <Chips
                key={category._id}
                title={category.category}
                icon={category.iconCategory}
                onPress={() => props.getCategoryBooks(category)}
              />
            ))}
          </ScrollView>
        ) : (
          <EmptyData
            image={require('../../assets/images/reading.png')}
            imagehHeight={120}
            text=""
          />
        )}
      </View>
    </View>
  );
}
