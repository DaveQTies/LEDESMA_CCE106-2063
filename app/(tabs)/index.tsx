import { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [result, setResult] = useState('');
  const [statusMessage, setStatusMessage] = useState('Enter two numbers to calculate.');

  const parseNumber = (value: string, fieldName: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue === '') {
      throw new Error(`Please enter a value for ${fieldName}.`);
    }

    const numericValue = Number(trimmedValue);

    if (!Number.isFinite(numericValue)) {
      throw new Error(`"${trimmedValue}" is not a valid number.`);
    }

    return numericValue;
  };

  const calculate = (operation: 'add' | 'subtract' | 'multiply' | 'divide') => {
    try {
      const firstNumber = parseNumber(firstValue, 'first number');
      const secondNumber = parseNumber(secondValue, 'second number');

      if (operation === 'divide' && secondNumber === 0) {
        setResult('');
        setStatusMessage('Cannot divide by zero.');
        Alert.alert('Division by zero', 'The second value cannot be zero.');
        return;
      }

      let computedResult = 0;

      switch (operation) {
        case 'add':
          computedResult = firstNumber + secondNumber;
          break;
        case 'subtract':
          computedResult = firstNumber - secondNumber;
          break;
        case 'multiply':
          computedResult = firstNumber * secondNumber;
          break;
        case 'divide':
          computedResult = firstNumber / secondNumber;
          break;
        default:
          break;
      }

      setResult(computedResult.toString());
      setStatusMessage(`Result for ${operation}:`);
    } catch (error) {
      setResult('');
      setStatusMessage(error instanceof Error ? error.message : 'Invalid input.');
      Alert.alert('Invalid input', error instanceof Error ? error.message : 'Please enter valid numbers.');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Simple Calculator</Text>

        <TextInput
          value={firstValue}
          onChangeText={setFirstValue}
          placeholder="Enter first number"
          placeholderTextColor="#7A879B"
          keyboardType="numeric"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          value={secondValue}
          onChangeText={setSecondValue}
          placeholder="Enter second number"
          placeholderTextColor="#7A879B"
          keyboardType="numeric"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => calculate('add')}
        />

        <View style={styles.buttonGrid}>
          <Pressable onPress={() => calculate('add')} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
          <Pressable onPress={() => calculate('subtract')} style={styles.button}>
            <Text style={styles.buttonText}>Subtract</Text>
          </Pressable>
          <Pressable onPress={() => calculate('multiply')} style={styles.button}>
            <Text style={styles.buttonText}>Multiply</Text>
          </Pressable>
          <Pressable onPress={() => calculate('divide')} style={styles.button}>
            <Text style={styles.buttonText}>Divide</Text>
          </Pressable>
        </View>

        <Text style={styles.status}>{statusMessage}</Text>
        <Text style={styles.result}>{result || 'No result yet'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    color: '#1F2A44',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F4F7FC',
    borderColor: '#D7E1F0',
    borderWidth: 1,
    borderRadius: 12,
    color: '#1F2A44',
    fontSize: 16,
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    marginBottom: 18,
  },
  button: {
    backgroundColor: '#3F6FE5',
    borderRadius: 10,
    flexBasis: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  status: {
    color: '#53627C',
    fontSize: 14,
    marginBottom: 8,
  },
  result: {
    color: '#18253F',
    fontSize: 30,
    fontWeight: '800',
  },
});
