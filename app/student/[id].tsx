import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const student = {
  id: '146804',
  name: 'Jhon Dave Ledesma',
  course: 'CCE 106',
  section: '2063',
};

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const router = useRouter();
  const studentId = Array.isArray(id) ? id[0] : id;
  const isValidStudent = studentId === student.id;

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  if (!isValidStudent) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Student not found</Text>
        <Text style={styles.description}>
          The student ID &quot;{studentId ?? 'missing'}&quot; is not recognized.
        </Text>
        <Pressable onPress={goBack} style={styles.button}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>STUDENT DETAILS</Text>
      <Text style={styles.title}>{student.name}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Student ID</Text>
        <Text style={styles.value}>{student.id}</Text>
        <Text style={styles.label}>Course / Section</Text>
        <Text style={styles.value}>{student.course} - {student.section}</Text>
      </View>
      <Pressable onPress={goBack} style={styles.button}>
        <Text style={styles.buttonText}>Go back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F5F7FB', flex: 1, justifyContent: 'center', padding: 24 },
  eyebrow: { color: '#356AE6', fontSize: 12, fontWeight: '800', letterSpacing: 1, marginBottom: 8 },
  title: { color: '#1E2B43', fontSize: 28, fontWeight: '800' },
  description: { color: '#68778D', fontSize: 16, lineHeight: 23, marginTop: 8 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#E4E9F1', borderRadius: 16, borderWidth: 1, marginTop: 22, padding: 18 },
  label: { color: '#748197', fontSize: 13, fontWeight: '700', marginTop: 12 },
  value: { color: '#263752', fontSize: 17, marginTop: 4 },
  button: { alignItems: 'center', backgroundColor: '#356AE6', borderRadius: 10, marginTop: 22, paddingVertical: 13 },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});