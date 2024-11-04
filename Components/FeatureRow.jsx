import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import RestaurantCard from './RestaurantCard';
import { useNavigation } from '@react-navigation/native';

const FeatureRow = ({title, restaurants, description}) => {
  const navigation=useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('AllRestaurant')}>
            <Text style={styles.btn}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal:15
      }} style={{overflow:"visible", paddingVertical:5}}>
{
    restaurants.map((restaurant,index)=>{
        return(
            <RestaurantCard
            key={index}
            item={restaurant}/>
        )
    })
}
      </ScrollView>
    </View>
  );
};

export default FeatureRow;

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  description: {
    color: 'gray',
  },
  btn:{
    color:"#f97316",
    fontWeight:'semibold'
  },
});
