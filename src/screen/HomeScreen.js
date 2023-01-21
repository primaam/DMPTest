import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  SafeAreaView,
  TextInput,
  Pressable,
  Animated,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import axios from 'axios';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../components/helper';
import {useDispatch, useSelector} from 'react-redux';
import {storeJobDetailData} from '../redux/JobDetailRed';
const HomeScreen = ({navigation}) => {
  const [toggleOpenFilter, setToggleOpenFilter] = React.useState(false);
  const [jobName, setJobName] = React.useState('');
  const [fulltime, setFulltime] = React.useState(true);
  const [location, setLocation] = React.useState('');
  const dispatch = useDispatch();

  const jobResData = useSelector(({JobDataStore}) => JobDataStore.res);
  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on', 'Are you sure want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'yes',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const jobDetailSubmit = async id => {
    try {
      const jobDetailUrl = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;
      const jobDetailResult = await axios(jobDetailUrl);
      dispatch(storeJobDetailData(jobDetailResult.data));
      navigation.navigate('Detail');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>JOB LIST</Text>
      </View>
      <View style={styles.filterContainer}>
        <TextInput
          onChangeText={val => setJobName(val)}
          value={jobName}
          style={styles.inputContainer}
          placeholder="Search"
        />
        <Pressable onPress={() => setToggleOpenFilter(!toggleOpenFilter)}>
          <Icon
            size={20}
            name={toggleOpenFilter === true ? 'expand-less' : 'expand-more'}
          />
        </Pressable>
      </View>
      {toggleOpenFilter === true ? (
        <View style={styles.openFilterContainer}>
          <View style={styles.itemFilterContainer}>
            <Text>Fulltime</Text>
            <Animated.View
              style={{
                backgroundColor: fulltime === true ? 'green' : 'red',
                height: 20,
                width: 40,
                borderRadius: 20,
                alignItems: fulltime === true ? 'flex-end' : 'flex-start',
              }}>
              <Pressable
                onPress={() => falseMove()}
                style={{
                  borderRadius: 20,
                  height: 20,
                  width: 20,
                  backgroundColor: '#fff',
                }}></Pressable>
            </Animated.View>
          </View>
          <View
            style={{
              ...styles.itemFilterContainer,
              alignItems: 'center',
            }}>
            <Text>Location</Text>
            <TextInput
              style={styles.inputLocationContainer}
              value={location}
              placeholder={'Location'}
              onChangeText={val => setLocation(val)}
            />
          </View>
          <Pressable
            style={{
              backgroundColor: 'grey',
              width: 100,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text>Apply Filter</Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}

      <Text style={styles.titleText}>Search Results</Text>

      <FlatList
        scrollEnabled={true}
        key={item => item.id}
        data={jobResData[0]}
        renderItem={({item}) => (
          <View style={styles.itemListContainer}>
            <View
              style={{
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.company_logo !== null ? (
                <Image
                  resizeMethod="resize"
                  source={{uri: item.company_logo}}
                />
              ) : (
                <Text style={{fontSize: 10}}>Logo not found</Text>
              )}
            </View>
            <View style={{width: horizontalScale(230)}}>
              <Text style={{...styles.itemListText, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text style={styles.itemListText}>{item.company}</Text>
              <Text style={styles.itemListText}>{item.location}</Text>
            </View>
            <Pressable
              onPress={() => jobDetailSubmit(item.id)}
              style={{
                height: 100,
                width: horizontalScale(30),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="arrow-forward" />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: horizontalScale(10),
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  openFilterContainer: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
  itemFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {},
  itemListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: verticalScale(20),
    paddingVertical: verticalScale(10),
  },
  inputContainer: {
    width: '90%',
    borderWidth: 1,
    paddingHorizontal: horizontalScale(10),
    alignItems: 'center',
    borderRadius: 20,
  },
  inputLocationContainer: {
    borderWidth: 1,
    width: '60%',
    paddingHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
  },
  itemListText: {
    fontSize: 12,
    fontWeight: '400',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: moderateScale(15),
    marginVertical: verticalScale(10),
  },
});
