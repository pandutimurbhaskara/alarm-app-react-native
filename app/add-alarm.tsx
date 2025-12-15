import { useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, PanResponder, Animated } from 'react-native';

const AddAlarmScreen = () => {
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(30);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [repeat, setRepeat] = useState('Weekdays');
  const [label, setLabel] = useState('Morning Alarm');
  const [sound, setSound] = useState('Crystals');

  // Generate arrays for time picker
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const periods = ['AM', 'PM'];

  // Swipeable picker component
  const SwipeablePicker = ({ items, selectedValue, onValueChange, type = 'number' }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const ITEM_HEIGHT = 60;
    const VISIBLE_ITEMS = 3;

    const getDisplayValue = (value) => {
      if (type === 'number') {
        return value.toString().padStart(2, '0');
      }
      return value;
    };

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          const { dy } = gestureState;
          const currentIndex = items.indexOf(selectedValue);
          const movement = -dy / ITEM_HEIGHT;
          
          if (Math.abs(movement) > 0.5) {
            const newIndex = Math.round(currentIndex + movement);
            if (newIndex >= 0 && newIndex < items.length) {
              onValueChange(items[newIndex]);
            }
          }
        },
      })
    ).current;

    const currentIndex = items.indexOf(selectedValue);
    const visibleItems = [];
    
    for (let i = -1; i <= 1; i++) {
      const index = currentIndex + i;
      if (index >= 0 && index < items.length) {
        visibleItems.push({ value: items[index], offset: i });
      } else {
        visibleItems.push({ value: null, offset: i });
      }
    }

    return (
      <View style={styles.pickerColumn} {...panResponder.panHandlers}>
        {visibleItems.map((item, idx) => (
          <TouchableOpacity
            key={`${item.value}-${idx}`}
            onPress={() => item.value !== null && onValueChange(item.value)}
            style={styles.pickerItem}
          >
            <Text
              style={[
                type === 'period' ? styles.periodText : styles.timeText,
                item.offset === 0 ? styles.selectedTime : styles.unselectedTime,
              ]}
            >
              {item.value !== null ? getDisplayValue(item.value) : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTimePicker = () => (
    <View style={styles.timePickerContainer}>
      {/* Hours */}
      <SwipeablePicker
        items={hours}
        selectedValue={selectedHour}
        onValueChange={setSelectedHour}
        type="number"
      />

      {/* Separator */}
      <Text style={[styles.timeText, styles.selectedTime, styles.separator]}>:</Text>

      {/* Minutes */}
      <SwipeablePicker
        items={minutes}
        selectedValue={selectedMinute}
        onValueChange={setSelectedMinute}
        type="number"
      />

      {/* Period */}
      <SwipeablePicker
        items={periods}
        selectedValue={selectedPeriod}
        onValueChange={setSelectedPeriod}
        type="period"
      />
    </View>
  );

  const router = useRouter()
  const handleSave = () => {
    
    console.log('Saving alarm:', {
      time: `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`,
      repeat,
      label,
      sound,
    });
    router.back()
  };

  const handleCancel = () => {
    console.log('Cancelled');
    router.back()
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Alarm</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerButton}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollView}>
        {/* Time Picker */}
        {renderTimePicker()}

        {/* Options List */}
        <View style={styles.optionsList}>
          {/* Repeat */}
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🔁</Text>
              <Text style={styles.optionLabel}>Repeat</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>{repeat}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Label */}
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🏷️</Text>
              <Text style={styles.optionLabel}>Label</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>{label}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Sound */}
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Text style={styles.optionIcon}>🎵</Text>
              <Text style={styles.optionLabel}>Sound</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>{sound}</Text>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerButton: {
    fontSize: 17,
    color: '#007AFF',
    fontWeight: '400',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 20,
  },
  pickerColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItem: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 60,
    fontWeight: '300',
  },
  periodText: {
    fontSize: 48,
    fontWeight: '300',
  },
  selectedTime: {
    color: '#007AFF',
    backgroundColor: '#E8F4FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
  },
  unselectedTime: {
    color: '#D1D1D6',
  },
  separator: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  optionsList: {
    marginBottom: 30,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: '#000000',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 8,
  },
  chevron: {
    fontSize: 20,
    color: '#C7C7CC',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
});

export default AddAlarmScreen;