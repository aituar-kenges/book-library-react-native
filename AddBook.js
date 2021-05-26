import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  Alert,
} from 'react-native';
import Book from './models/Book.js';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const AddBook = ({navigation: {goBack}}) => {
  const [name, onChangeName] = React.useState('');
  const [description, onChangeDescription] = React.useState('');
  const [rating, onChangeRating] = React.useState(0);

  const addBook = () => {
    var dataToSend = {
      name: name,
      description: description,
      liked: false,
      rating: rating,
    };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    //POST request
    fetch('http://localhost:3000/books', {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      //If response is in json then in success
      .then(responseJson => {
        alert(JSON.stringify(responseJson));
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch(error => {
        alert(JSON.stringify(error));
        console.error(error);
      })
      .finally(() => {
        goBack();
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Book name"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeDescription}
          value={description}
          placeholder="Book description"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeRating}
          value={rating}
          placeholder="Book rating"
        />
        <View style={styles.button}>
          <Button style={styles.button} title="Add Book" onPress={addBook} />
        </View>
        <View style={styles.button}>
          <Button style={styles.button} title="Back" onPress={() => goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  button: {
    marginTop: 30,
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
export default AddBook;
