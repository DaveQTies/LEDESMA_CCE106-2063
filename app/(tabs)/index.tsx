import * as Haptics from 'expo-haptics';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: '1', title: 'Review class notes', dueDate: 'Sep 5', completed: false },
  { id: '2', title: 'Submit activity', dueDate: 'Sep 8', completed: true },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );
  const pendingCount = tasks.length - completedCount;

  const addTask = () => {
    const trimmedTitle = title.trim();
    const trimmedDueDate = dueDate.trim();

    if (!trimmedTitle || !trimmedDueDate) {
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Missing details', 'Please enter both a task title and a due date.');
      return;
    }

    setTasks((currentTasks) => [
      {
        id: Date.now().toString(),
        title: trimmedTitle,
        dueDate: trimmedDueDate,
        completed: false,
      },
      ...currentTasks,
    ]);
    setTitle('');
    setDueDate('');
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert('Task added', `“${trimmedTitle}” was added to your task list.`);
  };

  const toggleTask = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      task.completed ? 'Task reopened' : 'Task completed',
      `“${task.title}” is now ${task.completed ? 'pending' : 'complete'}.`
    );
  };

  const deleteTask = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (!task) return;

    setTasks((currentTasks) => currentTasks.filter((item) => item.id !== id));
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert('Task deleted', `“${task.title}” was removed from your task list.`);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>STUDENT TASK MANAGER</Text>
        <Text style={styles.title}>Stay on top of your work.</Text>
      </View>

      <View style={styles.studentCard}>
        <Text style={styles.studentLabel}>STUDENT</Text>
        <Text style={styles.studentName}>Jhon Dave Ledesma</Text>
        <Text style={styles.program}>BSIT · 3rd Year</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, styles.pendingCard]}>
          <Text style={styles.statNumber}>{pendingCount}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, styles.completedCard]}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.addCard}>
        <Text style={styles.sectionTitle}>Add a task</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Task title"
          placeholderTextColor="#8A94A6"
          style={styles.input}
          returnKeyType="next"
        />
        <TextInput
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="Due date (e.g. Sep 12)"
          placeholderTextColor="#8A94A6"
          style={styles.input}
          returnKeyType="done"
          onSubmitEditing={addTask}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add task"
          onPress={addTask}
          style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]}>
          <Text style={styles.addButtonText}>Add task</Text>
        </Pressable>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Current tasks</Text>
        <Text style={styles.taskTotal}>{tasks.length} total</Text>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Your task list is clear.</Text>
          <Text style={styles.emptyText}>Add a task above to get started.</Text>
        </View>
      ) : (
        tasks.map((task) => (
          <View key={task.id} style={[styles.taskCard, task.completed && styles.taskCardCompleted]}>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: task.completed }}
              accessibilityLabel={`${task.completed ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
              onPress={() => toggleTask(task.id)}
              style={({ pressed }) => [styles.checkButton, pressed && styles.checkPressed]}>
              <Text style={styles.checkmark}>{task.completed ? '✓' : ''}</Text>
            </Pressable>
            <Pressable
              onPress={() => toggleTask(task.id)}
              style={({ pressed }) => [styles.taskDetails, pressed && styles.detailsPressed]}>
              <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
                {task.title}
              </Text>
              <Text style={styles.dueDate}>Due {task.dueDate}</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Delete ${task.title}`}
              onPress={() => deleteTask(task.id)}
              style={({ pressed }) => [styles.deleteButton, pressed && styles.deletePressed]}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F7FB' },
  container: { padding: 20, paddingTop: 56, paddingBottom: 36 },
  header: { marginBottom: 20 },
  eyebrow: { color: '#4263A8', fontSize: 12, fontWeight: '800', letterSpacing: 1.1, marginBottom: 6 },
  title: { color: '#172033', fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  studentCard: { backgroundColor: '#263B6B', borderRadius: 18, padding: 20, marginBottom: 14 },
  studentLabel: { color: '#BFD0FF', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  studentName: { color: '#FFFFFF', fontSize: 21, fontWeight: '800', marginTop: 7 },
  program: { color: '#DCE6FF', fontSize: 14, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  statCard: { flex: 1, borderRadius: 14, padding: 16 },
  pendingCard: { backgroundColor: '#FFF2D6' },
  completedCard: { backgroundColor: '#DDF5E8' },
  statNumber: { color: '#172033', fontSize: 24, fontWeight: '800' },
  statLabel: { color: '#526076', fontSize: 13, fontWeight: '600', marginTop: 3 },
  addCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 18, marginBottom: 24, elevation: 2 },
  sectionTitle: { color: '#172033', fontSize: 18, fontWeight: '800' },
  input: { backgroundColor: '#F4F7FB', borderColor: '#D8E0EE', borderWidth: 1, borderRadius: 10, color: '#172033', fontSize: 15, marginTop: 12, paddingHorizontal: 14, paddingVertical: 12 },
  addButton: { alignItems: 'center', backgroundColor: '#3159B9', borderRadius: 10, marginTop: 12, paddingVertical: 14 },
  addButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  buttonPressed: { backgroundColor: '#22428D', transform: [{ scale: 0.98 }] },
  listHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  taskTotal: { color: '#6B778D', fontSize: 13, fontWeight: '600' },
  taskCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, flexDirection: 'row', marginBottom: 10, padding: 14, elevation: 1 },
  taskCardCompleted: { backgroundColor: '#F0F8F3' },
  checkButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#9AA8BE', borderRadius: 12, borderWidth: 2, height: 24, justifyContent: 'center', marginRight: 12, width: 24 },
  checkPressed: { backgroundColor: '#D7E6FF', transform: [{ scale: 0.9 }] },
  checkmark: { color: '#187247', fontSize: 17, fontWeight: '900', lineHeight: 19 },
  taskDetails: { flex: 1 },
  detailsPressed: { opacity: 0.55 },
  taskTitle: { color: '#26334D', fontSize: 16, fontWeight: '700' },
  taskTitleCompleted: { color: '#657466', textDecorationLine: 'line-through' },
  dueDate: { color: '#738097', fontSize: 13, marginTop: 4 },
  deleteButton: { borderRadius: 8, marginLeft: 8, paddingHorizontal: 8, paddingVertical: 7 },
  deletePressed: { backgroundColor: '#FFE1E1', transform: [{ scale: 0.94 }] },
  deleteText: { color: '#C53E3E', fontSize: 12, fontWeight: '800' },
  emptyCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 24 },
  emptyTitle: { color: '#26334D', fontSize: 16, fontWeight: '800' },
  emptyText: { color: '#738097', fontSize: 14, marginTop: 5 },
});
