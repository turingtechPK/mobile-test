import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {heightPercentageToDP as hp} from 'react-native-responsive-screen'; // making the screen responsive.
import Swiper from 'react-native-deck-swiper-renewed'; // this omport provides an easy to use component that allows displaying swipeable buttons.
import {Box, Icon, IconButton, HStack, StatusBar, Image} from 'native-base'; // enables you to build a consistent design system across android etc.
import Zocial from 'react-native-vector-icons/Zocial'; // it is used to place a victory sign icon on the right of home screen.

// seperate header function is created which contains status bar , reddit logo and also username is passed as props here.This function is used below as a custom component.
function Header(props) {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Box safeAreaTop backgroundColor="#fff" />
      <HStack                    // it is a native base components used to  aligns items horizontally.
        bg="#fff"
        p="1"
        justifyContent="space-between"
        alignItems="center">
        <HStack space="2" alignItems="center">
          <Image
            source={require('../assets/logo/reddit.png')}
            alt="Logo"
            size={'sm'}
          />
          <Text style={{color: 'black'}}>@{props.username}</Text>
        </HStack>

                            
        <HStack>
          <IconButton           // on press the victory icon on top right of home screen the user is taken to the results screen.
            onPress={() => {
              props.navigation.navigate('Results', {
                puppiesList: props.puppiesList,
              });
            }}
            icon={<Icon as={Zocial} name="angellist" />}
          />
        </HStack>
      </HStack>
    </>
  );
}

const Home = ({navigation, route}) => {
  const {username} = route.params;
  const [cards, setCards] = useState([]);
  const [puppiesList, setPuppiesList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCards([]);
    setLoading(true);
    const getData = () => {
      fetch('https://www.reddit.com/r/aww.json')   // using fetch to get data from given link.
        .then(response => response.json())  // here in first then a string is returned
        .then(function (data) {             // here in second then json object is returned
          const imagesArray = data['data']['children'];  
          var puppyImages;
          var i = 0;
          while (i < imagesArray.length) {      // till the time length of imagesArray is greater then i loop will keep on iterating.
            puppyImages = imagesArray[i]['data']['url_overridden_by_dest'];
            if (puppyImages.includes('jpg') || puppyImages.includes('png')) // as then given condition was that pictures should be shown hence this if only allows .png or .jpg files.
              setCards(cards => [...cards, puppyImages]);
            i++;
          }
          setLoading(false);
        })
        .catch(function (error) {
          // handle
          alert(error.message);
          setLoading(false);
        });
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={'#2089DD'} />
      </View>
    );
  }

  return (
    <>
      <Header
        navigation={navigation}
        username={username}
        puppiesList={puppiesList}
      />
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
          // if the image is swipped right the puppy picture is moved into the approved array.
          onSwipedRight={index => {
            const approvedPuppy = {
              url: cards[index],
              status: 'approved',
            };
            setPuppiesList(puppies => [...puppies, approvedPuppy]);
          }}
          // if the image is swipped left the puppy picture is moved into the rejected array.
          onSwipedLeft={index => {
            const rejectedPuppy = {
              url: cards[index],
              status: 'disapproved',
            };
            setPuppiesList(puppies => [...puppies, rejectedPuppy]);
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
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
 
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

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
