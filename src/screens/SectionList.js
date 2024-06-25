import React, { useEffect, useState } from 'react';
import { SectionList, Image, KeyboardAvoidingView, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { purchaseListingData } from "../data/data"; // Import your data file
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// const navigation = useNavigation();

export default function PurSectionList() {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setfilterModalVisible] = useState(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [memberName, setMemberName] = useState('');
  const [doneBy, setDoneBy] = useState('');
  const [invioceNo, setInvioceNo] = useState('');
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dateModal , setDateModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {t, i18n} = useTranslation();

  // Group data by TrxDate
  useEffect(() => {
    const resu = Object.entries(
      purchaseListingData.pInfo.reduce((r, item) => {
        const { TrxDate } = item;
        if (!r[TrxDate]) {
          r[TrxDate] = [];
        }
        r[TrxDate].push(item);
        return r;
      }, {})
    ).map(([date, transactions]) => ({ date, data: transactions }));

    setData(resu);
  }, []);

  // console.log(data)

  // Handle selecting an item
  function selectedItem(item) {
    setModalVisible(true);
    setItemSelected(item);
  };

  // Filter function
  function filter(doneBy, memberName, invioceNo) {
    if (!doneBy && !memberName && !invioceNo) {
      Alert.alert('Error', 'Please Enter at least one field', [{ text: 'OK' }]);
      return [];
    }

    const filteredData = purchaseListingData.pInfo.filter(post => 
      (doneBy && post.DoneBy.toUpperCase().includes(doneBy.toUpperCase())) ||
      (memberName && post.MemberName.toUpperCase().includes(memberName.toUpperCase())) ||
      (invioceNo && post.InvoiceNo.toUpperCase().includes(invioceNo.toUpperCase()))
    );

    if (filteredData.length === 0) {
      Alert.alert('Not Found', 'No such data in the list!', [{ text: 'OK' }]);
    }

    // Group filtered data by TrxDate
    const groupedFilteredData = Object.entries(
      filteredData.reduce((r, item) => {
        const { TrxDate } = item;
        if (!r[TrxDate]) {
          r[TrxDate] = [];
        }
        r[TrxDate].push(item);
        return r;
      }, {})
    ).map(([date, transactions]) => ({ date, data: transactions }));

    return groupedFilteredData;
  }

  // Render item function
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectedItem(item)}>
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

  // Render section header function
  const renderHeader = ({ section: { date } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{moment(date , 'DD-MM-YYYY').format('MMMM YYYY')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.textTitle}>
          <Text style={styles.text}>{t("purchaseListing")}</Text>
        </View>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={[styles.headerView, { justifyContent: 'center' }]} onPress={()=>setOpen(true)}>
              <Text style={styles.selectDate}>1-6-2024 - 30-6-2024</Text>
              <Image source={require('../assets/drop-down-arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setfilterModalVisible(true)} style={styles.headerView}>
              <Text style={styles.filter}>Filter</Text>
              <Image source={require('../assets/drop-down-arrow.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        <SectionList
          sections={data}
          renderItem={renderItem}
          renderSectionHeader={renderHeader}
          keyExtractor={(item) => item.Id.toString()}
          contentContainerStyle={styles.listContentContainer}
        />

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
        />

        {/* Filter Modal */}
        <Modal animationType='slide' transparent={true} visible={filterModalVisible}>
          <View style={[styles.modalContainer, { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <KeyboardAvoidingView style={{ alignItems: 'center', width: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.modalListBg}>
                <TouchableOpacity style={styles.closeBtnContainer} onPress={() => setfilterModalVisible(false)}>
                  <Image style={styles.closeBtnLogo} source={require('../assets/close.png')} />
                </TouchableOpacity>

                <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>Done By:</Text>
                  <TextInput placeholder='Done By:' onChangeText={setDoneBy} value={doneBy} style={styles.inputField} />
                </View>
                <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>Member Name:</Text>
                  <TextInput placeholder='Name:' onChangeText={setMemberName} value={memberName} style={styles.inputField} />
                </View>
                <View style={styles.filterModal}>
                  <Text style={styles.filterTitle}>Invoice No:</Text>
                  <TextInput placeholder='Invoice No:' onChangeText={setInvioceNo} value={invioceNo} style={styles.inputField} />
                </View>
                <TouchableOpacity style={styles.btn_container} onPress={() => setData(filter(doneBy, memberName, invioceNo))}>
                  <Text style={styles.btn_text}>Submit</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        {/* Details Modal */}
        {itemSelected && (
          <Modal animationType='slide' transparent={true} visible={modalVisible}>
            <View style={[styles.modalContainer, { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }]}>
              <View style={styles.modalListBg}>
                <TouchableOpacity style={styles.closeBtnContainer} onPress={() => setModalVisible(false)}>
                  <Image style={styles.closeBtnLogo} source={require('../assets/close.png')} />
                </TouchableOpacity>
                <View style={styles.modalList}>
                  <Text style={styles.leftText}>Invoice:</Text>
                  <Text style={styles.rightText}>{itemSelected.InvoiceNo}</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.leftText}>Sale Date:</Text>
                  <Text style={styles.rightText}>{itemSelected.TrxDate}</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.leftText}>Bonus Date:</Text>
                  <Text style={styles.rightText}>{itemSelected.BonusDate}</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.leftText}>Sale Amount:</Text>
                  <Text style={styles.rightText}>{parseFloat(itemSelected.SalesAmount).toFixed(2)}</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.leftText}>Total PV:</Text>
                  <Text style={styles.rightText}>{parseFloat(itemSelected.Bv).toFixed(2)}</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.leftText}>Total Amount:</Text>
                  <Text style={styles.rightText}>{parseFloat(itemSelected.TotalAmount).toFixed(2)}</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.leftText}>Sales Status:</Text>
                  <Text style={styles.rightText}>{itemSelected.Status === "1" ? 'Active' : 'Not Active'}</Text>
                </View>
                <TouchableOpacity style={styles.btn_container}>
                  <Text style={styles.btn_text}>View Invoice</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5
  },
  inputField: {
    height: 40,
    width: 380,
    backgroundColor: '#FFFFDE',
    marginBottom: 20
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 15,
    height: 15,
    marginLeft: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 0.6,
  },
  headerLeft: {
    flex: 2,
    marginLeft: 20,
  },
  headerRight: {
    flex: 1,
    borderLeftWidth: 0.3,
    paddingLeft: 30,
    marginLeft: 80
  },
  selectDate: {
    fontSize: 16
  },
  filter: {
    fontSize: 16
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    width: '100%'
  },
  SafeAreaView: {
    backgroundColor: 'white',
    flex: 1
  },
  textTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 50,
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
    marginTop: 10
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#ddd',
    shadowOpacity: 0.3,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 3, height: 3 },
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalListBg: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    width: '100%'
  },
  modalList: {
    flexDirection: 'row',
  },
  leftText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 15,
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)'
  },
  rightText: {
    textAlign: 'right',
    marginRight: 20,
    marginTop: 15,
    fontSize: 15
  },
  btn_container: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    backgroundColor: 'darkgoldenrod'
  },
  btn_text: {
    fontSize: 20,
    color: 'white'
  },
  closeBtnLogo: {
    width: 15,
    height: 15
  },
  closeBtnContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  sectionHeader:{
    backgroundColor:'#FFFFED',
    padding:15
  },
  sectionTitle:{
    fontSize:18
  }
});
