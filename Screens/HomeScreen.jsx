import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import {themeColors} from '../Theme/Theme';
import Categories from '../Components/Categories';
import { featured } from '../constants';
import FeatureRow from '../Components/FeatureRow';


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.HomeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* search bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchBarIcon}>
          <Icon.Search stroke="gray" width="25" height="25" />
          <TextInput
            placeholder="Search for bite  food"
            style={styles.textInput}
          />
          <View style={styles.location}>
            <Icon.MapPin stroke="gray" height="20" width="20" />
            <Text>Deans Peshawar</Text>
          </View>
        </View>
        <View style={styles.sliderIcon}>
          <Icon.Sliders
            stroke="white"
            height="25"
            width="25"
            strokeWidth={2.5}
          />
        </View>
      </View>
    {/* main */}
    <ScrollView showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom:20}}>
{/* categories */}
<Categories/>
{/* Featured section */}
<View style={styles.featureContainer}>
{
  [featured,featured,featured].map((item,index)=>{
    return(
      <FeatureRow
       key={index}
       title={item.title}
       restaurants={item.restaurants}
       description={item.description}
       />
    )
  })
}
</View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HomeContainer: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 3,
    gap: 5,
  },
  searchBarIcon: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },
  textInput: {
    flex: 1,
    marginLeft: 2,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
    paddingLeft: 2,
  },
  userLocation: {
    color: 'gray',
  },
  sliderIcon: {
    padding: 5,
    borderRadius: 100,
    backgroundColor: "#f97316",
  },
  featureContainer:{
marginTop:5,
  }
});
