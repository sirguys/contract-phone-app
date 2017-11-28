import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight
} from 'react-native';
import Meteor, { createContainer } from 'react-native-meteor'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: 'Sarawut Kodkeaw',
      number: '06465466'
    }
  }

  componentWillMount() {
    Meteor.connect('ws://localhost:3000/websocket')
  }

  addPhoneNumber = () => {
    const data = {
      number: this.state.number,
      name: this.state.name
    }

    Meteor.call('addPhoneNumber', data, err => {
      if (err) {
        console.log(err)
      } else {
        this.setState({
          number: '',
          name: ''
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Enter a name'
          onChangeText={name => this.setState({ name })}
          value={this.state.name} />
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Enter a phone number'
          onChangeText={number => this.setState({ number })}
          value={this.state.number} />

        <TouchableHighlight 
          onPress={this.addPhoneNumber} 
          underlayColor="gray"
          style={styles.button} >
          <Text style={styles.text}>Save</Text>
        </TouchableHighlight>

        <FlatList
          data={this.props.phoneNumbers}
          keyExtractor={(item, index) => item._id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name} || {item.number}</Text>
            </View>
          )} />
      </View>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('getAllNumbers')
  return {
    phoneNumbers: Meteor.collection('phoneNumbers').find({})
  }
}, App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ec7b7c',
    marginTop: 50
  },
  input: {
    borderWidth: 2,
    borderColor: '#EE4035',
    backgroundColor: '#F9ED3A',
    height: 50,
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#367ABD',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F9ED3A'
  }
});