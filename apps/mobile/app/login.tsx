import { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/theme/colors';
import { useAppStore } from '@/stores/useAppStore';
import { LinearGradient } from 'expo-linking';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);
  const [method, setMethod] = useState<'select' | 'email' | 'otp'>('select');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = useCallback((name?: string) => {
    login(name);
    router.replace('/home');
  }, [login, router]);

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Background glow */}
        <View style={styles.bgGlow} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>⏱️</Text>
          <Text style={styles.logoTitle}>YUMMI</Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          {method === 'select' && (
            <>
              <Text style={styles.heading}>Welcome, Commander</Text>
              <Text style={styles.subtitle}>Choose how you want to enter the arena</Text>

              {/* Google Login */}
              <TouchableOpacity style={[styles.button, styles.buttonCyan]} onPress={() => handleLogin()}>
                <Text style={styles.buttonIcon}>G</Text>
                <Text style={[styles.buttonText, { color: Colors.neonCyan }]}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Email Login */}
              <TouchableOpacity style={[styles.button, styles.buttonPurple]} onPress={() => setMethod('email')}>
                <Text style={styles.buttonIcon}>✉</Text>
                <Text style={[styles.buttonText, { color: Colors.neonPurple }]}>Sign in with Email</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Guest Login */}
              <TouchableOpacity style={[styles.button, styles.buttonGhost]} onPress={() => handleLogin('Guest Player')}>
                <Text style={[styles.buttonText, { color: Colors.textSecondary }]}>Play as Guest</Text>
              </TouchableOpacity>

              <Text style={styles.disclaimer}>
                Guest accounts are temporary. Link an account to save your progress.
              </Text>
            </>
          )}

          {method === 'email' && (
            <>
              <TouchableOpacity onPress={() => setMethod('select')} style={styles.backBtn}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.heading}>Enter your email</Text>
              <Text style={styles.subtitle}>We'll send you a one-time verification code</Text>
              <TextInput
                style={styles.input}
                placeholder="commander@example.com"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonCyan, !email.includes('@') && styles.buttonDisabled]}
                onPress={() => setMethod('otp')}
                disabled={!email.includes('@')}
              >
                <Text style={[styles.buttonText, { color: Colors.neonCyan }]}>Send Code</Text>
              </TouchableOpacity>
            </>
          )}

          {method === 'otp' && (
            <>
              <TouchableOpacity onPress={() => setMethod('email')} style={styles.backBtn}>
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.heading}>Enter verification code</Text>
              <Text style={styles.subtitle}>Sent to {email}</Text>
              <View style={styles.otpRow}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <TextInput
                    key={i}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={otp[i] || ''}
                    onChangeText={(val) => {
                      const cleaned = val.replace(/\D/g, '');
                      const newOtp = otp.substring(0, i) + cleaned + otp.substring(i + 1);
                      setOtp(newOtp);
                    }}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonGreen, otp.length < 6 && styles.buttonDisabled]}
                onPress={() => handleLogin()}
                disabled={otp.length < 6}
              >
                <Text style={[styles.buttonText, { color: Colors.neonGreen }]}>Verify & Enter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resendBtn}>
                <Text style={styles.resendText}>Resend code</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.bgDeep },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  bgGlow: {
    position: 'absolute',
    top: '15%',
    width: width * 1.4,
    height: width * 1.4,
    borderRadius: width * 0.7,
    backgroundColor: 'rgba(0,245,255,0.03)',
  },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logoEmoji: { fontSize: 72, marginBottom: 8 },
  logoTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 6,
    color: Colors.neonCyan,
    textShadowColor: 'rgba(0,245,255,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: Colors.bgCardElevated,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: 28,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  buttonCyan: {
    borderColor: 'rgba(0,245,255,0.25)',
    backgroundColor: 'rgba(0,245,255,0.06)',
  },
  buttonPurple: {
    borderColor: 'rgba(168,85,247,0.25)',
    backgroundColor: 'rgba(168,85,247,0.06)',
  },
  buttonGreen: {
    borderColor: 'rgba(0,255,133,0.25)',
    backgroundColor: 'rgba(0,255,133,0.06)',
  },
  buttonGhost: {
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'transparent',
  },
  buttonDisabled: { opacity: 0.4 },
  buttonIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 8,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  dividerText: { fontSize: 12, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 2 },
  disclaimer: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 18,
  },
  backBtn: { marginBottom: 16 },
  backText: { fontSize: 14, color: Colors.textSecondary },
  input: {
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    backgroundColor: Colors.glassBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },
  otpInput: {
    width: 46,
    height: 54,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    backgroundColor: Colors.glassBackground,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  resendBtn: { alignItems: 'center', marginTop: 8 },
  resendText: { fontSize: 14, color: Colors.neonCyan },
});
