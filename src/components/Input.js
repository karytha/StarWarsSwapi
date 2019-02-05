import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, editable, keyboardType }) => {

  return (
    <TextInput
      value={value}
      editable={editable}
      autoCorrect={false}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      underlineColorAndroid='transparent'
      secureTextEntry={secureTextEntry}
      style={{
        height: 48,
        backgroundColor: "#FFE0B2",
        marginBottom: 8,
        fontSize: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#BA68C8",
        paddingHorizontal: 12,
        color: "#9C27B0",
        width: '100%'
      }}
    />
  );
};

export { Input };

