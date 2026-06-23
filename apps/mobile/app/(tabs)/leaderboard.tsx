import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '@/theme/colors';
import { useAppStore } from '@/stores/useAppStore';

const { width } = Dimensions.get('window');

const MOCK_RANKINGS = [
  { rank: 1, name: 'ProTimer', elo: 2450, winRate: 89.2, medal: '🥇' },
  { rank: 2, name: 'ReflexKing', elo: 2380, winRate: 85.7, medal: '🥈' },
  { rank: 3, name: 'PrecisionX', elo: 2310, winRate: 82.1, medal: '🥉' },
  { rank: 4, name: 'CyberFox', elo: 2180, winRate: 78.4, medal: '' },
  { rank: 5, name: 'VoidRunner', elo: 2050, winRate: 75.9, medal: '' },
  { rank: 6, name: 'TimeMaster', elo: 1990, winRate: 73.2, medal: '' },
  { rank: 7, name: 'NeonBlade', elo: 1870, winRate: 71.5, medal: '' },
  { rank: 8, name: 'QuantumFlux', elo: 1810, winRate: 69.8, medal: '' },
  { rank: 9, name: 'PixelDrift', elo: 1720, winRate: 67.3, medal: '' },
  { rank: 10, name: 'StormPulse', elo: 1650, winRate: 64.1, medal: '' },
];

const TABS = ['Global', 'Region', 'Friends'];

export default function LeaderboardScreen() {
  const user = useAppStore((s) => s.user);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Leaderboard</Text>
      <Text style={styles.subtitle}>Season 4 — Global Rankings</Text>

      {/* Tab pills */}
      <View style={styles.tabRow}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} style={[styles.tab, i === 0 && styles.tabActive]}>
            <Text style={[styles.tabText, i === 0 && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Your rank card */}
      <View style={styles.yourRank}>
        <View style={styles.yourRankLeft}>
          <Text style={styles.yourRankPos}>#42</Text>
          <View>
            <Text style={styles.yourRankName}>{user.displayName}</Text>
            <Text style={styles.yourRankSub}>Your Position</Text>
          </View>
        </View>
        <Text style={styles.yourRankElo}>{user.eloRating}</Text>
      </View>

      {/* Rankings list */}
      {MOCK_RANKINGS.map((entry) => (
        <View key={entry.rank} style={[styles.rankRow, entry.rank <= 3 && styles.rankRowTop]}>
          <View style={styles.rankLeft}>
            <View style={[styles.rankBadge, entry.rank <= 3 && styles.rankBadgeTop]}>
              <Text style={styles.rankNum}>{entry.medal || `#${entry.rank}`}</Text>
            </View>
            <View>
              <Text style={styles.rankName}>{entry.name}</Text>
              <Text style={styles.rankWr}>{entry.winRate}% WR</Text>
            </View>
          </View>
          <Text style={[styles.rankElo, entry.rank === 1 && { color: Colors.neonYellow }]}>
            {entry.elo}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDeep },
  content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 120 },

  title: { fontSize: 28, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 13, color: Colors.textSecondary, letterSpacing: 1, marginBottom: 20 },

  tabRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  tab: {
    paddingHorizontal: 18, paddingVertical: 9, borderRadius: 100,
    borderWidth: 1, borderColor: Colors.glassBorder, backgroundColor: Colors.glassBackground,
  },
  tabActive: { borderColor: Colors.neonCyan, backgroundColor: 'rgba(0,245,255,0.08)' },
  tabText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  tabTextActive: { color: Colors.neonCyan },

  yourRank: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(0,245,255,0.06)', borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(0,245,255,0.15)', padding: 16, marginBottom: 20,
  },
  yourRankLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  yourRankPos: { fontSize: 22, fontWeight: '800', color: Colors.neonCyan },
  yourRankName: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  yourRankSub: { fontSize: 11, color: Colors.textMuted, letterSpacing: 0.5 },
  yourRankElo: { fontSize: 20, fontWeight: '800', color: Colors.neonYellow },

  rankRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.glassBackground, borderRadius: 14,
    borderWidth: 1, borderColor: Colors.glassBorder, padding: 14, marginBottom: 8,
  },
  rankRowTop: { borderColor: 'rgba(255,215,0,0.15)', backgroundColor: 'rgba(255,215,0,0.03)' },
  rankLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rankBadge: {
    width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  rankBadgeTop: { backgroundColor: 'rgba(255,215,0,0.08)' },
  rankNum: { fontSize: 16, fontWeight: '700', color: Colors.textSecondary },
  rankName: { fontSize: 15, fontWeight: '600', color: Colors.textPrimary },
  rankWr: { fontSize: 11, color: Colors.textMuted },
  rankElo: { fontSize: 17, fontWeight: '700', color: Colors.neonCyan },
});
