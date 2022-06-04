import { StyleSheet,useWindowDimensions } from 'react-native'
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#006F05'
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
    weather:{
    },
    day:{
        width: windowSize.width,
        alignItems:'lef',
        justifyContent: 'center',
        marginLeft: 30
    },  
    temp:{
        fontSize: 120,
        fontWeight: '500'
    },  
    desc:{
        fontSize: 40,
        fontWeight: '600'
    },  
    footer:{
        flex: 1,
    }
  });