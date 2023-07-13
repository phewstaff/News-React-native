import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Control, Controller} from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

interface InputFieldProps {
  label: string;
  inputType?: 'password';
  error?: string;
  control: Control<FormData>;
  name: keyof FormData;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  inputType,
  error,
  control,
  name,
}) => {
  return (
    <View style={styles.container}>
      {inputType === 'password' ? (
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder={label}
              style={[styles.input, {flex: 1}]}
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
              value={value}
            />
          )}
        />
      ) : (
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder={label}
              style={[styles.input, {flex: 1}]}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
              value={value}
            />
          )}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  input: {
    paddingVertical: 0,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
