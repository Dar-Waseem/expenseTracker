import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useExpenses } from "../../hooks/ExpensesContext";

// Dummy data to mimic the 7-day spending trend seen in the mockup
const weekData = [
  { day: "M", spent: 45, isToday: false },
  { day: "T", spent: 65, isToday: false },
  { day: "W", spent: 120, isToday: false },
  { day: "T", spent: 180, isToday: false },
  { day: "F", spent: 90, isToday: true }, // Highlighted as today
  { day: "S", spent: 0, isToday: false },
  { day: "S", spent: 0, isToday: false },
];

export default function AnalyticsScreen() {
  const { totalSpent, totalBudget, getCategoryTotal, categoryLimits } = useExpenses();

  const maxSpent = Math.max(...weekData.map(d => d.spent), 1); // Avoid div by zero

  const topCategories = [
    { key: 'Housing', icon: 'home', label: 'Housing', color: '#6366F1', bg: '#EEF2FF' },
    { key: 'Food', icon: 'restaurant', label: 'Food & Dining', color: '#10B981', bg: '#ECFDF5' },
    { key: 'Shopping', icon: 'bag-handle', label: 'Shopping', color: '#EC4899', bg: '#FDF2F8' },
  ] as const;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>W</Text>
          </View>
          <Text style={styles.logo}>Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Controls */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.timeSelector} activeOpacity={0.6}>
            <Ionicons name="calendar-outline" size={16} color="#6366F1" />
            <Text style={styles.timeText}>This Week</Text>
            <Ionicons name="chevron-down" size={16} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Hero Totals */}
        <View style={styles.heroSummary}>
          <Text style={styles.heroSubLabel}>TOTAL SPENT</Text>
          <Text style={styles.heroAmount}>${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          <View style={styles.budgetPill}>
            <Text style={styles.budgetLabel}>Budget Limit: ${totalBudget.toLocaleString()}</Text>
          </View>
        </View>

        {/* 7-Day Bar Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Spending Trend</Text>
          <View style={styles.barsArea}>
            {weekData.map((data, index) => {
              const heightPercent = `${(data.spent / maxSpent) * 100}%`;
              const isToday = data.isToday;
              return (
                <View key={index} style={styles.barColumn}>
                  {/* Floating value tag for today */}
                  {isToday && (
                    <View style={styles.valueBubble}>
                      <Text style={styles.valueBubbleText}>${data.spent}</Text>
                    </View>
                  )}
                  {/* Track line (empty space) */}
                  <View style={styles.barTrack}>
                    {/* Fill */}
                    <View style={[
                      styles.barFill, 
                      { height: heightPercent as any },
                      isToday && styles.barFillToday
                    ]} />
                  </View>
                  <Text style={[styles.dayText, isToday && styles.dayTextToday]}>{data.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Analysis Details */}
        <View style={styles.analysisContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Categories Analysis</Text>
          </View>

          {topCategories.map(cat => {
            const spent = getCategoryTotal(cat.key);
            const limit = categoryLimits[cat.key];
            const pct = Math.min(100, isNaN(spent / limit) ? 0 : (spent / limit) * 100);
            return (
              <View key={cat.key} style={styles.catRow}>
                <View style={[styles.iconBox, { backgroundColor: cat.bg }]}>
                  <Ionicons name={cat.icon as any} size={20} color={cat.color} />
                </View>
                <View style={styles.catDetails}>
                  <Text style={styles.catLabel}>{cat.label}</Text>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: cat.color }]} />
                  </View>
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <Text style={styles.catAmount}>${spent.toFixed(0)}</Text>
                  <Text style={styles.catPct}>{pct.toFixed(0)}%</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#F8FAFC"
  },
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingHorizontal: 24, paddingTop: 60, paddingBottom: 15,
  },
  headerLeft: {
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  avatarPlaceholder: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#E0E7FF',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: {
    fontWeight: '800', color: '#6366F1', fontSize: 18,
  },
  logo: {
    color: "#0F172A", fontSize: 22, fontWeight: "800", letterSpacing: 0.5
  },
  iconBtn: {
    width: 44, height: 44, backgroundColor: '#FFFFFF', borderRadius: 22,
    justifyContent: "center", alignItems: "center",
    shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  scrollContent: {
    paddingHorizontal: 24, paddingBottom: 40,
  },
  controlsRow: {
    flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, marginBottom: 20
  },
  timeSelector: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#EEF2FF', paddingVertical: 10, paddingHorizontal: 16,
    borderRadius: 20,
  },
  timeText: {
    color: '#6366F1', fontWeight: '700', fontSize: 14
  },
  heroSummary: {
    alignItems: 'center', marginVertical: 15,
  },
  heroSubLabel: {
    fontSize: 12, fontWeight: '700', color: '#94A3B8', letterSpacing: 1.5, marginBottom: 5
  },
  heroAmount: {
    fontSize: 48, fontWeight: '800', color: '#0F172A',
  },
  budgetPill: {
    marginTop: 15, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#FFFFFF',
    borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0',
  },
  budgetLabel: {
    fontSize: 13, fontWeight: '600', color: '#64748B'
  },
  chartContainer: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24,
    marginTop: 30, marginBottom: 20,
    shadowColor: '#94A3B8', shadowOpacity: 0.08, shadowRadius: 15, shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 25
  },
  barsArea: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 160,
  },
  barColumn: {
    alignItems: 'center', flex: 1,
  },
  valueBubble: {
    backgroundColor: '#6366F1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
    marginBottom: 8, position: 'absolute', top: -35,
  },
  valueBubbleText: {
    color: '#FFFFFF', fontSize: 10, fontWeight: '700'
  },
  barTrack: {
    height: 120, width: 36, backgroundColor: '#F1F5F9', borderRadius: 18,
    justifyContent: 'flex-end', overflow: 'hidden', marginBottom: 12,
  },
  barFill: {
    width: '100%', backgroundColor: '#CBD5E1', borderRadius: 18,
  },
  barFillToday: {
    backgroundColor: '#6366F1',
  },
  dayText: {
    fontSize: 13, fontWeight: '600', color: '#94A3B8'
  },
  dayTextToday: {
    color: '#0F172A', fontWeight: '800'
  },
  analysisContainer: {
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24,
    shadowColor: '#94A3B8', shadowOpacity: 0.08, shadowRadius: 15, shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  sectionHeaderRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  catRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 20, gap: 15
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  catDetails: {
    flex: 1,
  },
  catLabel: {
    fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 8
  },
  progressBg: {
    height: 6, backgroundColor: '#F1F5F9', borderRadius: 3,
  },
  progressFill: {
    height: 6, borderRadius: 3,
  },
  catAmount: {
    fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 2
  },
  catPct: {
    fontSize: 12, fontWeight: '600', color: '#94A3B8', alignSelf: 'flex-end'
  }
});
