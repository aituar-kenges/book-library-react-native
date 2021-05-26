import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import Book from './models/Book.js';
import {Navigation} from 'react-native-navigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section = ({book}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{book.name}</Text>
      <Text style={styles.sectionDescription}>{book.description}</Text>
      <Text style={styles.sectionRating}>Rating: {book.rating} / 5</Text>
    </View>
  );
};

const Home = ({navigation}) => {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    height: '90%',
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <Text style={styles.header}>Book List</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          {data.map(item => (
            <Section key={item.id} book={item} />
          ))}
        </View>
      </ScrollView>
      <Button
        style={styles.button}
        title="Add Book"
        onPress={() => navigation.navigate('AddBooks')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  sectionRating: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '500',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
