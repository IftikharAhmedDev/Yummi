import { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/theme/colors';
import { useAppStore } from '@/stores/useAppStore';

const { width } = Dimensions.get('window');

const MODES = [
  { id: 'target', name: 'TARGET', desc: 'Stop as close to the target as possible', icon: '🎯', color: Colors.neonCyan },
  { id: 'reaction', name: 'REACTION', desc: 'React to the signal as fast as you can', icon: '⚡', color: Colors.neonPink },
  { id: 'precision', name: 'PRECISION', desc: 'Stop inside the precision window', icon: '💎', color: Colors.neonPurple },
  { id: 'blind_target', name: 'BLIND', desc: 'Target mode with hidden timer', icon: '👁️', color: Colors.neonOrange },
];

const MATCH_TYPES = ['Practice', '1v1', '2v2', '3v3', '4v4'];

export default function HomeScreen() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const [selectedMode, setSelectedMode] = useState('target');
  const [selectedMatch, setSelectedMatch] = useState('1v1');

  const stats = [
    { label: 'Win Rate', value: `${user.winRate}%`, color: Colors.neonGreen },
    { label: 'Best Reaction', value: `${user.bestReaction}ms`, color: Colors.neonCyan },
    { label: 'Avg Accuracy', value: `${user.avgAccuracy}ms`, color: Colors.neonPurple },
    { label: 'W/L', value: `${user.wins}/${user.losses}`, color: Colors.neonBlue },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
          <Text style={styles.displayName}>{user.displayName}</Text>
        </View>
        <TouchableOpacity style={styles.eloCard}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{user.level}</Text>
          </View>
          <View>
            <Text style={styles.eloLabel}>ELO RATING</Text>
            <Text style={styles.eloValue}>{user.eloRating}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
          </View>
        ))}
      </View>

      {/* Mode Selection */}
      <Text style={styles.sectionTitle}>SELECT MODE</Text>
      <View style={styles.modesGrid}>
        {MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.modeCard,
              selectedMode === mode.id && { borderColor: mode.color, backgroundColor: `${mode.color}08` },
            ]}
            onPress={() => setSelectedMode(mode.id)}
          >
            <Text style={styles.modeIcon}>{mode.icon}</Text>
            <View style={styles.modeInfo}>
              <Text style={[styles.modeName, selectedMode === mode.id && { color: mode.color }]}>
                {mode.name}
              </Text>
              <Text style={styles.modeDesc} numberOfLines={2}>{mode.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Match Type */}
      <Text style={styles.sectionTitle}>MATCH TYPE</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.matchRow}>
        {MATCH_TYPES.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.matchPill, selectedMatch === type && styles.matchPillActive]}
            onPress={() => setSelectedMatch(type)}
          >
            <Text style={[styles.matchPillText, selectedMatch === type && styles.matchPillTextActive]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionGreen]}
          onPress={() => router.push('/queue')}
        >
          <Text style={styles.actionBtnText}>⚡ Find Match</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionCyan]}
          onPress={() => router.push('/room')}
        >
          <Text style={styles.actionBtnText}>🏠 Create Room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, styles.actionPurple]}
          onPress={() => router.push('/game')}
        >
          <Text style={styles.actionBtnText}>🎯 Practice</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgDeep },
  content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 120 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  welcomeLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 2, color: Colors.textSecondary, marginBottom: 4 },
  displayName: {
    fontSize: 24, fontWeight: '800', color: Colors.neonCyan,
    textShadowColor: 'rgba(0,245,255,0.3)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10,
  },
  eloCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.glassBackground, borderRadius: 14,
    borderWidth: 1, borderColor: Colors.glassBorder, paddingHorizontal: 14, paddingVertical: 10,
  },
  levelBadge: {
    width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(0,245,255,0.1)', borderWidth: 1, borderColor: 'rgba(0,245,255,0.2)',
  },
  levelText: { fontSize: 16, fontWeight: '800', color: Colors.neonCyan },
  eloLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1, color: Colors.textMuted },
  eloValue: {
    fontSize: 18, fontWeight: '700', color: Colors.neonYellow,
    textShadowColor: 'rgba(255,215,0,0.3)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8,
  },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  statCard: {
    flex: 1, minWidth: (width - 60) / 2,
    backgroundColor: Colors.glassBackground, borderRadius: 14,
    borderWidth: 1, borderColor: Colors.glassBorder, padding: 14,
  },
  statLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1, color: Colors.textMuted, textTransform: 'uppercase', marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '700' },

  sectionTitle: {
    fontSize: 13, fontWeight: '700', letterSpacing: 2, color: Colors.textSecondary,
    marginBottom: 12, textTransform: 'uppercase',
  },

  modesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  modeCard: {
    width: (width - 50) / 2,
    backgroundColor: Colors.glassBackground, borderRadius: 16,
    borderWidth: 1, borderColor: Colors.glassBorder, padding: 16,
  },
  modeIcon: { fontSize: 28, marginBottom: 8 },
  modeInfo: {},
  modeName: { fontSize: 13, fontWeight: '700', letterSpacing: 1.5, color: Colors.textPrimary, marginBottom: 4 },
  modeDesc: { fontSize: 11, color: Colors.textMuted, lineHeight: 16 },

  matchRow: { marginBottom: 28 },
  matchPill: {
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100,
    borderWidth: 1, borderColor: Colors.glassBorder, backgroundColor: Colors.glassBackground, marginRight: 10,
  },
  matchPillActive: { borderColor: Colors.neonCyan, backgroundColor: 'rgba(0,245,255,0.08)' },
  matchPillText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  matchPillTextActive: { color: Colors.neonCyan },

  actions: { gap: 12 },
  actionBtn: {
    paddingVertical: 16, borderRadius: 14, alignItems: 'center', borderWidth: 1,
  },
  actionGreen: { borderColor: 'rgba(0,255,133,0.3)', backgroundColor: 'rgba(0,255,133,0.08)' },
  actionCyan: { borderColor: 'rgba(0,245,255,0.3)', backgroundColor: 'rgba(0,245,255,0.08)' },
  actionPurple: { borderColor: 'rgba(168,85,247,0.3)', backgroundColor: 'rgba(168,85,247,0.08)' },
  actionBtnText: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, letterSpacing: 0.5 },
});
