import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import DatePickerInput from "@/components/DatePickerInput";
import Input from "@/components/Input";
import Lable from "@/components/Label";
import OTPInput from "@/components/OTPInput";
import OTPKeyboard from "@/components/OTPKeyboard";
import Timer from "@/components/Timer";
import color from "@/styles/color";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
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

// Alinhar com o enum/type UserRole real do projeto (@/types/User),
// que usa as mesmas chaves em components/BottomNavbar.tsx
type Role = "PASSAGER" | "DRIVER";

// Os valores correspondem ao enum DriverDocumentType do backend.
type DriverDocumentType =
  | "ID_CARD"
  | "DRIVER_LICENSE"
  | "SELFIE"
  | "PROFILE_PHOTO"
  | "POLICE_RECORD"
  | "MEDICAL_CERTIFICATE";

type UploadedDocument = {
  fileUrl: string;
  fileName: string;
};

type DocumentDefinition = {
  type: DriverDocumentType;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  required?: boolean;
  imageOnly?: boolean;
};

const DOCUMENTS: DocumentDefinition[] = [
  {
    type: "ID_CARD",
    title: "Bilhete de identidade",
    description: "Frente e verso, legíveis",
    icon: "card-outline",
    required: true,
  },
  {
    type: "DRIVER_LICENSE",
    title: "Carta de condução",
    description: "Documento válido e legível",
    icon: "car-outline",
    required: true,
  },
  {
    type: "SELFIE",
    title: "Selfie de verificação",
    description: "Uma foto nítida do seu rosto",
    icon: "camera-outline",
    required: true,
    imageOnly: true,
  },
  {
    type: "PROFILE_PHOTO",
    title: "Foto de perfil",
    description: "Ajuda os passageiros a reconhecerem-no",
    icon: "person-circle-outline",
    imageOnly: true,
  },
  {
    type: "POLICE_RECORD",
    title: "Registo criminal",
    description: "Documento recente, se disponível",
    icon: "document-text-outline",
  },
  {
    type: "MEDICAL_CERTIFICATE",
    title: "Atestado médico",
    description: "Com validade atual, se aplicável",
    icon: "medkit-outline",
  },
];

type StepKey = "role" | "info" | "otp" | "documents";

type FormState = {
  fullName: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
};

export default function Register() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [role, setRole] = useState<Role | null>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    gender: Gender.MALE,
    birthDate: new Date(),
  });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [files, setFiles] = useState<
    Partial<Record<DriverDocumentType, UploadedDocument>>
  >({});
  const [pickingType, setPickingType] = useState<DriverDocumentType | null>(
    null,
  );
  const [registering, setRegistering] = useState(false);

  const steps = useMemo<StepKey[]>(() => {
    const base: StepKey[] = ["role", "info", "otp"];
    if (role === "DRIVER") base.push("documents");
    return base;
  }, [role]);

  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = steps[stepIndex];

  const translateY = useSharedValue(-200);
  const fade = useSharedValue(0);

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 800 });
  }, []);

  useEffect(() => {
    fade.value = 0;
    fade.value = withTiming(1, { duration: 350 });
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [stepIndex]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const requiredDocuments = DOCUMENTS.filter((d) => d.required);
  const missingRequired = requiredDocuments.filter((d) => !files[d.type]);
  const uploadedCount = Object.keys(files).length;
  const docsProgress = Math.round((uploadedCount / DOCUMENTS.length) * 100);

  function goNext() {
    if (currentStep === "role") {
      if (!role) {
        Alert.alert(
          "Escolha uma opção",
          "Selecione como deseja usar o TáxiPlus.",
        );
        return;
      }
      setStepIndex((i) => i + 1);
      return;
    }

    if (currentStep === "info") {
      if (!form.fullName || !form.phone || !form.birthDate) {
        Alert.alert("Erro", "Preencha todos os campos.");
        return;
      }
      const code = "123456";
      setGeneratedOtp(code);
      console.log("OTP enviado:", code);
      setStepIndex((i) => i + 1);
      return;
    }

    if (currentStep === "otp") {
      if (otp.length < 6) {
        Alert.alert("Código incompleto", "Informe o código de 6 dígitos.");
        return;
      }
      if (otp !== generatedOtp) {
        Alert.alert("Código inválido", "O código informado está incorreto.");
        return;
      }
      if (role === "DRIVER") {
        setStepIndex((i) => i + 1);
      } else {
        finishRegistration();
      }
      return;
    }

    if (currentStep === "documents") {
      if (missingRequired.length > 0) {
        Alert.alert(
          "Documentos obrigatórios em falta",
          `Envie: ${missingRequired.map((d) => d.title).join(", ")}.`,
        );
        return;
      }
      finishRegistration();
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      return;
    }
    router.back();
  }

  async function pickFile(document: DocumentDefinition) {
    try {
      setPickingType(document.type);
      if (document.imageOnly) {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.status !== "granted") {
          Alert.alert(
            "Permissão necessária",
            "Permita o acesso às fotografias para enviar este documento.",
          );
          return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: document.type === "SELFIE",
          quality: 0.8,
        });
        if (result.canceled) return;
        const asset = result.assets[0];
        setFiles((current) => ({
          ...current,
          [document.type]: {
            fileUrl: asset.uri,
            fileName: asset.fileName ?? "imagem.jpg",
          },
        }));
      } else {
        const result = await DocumentPicker.getDocumentAsync({
          type: ["image/*", "application/pdf"],
          copyToCacheDirectory: true,
        });
        if (result.canceled) return;
        const asset = result.assets[0];
        setFiles((current) => ({
          ...current,
          [document.type]: { fileUrl: asset.uri, fileName: asset.name },
        }));
      }
    } catch {
      Alert.alert("Não foi possível selecionar o ficheiro", "Tente novamente.");
    } finally {
      setPickingType(null);
    }
  }

  function finishRegistration() {
    setRegistering(true);

    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      gender: form.gender,
      birthDate: form.birthDate,
      role,
      documents:
        role === "DRIVER"
          ? Object.entries(files).map(([type, file]) => ({
              type: type as DriverDocumentType,
              fileUrl: file!.fileUrl,
            }))
          : undefined,
    };

    console.log("Registar utilizador:", payload);

    // TODO: substituir pela chamada real à API de registo
    setTimeout(() => {
      setRegistering(false);
      Alert.alert(
        "Conta criada",
        role === "DRIVER"
          ? "A sua conta foi criada. Os documentos entraram em análise."
          : "A sua conta foi criada com sucesso.",
      );
      router.replace(role === "DRIVER" ? "/(driver)" : "/(passenger)");
    }, 900);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <StatusBar
        animated
        barStyle={
          currentStep === "role" || currentStep === "info"
            ? "light-content"
            : "dark-content"
        }
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <Pressable onPress={goBack} style={styles.backCircle} hitSlop={10}>
            <Ionicons
              name="chevron-back"
              size={22}
              color={color.root.secondary}
            />
          </Pressable>

          <View style={styles.progressWrapper}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((stepIndex + 1) / steps.length) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.stepCounter}>
              Passo {stepIndex + 1} de {steps.length}
            </Text>
          </View>

          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={fadeStyle}>
            {currentStep === "role" && (
              <RoleStep role={role} onSelect={setRole} />
            )}

            {currentStep === "info" && (
              <InfoStep
                heroStyle={heroAnimatedStyle}
                form={form}
                onChange={updateField}
              />
            )}

            {currentStep === "otp" && (
              <OtpStep
                heroStyle={heroAnimatedStyle}
                phone={form.phone}
                otp={otp}
                onChangeOtp={setOtp}
              />
            )}

            {currentStep === "documents" && (
              <DocumentsStep
                files={files}
                pickingType={pickingType}
                onPick={pickFile}
                progress={docsProgress}
                uploadedCount={uploadedCount}
                missingRequired={missingRequired}
              />
            )}
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={
              currentStep === "documents"
                ? registering
                  ? "A criar conta..."
                  : "Concluir cadastro"
                : currentStep === "otp"
                  ? "Verificar código"
                  : "Continuar"
            }
            onPress={goNext}
            disabled={registering}
          />
          {stepIndex === 0 && <BackButton />}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function RoleStep({
  role,
  onSelect,
}: {
  role: Role | null;
  onSelect: (r: Role) => void;
}) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.roleHero}>
        <Image
          style={styles.roleHeroImage}
          source={require("../../assets/images/car.png")}
        />
      </View>

      <Text style={styles.title}>
        Como pretende usar o{" "}
        <Text style={{ color: color.root.secondary, fontWeight: "700" }}>
          TáxiPlus
        </Text>
        ?
      </Text>
      <Text style={styles.subtitle}>
        Escolha o tipo de conta. Pode alterar mais tarde nas definições.
      </Text>

      <View style={{ gap: 12, marginTop: 20 }}>
        <RoleCard
          icon="person-outline"
          title="Sou passageiro"
          description="Peça viagens e acompanhe o seu motorista em tempo real."
          selected={role === "PASSAGER"}
          onPress={() => onSelect("PASSAGER")}
        />
        <RoleCard
          icon="car-sport-outline"
          title="Sou motorista"
          description="Aceite corridas e comece a ganhar dinheiro. É necessário enviar documentos."
          selected={role === "DRIVER"}
          onPress={() => onSelect("DRIVER")}
        />
      </View>
    </View>
  );
}

function RoleCard({
  icon,
  title,
  description,
  selected,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.roleCard, selected && styles.roleCardSelected]}
    >
      <View
        style={[styles.roleCardIcon, selected && styles.roleCardIconSelected]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={selected ? "#fff" : color.root.secondary}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.roleCardTitle}>{title}</Text>
        <Text style={styles.roleCardDescription}>{description}</Text>
      </View>
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={20}
        color={selected ? color.root.green : "#C7C7C7"}
      />
    </Pressable>
  );
}

function InfoStep({
  heroStyle,
  form,
  onChange,
}: {
  heroStyle: any;
  form: FormState;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  return (
    <View>
      <View style={styles.heroWrap}>
        <Animated.Image
          style={[styles.heroCar, heroStyle]}
          source={require("../../assets/images/car.png")}
        />
        <Image
          style={styles.heroEllipse}
          source={require("../../assets/images/Ellipse 1.png")}
        />
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.title}>Os seus dados</Text>
        <Text style={styles.subtitle}>
          Precisamos de algumas informações para criar a sua conta.
        </Text>

        <View style={{ gap: 6, marginTop: 18 }}>
          <Lable title="Nome completo" />
          <Input
            placeholder="Digite o seu nome"
            value={form.fullName}
            onChange={(v: string) => onChange("fullName", v)}
            keyboardType="default"
          />
        </View>

        <View style={{ gap: 6, marginTop: 14 }}>
          <Lable title="Telefone" />
          <Input
            placeholder="+244 9xx xxx xxx"
            value={form.phone}
            onChange={(v: string) => onChange("phone", v)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={{ gap: 6, marginTop: 14 }}>
          <Lable title="Género" />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              onPress={() => onChange("gender", Gender.MALE)}
              style={[
                styles.selectOption,
                form.gender === Gender.MALE && styles.selectedOption,
              ]}
            >
              <Text>Masculino</Text>
            </Pressable>
            <Pressable
              onPress={() => onChange("gender", Gender.FEMALE)}
              style={[
                styles.selectOption,
                form.gender === Gender.FEMALE && styles.selectedOption,
              ]}
            >
              <Text>Feminino</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ gap: 6, marginTop: 14 }}>
          <Lable title="Data de nascimento" />
          <DatePickerInput
            value={form.birthDate}
            onChange={(date: Date) => onChange("birthDate", date)}
          />
        </View>
      </View>
    </View>
  );
}

function OtpStep({
  heroStyle,
  phone,
  otp,
  onChangeOtp,
}: {
  heroStyle: any;
  phone: string;
  otp: string;
  onChangeOtp: (v: string) => void;
}) {
  return (
    <View>
      <View style={styles.otpHeroWrap}>
        <Animated.Image
          source={require("../../assets/images/email.png")}
          style={[styles.otpHeroImage, heroStyle]}
        />
      </View>

      <View style={styles.stepContainer}>
        <Text style={styles.title}>Código de verificação</Text>
        <Text style={styles.otpSubtitle}>
          Informe o código enviado para{" "}
          <Text style={{ fontWeight: "800", color: color.root.secondary }}>
            +244 {phone}
          </Text>
        </Text>

        <OTPInput
          processing={otp.length > 4}
          value={otp}
          onChange={onChangeOtp}
        />

        <View style={{ alignItems: "center", marginTop: 12 }}>
          <Timer />
        </View>

        <OTPKeyboard value={otp} onChange={onChangeOtp} />
      </View>
    </View>
  );
}

function DocumentsStep({
  files,
  pickingType,
  onPick,
  progress,
  uploadedCount,
  missingRequired,
}: {
  files: Partial<Record<DriverDocumentType, UploadedDocument>>;
  pickingType: DriverDocumentType | null;
  onPick: (d: DocumentDefinition) => void;
  progress: number;
  uploadedCount: number;
  missingRequired: DocumentDefinition[];
}) {
  return (
    <View style={styles.stepContainer}>
      <View style={styles.docsHero}>
        <View style={styles.docsHeroIcon}>
          <Ionicons
            name="shield-checkmark-outline"
            size={26}
            color={color.root.green}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Documentos do motorista</Text>
          <Text style={styles.subtitle}>
            Envie os documentos abaixo para poder aceitar passageiros.
          </Text>
        </View>
      </View>

      <View style={styles.progressTrackDocs}>
        <View style={[styles.progressFillDocs, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {uploadedCount} de {DOCUMENTS.length} documentos adicionados
      </Text>

      <View style={{ gap: 9, marginTop: 16 }}>
        {DOCUMENTS.map((document) => {
          const file = files[document.type];
          const isPicking = pickingType === document.type;
          return (
            <View key={document.type} style={styles.documentCard}>
              <View
                style={[
                  styles.documentIcon,
                  file && styles.documentIconUploaded,
                ]}
              >
                <Ionicons
                  name={document.icon}
                  size={20}
                  color={file ? color.root.green : "#737373"}
                />
              </View>
              <View style={styles.documentInfo}>
                <Text style={styles.documentTitle}>
                  {document.title}
                  {document.required && <Text style={styles.required}> *</Text>}
                </Text>
                <Text style={styles.documentDescription} numberOfLines={1}>
                  {file ? file.fileName : document.description}
                </Text>
              </View>
              <Pressable
                disabled={isPicking}
                onPress={() => onPick(document)}
                style={[styles.uploadButton, file && styles.replaceButton]}
              >
                {isPicking ? (
                  <Ionicons
                    name="hourglass-outline"
                    size={16}
                    color="#737373"
                  />
                ) : (
                  <Text
                    style={[
                      styles.uploadButtonText,
                      file && styles.replaceButtonText,
                    ]}
                  >
                    {file ? "Trocar" : "Enviar"}
                  </Text>
                )}
              </Pressable>
            </View>
          );
        })}
      </View>

      {missingRequired.length > 0 && (
        <Text style={styles.missingText}>
          Documentos obrigatórios em falta:{" "}
          {missingRequired.map((d) => d.title).join(", ")}.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 10,
  },
  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
  progressWrapper: { flex: 1 },
  progressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: "#EDEDED",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: color.root.green,
  },
  stepCounter: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 5,
    textAlign: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 16,
    gap: 10,
  },
  stepContainer: { padding: 24, gap: 6 },
  title: { fontSize: 26, fontWeight: "700", color: "#151519" },
  subtitle: { fontSize: 14, color: "#737373", lineHeight: 20, marginTop: 4 },
  otpSubtitle: {
    fontSize: 15,
    color: "#737373",
    lineHeight: 22,
    marginTop: 4,
  },

  heroWrap: { position: "relative", alignItems: "center" },
  heroCar: {
    zIndex: 2,
    marginTop: 40,
    height: 320,
    width: 154,
    resizeMode: "contain",
  },
  heroEllipse: {
    objectFit: "contain",
    top: 0,
    position: "absolute",
  },

  otpHeroWrap: { alignItems: "center", marginTop: 50 },
  otpHeroImage: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },

  selectOption: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedOption: {
    borderColor: "rgba(46, 204, 113, 0.4)",
    backgroundColor: "rgba(46, 204, 113, 0.1)",
  },

  roleHero: { alignItems: "center", marginBottom: 8 },
  roleHeroImage: { width: 130, height: 130, resizeMode: "contain" },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    backgroundColor: "#fff",
  },
  roleCardSelected: {
    borderColor: color.root.green,
    backgroundColor: "#F3FBF6",
  },
  roleCardIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
  },
  roleCardIconSelected: { backgroundColor: color.root.green },
  roleCardTitle: { fontSize: 15, fontWeight: "700", color: "#151519" },
  roleCardDescription: {
    fontSize: 12,
    color: "#737373",
    marginTop: 3,
    lineHeight: 17,
  },

  docsHero: { flexDirection: "row", gap: 12, alignItems: "center" },
  docsHeroIcon: {
    width: 49,
    height: 49,
    borderRadius: 16,
    backgroundColor: "#EAF8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrackDocs: {
    height: 7,
    borderRadius: 4,
    backgroundColor: "#DCEDE2",
    overflow: "hidden",
    marginTop: 18,
  },
  progressFillDocs: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: color.root.green,
  },
  progressText: { fontSize: 11, color: "#587063", marginTop: 6 },

  documentCard: {
    minHeight: 84,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#fff",
  },
  documentIcon: {
    width: 41,
    height: 41,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F3F3",
    marginRight: 10,
  },
  documentIconUploaded: { backgroundColor: "#EAF8F0" },
  documentInfo: { flex: 1, paddingRight: 6 },
  documentTitle: { fontSize: 13, fontWeight: "800", color: "#151519" },
  required: { color: "#D14343" },
  documentDescription: { fontSize: 11, color: "#737373", marginTop: 3 },
  uploadButton: {
    minWidth: 58,
    height: 33,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F8F3",
  },
  replaceButton: { backgroundColor: "#F4F4F5" },
  uploadButtonText: { color: "#278653", fontSize: 11, fontWeight: "800" },
  replaceButtonText: { color: "#52525B" },
  missingText: {
    marginTop: 14,
    fontSize: 12,
    color: "#D14343",
    lineHeight: 17,
  },
});
