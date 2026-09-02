import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type Task = { id: number; title: string; completed: boolean };
type Operation = '+' | '-' | '*' | '/';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Review today's lecture notes", completed: false },
    { id: 2, title: 'Submit programming activity', completed: false },
  ]);
  const [taskText, setTaskText] = useState('');
  const [count, setCount] = useState(0);
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const addTask = () => {
    const title = taskText.trim();
    if (!title) return Alert.alert('Task required', 'Please enter a task before adding it.');
    setTasks((items) => [...items, { id: Date.now(), title, completed: false }]);
    setTaskText('');
  };
  const toggleTask = (id: number) =>
    setTasks((items) => items.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  const removeTask = (id: number) => setTasks((items) => items.filter((task) => task.id !== id));

  const calculate = (operation: Operation) => {
    const first = Number(firstNumber);
    const second = Number(secondNumber);
    if (!firstNumber.trim() || !secondNumber.trim()) {
      setResult(null); setMessage('Enter both numbers to calculate.'); return;
    }
    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setResult(null); setMessage('Please enter valid numeric values.'); return;
    }
    if (operation === '/' && second === 0) {
      setResult(null); setMessage('Cannot divide by zero.'); return;
    }
    const answer = operation === '+' ? first + second : operation === '-' ? first - second : operation === '*' ? first * second : first / second;
    setMessage(''); setResult(String(answer));
  };

  const completed = tasks.filter((task) => task.completed).length;
  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Student Productivity Hub</Text>
      <Text style={styles.subtitle}>Manage your tasks, count your progress, and calculate quickly.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Student Task Manager</Text>
        <Text style={styles.helper}>{completed} of {tasks.length} tasks completed</Text>
        <View style={styles.inputRow}>
          <TextInput accessibilityLabel="New task" value={taskText} onChangeText={setTaskText} onSubmitEditing={addTask} placeholder="Add a task..." placeholderTextColor="#7A8799" style={[styles.input, styles.taskInput]} />
          <Pressable onPress={addTask} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}><Text style={styles.addButtonText}>Add</Text></Pressable>
        </View>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskRow}>
            <Pressable accessibilityLabel={`Toggle ${task.title}`} onPress={() => toggleTask(task.id)} style={[styles.checkBox, task.completed && styles.checkedBox]}><Text style={styles.checkMark}>{task.completed ? 'X' : ''}</Text></Pressable>
            <Text style={[styles.taskText, task.completed && styles.completedTask]}>{task.title}</Text>
            <Pressable accessibilityLabel={`Delete ${task.title}`} onPress={() => removeTask(task.id)}><Text style={styles.deleteText}>Delete</Text></Pressable>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Counter App</Text>
        <Text style={styles.counterValue}>{count}</Text>
        <View style={styles.buttonRow}>
          <Pressable onPress={() => setCount((value) => Math.max(0, value - 1))} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}><Text style={styles.secondaryButtonText}>-</Text></Pressable>
          <Pressable onPress={() => setCount(0)} style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}><Text style={styles.resetButtonText}>Reset</Text></Pressable>
          <Pressable onPress={() => setCount((value) => value + 1)} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>+</Text></Pressable>
        </View>
        <Text style={styles.helper}>The counter will not go below zero.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Simple Calculator</Text>
        <TextInput accessibilityLabel="First number" value={firstNumber} onChangeText={setFirstNumber} keyboardType="decimal-pad" placeholder="First number" placeholderTextColor="#7A8799" style={styles.input} />
        <TextInput accessibilityLabel="Second number" value={secondNumber} onChangeText={setSecondNumber} keyboardType="decimal-pad" placeholder="Second number" placeholderTextColor="#7A8799" style={styles.input} />
        <View style={styles.calculatorRow}>{(['+', '-', '*', '/'] as const).map((operation) => <Pressable key={operation} onPress={() => calculate(operation)} style={({ pressed }) => [styles.operationButton, pressed && styles.pressed]}><Text style={styles.operationText}>{operation}</Text></Pressable>)}</View>
        {message ? <Text style={styles.errorText}>{message}</Text> : null}
        {result !== null ? <Text style={styles.resultText}>Result: {result}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#EEF4FF', flexGrow: 1, padding: 20, paddingTop: 62 },
  title: { color: '#172033', fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#5A6B83', fontSize: 14, lineHeight: 20, marginBottom: 20, marginTop: 8, textAlign: 'center' },
  card: { backgroundColor: '#FFF', borderRadius: 18, elevation: 3, marginBottom: 16, padding: 18, shadowColor: '#1C2E4A', shadowOpacity: 0.1, shadowRadius: 10 },
  cardTitle: { color: '#2D4A77', fontSize: 19, fontWeight: '800' },
  helper: { color: '#5A6B83', fontSize: 13, marginTop: 5 },
  inputRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  input: { backgroundColor: '#F5F8FD', borderColor: '#D5DFEF', borderRadius: 10, borderWidth: 1, color: '#172033', fontSize: 16, marginTop: 11, paddingHorizontal: 13, paddingVertical: 12 },
  taskInput: { flex: 1, marginTop: 0 },
  addButton: { alignItems: 'center', backgroundColor: '#3B82F6', borderRadius: 10, justifyContent: 'center', paddingHorizontal: 17 },
  addButtonText: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  taskRow: { alignItems: 'center', borderBottomColor: '#E7EDF6', borderBottomWidth: 1, flexDirection: 'row', gap: 10, paddingVertical: 13 },
  checkBox: { alignItems: 'center', borderColor: '#9DB0CB', borderRadius: 5, borderWidth: 2, height: 22, justifyContent: 'center', width: 22 },
  checkedBox: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  checkMark: { color: '#FFF', fontWeight: '800' },
  taskText: { color: '#26364F', flex: 1, fontSize: 15 },
  completedTask: { color: '#7A8799', textDecorationLine: 'line-through' },
  deleteText: { color: '#DB4B5B', fontSize: 13, fontWeight: '700' },
  counterValue: { color: '#172033', fontSize: 52, fontWeight: '800', marginVertical: 16, textAlign: 'center' },
  buttonRow: { flexDirection: 'row', gap: 10 },
  primaryButton: { alignItems: 'center', backgroundColor: '#3B82F6', borderRadius: 11, flex: 1, paddingVertical: 13 },
  secondaryButton: { alignItems: 'center', backgroundColor: '#D9E7FF', borderRadius: 11, flex: 1, paddingVertical: 13 },
  resetButton: { alignItems: 'center', backgroundColor: '#F1F3F8', borderRadius: 11, flex: 1, paddingVertical: 13 },
  primaryButtonText: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  secondaryButtonText: { color: '#244A7C', fontSize: 24, fontWeight: '800' },
  resetButtonText: { color: '#34445B', fontSize: 15, fontWeight: '800' },
  calculatorRow: { flexDirection: 'row', gap: 9, marginTop: 14 },
  operationButton: { alignItems: 'center', backgroundColor: '#D9E7FF', borderRadius: 10, flex: 1, paddingVertical: 12 },
  operationText: { color: '#244A7C', fontSize: 21, fontWeight: '800' },
  resultText: { color: '#147A47', fontSize: 18, fontWeight: '800', marginTop: 14, textAlign: 'center' },
  errorText: { color: '#C23849', fontSize: 14, fontWeight: '600', marginTop: 14, textAlign: 'center' },
  pressed: { opacity: 0.75 },
});
