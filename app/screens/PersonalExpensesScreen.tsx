import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useExpenses } from "../../hooks/ExpensesContext";
import { Ionicons } from "@expo/vector-icons";

export default function PersonalExpensesScreen() {
  const { getCategoryTotal, categoryLimits } = useExpenses();

  const categories = [
    { key: 'Housing', icon: 'home', label: 'Housing', color: '#6366F1', bg: '#EEF2FF' },
    { key: 'Food', icon: 'restaurant', label: 'Food & Dining', color: '#10B981', bg: '#ECFDF5' },
    { key: 'Transportation', icon: 'bus', label: 'Transportation', color: '#F59E0B', bg: '#FFFBEB' },
    { key: 'Shopping', icon: 'bag-handle', label: 'Shopping', color: '#EC4899', bg: '#FDF2F8' },
  ] as const;

  return (
    <ScrollView style={styles.mainWrapper} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Categories</Text>
      </View>

      {categories.map(cat => {
        const spent = getCategoryTotal(cat.key);
        const limit = categoryLimits[cat.key];
        const pct = Math.min(100, isNaN(spent / limit) ? 0 : (spent / limit) * 100);
        
        return (
          <View key={cat.key} style={styles.categoryCard}>
            <View style={[styles.iconBox, { backgroundColor: cat.bg }]}>
              <Ionicons name={cat.icon as any} size={22} color={cat.color} />
            </View>
            
            <View style={styles.catDetails}>
              <View style={styles.catRow}>
                <Text style={styles.categoryName}>{cat.label}</Text>
                <View style={{alignItems: 'flex-end'}}>
                   <Text style={styles.amount}>${spent.toFixed(2)}</Text>
                   <Text style={styles.categoryPercent}>{pct.toFixed(0)}% of limit</Text>
                </View>
              </View>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: pct >= 100 ? "#EF4444" : cat.color }]} />
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1, 
    backgroundColor: "#F8FAFC",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    color: "#0F172A",
    fontSize: 28,
    fontWeight: "800",
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#94A3B8', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    gap: 16,
  },
  iconBox: {
    width: 52, height: 52, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
  },
  catDetails: {
    flex: 1,
  },
  catRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'
  },
  categoryName: {
    fontSize: 16, fontWeight: '700', color: '#0F172A', marginTop: 2
  },
  amount: {
    fontSize: 16, fontWeight: '800', color: '#0F172A'
  },
  categoryPercent: {
    fontSize: 12, color: '#94A3B8', marginTop: 4, fontWeight: '600'
  },
  progressBg: {
    height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, marginTop: 10, overflow: 'hidden'
  },
  progressFill: {
    height: 6, borderRadius: 3
  },
});
