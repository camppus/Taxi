import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { mockDriverProfile } from "@/mocks/Mockdriverhome";
import color from "@/styles/color";
import { getInitials } from "@/util/lib";

type Preferences = {
  pets: boolean;
  smoking: boolean;
  intoxicatedPassengers: boolean;
  music: boolean;
  verifiedPassengersOnly: boolean;
  luggageKg: boolean;
};

export default function DriverProfileScreen() {
  const [profile, setProfile] = useState(mockDriverProfile);
  const [phone, setPhone] = useState("+244 923 456 789");
  const [name, setName] = useState(profile.fullName);
  const [editing, setEditing] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    pets: false,
    smoking: false,
    intoxicatedPassengers: false,
    music: true,
    verifiedPassengersOnly: false,
    luggageKg: false,
  });

  const changePreference = (
    key: Exclude<keyof Preferences, "luggageKg">,
    value: boolean,
  ) => setPreferences((current) => ({ ...current, [key]: value }));
  const saveProfile = () => {
    setProfile((current) => ({
      ...current,
      fullName: name.trim() || current.fullName,
    }));
    setEditing(false);
    Alert.alert("Perfil atualizado", "Os seus dados foram atualizados.");
  };
  const pickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à galeria para escolher uma foto.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled)
      setProfile((current) => ({ ...current, photoUrl: result.assets[0].uri }));
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Perfil do motorista</Text>
          <Text style={styles.subtitle}>
            Dados, preferências e configurações
          </Text>
        </View>
        <Pressable
          style={styles.editButton}
          onPress={() => (editing ? saveProfile() : setEditing(true))}
        >
          <Ionicons
            name={editing ? "checkmark-outline" : "create-outline"}
            size={18}
            color="#fff"
          />
          <Text style={styles.editText}>{editing ? "Guardar" : "Editar"}</Text>
        </Pressable>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.avatarWrap}>
          {profile.photoUrl ? (
            <Image source={{ uri: profile.photoUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>
                {getInitials(profile.fullName)}
              </Text>
            </View>
          )}
          <Pressable onPress={pickPhoto} style={styles.camera}>
            <Ionicons name="camera-outline" size={16} color="#fff" />
          </Pressable>
        </View>
        <View style={styles.profileInfo}>
          <View style={styles.verifiedRow}>
            <Text style={styles.profileRole}>MOTORISTA</Text>
            {profile.isVerified && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark" size={11} color="#fff" />
                <Text style={styles.verifiedText}>Verificado</Text>
              </View>
            )}
          </View>
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profilePhone}>{phone}</Text>
        </View>
      </View>
      <Section title="Dados pessoais">
        <View style={styles.card}>
          <ProfileField
            icon="person-outline"
            label="Nome completo"
            value={profile.fullName}
            editing={editing}
            onChangeText={setName}
          />
          <Divider />
          <ProfileField
            icon="call-outline"
            label="Telefone"
            value={phone}
            editing={editing}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </Section>
      <Section title="Estado da conta">
        <View style={styles.accountStatus}>
          <View style={styles.accountIcon}>
            <Ionicons
              name={
                profile.isVerified ? "shield-checkmark-outline" : "time-outline"
              }
              size={21}
              color={profile.isVerified ? color.root.green : "#B7791F"}
            />
          </View>
          <View style={styles.accountBody}>
            <Text style={styles.accountTitle}>
              {profile.isVerified ? "Conta verificada" : "Verificação pendente"}
            </Text>
            <Text style={styles.accountText}>
              {profile.isVerified
                ? "Pode publicar viagens e receber reservas."
                : "Envie os documentos para publicar viagens."}
            </Text>
          </View>
          {!profile.isVerified && (
            <Pressable style={styles.documentsButton}>
              <Text style={styles.documentsText}>Documentos</Text>
            </Pressable>
          )}
        </View>
      </Section>
      <Section
        title="Preferências de viagem"
        subtitle="Estas preferências aparecem aos passageiros antes da reserva."
      >
        <View style={styles.card}>
          <PreferenceRow
            icon="paw-outline"
            title="Aceitar animais"
            description="Permitir animais de estimação na viatura."
            value={preferences.pets}
            onChange={(value) => changePreference("pets", value)}
          />
          <Divider />
          <PreferenceRow
            icon="wine-outline"
            title="Não aceito passageiros embriagados"
            description="Impedir reservas de passageiros sob efeito de álcool."
            value={!preferences.intoxicatedPassengers}
            onChange={(value) =>
              changePreference("intoxicatedPassengers", !value)
            }
          />
          <Divider />
          <PreferenceRow
            icon="ban-outline"
            title="Não fumar na viatura"
            description="Manter a viagem livre de fumo."
            value={!preferences.smoking}
            onChange={(value) => changePreference("smoking", !value)}
          />
          <Divider />
          <PreferenceRow
            icon="musical-notes-outline"
            title="Música durante a viagem"
            description="Permitir música em volume moderado."
            value={preferences.music}
            onChange={(value) => changePreference("music", value)}
          />

          <Divider />
          <PreferenceRow
            icon="bag-handle-outline"
            title="Permitir bagagem nas viagens"
            description="Aceitar reservas onde os clientes têm bagagens"
            value={preferences.verifiedPassengersOnly}
            onChange={(value) =>
              changePreference("verifiedPassengersOnly", value)
            }
          />
        </View>
      </Section>

      <Pressable
        onPress={() =>
          Alert.alert(
            "Terminar sessão",
            "Tem a certeza que deseja terminar sessão?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Terminar sessão", style: "destructive" },
            ],
          )
        }
        style={styles.logout}
      >
        <Ionicons name="log-out-outline" size={20} color="#C73B31" />
        <Text style={styles.logoutText}>Terminar sessão</Text>
      </Pressable>
      <Text style={styles.version}>MandaVir · v1.0.0</Text>
    </ScrollView>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      {children}
    </View>
  );
}
function Divider() {
  return <View style={styles.divider} />;
}
function ProfileField({
  icon,
  label,
  value,
  editing,
  onChangeText,
  keyboardType,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  editing: boolean;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "phone-pad";
}) {
  return (
    <View style={styles.field}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={19} color={color.root.secondary} />
      </View>
      <View style={styles.fieldBody}>
        <Text style={styles.fieldLabel}>{label}</Text>
        {editing ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            keyboardType={keyboardType}
          />
        ) : (
          <Text style={styles.fieldValue}>{value}</Text>
        )}
      </View>
    </View>
  );
}
function PreferenceRow({
  icon,
  title,
  description,
  value,
  onChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <View style={styles.preference}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={19} color={color.root.secondary} />
      </View>
      <View style={styles.preferenceBody}>
        <Text style={styles.preferenceTitle}>{title}</Text>
        <Text style={styles.preferenceDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#D9D9D9", true: color.root.green }}
        thumbColor="#fff"
      />
    </View>
  );
}
function MenuRow({
  icon,
  title,
  description,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}) {
  return (
    <Pressable style={styles.preference}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={19} color={color.root.secondary} />
      </View>
      <View style={styles.preferenceBody}>
        <Text style={styles.preferenceTitle}>{title}</Text>
        <Text style={styles.preferenceDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#A1A1AA" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8F9FA", marginBottom: 80 },
  content: { padding: 16, paddingBottom: 40 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  title: { fontSize: 22, fontWeight: "800", color: color.root.secondary },
  subtitle: { fontSize: 11, color: "#737373", marginTop: 3 },
  editButton: {
    backgroundColor: color.root.secondary,
    height: 37,
    paddingHorizontal: 11,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  editText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ECECEC",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrap: { width: 65, height: 65, marginRight: 13 },
  avatar: { width: 65, height: 65, borderRadius: 33 },
  avatarPlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF8F0",
  },
  avatarInitials: { color: color.root.green, fontWeight: "800", fontSize: 18 },
  camera: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 25,
    height: 25,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.root.green,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: { flex: 1 },
  verifiedRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  profileRole: {
    color: "#737373",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  verifiedBadge: {
    backgroundColor: color.root.green,
    borderRadius: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  verifiedText: { color: "#fff", fontSize: 8, fontWeight: "800" },
  profileName: {
    fontSize: 17,
    fontWeight: "800",
    color: color.root.secondary,
    marginTop: 3,
  },
  profilePhone: { fontSize: 12, color: "#737373", marginTop: 3 },
  section: { marginTop: 22 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: color.root.secondary,
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: "#737373",
    fontSize: 11,
    lineHeight: 15,
    marginTop: -4,
    marginBottom: 9,
  },
  card: {
    borderRadius: 17,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  field: {
    minHeight: 67,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
    marginRight: 10,
  },
  fieldBody: { flex: 1 },
  fieldLabel: { fontSize: 10, color: "#737373", fontWeight: "700" },
  fieldValue: {
    color: color.root.secondary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 3,
  },
  input: {
    color: color.root.secondary,
    fontSize: 14,
    padding: 0,
    marginTop: 3,
    fontWeight: "700",
  },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginLeft: 58 },
  accountStatus: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 17,
    padding: 13,
    backgroundColor: "#FFF8E5",
    borderWidth: 1,
    borderColor: "#FFF0BD",
  },
  accountIcon: {
    width: 39,
    height: 39,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0BF",
    marginRight: 10,
  },
  accountBody: { flex: 1 },
  accountTitle: { fontSize: 13, fontWeight: "800", color: "#6C5318" },
  accountText: { fontSize: 11, color: "#806C3B", marginTop: 3 },
  documentsButton: {
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 9,
    backgroundColor: "#fff",
  },
  documentsText: { color: "#8B6500", fontSize: 10, fontWeight: "800" },
  preference: {
    minHeight: 70,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  preferenceBody: { flex: 1, paddingRight: 8 },
  preferenceTitle: {
    color: color.root.secondary,
    fontSize: 13,
    fontWeight: "800",
  },
  preferenceDescription: {
    color: "#737373",
    fontSize: 10,
    lineHeight: 14,
    marginTop: 2,
  },
  logout: {
    marginTop: 26,
    height: 49,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
    backgroundColor: "#FFF0F0",
  },
  logoutText: { color: "#C73B31", fontWeight: "800", fontSize: 13 },
  version: {
    textAlign: "center",
    color: "#A1A1AA",
    fontSize: 10,
    marginTop: 16,
  },
});
