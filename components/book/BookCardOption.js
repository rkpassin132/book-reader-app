import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from 'react';
import {Actionsheet, useDisclose, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  addToLibrary,
  removeFromLibrary,
} from '../../services/alert/LibraryAlert';
import {isUserBookLibrary} from '../../services/api/UserLibraryAPI';

const BookCardOption = forwardRef((props, ref) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [isLibrary, setIsLibrary] = useState({added: false});
  useImperativeHandle(ref, () => ({
    openOption() {
      onOpen();
    },
  }));

  useEffect(() => {
    isBookAddedToLibrary();
  }, [props.book]);

  const isBookAddedToLibrary = async () => {
    let res = await isUserBookLibrary(props.book._id);
    if (res.data.success) {
      setIsLibrary({added: res.data.added});
    }
  };

  const addLibrary = async () => {
    addToLibrary(props.book._id).then(res => {
      if (res) {
        setIsLibrary({added: true});
      }
    });
    onClose();
  };

  const removeLibrary = () => {
    removeFromLibrary(props.book._id).then(res => {
      if (res) {
        setIsLibrary({added: false});
      }
    });
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Actionsheet.Item
          onPress={() => props.navigation.navigate('ReadBook', { book:props.book, getData:true })}
          color="red.500"
          startIcon={<Icon as={Ionicons} size="6" name="reader" />}>
          Read book
        </Actionsheet.Item>
        <Actionsheet.Item
          onPress={() => props.navigation.navigate('PlayBook', { book:props.book, getData:true })}
          color="red.500"
          startIcon={<Icon as={Ionicons} size="6" name="play-circle" />}>
          Play book
        </Actionsheet.Item>
        {isLibrary.added ? (
          <Actionsheet.Item
            onPress={() => removeLibrary()}
            startIcon={
              <Icon as={Ionicons} size="6" name="remove-circle-sharp" />
            }>
            Remove from library
          </Actionsheet.Item>
        ) : (
          <Actionsheet.Item
            onPress={() => addLibrary()}
            startIcon={<Icon as={Ionicons} size="6" name="add-circle" />}>
            Add to library
          </Actionsheet.Item>
        )}
        <Actionsheet.Item
          onPress={onClose}
          color="red.500"
          startIcon={<Icon as={Ionicons} size="6" name="close-sharp" />}>
          Cancel
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
});
export default BookCardOption;
