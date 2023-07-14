import CustomButton from './CustomButton';
import InputField from './InputField';
import useAuthForm from './hooks/useAuthForm';
import React from 'react';
import {SubmitHandler} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';

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
        type="password"
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
