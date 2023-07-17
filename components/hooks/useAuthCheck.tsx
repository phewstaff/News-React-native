import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { RootStackParams } from '../../App';
import { setAuthenticated } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from './redux';

const useAuthChecking = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Auth');
    }
  }, [isAuthenticated]);

  const setAuthenticatedStatus = (isAuthenticated: boolean) => {
    dispatch(setAuthenticated(isAuthenticated));
  };

  return { isAuthenticated, setAuthenticatedStatus };
};

export default useAuthChecking;
