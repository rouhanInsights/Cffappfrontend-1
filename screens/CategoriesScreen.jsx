import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from '../styles/CategoriesStyles';

const categories = [
  {
    name: 'Exclusive Fish & Meat',
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/POmfret.jpg',
  },
  {
    name: 'Fish & Seafood',
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/hilsha.jpg',
  },
  {
    name: 'Mutton',
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Mutton-Keemas.jpg',
  },
  {
    name: 'Poultry',
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/08/Boneless-breasts.jpeg',
  },
  {
    name: 'Steak & Fillets',
    image: 'https://calcuttafreshfoods.com/wp-content/uploads/2022/12/Baked-Fish-Fillets.jpg',
  },
];

const CategoriesScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Shop by Category</Text>
      <View style={styles.grid}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Home', {
              screen: 'CategoryDetailScreen',
              params: { category: item.name }
            })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoriesScreen;
