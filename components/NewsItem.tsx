import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface NewsItemProps {
  title: string;
  description?: string;
  image_url: string;
  onPress?: () => void;
  isSelectedItem?: boolean;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  description,
  image_url,
  onPress,
  isSelectedItem,
}) => {
  if (isSelectedItem) {
    return (
      <View style={styles.articleContainer}>
        <Text style={styles.articleTitle}>{title}</Text>
        {image_url ? (
          <Image style={styles.articleImage} source={{ uri: image_url }} />
        ) : (
          <ActivityIndicator
            style={styles.loadingImage}
            size="large"
            color="#888"
          />
        )}
        <Text style={styles.articleDescription}>{description}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {image_url ? (
        <Image style={styles.image} source={{ uri: image_url }} />
      ) : (
        <ActivityIndicator
          style={styles.loadingImage}
          size="small"
          color="#888"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  loadingImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
  articleContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  articleImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  articleDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NewsItem;
