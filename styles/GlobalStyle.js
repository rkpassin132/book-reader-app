import { StyleSheet } from 'react-native';
import StyleVariables from './StyleVariables';

const GlobalStyle = StyleSheet.create({
    container:{
        padding: 24
    },
    h1:{
        fontSize: 34,
        fontFamily: 'Lora-Medium'
    },
    h3:{
        fontSize: 18,
        fontFamily: 'Lora-Medium'
    },
    h4:{
        fontSize: 13,
        fontFamily: 'OpenSans-SemiBold'
    },
    h5:{
        fontSize: 12,
        lineHeight: 18,
        color: "#6c757d"
    },
    p:{
        fontSize: 14,
        lineHeight: 18,
        color: "#6c757d"
    },
    center:{
        alignItems: "center",
        textAlign: "center"
    },
    left:{
        alignItems: "flex-start",
        textAlign: "left"
    },
    right:{
        alignItems: "flex-end",
        textAlign: "right"
    },
    SectionHeading:{
        padding: 15
    },
    SectionHeadingText: {
        fontFamily: 'OpenSans-SemiBold',
        fontSize: 18,
    },
    title: {
        fontSize: 20,
        marginTop: 3,
        fontWeight: 'bold',
    },
    danger:{
        color: 'red',
    },
    success:{
        color: 'green'
    },
    warning:{
        color: '#FFCC00'
    },
    
    chipContainer:{
        top:0,
        paddingHorizontal:4,
        paddingVertical:10,
        backgroundColor: '#F7F7F7',
        height:60,
      },
      chip:{
        paddingHorizontal:8,
        paddingVertical:2,
        borderRadius: 6,
        borderWidth:1,
        backgroundColor: 'white',
        borderColor: StyleVariables.AppColorSecond
      },
      chipActive:{
        backgroundColor: StyleVariables.AppColorSecond,
      },
      chipText:{
        color: StyleVariables.AppColorSecond
      },
      chipActiveText:{
        color: 'white'
      }
});

export default GlobalStyle;