import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Header,Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import db from './config';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      image:null,
      name: '',
      temporaryName:'',
    }
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
    });
    console.log(uri);
    if (!cancelled) this.uploadImage(uri, this.state.userId);
  }

  
uploadImage = async (uri, imageName) => {
  var response = await fetch(uri);
  var blob = await response.blob();

  var ref = firebase
    .storage()
    .ref()
    .child("user_profiles/" + imageName);

  return ref.put(blob).then((response) => {
    this.fetchImage(imageName);
  });
};


fetchImage = (imageName) => {
  var storageRef = firebase
    .storage()
    .ref()
    .child("user_profiles/" + imageName);

  // Get the download URL
  storageRef
    .getDownloadURL()
    .then((url) => {
      this.setState({ image: url });
    })
    .catch((error) => {
      this.setState({ image: "#" });
    });
};


updateProfilePicture=(uri)=>{
  db.collection('users').doc(this.state.docId).update({
    image : uri
  })
}

temporaryName=()=>{
  this.setState({temporaryName:''})
}

  render(){
  return (
    <View>
    <View style={styles.container} >

    <Text style={{color:'red', fontSize:30, marginTop:200}}>  MyTitle</Text>
     
    </View>

    <View style={{marginTop:300}}> 
      <TouchableOpacity  style={styles.button}
      onPress={() => this.selectPicture()}>
       <Text>UploadImage</Text>
     </TouchableOpacity>
     
<Avatar
    rounded
    icon={{name: 'user', type: 'font-awesome'}}
    source={{
      uri:
        this.state.image
      }}
    size="medium"

     overlayContainerStyle={{backgroundColor: 'white'}}
     onPress={() => this.selectPicture()}
     activeOpacity={0.7}
     containerStyle={{flex:0.75,width:'40%',height:'20%', marginLeft: 20, marginTop: 30,borderRadius:40}}
  />


     <TextInput  onChangeText={(text)=>{this.setState({ name: text, temporaryName:text})}}
      placeholder="UploadText" style={{width:"50%", height:50}}
      value={this.state.temporaryName}
      >
       
     </TextInput>


     <TouchableOpacity onPress={()=>this.temporaryName()} style={styles.button}
     >
       <Text>UploadText</Text>
     </TouchableOpacity>

     <Text style = {{fontWeight:'100',fontSize:20,paddingTop:10,}}>  {this.state.name}</Text>
    
    </View>
    </View>
  
  );}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },

  },


});
