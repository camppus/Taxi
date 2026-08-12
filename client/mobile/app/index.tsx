import { Image, Pressable, Text, View } from "react-native";
import color from "@/styles/color";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        gap: 30,
      }}
    >
      <StatusBar style="dark" translucent={false} />
      <Image
        source={require("../assets/images/firstimaji.png")}
        style={{
          width: 350,
          height: 280,
          resizeMode: "contain",
          marginTop: 120,
        }}
      />

      <View
        style={{
          paddingLeft: 22,
          paddingRight: 22,
          gap: 5,
        }}
      >
        <Text
          style={{
            color: color.root.textTint,
            fontSize: 40,
            fontFamily: "Inter_600Bold",
            textAlign: "center",
          }}
        >
          TáxiPlus
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#A0A0A0",
          }}
        >
          Crie sua conta ou entre para solicitar viagens, acompanhar corridas e
          chegar ao seu destino com segurança e conforto.
        </Text>
      </View>

      <View
        style={{
          gap: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: color.root.secondary,
            height: 56,
            borderRadius: 32,
            alignItems: "center",
            justifyContent: "center",
            width: 300,
          }}
          onPress={() => {
            router.push("/(auth)/login");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Acessar conta
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "transparent",
            height: 56,
            borderRadius: 32,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            router.push("/(auth)/register");
          }}
        >
          <Text
            style={{
              color: color.root.secondary,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Criar conta
          </Text>
        </Pressable>

        <Text
          style={{
            textDecorationLine: "underline",
            color: "blue",
            textAlign: "center",
          }}
          onPress={() => {
            router.push("/(passenger)");
          }}
        >
          Ir para home
        </Text>
      </View>
    </View>
  );
}
