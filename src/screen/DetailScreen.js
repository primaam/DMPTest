import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../components/helper';

const DetailScreen = ({route, navigation}) => {
  const jobResDetailData = useSelector(
    ({JobDetailDataStore}) => JobDetailDataStore.res,
  );

  return (
    <View>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-forward" />
        </Pressable>
        <Text>Job Detail</Text>
      </View>
      <View style={styles.itemListContainer}>
        <View
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {jobResDetailData.company_logo !== null ? (
            <Image
              resizeMethod="resize"
              source={{uri: jobResDetailData.company_logo}}
            />
          ) : (
            <Text style={{fontSize: 10}}>Logo not found</Text>
          )}
        </View>
        <View style={{width: horizontalScale(230)}}>
          <Text style={{...styles.itemListText, fontWeight: 'bold'}}>
            {jobResDetailData.title}
          </Text>
          <Text style={styles.itemListText}>{jobResDetailData.company}</Text>
        </View>
      </View>
      <Text>Job Description</Text>
      <ScrollView>
        <View style={styles.jobDescContainer}>
          <Text style={styles.itemTitleText}>Title</Text>
          <Text style={styles.itemDescText}>{jobResDetailData.title}</Text>
          <Text style={styles.itemTitleText}>Fulltime</Text>
          <Text style={styles.itemDescText}>
            {jobResDetailData.type === 'Full Time' ? 'Yes' : 'No'}
          </Text>
          <Text style={styles.itemTitleText}>Description</Text>
          <Text style={styles.itemDescText}>
            {jobResDetailData.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(80),
    paddingHorizontal: horizontalScale(20),
  },
  jobDescContainer: {
    paddingHorizontal: horizontalScale(10),

    height: '100%',
    marginBottom: verticalScale(300),
  },
  itemListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
  itemTitleText: {
    fontWeight: 'bold',
    fontSize: moderateScale(12),
    color: 'grey',
    marginBottom: verticalScale(10),
  },
  itemDescText: {
    fontWeight: '400',
    fontSize: moderateScale(10),
    color: 'black',
    marginBottom: verticalScale(10),
  },
  itemListText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
