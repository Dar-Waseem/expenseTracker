import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useExpenses, ExpenseCategory } from "../hooks/ExpensesContext";

const categories: { key: ExpenseCategory, icon: any, label: string }[] = [
  { key: "Housing", icon: "home", label: "Housing" },
  { key: "Food", icon: "restaurant", label: "Food" },
  { key: "Transportation", icon: "bus", label: "Travel" },
  { key: "Shopping", icon: "bag-handle", label: "Shop" },
];

export default function AddExpenseScreen() {
  const router = useRouter();
  const { addExpense } = useExpenses();

  const [amountStr, setAmountStr] = useState("0");
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory>("Food");

  const handleKeyPad = (val: string) => {
    if (val === "DEL") {
      setAmountStr(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
    } else if (val === ".") {
      if (!amountStr.includes(".")) setAmountStr(prev => prev + ".");
    } else {
      setAmountStr(prev => (prev === "0" ? val : prev + val));
    }
  };

  const handleSave = () => {
    const num = parseFloat(amountStr);
    if (!num || isNaN(num) || num <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    addExpense({
      amount: num,
      category: selectedCategory,
      note: selectedCategory,
      date: new Date().toISOString(),
    });

    router.dismissTo("/");
  };

  return (
    <View style={styles.container}>
       {/* Header */}
       <View style={styles.header}>
         <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
           <Ionicons name="arrow-back" size={24} color="#0F172A" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>Add Expense</Text>
         <TouchableOpacity style={styles.iconBtn}>
           <Ionicons name="ellipsis-vertical" size={24} color="#0F172A" />
         </TouchableOpacity>
       </View>

       <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
         {/* Amount Area */}
         <View style={styles.amountContainer}>
           <Text style={styles.enterLabel}>ENTER AMOUNT</Text>
           <View style={styles.amountWrap}>
             <Text style={styles.currencySign}>$</Text>
             <Text style={styles.amountValue}>{amountStr}</Text>
           </View>
         </View>

         {/* Category Grid */}
         <View style={styles.sectionBlock}>
           <View style={styles.grid}>
             {categories.map((cat) => {
               const isSelected = selectedCategory === cat.key;
               return (
                 <TouchableOpacity 
                   key={cat.key} 
                   activeOpacity={0.7}
                   style={[styles.catBox, isSelected && styles.catBoxSelected]}
                   onPress={() => setSelectedCategory(cat.key)}
                 >
                   <Ionicons name={cat.icon} size={28} color={isSelected ? "#6366F1" : "#94A3B8"} />
                   <Text style={[styles.catLabel, isSelected && styles.catLabelSelected]}>{cat.label}</Text>
                 </TouchableOpacity>
               );
             })}
           </View>
         </View>

         {/* Date field mock */}
         <View style={styles.dateWrapper}>
           <View style={styles.dateRow}>
             <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
               <View style={styles.dateIconBox}>
                 <Ionicons name="calendar-outline" size={20} color="#6366F1" />
               </View>
               <Text style={styles.dateLabel}>Date</Text>
             </View>
             <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
               <Text style={styles.dateValue}>27/10/2023</Text>
               <Ionicons name="chevron-down" size={20} color="#94A3B8" />
             </View>
           </View>
         </View>
       </ScrollView>

       {/* Custom Keypad */}
       <View style={styles.keypad}>
         {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "DEL"].map((key) => (
           <TouchableOpacity 
             key={key} 
             activeOpacity={0.6}
             style={styles.keyBtn} 
             onPress={() => handleKeyPad(key)}
           >
             <View style={styles.innerKeyBtn}>
               {key === "DEL" ? (
                 <Ionicons name="backspace-outline" size={32} color="#0F172A" />
               ) : (
                 <Text style={styles.keyText}>{key}</Text>
               )}
             </View>
           </TouchableOpacity>
         ))}
       </View>

       {/* Save Button */}
       <View style={styles.footer}>
         <TouchableOpacity activeOpacity={0.8} style={styles.saveBtn} onPress={handleSave}>
           <Text style={styles.saveBtnText}>Save Expense</Text>
         </TouchableOpacity>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#F8FAFC"
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 60, paddingBottom: 15,
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
  },
  headerTitle: {
    fontSize: 20, fontWeight: '800', color: '#0F172A'
  },
  amountContainer: {
    alignItems: 'center', marginTop: 20, marginBottom: 30,
  },
  enterLabel: {
    fontSize: 12, fontWeight: '700', color: '#6366F1', letterSpacing: 1.5, marginBottom: 10
  },
  amountWrap: {
    flexDirection: 'row', alignItems: 'center'
  },
  currencySign: {
    fontSize: 40, fontWeight: '600', color: '#6366F1', marginRight: 8, marginTop: -10
  },
  amountValue: {
    fontSize: 64, fontWeight: '800', color: '#0F172A'
  },
  sectionBlock: {
    paddingHorizontal: 24,
  },
  grid: {
    flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
  },
  catBox: {
    width: '21%', aspectRatio: 0.9, 
    backgroundColor: '#FFFFFF', borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#94A3B8', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
  },
  catBoxSelected: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2, borderColor: '#6366F1',
    shadowOpacity: 0.15, shadowColor: '#6366F1',
  },
  catLabel: {
    fontSize: 12, color: '#94A3B8', fontWeight: '700', marginTop: 10
  },
  catLabelSelected: {
    color: '#6366F1'
  },
  dateWrapper: {
    paddingHorizontal: 24, marginTop: 30,
  },
  dateRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#FFFFFF', padding: 16, borderRadius: 20,
    shadowColor: '#94A3B8', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
  },
  dateIconBox: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: '#EEF2FF',
    justifyContent: 'center', alignItems: 'center'
  },
  dateLabel: {
    fontSize: 16, color: '#0F172A', fontWeight: '600'
  },
  dateValue: {
    fontSize: 16, color: '#0F172A', fontWeight: '700'
  },
  keypad: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  keyBtn: {
    width: '33.33%', height: 66,
    justifyContent: 'center', alignItems: 'center',
  },
  innerKeyBtn: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 2 },
  },
  keyText: {
    fontSize: 26, fontWeight: '700', color: '#0F172A'
  },
  footer: {
    paddingHorizontal: 24, paddingBottom: 20, paddingTop: 10,
  },
  saveBtn: {
    backgroundColor: '#6366F1', borderRadius: 24, height: 64,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#6366F1', shadowOpacity: 0.4, shadowRadius: 15, shadowOffset: { width: 0, height: 8 },
  },
  saveBtnText: {
    color: '#FFFFFF', fontSize: 18, fontWeight: '800', letterSpacing: 0.5
  }
});
