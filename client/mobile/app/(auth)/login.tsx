import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Lable from "@/components/Label";
import OTPInput from "@/components/OTPInput";
import color from "@/styles/color";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function LoginPage() {
  const translateY = useSharedValue(-200);
  const router = useRouter();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
    >
      <ScrollView>
        <StatusBar animated barStyle={"light-content"} translucent />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            position: "relative",
            overflow: "hidden",
            width: "100%",
            paddingTop: 300,
          }}
        >
          <Image
            style={{
              objectFit: "contain",
              top: 0,
              position: "absolute",
              zIndex: 1,
            }}
            source={require("../../assets/images/Ellipse 1.png")}
          />

          <Animated.Image
            source={require("../../assets/images/email.png")}
            style={[
              {
                width: 120,
                height: 120,
                resizeMode: "contain",
                zIndex: 53,
                marginTop: 50,
              },
              animatedStyle,
            ]}
          />
        </View>
        <View
          style={{
            marginTop: -65,
            paddingHorizontal: 24,
            gap: 15,
          }}
        >
          {step == 1 ? (
            <View
              style={{
                gap: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  textAlign: "center",
                  fontWeight: "400",
                }}
              >
                Acessar minha conta
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  fontSize: 18,
                  color: color.root.textTint,
                }}
              >
                Por favor informe o seu número de telefone
              </Text>
              <View style={{ gap: 6 }}>
                <Lable title="Telefone" />
                <Input
                  placeholder="+244 9xx xxx xxx"
                  value={phone}
                  onChange={(v) => {
                    setPhone(v);
                  }}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          ) : (
            <View
              style={{
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
                Por favor informe o código de verificação enviado para{" "}
                <Text
                  style={{
                    fontWeight: "800",
                    color: color.root.secondary,
                  }}
                >
                  +244 {phone}
                </Text>
              </Text>
              <OTPInput
                processing={otp.length > 4}
                value={otp}
                onChange={setOtp}
              />
            </View>
          )}

          <Button
            title={!otp ? "Enviar" : "Confirmar"}
            onPress={() => {
              if (!phone) {
                alert("Preenche o número");
                return;
              }

              if (!otp) {
                setStep(2);
                return;
              }
              router.push("/(passenger)");
            }}
          />
          <BackButton />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
