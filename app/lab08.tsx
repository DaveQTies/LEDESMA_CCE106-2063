import { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type AttendanceStatus = 'present' | 'absent' | 'unmarked';

type Student = {
  id: string;
  firstName: string;
  surname: string;
  status: AttendanceStatus;
};

const initialStudents: Student[] = [
  { id: '1', firstName: 'Ana', surname: 'Santos', status: 'unmarked' },
  { id: '2', firstName: 'Ben', surname: 'Reyes', status: 'unmarked' },
  { id: '3', firstName: 'Carla', surname: 'Cruz', status: 'unmarked' },
  { id: '4', firstName: 'Daniel', surname: 'Garcia', status: 'unmarked' },
];

export default function Lab08Screen() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  // The assignment specifically requires counts to be recalculated reactively.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setPresentCount(students.filter((student) => student.status === 'present').length);
    setAbsentCount(students.filter((student) => student.status === 'absent').length);
  }, [students]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setAttendance = (studentId: string, status: AttendanceStatus) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId ? { ...student, status } : student,
      ),
    );
  };

  const addStudent = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedSurname = surname.trim();

    if (!trimmedFirstName || !trimmedSurname) {
      return;
    }

    setStudents((currentStudents) => [
      ...currentStudents,
      {
        id: `${Date.now()}-${trimmedFirstName}-${trimmedSurname}`,
        firstName: trimmedFirstName,
        surname: trimmedSurname,
        status: 'unmarked',
      },
    ]);
    setFirstName('');
    setSurname('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(student) => student.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Class Attendance</Text>
            <Text style={styles.subtitle}>Mark each student present or absent.</Text>

            <View style={styles.summary}>
              <View style={[styles.countCard, styles.presentCard]}>
                <Text style={styles.countLabel}>Present</Text>
                <Text style={styles.countValue}>{presentCount}</Text>
              </View>
              <View style={[styles.countCard, styles.absentCard]}>
                <Text style={styles.countLabel}>Absent</Text>
                <Text style={styles.countValue}>{absentCount}</Text>
              </View>
            </View>

            <View style={styles.form}>
              <Text style={styles.formTitle}>Add a student</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                style={styles.input}
                autoCapitalize="words"
              />
              <TextInput
                value={surname}
                onChangeText={setSurname}
                placeholder="Surname"
                style={styles.input}
                autoCapitalize="words"
                onSubmitEditing={addStudent}
                returnKeyType="done"
              />
              <Pressable style={styles.addButton} onPress={addStudent}>
                <Text style={styles.addButtonText}>Add Student</Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Students ({students.length})</Text>
          </>
        }
        renderItem={({ item: student }) => (
          <View style={styles.studentRow}>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>
                {student.firstName} {student.surname}
              </Text>
              <Text style={styles.statusText}>
                {student.status === 'unmarked'
                  ? 'Not marked'
                  : student.status === 'present'
                    ? 'Present'
                    : 'Absent'}
              </Text>
            </View>
            <View style={styles.attendanceButtons}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: student.status === 'present' }}
                onPress={() => setAttendance(student.id, 'present')}
                style={[
                  styles.statusButton,
                  student.status === 'present' && styles.presentButtonActive,
                ]}>
                <Text
                  style={[
                    styles.statusButtonText,
                    student.status === 'present' && styles.activeButtonText,
                  ]}>
                  Present
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: student.status === 'absent' }}
                onPress={() => setAttendance(student.id, 'absent')}
                style={[
                  styles.statusButton,
                  student.status === 'absent' && styles.absentButtonActive,
                ]}>
                <Text
                  style={[
                    styles.statusButtonText,
                    student.status === 'absent' && styles.activeButtonText,
                  ]}>
                  Absent
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7fb' },
  listContent: { padding: 20, paddingTop: 64, paddingBottom: 32 },
  title: { color: '#172033', fontSize: 30, fontWeight: '700' },
  subtitle: { color: '#65708a', fontSize: 15, marginTop: 6, marginBottom: 20 },
  summary: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  countCard: { flex: 1, borderRadius: 14, padding: 16 },
  presentCard: { backgroundColor: '#dcfce7' },
  absentCard: { backgroundColor: '#fee2e2' },
  countLabel: { color: '#3e4b63', fontSize: 14, fontWeight: '600' },
  countValue: { color: '#172033', fontSize: 28, fontWeight: '700', marginTop: 3 },
  form: { backgroundColor: '#ffffff', borderRadius: 14, padding: 16, marginBottom: 24 },
  formTitle: { color: '#172033', fontSize: 17, fontWeight: '700', marginBottom: 12 },
  input: {
    borderColor: '#d8ddea', borderWidth: 1, borderRadius: 10, color: '#172033',
    fontSize: 16, paddingHorizontal: 12, paddingVertical: 11, marginBottom: 10,
  },
  addButton: { alignItems: 'center', backgroundColor: '#2563eb', borderRadius: 10, padding: 13 },
  addButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  sectionTitle: { color: '#172033', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  studentRow: { alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 12, flexDirection: 'row', padding: 14 },
  studentInfo: { flex: 1, marginRight: 10 },
  studentName: { color: '#172033', fontSize: 16, fontWeight: '600' },
  statusText: { color: '#65708a', fontSize: 13, marginTop: 4 },
  attendanceButtons: { flexDirection: 'row', gap: 7 },
  statusButton: { backgroundColor: '#edf0f6', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 9 },
  presentButtonActive: { backgroundColor: '#16a34a' },
  absentButtonActive: { backgroundColor: '#dc2626' },
  statusButtonText: { color: '#3e4b63', fontSize: 13, fontWeight: '700' },
  activeButtonText: { color: '#ffffff' },
  separator: { height: 10 },
});
