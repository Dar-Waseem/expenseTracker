import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const generateDays = () => {
  const days = [];
  const today = new Date();
  for (let i = -15; i <= 15; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

export default function HorizontalCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dates = generateDays();
  const scrollViewRef = useRef<ScrollView>(null);

  const getDayName = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short' });
  const getMonthName = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Center the scroll roughly on today
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: 15 * 72 - 150, animated: false });
    }, 100);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{getMonthName(selectedDate)}</Text>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scroll}
      >
        {dates.map((d, idx) => {
          const isSelected = d.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.dayCard, isSelected && styles.dayCardSelected]}
              onPress={() => setSelectedDate(d)}
            >
              <Text style={[styles.dayName, isSelected && styles.textSelected]}>{getDayName(d)}</Text>
              <Text style={[styles.dayNum, isSelected && styles.textSelected]}>{d.getDate()}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  scroll: {
    gap: 12,
    paddingRight: 20,
  },
  dayCard: {
    backgroundColor: '#101B35',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    width: 65,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  dayCardSelected: {
    backgroundColor: '#6D7CFF',
    borderColor: '#6D7CFF',
    shadowColor: '#6D7CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  dayName: {
    color: '#8B93B8',
    fontSize: 12,
    marginBottom: 6,
  },
  dayNum: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  textSelected: {
    color: '#fff',
  },
});
