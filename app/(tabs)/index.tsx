import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CounterProps = {
  initialValue?: number;
  incrementBy?: number;
};

function CounterApp({ initialValue = 0, incrementBy = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const incrementCount = () => {
    setCount((currentValue) => currentValue + incrementBy);
  };

  const decrementCount = () => {
    setCount((currentValue) => Math.max(0, currentValue - incrementBy));
  };

  const resetCount = () => {
    setCount(initialValue);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.label}>Counter App</Text>
        <Text style={styles.value}>{count}</Text>

        <View style={styles.buttonRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Decrease counter"
            onPress={decrementCount}
            style={({ pressed }) => [styles.button, styles.decrementButton, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Reset counter"
            onPress={resetCount}
            style={({ pressed }) => [styles.button, styles.resetButton, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Increase counter"
            onPress={incrementCount}
            style={({ pressed }) => [styles.button, styles.incrementButton, pressed && styles.pressed]}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.helper}>Step: {incrementBy}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return <CounterApp initialValue={0} incrementBy={1} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  label: {
    color: '#2D4A77',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  value: {
    color: '#172033',
    fontSize: 52,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  decrementButton: {
    backgroundColor: '#D9E7FF',
  },
  resetButton: {
    backgroundColor: '#F1F3F8',
  },
  incrementButton: {
    backgroundColor: '#3B82F6',
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#172033',
    fontSize: 28,
    fontWeight: '800',
  },
  helper: {
    color: '#5A6B83',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 18,
  },
});
