import React from 'react';
import {AspectRatio, Box, Image, Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Card(props) {
  return (
    <Box
      m="2"
      alignSelf="center"
      rounded="lg"
      overflow="hidden"
      width={wp('90%')}
      shadow={1}
      _light={{backgroundColor: 'gray.50'}}
      _dark={{backgroundColor: 'gray.700'}}>
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            source={{
              uri: props.imageUrl,
            }}
            alt="puppy-image"
          />
        </AspectRatio>
        <Icon
          as={AntDesign}
          name={props.icon}
          style={{alignSelf: 'center', marginVertical: hp('0.5%')}}
        />
      </Box>
    </Box>
  );
}
