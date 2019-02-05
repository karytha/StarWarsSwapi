import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
      height: 50,
      backgroundColor: "#742F9D",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4
    }}>
      <Text style={{
        fontSize: 16,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
      }}>{text}</Text>
    </TouchableOpacity>
  );
};

export { Button };