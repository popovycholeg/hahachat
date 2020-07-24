import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {View} from 'native-base';

export default LanguagesList = (props) => {
  const [selectedLanguage, setLanguage] = useState(1);

  return (
    <View
      style={{
        width: '100%',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
        borderRightWidth: 0,
        borderBottomWidth: 0,
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <Picker
        selectedValue={selectedLanguage}
        style={styles.input}
        // mode="dropdown"
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
        <Picker.Item label="Test" value="1" />
        <Picker.Item label="Test1" value="2" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 44,
    marginBottom: 10,
    color: '#000',
    backgroundColor: '#bfd2d7',
    textAlign: 'center'
  },
});
