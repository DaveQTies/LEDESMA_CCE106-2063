import { StyleSheet, Text, View } from 'react-native';
type StatCardProps = { label: string; value: string | number; accent: string };
export function StatCard({ label, value, accent }: StatCardProps) { return <View style={styles.card}><View style={[styles.accent, { backgroundColor: accent }]} /><Text style={styles.value}>{value}</Text><Text style={styles.label}>{label}</Text></View>; }
const styles = StyleSheet.create({ card: { backgroundColor: '#FFFFFF', borderColor: '#DDE7F2', borderRadius: 16, borderWidth: 1, flexGrow: 1, minWidth: 145, overflow: 'hidden', padding: 18 }, accent: { height: 4, left: 0, position: 'absolute', right: 0, top: 0 }, label: { color: '#62748A', fontSize: 13, fontWeight: '600', marginTop: 5 }, value: { color: '#14243A', fontSize: 28, fontWeight: '800' } });
