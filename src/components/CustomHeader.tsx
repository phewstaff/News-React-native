import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParams } from '../../App';
import { useAppSelector } from '../hooks/redux';

const CustomHeader: FC = ({}) => {
  const user = useAppSelector(state => state.user.user);
  const navigation: NavigationProp<RootStackParams> = useNavigation();

  const handleOnPress = () => {
    navigation.navigate('Auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: user.avatar_url,
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{user.username}</Text>
        <TouchableOpacity onPress={handleOnPress}>
          <Text style={styles.signOutButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
  },
  headerContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 60,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  signOutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});
