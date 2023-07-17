import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParams } from '../App';
import { signIn } from '../services/authAPI';
import CustomButton from './CustomButton';
import InputField from './InputField';
import { useAppDispatch } from './hooks/redux';
import useAuthForm from './hooks/useAuthForm';

export interface FormData {
  email: string;
  password: string;
}

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<FormData> = async data => {
    try {
      const result = await signIn(data, navigation, dispatch);
      if (result === 'Неправильный логин или пароль') {
        setErrorMessage(result);
      }
    } catch (error) {
      setErrorMessage('Произошла ошибка, попробуйте позже');
    }
  };

  const { handleSubmit, control, errors } = useAuthForm(onSubmit);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.centered}>
        <Text style={styles.title}>Authorization</Text>
      </View>

      <InputField
        label="Email ID"
        error={errors.email?.message}
        control={control}
        name="email"
      />

      <InputField
        label="Password"
        type="password"
        error={errors.password?.message}
        control={control}
        name="password"
      />

      {errorMessage !== '' && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}

      <CustomButton label="Sign in" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AuthForm;
