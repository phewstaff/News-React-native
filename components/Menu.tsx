import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface MenuProps {}

const Menu: FC<MenuProps> = ({}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Auth');
        }}>
        <Text>Auth</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('News');
        }}>
        <Text>News</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
const styles = StyleSheet.create({
  container: {},
});
