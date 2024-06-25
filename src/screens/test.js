import React, { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View ,Platform,Alert } from 'react-native';
import { purchaseListingData } from "../data/data"; // Import your data file

export default function Test() {
  const [modalVisible ,setModalVisible] = useState(false);
  const [filterModalVisible, setfilterModalVisible] = useState(false);
  const [itemSelected ,setItemSelected] = useState(0);
  const [memberName,setMemberName] = useState('');
  const [doneBy,setDoneBy] = useState('');
  const [invioceNo, setInvioceNo ] = useState('');
  const [data, setData] = useState(purchaseListingData.pInfo)

  function selectedItem(item){
    setModalVisible(true);
    setItemSelected(item);
  };

  // function closeModal(){
  //   setModalVisible(false);
  // }

  function filter(doneBy,memberName,invioceNo){
    let filterData = ''
    if(doneBy == '' && memberName == '' && invioceNo == ''){
      Alert.alert('Error', 'Please Enter atleast one field', [ 
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }else{
      // for(i=0;i<purchaseListingData.pInfo.length;i++){
        if(purchaseListingData.pInfo.find( (data) => data.DoneBy == doneBy  )){
           filterData = purchaseListingData.pInfo.filter(post => post.DoneBy.toUpperCase().includes(doneBy.toUpperCase()))
            
          
        }else if(purchaseListingData.pInfo.find((data)=> data.MemberName == memberName )){
           filterData = purchaseListingData.pInfo.filter(post => post.MemberName.toUpperCase().includes(memberName.toUpperCase()))

        }else if (purchaseListingData.pInfo.find((data)=>data.InvoiceNo == invioceNo)){
           filterData = purchaseListingData.pInfo.filter(post => post.InvoiceNo.toUpperCase().includes(invioceNo.toUpperCase()))
          
        }
        else{
          Alert.alert('Not Found', 'No such data in the list !!!', [ 
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }

        return filterData;
        
        
      // }
      
    }
  }

  // custom Render item function
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>selectedItem(item)}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.title}>{item.InvoiceNo}</Text>
          <Text style={styles.subtitle}>{item.TrxDate}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.amount}>{'$' + item.TotalAmount + ' >'}</Text>
        </View>
      </View>
    </TouchableOpacity>
    
  );

  return (
    <View style={styles.container}>
        <SafeAreaView style={styles.SafeAreaView}>
          <View style={styles.textTitle}>
            <Text style={styles.text}>Purchase Listing</Text>
          </View>
          
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity style={ [styles.headerView,{justifyContent:'center'}]}>
                <Text style={styles.selectDate}>
                  1-6-2024 - 30-6-2024
                </Text>
                <Image source={require('../assets/drop-down-arrow.png')} style={styles.icon}/>
              </TouchableOpacity>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={()=>setfilterModalVisible(true)} style={styles.headerView} >
                <Text style={styles.filter}>
                  Filter
                </Text>
                <Image source={require('../assets/drop-down-arrow.png')} style={styles.icon}/>
              </TouchableOpacity>
              
            </View>
            
          </View>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.Id} // Use Id as key
              contentContainerStyle={styles.listContentContainer} // Style for FlatList content
            />

          
          
      </SafeAreaView>
        <Modal animationType='slide' transparent={true} visible={filterModalVisible} style={styles.modalContainer}>
          <View style={[styles.modalContainer,{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}]}>
          <KeyboardAvoidingView style={{alignItems:'center', width:'100%'}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.modalListBg}>
              <TouchableOpacity style={styles.closeBtnContainer} onPress={()=>setfilterModalVisible(false)} >
                  <Image style={styles.closeBtnLogo} source={require('../assets/close.png')}/>
              </TouchableOpacity>
              
                <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>
                    Done By: 
                  </Text>
                  <TextInput placeholder='Done By : ' onChangeText={setDoneBy} value={doneBy} style={styles.inputField}/>
                </View>
                <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>
                    Member Name: 
                  </Text>
                  <TextInput placeholder='Name : ' onChangeText={setMemberName} value={memberName} style={styles.inputField}/>
                </View>
                <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>
                    Invioce No: 
                  </Text>
                  <TextInput placeholder='Invioce No: ' onChangeText={setInvioceNo} value={invioceNo} style={styles.inputField}/>
                </View>
                <TouchableOpacity style={styles.btn_container} onPress={()=> setData(filter(doneBy,memberName,invioceNo))}>
                  <Text style={styles.btn_text}>
                    Submit
                  </Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      

      <Modal animationType='slide' transparent={true} visible={modalVisible} style={styles.modalContainer}>
        <View  style={[styles.modalContainer,{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}]}>
          <View style={styles.modalListBg}>
              <TouchableOpacity style={styles.closeBtnContainer} onPress={()=>setModalVisible(false)} >
                <Image style={styles.closeBtnLogo} source={require('../assets/close.png')}/>
              </TouchableOpacity>
              <View style={styles.modalList}>
                <Text style={styles.leftText}>Invioce : </Text>
                <Text style={styles.rightText}>{itemSelected.InvoiceNo}</Text>
              </View>
              <View style={styles.modalList}>
                <Text style={styles.leftText}>Sale Date : </Text>
                <Text style={styles.rightText}>{itemSelected.TrxDate}</Text>
              </View>
            
            <View style={styles.modalList}>
                <Text style={styles.leftText}>Bonus Date : </Text>
                <Text style={styles.rightText}>{itemSelected.BonusDate}</Text>
            </View>
            <View style={styles.modalList}>
                <Text style={styles.leftText}>Sale Amount : </Text>
                <Text style={styles.rightText}>{parseFloat(itemSelected.SalesAmount).toFixed(2)}</Text>
            </View>
            <View style={styles.modalList}>
                <Text style={styles.leftText}>Total PV : </Text>
                <Text style={styles.rightText}>{parseFloat(itemSelected.Bv).toFixed(2)}</Text>
            </View>
            <View style={styles.modalList}>
                <Text style={styles.leftText}>Total Amount : </Text>
                <Text style={styles.rightText}>{parseFloat(itemSelected.TotalAmount).toFixed(2)}</Text>
            </View>
            <View style={styles.modalList}>
                <Text style={styles.leftText}>Sales Status : </Text>
                <Text style={styles.rightText}>{itemSelected.Status == 1 ? 'Active':'Not Active'}</Text>
            </View>
            <TouchableOpacity style={styles.btn_container}>
              <Text style={styles.btn_text}>
                View Invioce
              </Text>
            </TouchableOpacity>

            </View>
        </View>

          </Modal>
    </View>
    
  );
}

const styles = StyleSheet.create({
  filterTitle:{
    fontSize:18,
    fontWeight:'500',
    marginBottom:5
  },
  inputField:{
    height:40,
    width:380,
    backgroundColor:'#FFFFDE',
    marginBottom:20
  },
  headerView:{
    flexDirection:'row', 
    
     alignItems:'center'
  },
  icon:{
    width:15,
    height:15,
    marginLeft: 10
  },
  header:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    borderBottomWidth:0.6, 
    
  },
  headerLeft:{
    flex:2,
    marginLeft:20,
    
  },
  headerRight:{
    flex:1,
    borderLeftWidth:0.3,
    paddingLeft:30,
    marginLeft:80
    
  },
  selectDate:{
    fontSize:16
  },
  filter:{
    fontSize:16
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width:'100%'
  },
  SafeAreaView:{
    backgroundColor:'white',
    flex:1
  },
  textTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 50, // Adjust height for your header
    borderBottomWidth: 0.2,
    paddingVertical: 10,
  },
  text: {
    color: "darkgoldenrod",
    fontWeight: 'bold',
    fontSize: 20,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    marginTop:10
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    // borderWidth: 1,
    borderColor: '#ddd',
    shadowOpacity:0.3,
    shadowColor:'black',
    shadowRadius:5,
    shadowOffset:{width:3,height:3},
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'grey',
  },
  amount: {
    fontSize: 16,
    color: 'black',
  },
  modalContainer:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center',
    width:'100%',
    backgroundColor:'rgba( 0,0,0,0.7)',
    
  },
  modalListBg:{
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:5,
    borderWidth:1,
    width:'100%'

  },
  modalList:{
    flexDirection:'row',
  },
  leftText:{
    flex:1,
    textAlign:'left',
    marginLeft:20,
    marginTop:15,
    fontSize:15,
    color:'rgba(0, 0, 0, 0.5)'
  },
  rightText:{
    textAlign:'right',
    marginRight:20,
    marginTop:15,
    fontSize:15
  },
  btn_container:{
    width: 200,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    margin:20,
    borderRadius:20,
    backgroundColor:'darkgoldenrod'
  },
  btn_text:{
    fontSize:20,
    color:'white'
  },
  closeBtnLogo:{
    width:15,
    height:15
  },
  closeBtnContainer:{   
    alignSelf:'flex-end',
    marginRight:20,  
    paddingTop:20,
    paddingBottom:20
  }
});
