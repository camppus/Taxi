import { Alert, Linking } from "react-native";

export function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
}

export const openLink = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert("Erro", "Não foi possível abrir este endereço.");
  }
};

export const handleCall = (number: string) => {
  Linking.openURL(`tel:${number}`);
};

export const handleEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`);
};
