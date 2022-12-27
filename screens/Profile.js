import {
  Avatar,
  Card,
  Center,
  FormControl,
  Input,
  Text,
  WarningOutlineIcon,
  Button,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, ToastAndroid, ActivityIndicator} from 'react-native';
import {getUser, updateUser} from '../services/api/UserAPI';
import authStorage from '../services/AuthStorage';
import StyleVariables from '../styles/StyleVariables';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({name: '', phone: ''});
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    userData();
    authStorage.getUser().then(user => {
      setUser(user);
      setFormData({
        name: user.name,
        phone: user.phone ? user.phone : '',
      });
    });
  }, []);

  const userData = () => {
    getUser().then(res => {
      if (res.data.success) {
        setUser(res.data.user);
        setFormData({
          name: res.data.user.name,
          phone: res.data.user.phone ? res.data.user.phone : '',
        });
      }
    })
  };

  const submitData = () => {
    if (formData.name.length <= 0 || formData.phone.length <= 0) {
      ToastAndroid.show('Please fill proper data', ToastAndroid.SHORT);
      return;
    }
    setFormLoading(true);
    updateUser(formData).then(res => {
      setFormLoading(false);
      if (res.data.success) {
        userData();
        authStorage.setUser(res.data.user);
        ToastAndroid.show('User updated', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('User not updated', ToastAndroid.SHORT);
      }
    }).catch(err => {
      setFormLoading(false);
    });
  };

  return (
    <ScrollView
      style={{backgroundColor: StyleVariables.bodyBackground, padding: 17}}>
      <Center>
        {user == null ? (
          <Avatar
            shadow={3}
            bg="green.500"
            alignSelf="center"
            size="xl"
            source={require('../assets/images/user.png')}
          />
        ) : (
          <>
            <Avatar
              shadow={2}
              bg="green.500"
              alignSelf="center"
              size="2xl"
              source={{uri: user.image}}
            />
            <Text bold fontSize={'2xl'}>
              {user.name}
            </Text>
            <Text fontSize={'lg'}>{user.email}</Text>
          </>
        )}

        <Card shadow={3} w={'100%'} padding={5} bgColor="white" marginTop={30}>
          <FormControl isRequired isInvalid style={{marginTop: 30}}>
            <FormControl.Label>Name </FormControl.Label>
            <Input
              style={{backgroundColor: '#fcfcfc'}}
              type={'text'}
              shadow={0}
              fontSize={'md'}
              variant="filled"
              placeholder="User name"
              value={formData.name}
              onChangeText={value => setFormData({...formData, name: value})}
            />
            {formData.name.length <= 0 && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Please enter name!
              </FormControl.ErrorMessage>
            )}

            <FormControl.Label marginTop={10}>Phone </FormControl.Label>
            <Input
              style={{backgroundColor: '#fcfcfc'}}
              type={'text'}
              shadow={0}
              fontSize={'md'}
              variant="filled"
              placeholder="User phone number"
              value={formData.phone}
              onChangeText={value => {
                console.log(value);
                setFormData({...formData, phone: value});
              }}
            />
            {formData.phone.length <= 0 && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}>
                Please enter phone number
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          {formLoading ? (
            <ActivityIndicator style={{flex: 1}} color="#0000ff" />
          ) : (
            <Button
              onPress={submitData}
              marginTop={10}
              shadow={2}
              colorScheme="success">
              Submit
            </Button>
          )}
        </Card>
      </Center>
    </ScrollView>
  );
}
