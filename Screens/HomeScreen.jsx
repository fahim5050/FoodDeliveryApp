import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import * as Icon from 'react-native-feather';
import Categories from '../Components/Categories';
import { featured } from '../constants';
import FeatureRow from '../Components/FeatureRow';
import Header from '../Components/Header/Header';
import BannerSlider from '../Components/BannerSlider/BannerSlider';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../Utils/Apis';

const HomeScreen = () => {

  const dispatch = useDispatch();
  const branches = useSelector((state) => state.data?.data);

  useEffect(() => {
    // Dispatch the fetchBranches action when the component mounts
    dispatch(fetchBranches());
  }, [dispatch]);

  // Log the branches data to the console

  // useEffect(() => {
  //   if (branches) {
  //     branches.forEach((branch) => {
  //       const { branchName, branchLogoName} = branch;
  //       console.log('Branch Name:', branchName);
  //       console.log('Branch Logo Name:', branchLogoName);
  //       console.log('Email:');

  //     });
  //   }
  // }, [branches]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header with no padding */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Main content with padding */}
      <View style={styles.mainContent}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchBarIcon}>
            <Icon.Search stroke="gray" width="25" height="25" />
            <TextInput
              placeholder="Search for bite food"
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

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}>
          {/* Categories */}
          <View style={styles.Categories}>
            <Categories />
          </View>
          <View>
            <Text style={styles.Title}>Delicious Picks Just for You on <Text style={styles.BiteBase}>BiteBase</Text></Text>
          </View>
          {/* Banner slider */}
          {/* <View style={styles.banner}>
            <BannerSlider />
          </View> */}
          {/* Featured Section */}
          <View style={styles.featureContainer}>
            {[featured].map((item, index) => (
              <FeatureRow
                key={index}
                title={item.title}
                restaurants={branches}
                description={item.description}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 0, // No padding for header
  },
  mainContent: {
    padding: 15, // Padding for main content except header
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
    backgroundColor: '#f97316',
  },
  featureContainer: {
    marginTop: 5,
  },
  Title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  BiteBase: {
    color: 'green'
  },
  banner: {
    padding: 15,
    // marginTop: 10,
  },
});
