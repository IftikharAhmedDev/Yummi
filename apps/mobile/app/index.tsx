import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/theme/colors';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState(0);
  const logoScale = new Animated.Value(0.5);
  const logoOpacity = new Animated.Value(0);
  const taglineOpacity = new Animated.Value(0);
  const barWidth = new Animated.Value(0);

  useEffect(() => {
    // Phase 1: Logo
    setTimeout(() => {
      setPhase(1);
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, friction: 6, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ]).start();
    }, 300);

    // Phase 2: Tagline
    setTimeout(() => {
      setPhase(2);
      Animated.timing(taglineOpacity, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    }, 1000);

    // Phase 3: Loading bar + navigate
    setTimeout(() => {
      setPhase(3);
      Animated.timing(barWidth, { toValue: 1, duration: 1200, useNativeDriver: false }).start();
    }, 1500);

    // Navigate to login
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background glow */}
      <View style={styles.glow} />

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Text style={styles.logoEmoji}>⏱️</Text>
        <Text style={styles.logoText}>YUMMI</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        PRECISION IS EVERYTHING
      </Animated.Text>

      {/* Loading bar */}
      {phase >= 3 && (
        <View style={styles.loadingBarContainer}>
          <Animated.View
            style={[
              styles.loadingBar,
              { width: barWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: 'rgba(0,245,255,0.04)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 12,
  },
  logoText: {
    fontFamily: 'System',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 8,
    color: Colors.neonCyan,
    textShadowColor: 'rgba(0,245,255,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 4,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  loadingBarContainer: {
    marginTop: 48,
    width: 180,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  loadingBar: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: Colors.neonCyan,
  },
});
