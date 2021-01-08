import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';

export default class ReadStoryScreen extends React.Component{

constructor(props){
    super(props);
    this.state={
        search:'',
        allStories:[],
        lastVisibleStory: null
    }
}

updateSearch = (search) => {
    this.setState({ search });
};

fetchMoreStories = async ()=>{
    var text = this.state.search.toUpperCase()
    var enteredText = text.split("")

    
    if (enteredText[0].toUpperCase() ==='S'){
    const query = await db.collection("stories").where('storyId','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allStories: [...this.state.allStories, doc.data()],
        lastVisibleStory: doc
      })
    })
  }
  else if(enteredText[0].toUpperCase() === 'A'){
    const query = await db.collection("stories").where('storyId','==',text).startAfter(this.state.lastVisibleStory).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allStories: [...this.state.allStories, doc.data()],
        lastVisibleStory: doc
      })
    })
  }
}

searchFilterFunction= async(text) =>{
    var enteredText = text.split("")  
    if (enteredText[0].toUpperCase() ==='S'){
      const story =  await db.collection("stories").where('storyId','==',text).get()
      story.docs.map((doc)=>{
        this.setState({
          allStories:[...this.state.allStories,doc.data()],
          lastVisibleStory: doc
        })
      })
    }
    else if(enteredText[0].toUpperCase() === 'A'){
        const story = await db.collection('stories').where('storyId','==',text).get()
        story.docs.map((doc)=>{
          this.setState({
            allStories:[...this.state.allStories,doc.data()],
            lastVisibleStory: doc
          })
        })
      }
  }

  componentDidMount = async ()=>{
    const query = await db.collection("stories").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [],
        lastVisibleStory: doc
      })
    })
  }

 render(){
     const {search} = this.state;
        return(

<View style={styles.container}>
          <View style={styles.searchBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Enter story ID"
          onChangeText={(text)=>{this.setState({search:text})}}/>
          <TouchableOpacity
            style = {styles.searchButton}
            onPress={()=>{this.searchFilterFunction(this.state.search)}}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
        <ScrollView
          data={this.state.allStories}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Story ID: " + item.storyId}</Text>
              <Text>{"Title: " + item.title}</Text>
              <Text>{"Author: " + item.author}</Text>
              <Text>{"Story: " + item.story}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreStories}
          onEndReachedThreshold={0.7}
        /> 

        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })