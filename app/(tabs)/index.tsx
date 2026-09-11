import { Ionicons } from '@expo/vector-icons';
import { Alert, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone: 'blue' | 'purple' | 'orange';
  compact: boolean;
};

const metrics: Omit<MetricCardProps, 'compact'>[] = [
  { label: 'Hours focused', value: '18.5', detail: '+2.4 hrs this week', icon: 'time-outline', tone: 'blue' },
  { label: 'Tasks completed', value: '24', detail: '8 remaining today', icon: 'checkmark-circle-outline', tone: 'purple' },
  { label: 'Current streak', value: '7 days', detail: 'Your personal best', icon: 'flame-outline', tone: 'orange' },
];

const activities = [
  { title: 'Programming activity submitted', time: '20 min ago', icon: 'code-slash-outline' as const, color: '#536DFE' },
  { title: 'Study plan updated', time: 'Yesterday', icon: 'calendar-outline' as const, color: '#7C4DFF' },
  { title: 'Finished lecture notes', time: 'Yesterday', icon: 'document-text-outline' as const, color: '#F59E0B' },
];

function MetricCard({ label, value, detail, icon, tone, compact }: MetricCardProps) {
  const colors = {
    blue: { background: '#E8F0FF', icon: '#356AE6' },
    purple: { background: '#F0EAFE', icon: '#7C4DFF' },
    orange: { background: '#FFF1DE', icon: '#E88915' },
  }[tone];

  return (
    <View style={[styles.metricCard, compact ? styles.metricCardCompact : styles.metricCardWide]}>
      <View style={[styles.metricIcon, { backgroundColor: colors.background }]}>
        <Ionicons color={colors.icon} name={icon} size={21} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDetail}>{detail}</Text>
    </View>
  );
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 700;
  const isCompact = width < 430;
  const handleAction = (action: string) => Alert.alert(action, `${action} is ready for your next study session.`);

  return (
    <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
      <View style={[styles.content, isWide && styles.contentWide]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>STUDENT OVERVIEW</Text>
            <Text style={styles.title}>Good morning, Jhon Dave</Text>
            <Text style={styles.subtitle}>Here&apos;s how your learning is progressing.</Text>
          </View>
          <Pressable
            accessibilityLabel="Open profile"
            onPress={() => Alert.alert('Profile', 'Profile settings will open here.')}
            style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}>
            <Text style={styles.profileInitial}>JD</Text>
            <Ionicons color="#344563" name="chevron-down" size={16} />
          </Pressable>
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Your progress</Text>
            <Text style={styles.sectionDescription}>A quick view of your study momentum</Text>
          </View>
          <Pressable onPress={() => handleAction('View insights')} style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}>
            <Text style={styles.linkText}>View insights</Text>
            <Ionicons color="#356AE6" name="arrow-forward" size={16} />
          </Pressable>
        </View>

        <View style={[styles.metricGrid, isWide && styles.metricGridWide]}>
          {metrics.map((metric) => <MetricCard key={metric.label} {...metric} compact={isCompact} />)}
        </View>

        <View style={[styles.lowerGrid, isWide && styles.lowerGridWide]}>
          <View style={[styles.panel, styles.activityPanel]}>
            <View style={styles.panelHeader}>
              <View>
                <Text style={styles.sectionTitle}>Recent activity</Text>
                <Text style={styles.sectionDescription}>Keep track of the little wins</Text>
              </View>
              <Ionicons color="#8A98AE" name="ellipsis-horizontal" size={22} />
            </View>
            {activities.map((activity, index) => (
              <View key={activity.title} style={[styles.activityRow, index < activities.length - 1 && styles.activityBorder]}>
                <View style={[styles.activityIcon, { backgroundColor: `${activity.color}18` }]}>
                  <Ionicons color={activity.color} name={activity.icon} size={19} />
                </View>
                <View style={styles.activityText}>
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Ionicons color="#A4B0C2" name="chevron-forward" size={18} />
              </View>
            ))}
          </View>

          <View style={[styles.panel, styles.quickPanel]}>
            <Text style={styles.sectionTitle}>Quick actions</Text>
            <Text style={styles.sectionDescription}>Jump back into your work</Text>
            <View style={styles.actionList}>
              <Pressable onPress={() => handleAction('Start a focus session')} style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}>
                <Ionicons color="#FFFFFF" name="play" size={17} />
                <Text style={styles.primaryActionText}>Start focus session</Text>
              </Pressable>
              <Pressable onPress={() => handleAction('Add a task')} style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}>
                <Ionicons color="#356AE6" name="add" size={20} />
                <Text style={styles.secondaryActionText}>Add a task</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F5F7FB', flexGrow: 1, padding: 20, paddingTop: 56 },
  content: { alignSelf: 'center', width: '100%' },
  contentWide: { maxWidth: 1120 },
  header: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 34 },
  eyebrow: { color: '#356AE6', fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 7 },
  title: { color: '#17243B', fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: '#68778D', fontSize: 14, marginTop: 7 },
  profileButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E4E9F1', borderRadius: 24, borderWidth: 1, flexDirection: 'row', gap: 6, padding: 5, paddingRight: 9 },
  profileInitial: { alignItems: 'center', backgroundColor: '#DDE8FF', borderRadius: 18, color: '#244C9D', fontSize: 15, fontWeight: '800', height: 34, lineHeight: 34, textAlign: 'center', width: 34 },
  sectionHeading: { alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  sectionTitle: { color: '#1E2B43', fontSize: 18, fontWeight: '800', letterSpacing: -0.2 },
  sectionDescription: { color: '#7C8AA0', fontSize: 13, marginTop: 4 },
  linkButton: { alignItems: 'center', flexDirection: 'row', gap: 4, paddingBottom: 2 },
  linkText: { color: '#356AE6', fontSize: 13, fontWeight: '700' },
  metricGrid: { gap: 12, marginBottom: 20 },
  metricGridWide: { flexDirection: 'row' },
  metricCard: { backgroundColor: '#FFFFFF', borderColor: '#E8ECF2', borderRadius: 18, borderWidth: 1, padding: 18, shadowColor: '#1D3155', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12 },
  metricCardCompact: { minHeight: 130 },
  metricCardWide: { flex: 1 },
  metricIcon: { alignItems: 'center', borderRadius: 12, height: 42, justifyContent: 'center', marginBottom: 16, width: 42 },
  metricLabel: { color: '#6B7A90', fontSize: 13, fontWeight: '600' },
  metricValue: { color: '#1D2B43', fontSize: 27, fontWeight: '800', letterSpacing: -0.5, marginTop: 5 },
  metricDetail: { color: '#7B899E', fontSize: 12, marginTop: 5 },
  lowerGrid: { gap: 20 },
  lowerGridWide: {},
  panel: { backgroundColor: '#FFFFFF', borderColor: '#E8ECF2', borderRadius: 18, borderWidth: 1, padding: 19 },
  activityPanel: { order: 2 },
  quickPanel: { order: 1 },
  panelHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 },
  activityRow: { alignItems: 'center', flexDirection: 'row', gap: 12, paddingVertical: 15 },
  activityBorder: { borderBottomColor: '#EEF1F5', borderBottomWidth: 1 },
  activityIcon: { alignItems: 'center', borderRadius: 11, height: 39, justifyContent: 'center', width: 39 },
  activityText: { flex: 1 },
  activityTitle: { color: '#31405A', fontSize: 14, fontWeight: '700' },
  activityTime: { color: '#8794A7', fontSize: 12, marginTop: 4 },
  actionList: { gap: 10, marginTop: 20 },
  primaryAction: { alignItems: 'center', backgroundColor: '#356AE6', borderRadius: 11, flexDirection: 'row', gap: 9, justifyContent: 'center', paddingVertical: 13 },
  primaryActionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  secondaryAction: { alignItems: 'center', backgroundColor: '#F1F5FF', borderColor: '#D9E4FC', borderRadius: 11, borderWidth: 1, flexDirection: 'row', gap: 7, justifyContent: 'center', paddingVertical: 12 },
  secondaryActionText: { color: '#356AE6', fontSize: 14, fontWeight: '800' },
  pressed: { opacity: 0.72 },
});