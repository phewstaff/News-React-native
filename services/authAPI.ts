import { NavigationProp } from '@react-navigation/native';
import { api } from '.';
import { FormData } from '../components/AuthForm';
import { RootStackParams } from '../App';

export const signIn = async (
  data: FormData,
  navigation: NavigationProp<RootStackParams>,
) => {
  try {
    const response = await api.post('/auth/sign_in', data);

    if (response.ok) {
      navigation.navigate('News');

      if (response.headers) {
        api.setHeaders({
          accessToken: response.headers['access-token'],
          uid: response.headers.uid,
          client: response.headers.client,
        });
      }

      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};
