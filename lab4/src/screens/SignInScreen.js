import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import Loading from './../components/Loading';
import * as firebase from 'firebase';
const SignInScreen = (props) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  if(isLoading){
    return(
      <Loading/>
    )
  } 
  else{
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Card>
            <Card.Title>Welcome to 
              {<Card.Title style = {{fontWeight: 'bold', fontSize: 30}}>The Office</Card.Title>}
              </Card.Title>
            
            <Card.Divider />
            <Input
              leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
              placeholder="E-mail Address"
              onChangeText={function (currentInput) {
                setEmail(currentInput);
              }}
            />

            <Input
              placeholder="Password"
              leftIcon={<Feather name="key" size={24} color="black" />}
              secureTextEntry={true}
              onChangeText={function (currentInput) {
                setPassword(currentInput);
              }}
            />

            <Button
              icon={<AntDesign name="login" size={24} color="white" />}
              title="  Sign In!"
              type="solid"
              onPress = { ()=> {
                setIsLoading(true);
                firebase.auth()
                .signInWithEmailAndPassword(Email, Password)
                .then((userCreds)=>{
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(userCreds.user);
                  console.log(userCreds.user);
                  setIsLoading(false);
                  alert("Signed In \nCloud Firestore.users.GUID: " + userCreds.user.uid);
                }).catch((error)=>{
                  setIsLoading(false);
                  alert(error);
                })
              }

              }
            />
            <Button
              type="clear"
              icon={<AntDesign name="user" size={24} color="dodgerblue" />}
              title="  Don't have an account?"
              onPress={function () {
                props.navigation.navigate("SignUp");
              }}
            />
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
            }
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
    flexDirection: "column"
  },
});
export default SignInScreen;
