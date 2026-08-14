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

import { Gender } from "@/types/Gender";
import { Passager, UserRole } from "@/types/User";
import colors from "@/styles/color";

const mockUser: Passager = {
  id: "passager-001",
  name: "Francisco Diakomas",
  role: UserRole.PASSAGER,
  photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  gender: Gender.M,
  phone: "+244 923 456 789",
};

export default function ProfilePage() {
  const [user, setUser] = useState<Passager>(mockUser);

  const [showTraffic, setShowTraffic] = useState(true);
  const [allowCalls, setAllowCalls] = useState(true);
  const [shareLocationWithDriver, setShareLocationWithDriver] = useState(true);
  const [allowNotifications, setAllowNotifications] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [gender, setGender] = useState(user.gender);

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para escolher uma foto.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUser((current) => ({
        ...current,
        photoUrl: result.assets[0].uri,
      }));
    }
  }

  function handleSave() {
    setUser((current) => ({
      ...current,
      name: name.trim(),
      phone: phone.trim(),
      gender,
    }));

    setIsEditing(false);

    Alert.alert("Perfil atualizado", "Os teus dados foram atualizados.");
  }

  function handleLogout() {
    Alert.alert(
      "Terminar sessão",
      "Tens a certeza que queres terminar a sessão?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Terminar sessão",
          style: "destructive",
          onPress: () => {
            // logout
          },
        },
      ],
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Perfil</Text>
          <Text style={styles.subtitle}>Gere os teus dados e preferências</Text>
        </View>

        <Pressable
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          style={styles.editButton}
        >
          <Ionicons
            name={isEditing ? "checkmark-outline" : "create-outline"}
            size={19}
            color={colors.root.primary}
          />

          <Text style={styles.editButtonText}>
            {isEditing ? "Guardar" : "Editar"}
          </Text>
        </Pressable>
      </View>

      {/* Profile */}
      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          {user.photoUrl ? (
            <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={42} color={colors.root.secondary} />
            </View>
          )}

          <Pressable onPress={handlePickImage} style={styles.cameraButton}>
            <Ionicons
              name="camera-outline"
              size={17}
              color={colors.root.primary}
            />
          </Pressable>
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileRole}>Passageiro</Text>
          <Text style={styles.profilePhone}>{user.phone}</Text>
        </View>
      </View>

      {/* Personal data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados pessoais</Text>

        <View style={styles.card}>
          <View style={styles.field}>
            <View style={styles.fieldIcon}>
              <Ionicons
                name="person-outline"
                size={19}
                color={colors.root.secondary}
              />
            </View>

            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Nome completo</Text>

              {isEditing ? (
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  placeholder="Nome completo"
                  placeholderTextColor="#999"
                />
              ) : (
                <Text style={styles.fieldValue}>{user.name}</Text>
              )}
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.field}>
            <View style={styles.fieldIcon}>
              <Ionicons
                name="call-outline"
                size={19}
                color={colors.root.secondary}
              />
            </View>

            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Telefone</Text>

              {isEditing ? (
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                  placeholder="Número de telefone"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.fieldValue}>{user.phone}</Text>
              )}
            </View>
          </View>

          <View style={styles.separator} />

          <View style={styles.field}>
            <View style={styles.fieldIcon}>
              <Ionicons
                name="male-female-outline"
                size={19}
                color={colors.root.secondary}
              />
            </View>

            <View style={styles.fieldContent}>
              <Text style={styles.fieldLabel}>Género</Text>

              {!isEditing ? (
                <Text style={styles.fieldValue}>{user.gender}</Text>
              ) : (
                <View style={styles.genderOptions}>
                  <Pressable
                    onPress={() => setGender(Gender.M)}
                    style={[
                      styles.genderOption,
                      gender === Gender.M && styles.genderOptionActive,
                    ]}
                  >
                    <Ionicons
                      name="male-outline"
                      size={16}
                      color={
                        gender === Gender.M
                          ? colors.root.primary
                          : colors.root.secondary
                      }
                    />

                    <Text
                      style={[
                        styles.genderOptionText,
                        gender === Gender.M && styles.genderOptionTextActive,
                      ]}
                    >
                      Masculino
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => setGender(Gender.F)}
                    style={[
                      styles.genderOption,
                      gender === Gender.F && styles.genderOptionActive,
                    ]}
                  >
                    <Ionicons
                      name="female-outline"
                      size={16}
                      color={
                        gender === Gender.F
                          ? colors.root.primary
                          : colors.root.secondary
                      }
                    />

                    <Text
                      style={[
                        styles.genderOptionText,
                        gender === Gender.F && styles.genderOptionTextActive,
                      ]}
                    >
                      Feminino
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Permissions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permissões e privacidade</Text>

        <View style={styles.card}>
          <SettingRow
            icon="car-outline"
            title="Mostrar trânsito no mapa"
            description="Usar informação de trânsito ao apresentar o mapa."
            value={showTraffic}
            onChange={setShowTraffic}
          />

          <View style={styles.separator} />

          <SettingRow
            icon="call-outline"
            title="Permitir chamadas"
            description="Permitir que motoristas te liguem durante uma viagem."
            value={allowCalls}
            onChange={setAllowCalls}
          />

          <View style={styles.separator} />

          <SettingRow
            icon="location-outline"
            title="Partilhar localização com motorista"
            description="Mostrar a tua localização ao motorista durante a viagem."
            value={shareLocationWithDriver}
            onChange={setShareLocationWithDriver}
          />

          <View style={styles.separator} />

          <SettingRow
            icon="notifications-outline"
            title="Notificações"
            description="Receber atualizações sobre viagens e mensagens."
            value={allowNotifications}
            onChange={setAllowNotifications}
          />
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conta</Text>

        <View style={styles.card}>
          <Pressable style={styles.menuButton}>
            <View style={styles.menuIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={colors.root.secondary}
              />
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Segurança</Text>
              <Text style={styles.menuDescription}>
                Palavra-passe, segurança e sessões
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </Pressable>

          <View style={styles.separator} />

          <Pressable style={styles.menuButton}>
            <View style={styles.menuIcon}>
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={colors.root.secondary}
              />
            </View>

            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Ajuda e suporte</Text>
              <Text style={styles.menuDescription}>
                Entra em contacto connosco
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color="#A0A0A0" />
          </Pressable>
        </View>
      </View>

      {/* Logout */}
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.pressed,
        ]}
      >
        <Ionicons name="log-out-outline" size={21} color="#D14343" />

        <Text style={styles.logoutText}>Terminar sessão</Text>
      </Pressable>

      <Text style={styles.version}>MandaVir • v1.0.0</Text>
    </ScrollView>
  );
}

function SettingRow({
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
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={20} color={colors.root.secondary} />
      </View>

      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: "#D9D9D9",
          true: colors.root.green,
        }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    marginBottom: 80,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
  },

  editButton: {
    height: 40,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: colors.root.secondary,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  editButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.primary,
  },

  profileCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },

  avatarPlaceholder: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#EEF0F2",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraButton: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.root.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.root.primary,
  },

  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  profileRole: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "700",
    color: colors.root.green,
  },

  profilePhone: {
    marginTop: 5,
    fontSize: 13,
    color: "#777",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  card: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    paddingHorizontal: 16,
    overflow: "hidden",
  },

  field: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  fieldIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F1F3F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  fieldContent: {
    flex: 1,
  },

  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#969696",
    marginBottom: 3,
  },

  fieldValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  input: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  genderOptions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },

  genderOption: {
    height: 34,
    paddingHorizontal: 11,
    borderRadius: 10,
    backgroundColor: "#F1F3F4",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "transparent",
  },

  genderOptionActive: {
    backgroundColor: colors.root.secondary,
    borderColor: colors.root.secondary,
  },

  genderOptionText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  genderOptionTextActive: {
    color: colors.root.primary,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  settingIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F1F3F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingContent: {
    flex: 1,
    paddingRight: 12,
  },

  settingTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  settingDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    color: "#888",
  },

  menuButton: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F1F3F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  menuDescription: {
    marginTop: 3,
    fontSize: 11,
    color: "#888",
  },

  logoutButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },

  logoutText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#D14343",
  },

  version: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 11,
    color: "#A0A0A0",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
