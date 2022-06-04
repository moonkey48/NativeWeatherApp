import {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {Text, View, ScrollView,StyleSheet,Dimensions,ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';


const API_KEY = 'e1e5b291542d5e36d09278dc087f96b3';
const {width:SCREEN_WIDTH} = Dimensions.get('window')


export default function App() {
  const [city,setCity] = useState('Loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async()=>{
    const {granted} = await Location.requestForegroundPermissionsAsync({accuracy:5});
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync();
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps:false});
    console.log(location);
    setCity(location[0].city);
    //get weather info
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    console.log(json)
    let daySetting = [];
    json.daily.forEach((value)=>{
      const temp = Math.round(value.temp.day);
      const mainDesc = value.weather[0].main;
      const subDesc = value.weather[0].description;
      daySetting.push([temp,mainDesc,subDesc]);
    })
    setDays(daySetting);
    console.log(daySetting);
  }
  useEffect(() => {
    getWeather();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.time}>June 4 Sat</Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        {
          days.length===0?
          <View style={styles.day}>
            <ActivityIndicator color='black' size='large' />
          </View>
          :
          days.map((value,index)=>{
            return <>
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>{days[index][0]}</Text>
              <Text style={styles.desc}>{days[index][1]}</Text>
              <Text style={styles.subDesc}>{days[index][2]}</Text>
            </View>
            </>
          })
        }
      </ScrollView>
      <View style={styles.footer}/>
      <StatusBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  city:{
    flex:1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cityName:{
      fontSize: 38,
      fontWeight: '600'
  },  
  time:{
    fontSize: 26,
    fontWeight: '600'
  },
  weather:{
  },
  day:{
      width: SCREEN_WIDTH,
      alignItems:'center',
      justifyContent: 'center',
  },  
  temp:{
      fontSize: 150,
      fontWeight: '700'
  },  
  desc:{
      fontSize: 45,
      fontWeight: '600',
      marginTop: -20
  },  
  subDesc:{
    fontSize: 22,
    fontWeight: '600'
  },
  footer:{
      flex: 1,
  }
});
