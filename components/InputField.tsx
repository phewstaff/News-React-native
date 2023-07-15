import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface FormData {
  email: string;
  password: string;
}

interface InputFieldProps {
  label: string;
  type?: 'password' | 'login';
  error?: string;
  control: Control<FormData>;
  name: keyof FormData;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  error,
  control,
  name,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={label}
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={type === 'password'}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
            value={value}
          />
        )}
      />

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
