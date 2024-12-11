import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Icon from 'react-native-feather';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../Utils/Apis';
import { featured } from '../constants';
import FeatureRow from '../Components/FeatureRow';
import Header from '../Components/Header/Header';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.data?.data);
  
  // State for search query and filtered results
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBranches, setFilteredBranches] = useState([]);

  useEffect(() => {
    // Dispatch the fetchBranches action when the component mounts
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery && branches.length > 0) {
      // Filter branches based on the search query,
      const results = branches.filter((branch) => {
        const branchName = branch.branchName?.toLowerCase(); // Existing filter for branch name
        return (
          (branchName && branchName.includes(searchQuery.toLowerCase()))
        );
      });
      setFilteredBranches(results);
    } else {
      setFilteredBranches([]); // If no search query or no branches, clear results
    }
  }, [searchQuery, branches]);
  

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
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)} // Update searchQuery on text change
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

        {/* Suggestions */}
        {searchQuery && (
          <View style={styles.suggestionsContainer}>
            {filteredBranches.length > 0 ? (
              filteredBranches.map((food, index) => (
                <TouchableOpacity key={index} style={styles.suggestionItem}>
                  {/* <Image  /> */}
                  <Text>{food.branchName}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No results found</Text>
            )}
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}>
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
    color: 'green',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 80,
    left: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    maxHeight: 200,
    padding: 10,
    zIndex: 10,
  },
  suggestionItem: {
    paddingVertical: 5,
  },
});
