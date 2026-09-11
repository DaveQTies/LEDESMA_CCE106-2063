import { StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.description}>Student profile information will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F5F7FB', flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#1E2B43', fontSize: 28, fontWeight: '800' },
  description: { color: '#68778D', fontSize: 16, lineHeight: 23, marginTop: 8 },
});