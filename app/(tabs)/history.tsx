import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useExpenses } from "../../hooks/ExpensesContext";

export default function HistoryScreen() {
  const { expenses } = useExpenses();
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Housing", "Food", "Transportation", "Shopping"];

  // Filter items if a specific category is tapped
  const displayedExpenses = activeFilter === "All" 
    ? expenses 
    : expenses.filter(e => e.category === activeFilter);

  // Grouping logic (simplified)
  const groupedExpenses = {
    "TODAY": displayedExpenses.slice(0, 2),
    "YESTERDAY": displayedExpenses.slice(2, 4),
    "LAST WEEK": displayedExpenses.slice(4) // assuming expenses is sorted recent-first
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>W</Text>
          </View>
          <Text style={styles.logo}>History</Text>
        </View>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(filter => (
            <TouchableOpacity 
              key={filter} 
              activeOpacity={0.7}
              style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
        {Object.entries(groupedExpenses).map(([dateLabel, items]) => {
          if (!items || items.length === 0) return null;
          return (
            <View key={dateLabel}>
              <Text style={styles.dateLabel}>{dateLabel}</Text>
              {items.map(expense => (
                <View key={expense.id} style={styles.expenseItem}>
                  <View style={styles.expenseLeft}>
                    <View style={styles.expenseIcon}>
                      <Ionicons name="receipt-outline" size={20} color="#6366F1" />
                    </View>
                    <View>
                      <Text style={styles.expenseTitle}>{expense.note}</Text>
                      <Text style={styles.expenseCategory}>{expense.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.expenseAmount}>- ${expense.amount.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          );
        })}
        
        {/* Placeholder if empty */}
        {displayedExpenses.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#94A3B8' }}>No transactions found.</Text>
          </View>
        )}

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
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 24,
    marginHorizontal: 24, paddingHorizontal: 16, height: 52,
    shadowColor: '#94A3B8', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    marginBottom: 20, borderWidth: 1, borderColor: '#F1F5F9'
  },
  searchInput: {
    flex: 1, marginLeft: 10, fontSize: 15, color: '#0F172A', fontWeight: '500'
  },
  filterScroll: {
    paddingHorizontal: 24, gap: 10, paddingBottom: 20, paddingTop: 5
  },
  filterChip: {
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0',
    justifyContent: 'center', alignItems: 'center'
  },
  filterChipActive: {
    backgroundColor: '#0F172A', borderColor: '#0F172A'
  },
  filterText: {
    color: '#64748B', fontWeight: '600', fontSize: 13
  },
  filterTextActive: {
    color: '#FFFFFF'
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  dateLabel: {
    fontSize: 12, fontWeight: '700', color: '#94A3B8', letterSpacing: 1.5,
    marginTop: 10, marginBottom: 15,
  },
  expenseItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFFFFF', padding: 18, borderRadius: 24, marginBottom: 14,
    shadowColor: '#94A3B8', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
  },
  expenseLeft: {
    flexDirection: 'row', alignItems: 'center', gap: 15
  },
  expenseIcon: {
    width: 48, height: 48, borderRadius: 16, backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center'
  },
  expenseTitle: {
    fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 4
  },
  expenseCategory: {
    fontSize: 13, color: '#94A3B8', fontWeight: '600'
  },
  expenseAmount: {
    fontSize: 16, fontWeight: '700', color: '#EF4444'
  }
});
