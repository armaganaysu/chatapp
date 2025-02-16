import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({ text, onPress, colorOption = 1 }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        colorOption === 1 ? styles.firstOption : styles.secondOption,
      ]}
      onPress={onPress}
    >
      <Text
        style={colorOption === 1 ? styles.firstOptionText : styles.secondOptionText}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width:'100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  firstOption: {
    backgroundColor: "#1D61E7",
    borderColor: "white",
  },
  secondOption: {
    backgroundColor: "white",
    borderColor: 'rgb(64,200,224)',
  },
  firstOptionText: {
    color: "white",
    fontSize: 16,
  },
  secondOptionText: {
    color: 'rgb(64,200,224)',
    fontSize: 16,
  },
});

export default CustomButton;
