import Button from "@/components/Button";
import DatePickerInput from "@/components/DatePickerInput";
import Input from "@/components/Input";
import OTPInput from "@/components/OTPInput";
import OTPKeyboard from "@/components/OTPKeyboard";
import Timer from "@/components/Timer";
import color from "@/styles/color";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export default function Register() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    gender: Gender.MALE,
    birthDate: new Date(),
  });
  const translateY = useSharedValue(-200);
  const scrollRef = useRef<ScrollView>(null);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const router = useRouter();
  function updateField(key: keyof typeof form, value: string) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  function nextStep() {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    if (!form.fullName || !form.phone || !form.birthDate) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    const code = "123456";

    setGeneratedOtp(code);

    console.log("OTP enviado:", code);

    setStep(2);
  }

  function back() {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    if (step > 1) {
      setStep(1);
      return;
    }
    router.back();
  }

  function verifyOtp() {
    if (otp === generatedOtp) {
      Alert.alert("Sucesso", "Conta criada!");
    } else {
      Alert.alert("Erro", "Código inválido");
    }
  }

  useEffect(() => {
    translateY.value = withTiming(0, {
      duration: 800,
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
    >
      <StatusBar animated barStyle={"light-content"} translucent />
      <ScrollView
        ref={scrollRef}
        style={{
          flex: 1,
          gap: 20,
        }}
      >
        {step == 1 ? (
          <View
            style={{
              position: "relative",
              alignItems: "center",
            }}
          >
            <Animated.Image
              style={[
                {
                  zIndex: 2,
                  marginTop: 60,
                  height: 446,
                  width: 213.92,
                  resizeMode: "contain",
                },
                animatedStyle,
              ]}
              source={require("../../assets/images/car.png")}
            />
            <Image
              style={{
                objectFit: "contain",
                top: 0,
                position: "absolute",
              }}
              source={require("../../assets/images/Ellipse 1.png")}
            />
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: color.root.secondary,
              height: 250,
              width: 250,
              borderRadius: 9999,
              alignSelf: "center",
              marginTop: 70,
            }}
          >
            <Animated.Image
              source={require("../../assets/images/email.png")}
              style={[
                {
                  width: 120,
                  height: 120,
                  resizeMode: "contain",
                },
                animatedStyle,
              ]}
            />
          </View>
        )}

        {step === 1 ? (
          <View
            style={{
              padding: 24,
              gap: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Bem-vindo ao{" "}
              <Text
                style={{
                  fontWeight: "700",
                  color: color.root.secondary,
                }}
              >
                TáxiPlus
              </Text>
            </Text>

            <View style={{ gap: 6 }}>
              <Text style={label}>Nome completo</Text>
              <Input
                placeholder="Digite o seu nome"
                value={form.fullName}
                onChange={(v) => updateField("fullName", v)}
                keyboardType="default"
              />
            </View>

            <View style={{ gap: 6 }}>
              <Text style={label}>Telefone</Text>
              <Input
                placeholder="+244 9xx xxx xxx"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                keyboardType="phone-pad"
              />
            </View>
            <View style={{ gap: 6 }}>
              <Text style={label}>Género</Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Pressable
                  onPress={() => updateField("gender", "MALE")}
                  style={[
                    selectOption,
                    form.gender === "MALE" && selectedOption,
                  ]}
                >
                  <Text>Masculino</Text>
                </Pressable>

                <Pressable
                  onPress={() => updateField("gender", "FEMALE")}
                  style={[
                    selectOption,
                    form.gender === "FEMALE" && selectedOption,
                  ]}
                >
                  <Text>Feminino</Text>
                </Pressable>
              </View>
            </View>
            <View style={{ gap: 6 }}>
              <Text style={label}>Data de nascimento</Text>

              <DatePickerInput
                value={form.birthDate}
                onChange={(date) =>
                  setForm({
                    ...form,
                    birthDate: date,
                  })
                }
              />
            </View>
            <View
              style={{
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <Button
                title="Continuar"
                style={{
                  width: 33,
                }}
                onPress={nextStep}
              />

              <Button title="Voltar" variant="outlined" onPress={back} />
            </View>
          </View>
        ) : (
          <View
            style={{
              padding: 24,
              gap: 15,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Código de verificação
            </Text>

            <Text
              style={{
                textAlign: "center",
                fontWeight: "400",
                fontSize: 18,
                color: color.root.textTint,
                lineHeight: 30,
              }}
            >
              Por favor informe o código de verificado para{" "}
              <Text
                style={{
                  fontWeight: "800",
                  color: color.root.secondary,
                }}
              >
                +244 {form.phone}
              </Text>
            </Text>
            <OTPInput
              processing={otp.length > 4}
              value={otp}
              onChange={setOtp}
            />
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Timer />
            </View>
            <OTPKeyboard value={otp} onChange={setOtp} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const label = {
  fontSize: 14,
  fontWeight: "600" as const,
  color: "#333",
};

const selectOption = {
  flex: 1,
  height: 54,
  borderWidth: 1,
  borderColor: "#ddd",
  borderRadius: 16,
  alignItems: "center" as const,
  justifyContent: "center" as const,
};

const selectedOption = {
  borderColor: "rgba(46, 204, 113, 0.1)",
  backgroundColor: "rgba(46, 204, 113, 0.1)",
};
