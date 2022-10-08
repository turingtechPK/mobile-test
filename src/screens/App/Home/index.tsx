import {NavigationProp, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import authToken from '../../../api/authToken';
import {GetAllCalls} from '../../../api/user.get';
import CustomButton from '../../../components/CustomButton';
import Calltile from '../../../components/Layout/CallTile';
import Loading from '../../../components/Loading';
import SelectInput from '../../../components/Select';
import TopHeader from '../../../components/TopHeader';
import colors from '../../../config/colors';
import {Screens} from '../../../constants/Screens';
import {LogoutFun} from '../../../helpers/Logout';
import {removeJwtToken} from '../../../store/jwt.slice';

const Home = ({navigation}: any) => {
  const [isLoading, setloading] = useState(false);
  const [limit, setlimit] = useState(5);
  const [offset, setoffset] = useState(10);
  const [fetchedCalls, setfetchedCalls] = useState([]);
  const [filter, setfilter] = useState('');
  const [Refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const fetchAllCalls = async () => {
    try {
      setloading(true);
      const resp = await GetAllCalls(offset, limit);
      console.log(resp?.data?.nodes[0]);
      setfetchedCalls(resp?.data?.nodes);
      setloading(false);
    } catch (err: any) {
      console.log(err.response?.data);
      if (
        err?.response?.data?.message == 'Unauthorized' &&
        err?.response?.data?.statusCode == '401'
      ) {
        showMessage({
          message: 'Logging out ...',
          description: 'Session Timed out',
          type: 'danger',
        });
        setTimeout(() => {
          handleLogout();
        }, 1500);
      }
      setloading(false);
    }
  };

  useEffect(() => {
    fetchAllCalls();
  }, [isFocused, limit, offset]);

  const handleLogout = async () => {
    LogoutFun(dispatch);
  };
  const _handleFilter = async (itemValue: string) => {
    await fetchAllCalls();
    setfetchedCalls(fetchedCalls?.filter(val => val?.call_type == itemValue));
  };
  //==================REFRESH=================
  const wait = (timeout: number) => {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAllCalls();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return isLoading ? (
    <Loading message={'Fetching Calls'} />
  ) : (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <TopHeader />

      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />
        }>
        <SelectInput
          value={filter}
          onValueChange={(itemValue: string) => {
            _handleFilter(itemValue);
            setfilter(itemValue);
          }}
        />
        {fetchedCalls?.map((item: any, index: number) => (
          <Calltile
            key={index}
            onPress={() =>
              navigation?.navigate(Screens.DetailsScreen, {
                item: item,
              })
            }
            call_type={item?.call_type}
            created_at={item?.created_at}
            direction={item?.direction}
            duration={item?.duration}
            from={item?.from}
            to={item?.to}
            is_archived={item?.is_archived}
            via={item?.via}
            // id={item?.id}
            notes={item?.notes}
          />
        ))}
        <CustomButton
          title="Load More"
          onPress={() => setlimit(limit + 5)}
          variant="subtle"
        />
        <CustomButton
          title="LOGOUT"
          onPress={handleLogout}
          variant="ghost"
          colorScheme={'error'}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
