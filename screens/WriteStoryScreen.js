import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Alert,KeyboardAvoidingView, ToastAndroid} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WriteStoryScreen extends React.Component{

constructor(){
   super();
   this.state={
      title:'',
      author:'',
      story:''
   }
}

submitStory=()=>{
   var submittedMessage = "Story Submitted";
    db.collection("stories").add({
        title:this.state.title,
        author:this.state.author,
        story:this.state.story
    })
    this.setState({
        title:'',
        author:'',
        story:''
    })
    Alert.alert(submittedMessage)
    ToastAndroid.show(submittedMessage,ToastAndroid.SHORT)
}

render(){
    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
       <TextInput
          style={styles.inputBox}
          placeholder='Story Title'
          value={this.state.title}
          onChangeText={text=>this.setState({
              title:text
          })}
       />

        <TextInput
          style={styles.inputBox}
          placeholder='Author'
          value={this.state.author}
          onChangeText={text=>this.setState({
            author:text
        })}
       />

        <TextInput
          style={styles.storyBox}
          placeholder='Story...'
          value={this.state.story}
          onChangeText={text=>this.setState({
            story:text
        })}
       />

       <TouchableOpacity style={styles.submitButton}
       onPress={this.submitStory}
       availability="true">
           <Text>Submit</Text>
       </TouchableOpacity>
       </View>
    </KeyboardAvoidingView>
  );
}
}

const styles = StyleSheet.create({
   inputBox:{
      width:300,
      height:80,
      borderWidth:1.5,
      borderRightWidth:0,
      fontSize:20,
      alignSelf:'center',
      backgroundColor:'pink'
  },
  storyBox:{
   width:300,
   height:200,
   borderWidth:1.5,
   borderRightWidth:0,
   fontSize:20,
   alignSelf:'center',
   backgroundColor:'pink'
  },
  submitButton:{
   backgroundColor:'pink',
   width:50,
   borderWidth:1.5,
   borderLeftWidth:0,
   alignSelf:'center'
  }
});
