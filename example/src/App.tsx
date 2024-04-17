import * as React from 'react';

import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { isDeviceRooted } from 'react-native-detect-frida';

export default function App() {
  const [rooted, setRooted] = React.useState<string | undefined>();
  const [checkStatus, setCheckStatus] = React.useState<CheckStatus[]>();

  const isAndroid = () => {
    return Platform.OS === 'android';
  };

  React.useEffect(() => {
    if (isAndroid()) {
      isDeviceRooted().then((result) => {
        setRooted(result.isRooted ? 'Rooted' : 'Not Rooted');
        setCheckStatus(result.checkStatus);
      }).catch(e => {
        setRooted('Error: ' + e);
      });
    }

  }, []);

  const _renderItem = (item: CheckStatus) => {
    return (
      <View style={styles.itemStyle}>
        <Text style={{ textTransform: 'capitalize' }}>
          {item.name}
        </Text>
        <Text style={{
          color: item.state ? 'red' : 'green',
          textTransform: 'capitalize',
        }}>
          {item.state ? 'Detected' : 'Secured'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{rooted}</Text>
      <FlatList data={checkStatus}
                keyExtractor={(item, index) => (item.id + index).toString()}
                renderItem={({ item }) => _renderItem(item)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});