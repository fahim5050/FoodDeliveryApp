import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { featured } from '../constants';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const restaurant = featured?.restaurants?.[1];
    const navigation = useNavigation();

    // // Use a fallback location if `restaurant` data is unavailable
    // const initialRegion = restaurant
    //     ? {
    //           latitude: restaurant.lat,
    //           longitude: restaurant.lng,
    //           latitudeDelta: 0.01,
    //           longitudeDelta: 0.01,
    //       }
    //     : {
    //           latitude: 37.7749, // Example fallback coordinates (San Francisco)
    //           longitude: -122.4194,
    //           latitudeDelta: 0.01,
    //           longitudeDelta: 0.01,
    //       };

    // if (!restaurant) {
    //     return (
    //         <View style={styles.centered}>
    //             <Text>Loading map...</Text>
    //         </View>
    //     );
    // }

    return (
        <View style={{ flex: 1 }}>
            {/* <MapView
                initialRegion={initialRegion}
                style={{ flex: 1 }}
                mapType="standard"
            >
                {restaurant && (
                    <Marker
                        coordinate={{
                            latitude: restaurant.lat,
                            longitude: restaurant.lng,
                        }}
                        title={restaurant.name || "Restaurant"}
                        description={restaurant.address || "Restaurant location"}
                    />
                )}
            </MapView> */}
            <Text style={{textAlign:'center', justifyContent:'center', fontSize:30, fontWeight:'bold', color:'black'}}> Delivery Screen</Text>
        </View>
    );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
