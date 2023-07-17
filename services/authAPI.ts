import { NavigationProp } from '@react-navigation/native';
import { ApiResponse } from 'apisauce';

import { api } from '.';
import { RootStackParams } from '../App';
import { FormData } from '../components/AuthForm';
import { AppDispatch } from '../redux/store';
import { setAuthenticated, setUser } from '../redux/userSlice';
import { IUser } from '../types';

export const signIn = async (
  data: FormData,
  navigation: NavigationProp<RootStackParams>,
  dispatch: AppDispatch,
): Promise<IUser | unknown> => {
  try {
    const response: ApiResponse<IUser> = await api.post('/auth/sign_in', data);

    if (response.ok && response.data) {
      dispatch(setAuthenticated(true));
      dispatch(setUser(response.data));
      navigation.navigate('News');

      if (response.headers) {
        api.setHeaders({
          'access-token': response.headers['access-token'],
          uid: response.headers.uid,
          client: response.headers.client,
        });
      }

      return response.data;
    } else {
      return 'Неправильный логин или пароль';
    }
  } catch (error) {
    ('Произошла ошибка, попробуйте позже');
    return error;
  }
};
