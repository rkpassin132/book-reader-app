import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    questionTextboxCol:{
        width:60
    },
    questionTextbox:{
        display:'flex',
        // width:50,
        fontSize:12,
        padding:16,
        borderWidth:1,
        borderRadius:7,
        textAlign:'center',
        margin:6
    },
    questionTextbox_Unattempted:{
        color: '#4c4c4c',
        borderColor:'#4c4c4c',
        backgroundColor:'#f7f7f7'
    },
    questionTextbox_Skipped:{
        color: 'orange',
        borderColor:'orange',
        backgroundColor:'#ffeb3b52'
    },
    questionTextbox_Incorrect:{
        color: 'red',
        borderColor:'red',
        backgroundColor:'#f4433657'
    },
    questionTextbox_Correct:{
        color: 'green',
        borderColor:'green',
        backgroundColor:'#4caf504a'
    },
    SheetButton:{
        color:'black', 
        // paddingVertical:12,
        // paddingHorizontal:7, 
        width:45,
        height:45,
        backgroundColor:'#f7f7f7', 
        borderRadius:100, 
        textAlign:'center',
        marginHorizontal:2,
        textAlignVertical:'center'
    },
    Question:{
        textAlign:'left',
        fontSize:20,
        fontWeight: '600',
        marginVertical: 10
    },

    OptionView:{
        marginVertical: 10,
        paddingHorizontal:18,
        paddingVertical:14,
        borderRadius: 14,
        
    },
    OptionViewNormal:{
        borderColor:'#7f7f7f',
        borderWidth:1,
    },
    OptionViewSuccess:{
        borderColor:'green',
        borderWidth:1,
    },
    OptionViewDanger:{
        borderColor:'red',
        borderWidth:1,
    },
    OptionNoCol:{
        width: '10%'
    },
    OptionTextCol:{
        width: '90%'
    },
    OptionNo:{
        width:22,
        height:22,
        color: '#191919',
        borderRadius:10,
        textAlign:'center',
    },
    OptionNoNormal:{
        backgroundColor:'#e5e5e5',
    },
    OptionNoSuccess:{
        backgroundColor:'green',
        color:'white'
    },
    OptionNoDanger:{
        backgroundColor:'red',
        color:'white'
    },
    OptionText:{
        fontSize:15,
        paddingLeft:10
    },

    result:{
        fontSize:17,
        textAlign:'center',
        paddingVertical:10
    },

    answerContainer:{
        marginTop: 20,
        margin:10,
        paddingVertical:20,
        paddingHorizontal:15,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#7f7f7f',
        backgroundColor:'white'
    },
    solution:{
        fontSize:16,
        marginLeft:4,
        fontWeight: '400'
    },
    checkIcon:{
        fontSize:18
    },

    solTextContainer:{
        marginVertical:10,
        marginHorizontal: 12
    },
    solTextIcon:{
        fontSize:12,
        color:'green',
    },
    solText:{
        fontSize:15,
        color:'#6c757d',
        marginLeft:10,
        lineHeight:19,
        textAlign:'justify'
    },
    BottomsheetBox:{
        height:500, 
        paddingHorizontal:0, 
        paddingVertical:18, 
        width:'100%', 
        borderTopRightRadius:17, 
        borderTopLeftRadius:17, 
    },
    tab:{
        paddingHorizontal:17
    },
    SheetTitle:{
        fontSize:17, 
        fontWeight:'bold',  
        marginTop:10
    },
    dotText:{
        fontSize:16
    },
    listText:{
        fontSize:17, 
        textAlign:'left', 
        fontWeight:'bold', 
        paddingRight:10 
    },
    settingFontSize:{
        width:"70%"
    },
    tabTitle:{
        fontSize:17
    },
    timer:{
        width:'100%',
        height:10,
        backgroundColor:'green'
    }
});

const dayStyle = StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    header:{
        backgroundColor:'white',
        color:'black'
    },
    Swiper:{
        backgroundColor:'#f7f7f7'
    },
    Title:{
        color:'black'
    },
    OptionView:{
        backgroundColor:'white'
    },
    p:{
        color: '#6b6a6a'
    },
    answerBox:{
        backgroundColor:'#f7f7f7',
        height:70
    },
    answerContainer:{
        backgroundColor:'#f7f7f7',
    },
    BottomsheetBox:{
        backgroundColor:'white'
    },
    SheetTitle:{
        color:'#4c4c4c',
    },
});
const nightStyle = StyleSheet.create({
    container:{
        backgroundColor:'#121212'
    },
    header:{
        backgroundColor:'#121212',
        color:'white'
    },
    Swiper:{
        backgroundColor:'#121212'
    },
    Title:{
        color:'white'
    },
    OptionView:{
        backgroundColor:'#313131'
    },
    p:{
        color: '#ecebeb'
    },
    answerBox:{
        backgroundColor:'#313131',
        height:70
    },
    answerContainer:{
        backgroundColor:'#313131',
    },
    BottomsheetBox:{
        backgroundColor:'#313131'
    },
    SheetTitle:{
        color:'white',
    },
});

export { styles, dayStyle, nightStyle }