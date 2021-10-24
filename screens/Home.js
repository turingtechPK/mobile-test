import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Image, Header, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-deck-swiper';
import COLORS from '../constants/COLORS';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

const HomeView = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setCards([]);
    setLoading(true);
    const getDataFromAPI = async () => {
      axios
        .get('https://www.reddit.com/r/aww.json')
        .then(function (response) {
          const picturesArray = response.data['data']['children'];
          var puppyPicture;
          for (let i = 0; i < picturesArray.length; i++) {
            puppyPicture = picturesArray[i]['data']['url_overridden_by_dest'];
            if (puppyPicture.includes('jpg')) {
              setCards(cards => [...cards, puppyPicture]);
            }
          }
          setLoading(false);
        })
        .catch(function (error) {
          // handle
          alert(error.message);
          setLoading(false);
        });
    };
    getDataFromAPI();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={card => {
          return (
            <View style={styles.card}>
              <Image
                source={{uri: card}}
                style={{
                  width: 500,
                  height: 550,
                }}
              />
            </View>
          );
        }}
        onSwipedRight={index => {
          const approvedPuppy = {
            uri: cards[index],
            status: 'approved',
          };
          dispatch({type: 'ADD_NEW_PUPPY', payload: approvedPuppy});
        }}
        onSwipedLeft={index => {
          const rejectedPuppy = {
            uri: cards[index],
            status: 'disapproved',
          };
          dispatch({type: 'ADD_NEW_PUPPY', payload: rejectedPuppy});
        }}
        onSwipedAll={() => {
          alert('You have reached the end of list!');
        }}
        cardIndex={0}
        stackSize={2}
        verticalSwipe={false}
        backgroundColor={'#fff'}
      />
    </View>
  );
};

const ResultsView = () => {
  const {favouritesList} = useSelector(state => state);

  if (favouritesList.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No puppies found! Maybe add some?</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.uri}
        data={favouritesList}
        renderItem={list => {
          return (
            <Card>
              <Card.Image
                source={{uri: list.item.uri}}
                style={{
                  width: 330,
                  height: 200,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={
                    list.item.status == 'approved'
                      ? 'heart-sharp'
                      : 'heart-dislike-sharp'
                  }
                  size={50}
                  color={'red'}
                  style={{
                    opacity: 0.7,
                  }}
                />
              </Card.Image>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
};

const Home = ({route}) => {
  const {username} = route.params;

  return (
    <>
      <Header
        placement="left"
        barStyle="dark-content"
        backgroundColor="#fff"
        leftComponent={
          <Image
            source={require('../assets/images/reddit-logo.png')}
            style={{
              height: 50,
              width: 150,
            }}
          />
        }
        centerComponent={{
          text: `@${username}`,
          style: {
            marginTop: hp('2%'),
            right: wp('3%'),
          },
        }}
        containerStyle={{
          height: hp('10%'),
          marginTop: hp('1%'),
          paddingHorizontal: wp('5%'),
          justifyContent: 'space-around',
        }}
      />
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}>
        <Tab.Screen name="Puppies" component={HomeView} />
        <Tab.Screen name="My Favourites" component={ResultsView} />
      </Tab.Navigator>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  centered: {
    height: hp('100%'),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    height: hp('80%'),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
