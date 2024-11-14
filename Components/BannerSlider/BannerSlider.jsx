import { View, Dimensions, Image, StyleSheet, SafeAreaView } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const BannerSlider = () => {
  // Array of images in your Assets/BannerSlider folder
  const images = [
    require('../../Assets/bannerSlider/banner3.jpg'),
    require('../../Assets/bannerSlider/banner4.jpg'),
    require('../../Assets/bannerSlider/banner5.jpg'),
    require('../../Assets/bannerSlider/banner6.jpg'),
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        loop
        width={width}
        height={200} // Set the height of the carousel
        autoPlay={true}
        autoPlayInterval={3000}
        data={images}
        renderItem={renderItem}
        scrollAnimationDuration={1000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 60,  // Slight increase for better parallax effect
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default BannerSlider;
