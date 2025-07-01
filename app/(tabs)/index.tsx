import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';

const AlarmScreen = () => {
  const [alarms, setAlarms] = useState([
    {
      id: 1,
      time: '7:00',
      period: 'AM',
      days: 'Weekdays',
      puzzle: 'Memory Game',
      enabled: true,
      isNext: true,
      nextIn: '8h 15m from now'
    },
    {
      id: 2,
      time: '9:30',
      period: 'AM',
      days: 'Sat, Sun',
      puzzle: null,
      enabled: false,
      isNext: false
    },
    {
      id: 3,
      time: '8:15',
      period: 'PM',
      days: 'Mon, Wed, Fri',
      puzzle: 'Math Problems',
      enabled: true,
      isNext: false
    }
  ]);

  const toggleAlarm = (id: number) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alarms</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuDots}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {alarms[0].isNext && (
          <View style={styles.nextAlarmCard}>
            <Text style={styles.nextAlarmLabel}>Next alarm</Text>
            <Text style={styles.nextAlarmTime}>{alarms[0].nextIn}</Text>
          </View>
        )}

        {alarms.map((alarm) => (
          <View key={alarm.id} style={styles.alarmCard}>
            <View style={styles.alarmContent}>
              <View style={styles.alarmLeft}>
                <View style={styles.timeRow}>
                  <Text style={styles.time}>{alarm.time}</Text>
                  <Text style={styles.period}>{alarm.period}</Text>
                </View>
                <Text style={styles.days}>{alarm.days}</Text>
                {alarm.puzzle ? (
                  <View style={styles.puzzleRow}>
                    <Text style={styles.puzzleIcon}>🧩</Text>
                    <Text style={styles.puzzleText}>{alarm.puzzle}</Text>
                  </View>
                ) : (
                  <View style={styles.puzzleRow}>
                    <Text style={styles.noPuzzleIcon}>🔇</Text>
                    <Text style={styles.noPuzzleText}>No Puzzle</Text>
                  </View>
                )}
              </View>
              <Switch
                value={alarm.enabled}
                onValueChange={() => toggleAlarm(alarm.id)}
                trackColor={{ false: '#E0E0E0', true: '#BB86FC' }}
                thumbColor={alarm.enabled ? '#7C4DFF' : '#F4F3F4'}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  menuButton: {
    padding: 8,
  },
  menuDots: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  nextAlarmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextAlarmLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  nextAlarmTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  alarmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alarmContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alarmLeft: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  time: {
    fontSize: 48,
    fontWeight: '300',
    color: '#000000',
    letterSpacing: -1,
  },
  period: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginLeft: 4,
  },
  days: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  puzzleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  puzzleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  puzzleText: {
    fontSize: 15,
    color: '#7C4DFF',
    fontWeight: '500',
  },
  noPuzzleIcon: {
    fontSize: 16,
    marginRight: 8,
    opacity: 0.5,
  },
  noPuzzleText: {
    fontSize: 15,
    color: '#999999',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7C4DFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

export default AlarmScreen;