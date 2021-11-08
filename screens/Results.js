import React from 'react';
import {SafeAreaView, View, Text, FlatList, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Card from '../components/Card';

const Results = ({route}) => {
  const {puppiesList} = route.params;
  if (!puppiesList.length) {       // if there are no puppy pictures then this if statement runs.
    return (
      <View style={styles.centered}>
        <Text style={{color: 'black'}}>No puppies found! Maybe add some?</Text>
      </View>
    );
  }
  return (
    // The FlatList component displays the similar structured data in a scrollable list. It works well for large lists of data where the number of list items might change over time.
    <SafeAreaView>
      <FlatList
        keyExtractor={item => item.url}
        data={puppiesList}
        renderItem={list => {
          return (
            <Card
              imageUrl={list.item.url}
              icon={list.item.status == 'approved' ? 'like1' : 'dislike1'}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Results;

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
});
