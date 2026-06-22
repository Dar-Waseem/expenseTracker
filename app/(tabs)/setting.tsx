import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [faceId, setFaceId] = React.useState(false);

  const settingGroups = [
    {
      title: "Account",
      items: [
        { icon: "person-outline", label: "Profile Settings", color: "#6366F1" },
        { icon: "wallet-outline", label: "Currency & Region", color: "#10B981", value: "USD ($)" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: "notifications-outline", label: "Push Notifications", color: "#F59E0B", isToggle: true, state: notifications, setState: setNotifications },
        { icon: "moon-outline", label: "Dark Mode", color: "#64748B", value: "Off" },
        { icon: "lock-closed-outline", label: "Face ID / Touch ID", color: "#EC4899", isToggle: true, state: faceId, setState: setFaceId },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: "help-circle-outline", label: "Help & FAQ", color: "#0EA5E9" },
        { icon: "document-text-outline", label: "Terms of Service", color: "#94A3B8" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
             <Text style={styles.avatarText}>W</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Wasim</Text>
            <Text style={styles.profileEmail}>wasim@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Setting Groups */}
        {settingGroups.map((group, gIdx) => (
          <View key={gIdx} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.cardBlock}>
              {group.items.map((item, iIdx) => (
                <View key={iIdx}>
                  <TouchableOpacity 
                    activeOpacity={item.isToggle ? 1 : 0.7} 
                    style={styles.settingRow}
                    // Disable standard click visual if it's a switch toggle row
                    onPress={() => item.isToggle && item.setState && item.setState(!item.state)}
                  >
                    <View style={styles.settingLeft}>
                      <View style={[styles.iconBox, { backgroundColor: item.color + '1A' }]}>
                        <Ionicons name={item.icon as any} size={20} color={item.color} />
                      </View>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    
                    <View style={styles.settingRight}>
                      {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                      {item.isToggle ? (
                        <Switch 
                          value={item.state} 
                          onValueChange={item.setState}
                          trackColor={{ false: '#E2E8F0', true: '#6366F1' }}
                          thumbColor={'#FFFFFF'}
                        />
                      ) : (
                        <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
                      )}
                    </View>
                  </TouchableOpacity>
                  {iIdx !== group.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity activeOpacity={0.8} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

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
    paddingHorizontal: 24, paddingTop: 60, paddingBottom: 25,
  },
  logo: {
    color: "#0F172A", fontSize: 28, fontWeight: "800", letterSpacing: 0.5
  },
  scrollContent: {
    paddingHorizontal: 24, paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20,
    shadowColor: '#94A3B8', shadowOpacity: 0.08, shadowRadius: 15, shadowOffset: { width: 0, height: 6 },
    elevation: 3, marginBottom: 30,
  },
  avatarPlaceholder: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#E0E7FF',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  avatarText: {
    fontWeight: '800', color: '#6366F1', fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 4
  },
  profileEmail: {
    fontSize: 13, color: '#64748B', fontWeight: '500'
  },
  editBtn: {
    backgroundColor: '#EEF2FF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16,
  },
  editBtnText: {
    color: '#6366F1', fontWeight: '700', fontSize: 13
  },
  groupContainer: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 14, fontWeight: '700', color: '#94A3B8', letterSpacing: 1, marginLeft: 10, marginBottom: 12, textTransform: 'uppercase'
  },
  cardBlock: {
    backgroundColor: '#FFFFFF', borderRadius: 24, overflow: 'hidden',
    shadowColor: '#94A3B8', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    elevation: 2, paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  iconBox: {
    width: 38, height: 38, borderRadius: 12, justifyContent: 'center', alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16, fontWeight: '600', color: '#0F172A'
  },
  settingRight: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  settingValue: {
    fontSize: 14, color: '#94A3B8', fontWeight: '500'
  },
  divider: {
    height: 1, backgroundColor: '#F1F5F9', marginLeft: 52,
  },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#FEF2F2', borderRadius: 20, paddingVertical: 18, marginTop: 10,
  },
  logoutText: {
    color: '#EF4444', fontSize: 16, fontWeight: '700'
  }
});
