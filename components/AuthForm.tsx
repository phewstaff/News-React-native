import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SubmitHandler} from 'react-hook-form';

import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import useAuthForm from './hooks/useAuthForm';

interface FormData {
  email: string;
  password: string;
}

const AuthForm = () => {
  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  const {handleSubmit, control, errors} = useAuthForm(onSubmit);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.centered}>
        <Text style={styles.title}>Login</Text>
      </View>

      <InputField
        label="Email ID"
        error={errors.email?.message}
        control={control}
        name="email"
      />

      <InputField
        label="Password"
        inputType="password"
        error={errors.password?.message}
        control={control}
        name="password"
      />

      <CustomButton label="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 25,
  },
  centered: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
});
