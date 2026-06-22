import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useExpenses } from "../../hooks/ExpensesContext";

export default function AnalyticsScreen() {
  const router = useRouter();

  const { totalSpent, getCategoryTotal, categoryLimits } = useExpenses();

  const totalBudget = Object.values(categoryLimits || {}).reduce(
    (sum, value) => sum + value,
    0
  );

  const remaining = Math.max(0, totalBudget - totalSpent);

  const budgetUsed =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const progressColor =
    budgetUsed >= 100
      ? "#EF4444"
      : budgetUsed > 80
      ? "#F59E0B"
      : "#10B981";

  const categories = [
    {
      key: "Housing",
      icon: "home",
      label: "Housing",
      color: "#6366F1",
      bg: "#EEF2FF",
    },
    {
      key: "Food",
      icon: "restaurant",
      label: "Food & Dining",
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      key: "Transportation",
      icon: "bus",
      label: "Transportation",
      color: "#F59E0B",
      bg: "#FFFBEB",
    },
    {
      key: "Shopping",
      icon: "bag-handle",
      label: "Shopping",
      color: "#EC4899",
      bg: "#FDF2F8",
    },
  ] as const;

  return (
    <View style={styles.mainWrapper}>
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>W</Text>
          </View>

          <View>
            <Text style={styles.greeting}>
              Good Morning 👋
            </Text>

            <Text style={styles.userName}>
              Welcome Back
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#0F172A"
          />

          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Controls */}

        <View style={styles.controlsRow}>
          <View style={styles.monthSelector}>
            <TouchableOpacity>
              <Ionicons
                name="chevron-back"
                size={18}
                color="#0F172A"
              />
            </TouchableOpacity>

            <Text style={styles.monthText}>
              October 2023
            </Text>

            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#0F172A"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons
              name="options-outline"
              size={18}
              color="#0F172A"
            />
            <Text style={styles.filterText}>
              Filter
            </Text>
          </TouchableOpacity>
        </View>

        {/* Overview */}

        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>
            Monthly Overview
          </Text>

          <AnimatedCircularProgress
            size={220}
            width={18}
            fill={Math.min(budgetUsed, 100)}
            tintColor={progressColor}
            backgroundColor="#E2E8F0"
            rotation={-90}
            lineCap="round"
          >
            {() => (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.chartLabel}>
                  TOTAL SPENT
                </Text>

                <Text style={styles.chartAmount}>
                  ${totalSpent.toLocaleString()}
                </Text>

                <Text style={styles.chartSub}>
                  {budgetUsed.toFixed(0)}% of budget
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>

          <View style={styles.trendRow}>
            <Ionicons
              name="trending-up"
              size={18}
              color="#10B981"
            />

            <Text style={styles.trendText}>
              Spending under control
            </Text>
          </View>
        </View>

        {/* Stats */}

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              ${totalBudget.toLocaleString()}
            </Text>

            <Text style={styles.statLabel}>
              Budget
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              ${remaining.toLocaleString()}
            </Text>

            <Text style={styles.statLabel}>
              Left
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {budgetUsed.toFixed(0)}%
            </Text>

            <Text style={styles.statLabel}>
              Used
            </Text>
          </View>
        </View>

        {/* Categories */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Top Categories
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push(
                "/screens/PersonalExpensesScreen"
              )
            }
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {categories
          .sort(
            (a, b) =>
              getCategoryTotal(b.key) -
              getCategoryTotal(a.key)
          )
          .slice(0, 4)
          .map((cat) => {
            const spent = getCategoryTotal(cat.key);

            const limit =
              categoryLimits[cat.key] || 0;

            const pct =
              limit > 0
                ? Math.min(
                    100,
                    (spent / limit) * 100
                  )
                : 0;

            return (
              <View
                key={cat.key}
                style={styles.categoryCard}
              >
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: cat.bg,
                    },
                  ]}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={22}
                    color={cat.color}
                  />
                </View>

                <View style={styles.catDetails}>
                  <View style={styles.catRow}>
                    <Text
                      style={styles.categoryName}
                    >
                      {cat.label}
                    </Text>

                    <View
                      style={
                        styles.percentBadge
                      }
                    >
                      <Text
                        style={
                          styles.percentBadgeText
                        }
                      >
                        {pct.toFixed(0)}%
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.amount}>
                    ${spent.toLocaleString()}
                  </Text>

                  <View
                    style={styles.progressBg}
                  >
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${pct}%`,
                          backgroundColor:
                            pct >= 100
                              ? "#EF4444"
                              : cat.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            );
          })}

        {/* Insight */}

        <View style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <Text style={styles.insightTitle}>
              Smart Insight
            </Text>

            <Ionicons
              name="bulb"
              size={22}
              color="#FBBF24"
            />
          </View>

          <Text style={styles.insightText}>
            Dining expenses are trending
            lower than last month.
          </Text>

          <Text style={styles.savingsText}>
            Potential monthly savings:
            {"\n"}+$240
          </Text>

          <TouchableOpacity
            style={styles.insightButton}
          >
            <Text
              style={
                styles.insightButtonText
              }
            >
              View Details
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB */}

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.9}
        onPress={() => router.push("/modal")}
      >
        <Ionicons
          name="add"
          size={34}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6366F1",
  },

  greeting: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },

  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 2,
  },

  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  notificationDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },

  monthText: {
    fontWeight: "700",
    color: "#0F172A",
  },

  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  filterText: {
    marginLeft: 6,
    fontWeight: "700",
  },

  overviewCard: {
    backgroundColor: "#FFF",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
  },

  overviewTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 20,
    color: "#0F172A",
  },

  chartLabel: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "700",
  },

  chartAmount: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 4,
  },

  chartSub: {
    marginTop: 6,
    color: "#64748B",
    fontWeight: "600",
  },

  trendRow: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },

  trendText: {
    marginLeft: 6,
    color: "#10B981",
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
  },

  statValue: {
    fontWeight: "800",
    fontSize: 18,
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 4,
    color: "#64748B",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  viewAll: {
    color: "#6366F1",
    fontWeight: "700",
  },

  categoryCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    alignItems: "center",
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  catDetails: {
    flex: 1,
  },

  catRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  categoryName: {
    fontWeight: "700",
    color: "#0F172A",
    fontSize: 16,
  },

  amount: {
    marginTop: 6,
    fontWeight: "800",
    color: "#0F172A",
  },

  percentBadge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  percentBadgeText: {
    color: "#6366F1",
    fontWeight: "700",
    fontSize: 12,
  },

  progressBg: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: 8,
    borderRadius: 999,
  },

  insightCard: {
    marginTop: 20,
    backgroundColor: "#1E1B4B",
    borderRadius: 28,
    padding: 24,
  },

  insightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  insightTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
  },

  insightText: {
    color: "#E0E7FF",
    lineHeight: 22,
  },

  savingsText: {
    color: "#A5F3FC",
    marginTop: 16,
    fontWeight: "800",
    fontSize: 16,
  },

  insightButton: {
    backgroundColor: "#4338CA",
    marginTop: 18,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  insightButtonText: {
    color: "#FFF",
    fontWeight: "700",
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
});