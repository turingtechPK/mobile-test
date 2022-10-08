import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {GetOneCalls} from '../../../api/user.get';
import {AddNewNote, ChangeArchiveStatus} from '../../../api/user.post';
import CustomButton from '../../../components/CustomButton';
import Detailtile from '../../../components/Layout/DetailTile';
import Loading from '../../../components/Loading';
import TextInput from '../../../components/TextInput';
import TopHeader from '../../../components/TopHeader';
import colors from '../../../config/colors';

const Details = ({route, navigation}: any) => {
  const {item} = route?.params;
  const [submitting, setsubmitting] = useState(false);
  const isFocused = useIsFocused();
  const [isLoading, setloading] = useState(false);
  const [CallDetails, setCallDetails] = useState('');
  const [newNote, setnewNote] = useState('');

  const fetchOneCalls = async () => {
    try {
      setloading(true);
      const resp = await GetOneCalls(item?.id);
      console.log('@@@@@@@@', resp?.data);
      setCallDetails(resp?.data);
      setloading(false);
    } catch (err: any) {
      console.log(err.response?.data);
      setloading(false);
    }
  };

  const changeStatus = async () => {
    try {
      setloading(true);
      const resp = await ChangeArchiveStatus(item?.id);
      console.log(resp?.data);
      if (resp?.data) {
        showMessage({
          message: 'Success',
          type: 'success',
        });
        fetchOneCalls();
      }
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
      showMessage({
        message: 'Error',
        description: 'Network Error',
        type: 'danger',
      });
    }
  };
  const AddNotes = async () => {
    try {
      setsubmitting(true);
      const resp = await AddNewNote(item?.id, newNote);
      console.log(resp?.data);
      if (resp?.data) {
        showMessage({
          message: 'Note Added',
          type: 'success',
        });
        fetchOneCalls();
        setnewNote('');
      }
      setsubmitting(false);
    } catch (err) {
      console.log(err);
      setsubmitting(false);
    }
  };

  useEffect(() => {
    fetchOneCalls();
  }, [isFocused]);

  return isLoading ? (
    <Loading message={'Almost There!'} />
  ) : (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <TopHeader goback onPress={() => navigation?.goBack()} />
      <Detailtile details={CallDetails} changeStatus={changeStatus} />
      <TextInput
        placeholder="Note"
        size="sm"
        value={newNote}
        onChangeText={(val: string) => setnewNote(val)}
        error={newNote.length == 0}
      />

      <CustomButton
        title={'Add Note'}
        disabled={newNote.length == 0}
        onPress={AddNotes}
        isLoading={submitting}
      />
    </View>
  );
};

export default Details;
