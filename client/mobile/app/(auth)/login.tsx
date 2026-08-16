import BackButton from "@/components/BackButton";
import Input from "@/components/Input";
import Lable from "@/components/Label";
import OTPInput from "@/components/OTPInput";
import color from "@/styles/color";
import { scrollToTop } from "@/util/lib";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const scrollRef = useRef<ScrollView>(null);
  const isPhoneValid = phone.replace(/\D/g, "").length >= 9;
  const isOtpValid = otp.length >= 5;

  function handleContinue() {
    if (step === 1) {
      if (!isPhoneValid) {
        alert("Introduz um número de telefone válido.");
        return;
      }

      setStep(2);

      scrollToTop(scrollRef);
      return;
    }

    if (!isOtpValid) {
      alert("Introduz o código de verificação.");
      return;
    }

    router.replace("/(passenger)");
  }

  function handleBack() {
    if (step === 2) {
      setStep(1);
      setOtp("");
      return;
    }

    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor={color.root.secondary}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= HEADER ================= */}

        <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.stepIndicator}>
            <View style={[styles.step, step >= 1 && styles.stepActive]} />

            <View style={[styles.step, step >= 2 && styles.stepActive]} />
          </View>

          <View style={styles.headerSpacer} />
        </Animated.View>

        {/* ================= HERO ================= */}

        <Animated.View
          key={step}
          entering={ZoomIn.duration(650)}
          style={styles.hero}
        >
          <Animated.Image
            key={`icon-${step}`}
            entering={
              step === 1
                ? SlideInRight.duration(500)
                : SlideInLeft.duration(500)
            }
            source={require("../../assets/images/Location.png")}
            style={styles.heroImage}
          />

          <Animated.View
            entering={FadeInDown.duration(600).delay(250)}
            style={styles.heroBadge}
          >
            <View style={styles.badgeDot} />

            <Text style={styles.badgeText}>
              {step === 1 ? "Login seguro" : "Verificação segura"}
            </Text>
          </Animated.View>
        </Animated.View>

        <Animated.View
          key={`content-${step}`}
          entering={
            step === 1 ? SlideInRight.duration(500) : SlideInLeft.duration(500)
          }
          style={styles.content}
        >
          {step === 1 ? (
            <>
              <Text style={styles.title}>Acessar minha conta</Text>

              <Text style={styles.subtitle}>
                Introduz o teu número de telefone para continuar. Vamos enviar
                um código de verificação.
              </Text>

              <View style={styles.form}>
                <Lable title="Número de telefone" />

                <Input
                  placeholder="+244 9xx xxx xxx"
                  value={phone}
                  onChange={setPhone}
                  keyboardType="phone-pad"
                />

                <Text style={styles.helper}>
                  O número será usado apenas para autenticar a tua conta.
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>Código de verificação</Text>

              <Text style={styles.subtitle}>
                Enviámos um código de verificação para o número:
              </Text>

              <Animated.View
                entering={FadeInDown.duration(450).delay(100)}
                style={styles.phoneCard}
              >
                <View style={styles.phoneIconContainer}>
                  <Image
                    source={require("../../assets/images/email.png")}
                    style={styles.phoneIcon}
                  />
                </View>

                <View style={styles.phoneInfo}>
                  <Text style={styles.phoneLabel}>Número de telefone</Text>

                  <Text style={styles.phoneNumber}>+244 {phone}</Text>
                </View>

                <Pressable
                  onPress={() => {
                    setStep(1);
                    setOtp("");
                  }}
                >
                  <Text style={styles.changeText}>Alterar</Text>
                </Pressable>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.duration(500).delay(150)}
                style={styles.otpContainer}
              >
                <OTPInput
                  processing={otp.length >= 5}
                  value={otp}
                  onChange={setOtp}
                />
              </Animated.View>

              <Animated.Text
                entering={FadeIn.duration(500).delay(350)}
                style={styles.resendText}
              >
                Não recebeste o código?{" "}
                <Text style={styles.resendLink}>Reenviar</Text>
              </Animated.Text>
            </>
          )}
        </Animated.View>

        {/* ================= ACTION ================= */}

        <Animated.View
          entering={FadeInUp.duration(600).delay(250)}
          style={styles.actions}
        >
          <AnimatedPressable
            onPress={handleContinue}
            style={[
              styles.continueButton,
              step === 2 && !isOtpValid && styles.continueDisabled,
            ]}
          >
            <Text style={styles.continueText}>
              {step === 1 ? "Continuar" : "Confirmar código"}
            </Text>

            <View style={styles.buttonArrow}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </AnimatedPressable>

          <Pressable onPress={handleBack} style={styles.secondaryAction}>
            <Text style={styles.secondaryActionText}>
              {step === 2 ? "Voltar" : "Ainda não tenho uma conta"}
            </Text>
          </Pressable>
        </Animated.View>

        {/* ================= FOOTER ================= */}

        <Animated.View
          entering={FadeIn.duration(700).delay(500)}
          style={styles.footer}
        >
          <View style={styles.securityIcon}>
            <Text>✓</Text>
          </View>

          <Text style={styles.footerText}>Autenticação segura e protegida</Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 40,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  /* ================= HEADER ================= */

  header: {
    height: 64,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 30,
    lineHeight: 32,
    color: "#222",
    marginTop: -4,
  },

  headerSpacer: {
    width: 42,
  },

  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  step: {
    width: 25,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#E7E7E7",
  },

  stepActive: {
    width: 38,
    backgroundColor: color.root.secondary,
  },

  /* ================= HERO ================= */

  hero: {
    height: 270,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },

  ellipse: {
    position: "absolute",
    width: "100%",
    height: 285,
    resizeMode: "cover",
    top: -5,
  },

  heroImage: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    zIndex: 5,
  },

  heroBadge: {
    position: "absolute",
    bottom: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#e8e6e6",
    zIndex: 10,
  },

  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#2ECC71",
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#555",
  },

  /* ================= CONTENT ================= */

  content: {
    paddingHorizontal: 24,
    marginTop: 5,
  },

  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    color: color.root.textTint,
    textAlign: "center",
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 11,
    fontSize: 14,
    lineHeight: 21,
    color: "#888",
    textAlign: "center",
    paddingHorizontal: 8,
  },

  form: {
    marginTop: 28,
    gap: 7,
  },

  helper: {
    fontSize: 10,
    lineHeight: 15,
    color: "#A0A0A0",
  },

  /* ================= PHONE ================= */

  phoneCard: {
    marginTop: 25,
    minHeight: 68,
    borderRadius: 17,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  phoneIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  phoneIcon: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },

  phoneInfo: {
    flex: 1,
  },

  phoneLabel: {
    fontSize: 10,
    color: "#999",
    marginBottom: 2,
  },

  phoneNumber: {
    fontSize: 15,
    fontWeight: "800",
    color: color.root.textTint,
  },

  changeText: {
    fontSize: 12,
    fontWeight: "800",
    color: color.root.secondary,
    paddingHorizontal: 5,
  },

  /* ================= OTP ================= */

  otpContainer: {
    marginTop: 28,
    alignItems: "center",
  },

  resendText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#999",
  },

  resendLink: {
    color: color.root.secondary,
    fontWeight: "800",
  },

  /* ================= ACTION ================= */

  actions: {
    marginTop: 30,
    paddingHorizontal: 24,
    gap: 7,
  },

  continueButton: {
    height: 58,
    borderRadius: 30,
    backgroundColor: color.root.secondary,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },

  continueDisabled: {
    opacity: 0.5,
  },

  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  buttonArrow: {
    position: "absolute",
    right: 7,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 21,
  },

  secondaryAction: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryActionText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#777",
  },

  /* ================= FOOTER ================= */

  footer: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  securityIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EAF8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    fontSize: 10,
    color: "#999",
    fontWeight: "600",
  },
});
