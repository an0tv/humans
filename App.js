import * as React from "react";
import { View, TouchableWithoutFeedback, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
//import { useGLTF } from '@react-three/drei';
//import { Canvas } from "@react-three/fiber";
import {
  AmbientLight,
  SphereGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  MeshLambertMaterial,
} from "three";;

function Image({navigation}){
  const sphere = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshLambertMaterial({color:0xffff00}));
  const camera = new PerspectiveCamera(100, 0.4, 0.01, 1000);
  
  
  return (
    
    <View style={{ flex: 1 }}>
      <GLView
      
        style={{ flex: 1 }}
        onContextCreate={async (gl) => {
          
          const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

          const renderer = new Renderer({ gl });
          renderer.setSize(width, height);
          renderer.setClearColor("#fff");

          const scene = new Scene();
          scene.add(new GridHelper(10, 10));


          scene.add(sphere);
          sphere.position.set(5,5,5);
          camera.position.set(20,20,20);
          camera.lookAt(sphere.position);
          //scene.add(gltf.scene);
          const pointLight = new PointLight(0xffffff, 1.2, 1000, 1);
          pointLight.position.set(50, 50, 50 );
          scene.add(pointLight);
          
          const render = () => {
            
            requestAnimationFrame(render);
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.01;
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          
          render();
        }}
      
      >
      </GLView>
    </View>
  );
}
function HomeScreen({navigation}){

  return(
  <View style={styles.container}>
    <Button title="Details" onPress={()=>navigation.navigate('Details')}></Button>
    <Button title="Sphere" onPress={()=>navigation.navigate('Sphere')}></Button>
    <Button title="About" onPress={()=>navigation.navigate('About')}></Button>
  </View>
  )
}
function DetailsScreen({navigation}){
  return(
    <View style={styles.text_container}>
      <Text>nuts!</Text>
    </View>
  );
}
function About({navigation}){
  return(
  <View style={{flex:1, flexDirection:'column', backgroundColor:'skyblue'}}>
    <View style={{ marginTop:12, padding:12, borderRadius:8, color:'#666', backgroundColor:"#eaeaea"}}>
      <Text>Founders</Text>
    </View>
  </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Sphere" component={Image} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="About" component={About}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
class SphereMesh extends Mesh {
  constructor() {
    super(
      new SphereGeometry(0, 50, 20, 0, Math.PI * 2, 0, Math.PI * 2),
      new MeshStandardMaterial({
        color: '#02A3F0',
      })
    );
  }
}

const styles = StyleSheet.create({
  container:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
  text_container:{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#666',}
})