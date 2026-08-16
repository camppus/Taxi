import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Lable from "@/components/Label";
import OTPInput from "@/components/OTPInput";
import OTPKeyboard from "@/components/OTPKeyboard";
import Timer from "@/components/Timer";
import color from "@/styles/color";
import { scrollToTop } from "@/util/lib";

import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
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
  LinearTransition,
  SlideInLeft,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

type Role = "PASSAGER" | "DRIVER";

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
  birthDate: Date | null;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Register() {
  const router = useRouter();

  const [role, setRole] = useState<Role | null>(null);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    gender: Gender.MALE,
    birthDate: null,
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

    if (role === "DRIVER") {
      base.push("documents");
    }

    return base;
  }, [role]);

  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = steps[stepIndex];

  const requiredDocuments = DOCUMENTS.filter((document) => document.required);
  const scrollRef = useRef<ScrollView>(null);
  const missingRequired = requiredDocuments.filter(
    (document) => !files[document.type],
  );

  const uploadedCount = Object.keys(files).length;

  const docsProgress = Math.round((uploadedCount / DOCUMENTS.length) * 100);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function goNext() {
    if (currentStep === "role") {
      if (!role) {
        Alert.alert(
          "Escolha uma opção",
          "Selecione como deseja usar o TáxiPlus.",
        );
        return;
      }
      scrollToTop(scrollRef);
      setStepIndex((index) => index + 1);
      return;
    }

    if (currentStep === "info") {
      if (!form.fullName.trim() || !form.phone.trim() || !form.birthDate) {
        Alert.alert(
          "Dados incompletos",
          "Preencha o nome, telefone e data de nascimento.",
        );
        return;
      }

      const code = "12345";

      setGeneratedOtp(code);

      console.log("OTP enviado:", code);

      setStepIndex((index) => index + 1);
      return;
    }

    if (currentStep === "otp") {
      if (otp.length < 5) {
        Alert.alert("Código incompleto", "Informe o código de 6 dígitos.");
        return;
      }

      if (otp !== generatedOtp) {
        Alert.alert("Código inválido", "O código informado está incorreto.");
        return;
      }

      if (role === "DRIVER") {
        setStepIndex((index) => index + 1);
      } else {
        finishRegistration();
      }

      return;
    }

    if (currentStep === "documents") {
      if (missingRequired.length > 0) {
        Alert.alert(
          "Documentos obrigatórios",
          `Envie: ${missingRequired
            .map((document) => document.title)
            .join(", ")}.`,
        );

        return;
      }

      finishRegistration();
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setStepIndex((index) => index - 1);
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
          [document.type]: {
            fileUrl: asset.uri,
            fileName: asset.name,
          },
        }));
      }
    } catch {
      Alert.alert("Erro", "Não foi possível selecionar o ficheiro.");
    } finally {
      setPickingType(null);
    }
  }

  function finishRegistration() {
    if (!form.birthDate) return;

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar animated barStyle="dark-content" backgroundColor="#FFFFFF" />

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}

        <Animated.View
          entering={FadeInDown.duration(500)}
          style={styles.topBar}
        >
          <Pressable onPress={goBack} style={styles.backCircle}>
            <Ionicons
              name="chevron-back"
              size={21}
              color={color.root.secondary}
            />
          </Pressable>

          <View style={styles.progressWrapper}>
            <View style={styles.progressTrack}>
              <Animated.View
                layout={LinearTransition.duration(350)}
                style={[
                  styles.progressFill,
                  {
                    width: `${((stepIndex + 1) / steps.length) * 100}%`,
                  },
                ]}
              />
            </View>

            <View style={styles.progressBottom}>
              <Text style={styles.stepCounter}>
                Passo {stepIndex + 1} de {steps.length}
              </Text>

              <Text style={styles.stepName}>{getStepName(currentStep)}</Text>
            </View>
          </View>

          <View style={styles.headerSpacer} />
        </Animated.View>

        {/* CONTENT */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View
            key={currentStep}
            entering={
              stepIndex % 2 === 0
                ? SlideInRight.duration(450)
                : SlideInLeft.duration(450)
            }
          >
            {currentStep === "role" && (
              <RoleStep role={role} onSelect={setRole} />
            )}

            {currentStep === "info" && (
              <InfoStep form={form} onChange={updateField} />
            )}

            {currentStep === "otp" && (
              <OtpStep phone={form.phone} otp={otp} onChangeOtp={setOtp} />
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

        {/* FOOTER */}

        <Animated.View
          entering={FadeInUp.duration(500).delay(150)}
          style={styles.footer}
        >
          <AnimatedPressable
            onPress={goNext}
            disabled={registering}
            style={[styles.mainButton, registering && styles.disabledButton]}
          >
            <Text style={styles.mainButtonText}>
              {registering
                ? "A criar conta..."
                : currentStep === "documents"
                  ? "Concluir cadastro"
                  : currentStep === "otp"
                    ? "Verificar código"
                    : "Continuar"}
            </Text>

            {!registering && (
              <View style={styles.buttonArrow}>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </View>
            )}
          </AnimatedPressable>

          {stepIndex === 0 && (
            <Animated.View entering={FadeIn.duration(400)}>
              <BackButton />
            </Animated.View>
          )}
        </Animated.View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function getStepName(step: StepKey) {
  switch (step) {
    case "role":
      return "Tipo de conta";
    case "info":
      return "Dados pessoais";
    case "otp":
      return "Verificação";
    case "documents":
      return "Documentos";
  }
}

/* ============================================================
   ROLE
============================================================ */

function RoleStep({
  role,
  onSelect,
}: {
  role: Role | null;
  onSelect: (role: Role) => void;
}) {
  return (
    <View style={styles.stepContainer}>
      <Animated.View entering={ZoomIn.duration(600)} style={styles.roleHero}>
        <View style={styles.heroGlow} />

        <Image
          source={require("../../assets/images/car.png")}
          style={styles.roleHeroImage}
        />
      </Animated.View>

      <Animated.Text
        entering={FadeInUp.duration(500).delay(150)}
        style={styles.title}
      >
        Como pretende usar o <Text style={styles.brandText}>TáxiPlus</Text>?
      </Animated.Text>

      <Animated.Text
        entering={FadeInUp.duration(500).delay(220)}
        style={styles.subtitleCenter}
      >
        Escolha o tipo de conta para começar.
      </Animated.Text>

      <View style={styles.roleCards}>
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
          description="Aceite corridas e comece a ganhar dinheiro."
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
    <AnimatedPressable
      layout={LinearTransition.duration(250)}
      onPress={onPress}
      style={[styles.roleCard, selected && styles.roleCardSelected]}
    >
      <View style={[styles.roleIcon, selected && styles.roleIconSelected]}>
        <Ionicons
          name={icon}
          size={22}
          color={selected ? "#FFFFFF" : color.root.secondary}
        />
      </View>

      <View style={styles.roleContent}>
        <Text style={styles.roleTitle}>{title}</Text>

        <Text style={styles.roleDescription}>{description}</Text>
      </View>

      <Ionicons
        name={selected ? "checkmark-circle" : "ellipse-outline"}
        size={22}
        color={selected ? color.root.green : "#C7C7C7"}
      />
    </AnimatedPressable>
  );
}

/* ============================================================
   INFO
============================================================ */

function InfoStep({
  form,
  onChange,
}: {
  form: FormState;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
}) {
  return (
    <View>
      <Animated.View entering={ZoomIn.duration(600)} style={styles.infoHero}>
        {/* PATTERN */}

        <View style={styles.patternCircleLarge} />
        <View style={styles.patternCircleSmall} />

        <View style={styles.patternDotOne} />
        <View style={styles.patternDotTwo} />
        <View style={styles.patternDotThree} />

        <View style={styles.patternLineOne} />
        <View style={styles.patternLineTwo} />

        <View style={styles.carGlow} />

        <Image
          source={require("../../assets/images/car.png")}
          style={styles.infoCar}
        />
      </Animated.View>

      <View style={styles.stepContainer}>
        <Animated.Text entering={FadeInUp.duration(450)} style={styles.title}>
          Os seus dados
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.duration(450).delay(100)}
          style={styles.subtitleCenter}
        >
          Precisamos de algumas informações para criar a sua conta.
        </Animated.Text>

        <Animated.View
          entering={FadeInUp.duration(450).delay(150)}
          style={styles.form}
        >
          <View style={styles.field}>
            <Lable title="Nome completo" />

            <Input
              placeholder="Digite o seu nome"
              value={form.fullName}
              onChange={(value: string) => onChange("fullName", value)}
            />
          </View>

          <View style={styles.field}>
            <Lable title="Telefone" />

            <Input
              placeholder="+244 9xx xxx xxx"
              value={form.phone}
              onChange={(value: string) => onChange("phone", value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.field}>
            <Lable title="Género" />

            <View style={styles.genderRow}>
              <GenderButton
                title="Masculino"
                selected={form.gender === Gender.MALE}
                onPress={() => onChange("gender", Gender.MALE)}
              />

              <GenderButton
                title="Feminino"
                selected={form.gender === Gender.FEMALE}
                onPress={() => onChange("gender", Gender.FEMALE)}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Lable title="Data de nascimento" />

            <DatePicker
              value={form.birthDate}
              onChange={(date) => onChange("birthDate", date)}
              label="Data de nascimento"
              placeholder="Selecionar data"
              mode="date"
              minimumDate={new Date(1900, 0, 1)}
              maximumDate={
                new Date(
                  new Date().getFullYear() - 18,
                  new Date().getMonth(),
                  new Date().getDate(),
                )
              }
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

function GenderButton({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <AnimatedPressable
      layout={LinearTransition.duration(200)}
      onPress={onPress}
      style={[styles.genderButton, selected && styles.genderButtonSelected]}
    >
      <Ionicons
        name={selected ? "checkmark-circle" : "ellipse-outline"}
        size={19}
        color={selected ? color.root.green : "#B5B5B5"}
      />

      <Text style={[styles.genderText, selected && styles.genderTextSelected]}>
        {title}
      </Text>
    </AnimatedPressable>
  );
}

/* ============================================================
   OTP
============================================================ */

function OtpStep({
  phone,
  otp,
  onChangeOtp,
}: {
  phone: string;
  otp: string;
  onChangeOtp: (value: string) => void;
}) {
  return (
    <View>
      <Animated.View entering={ZoomIn.duration(600)} style={styles.otpHero}>
        <View style={styles.otpHeroCircle}>
          <Image
            source={require("../../assets/images/email.png")}
            style={styles.otpHeroImage}
          />
        </View>
      </Animated.View>

      <View style={styles.stepContainer}>
        <Animated.Text entering={FadeInUp.duration(450)} style={styles.title}>
          Código de verificação
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.duration(450).delay(100)}
          style={styles.otpSubtitle}
        >
          Informe o código enviado para{" "}
          <Text style={styles.highlight}>+244 {phone}</Text>
        </Animated.Text>

        <Animated.View
          entering={FadeInUp.duration(450).delay(180)}
          style={styles.otpBox}
        >
          <OTPInput
            processing={otp.length > 4}
            value={otp}
            onChange={onChangeOtp}
          />
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(450).delay(300)}
          style={styles.timerContainer}
        >
          <Timer />
        </Animated.View>

        <OTPKeyboard value={otp} onChange={onChangeOtp} />
      </View>
    </View>
  );
}

/* ============================================================
   DOCUMENTS
============================================================ */

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
  onPick: (document: DocumentDefinition) => void;
  progress: number;
  uploadedCount: number;
  missingRequired: DocumentDefinition[];
}) {
  return (
    <View style={styles.stepContainer}>
      <Animated.View
        entering={ZoomIn.duration(500)}
        style={styles.documentsHero}
      >
        <View style={styles.documentsIcon}>
          <Ionicons
            name="shield-checkmark"
            size={30}
            color={color.root.green}
          />
        </View>
      </Animated.View>

      <Animated.Text entering={FadeInUp.duration(450)} style={styles.title}>
        Documentos do motorista
      </Animated.Text>

      <Animated.Text
        entering={FadeInUp.duration(450).delay(100)}
        style={styles.subtitleCenter}
      >
        Envie os documentos necessários para começar a aceitar passageiros.
      </Animated.Text>

      <Animated.View
        entering={FadeInUp.duration(450).delay(150)}
        style={styles.docsProgressCard}
      >
        <View style={styles.docsProgressHeader}>
          <View>
            <Text style={styles.docsProgressTitle}>Progresso</Text>

            <Text style={styles.docsProgressSubtitle}>
              {uploadedCount} de {DOCUMENTS.length} enviados
            </Text>
          </View>

          <Text style={styles.docsProgressPercent}>{progress}%</Text>
        </View>

        <View style={styles.progressTrackDocs}>
          <Animated.View
            layout={LinearTransition.duration(350)}
            style={[
              styles.progressFillDocs,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>
      </Animated.View>

      <View style={styles.documentsList}>
        {DOCUMENTS.map((document, index) => {
          const file = files[document.type];
          const isPicking = pickingType === document.type;

          return (
            <Animated.View
              key={document.type}
              entering={FadeInUp.duration(400).delay(100 + index * 60)}
              layout={LinearTransition.duration(250)}
            >
              <View
                style={[
                  styles.documentCard,
                  file && styles.documentCardUploaded,
                ]}
              >
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
                  <View style={styles.documentTitleRow}>
                    <Text style={styles.documentTitle} numberOfLines={1}>
                      {document.title}
                    </Text>

                    {document.required && (
                      <Text style={styles.required}>*</Text>
                    )}
                  </View>

                  <Text style={styles.documentDescription} numberOfLines={1}>
                    {file ? file.fileName : document.description}
                  </Text>
                </View>

                {file && (
                  <View style={styles.uploadedCheck}>
                    <Ionicons name="checkmark" size={15} color="#FFFFFF" />
                  </View>
                )}

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
            </Animated.View>
          );
        })}
      </View>

      {missingRequired.length > 0 && (
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={styles.warningCard}
        >
          <Ionicons name="alert-circle-outline" size={19} color="#D97706" />

          <Text style={styles.warningText}>
            Ainda faltam {missingRequired.length} documento(s) obrigatório(s).
          </Text>
        </Animated.View>
      )}

      {missingRequired.length === 0 && uploadedCount > 0 && (
        <Animated.View
          entering={ZoomIn.duration(350)}
          style={styles.successCard}
        >
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={color.root.green}
          />

          <Text style={styles.successText}>
            Documentos obrigatórios completos.
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 25,
  },

  /* HEADER */

  topBar: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },

  backCircle: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },

  progressWrapper: {
    flex: 1,
  },

  progressTrack: {
    height: 6,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: color.root.secondary,
  },

  progressBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  stepCounter: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "700",
  },

  stepName: {
    fontSize: 10,
    color: color.root.secondary,
    fontWeight: "800",
  },

  headerSpacer: {
    width: 40,
  },

  /* FOOTER */

  footer: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 12 : 15,
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F3F3",
  },

  mainButton: {
    height: 57,
    borderRadius: 29,
    backgroundColor: color.root.secondary,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },

  disabledButton: {
    opacity: 0.55,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  buttonArrow: {
    position: "absolute",
    right: 7,
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* GENERAL */

  stepContainer: {
    paddingHorizontal: 23,
    paddingTop: 18,
  },

  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: "#151519",
    textAlign: "center",
    letterSpacing: -0.7,
  },

  brandText: {
    color: color.root.secondary,
  },

  subtitleCenter: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: "#858585",
    textAlign: "center",
    paddingHorizontal: 10,
  },

  form: {
    marginTop: 22,
    gap: 2,
  },

  field: {
    gap: 6,
    marginBottom: 12,
  },

  /* ROLE */

  roleHero: {
    height: 190,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 4,
  },

  roleHeroImage: {
    width: 145,
    height: 145,
    resizeMode: "contain",
    zIndex: 2,
  },

  heroGlow: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#F6F7F8",
  },

  roleCards: {
    gap: 11,
    marginTop: 24,
  },

  roleCard: {
    minHeight: 94,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.035,
    shadowRadius: 7,
    elevation: 1,
  },

  roleCardSelected: {
    borderColor: color.root.green,
    backgroundColor: "#F5FBF7",
  },

  roleIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4F4",
  },

  roleIconSelected: {
    backgroundColor: color.root.green,
  },

  roleContent: {
    flex: 1,
  },

  roleTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#151519",
  },

  roleDescription: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 16,
    color: "#777777",
  },

  /* INFO */

  infoHero: {
    height: 235,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#F8FAF9",
  },

  patternCircleLarge: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.10)",
    top: -115,
    right: -95,
  },

  patternCircleSmall: {
    position: "absolute",
    width: 165,
    height: 165,
    borderRadius: 83,
    borderWidth: 1,
    borderColor: "rgba(46,204,113,0.12)",
    bottom: -85,
    left: -55,
  },

  patternDotOne: {
    position: "absolute",
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(46,204,113,0.35)",
    top: 35,
    left: 45,
  },

  patternDotTwo: {
    position: "absolute",
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "rgba(46,204,113,0.15)",
    top: 65,
    right: 45,
  },

  patternDotThree: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(46,204,113,0.45)",
    bottom: 35,
    right: 80,
  },

  patternLineOne: {
    position: "absolute",
    width: 120,
    height: 1,
    backgroundColor: "rgba(46,204,113,0.12)",
    transform: [{ rotate: "-25deg" }],
    left: -25,
    top: 80,
  },

  patternLineTwo: {
    position: "absolute",
    width: 100,
    height: 1,
    backgroundColor: "rgba(46,204,113,0.10)",
    transform: [{ rotate: "25deg" }],
    right: -20,
    bottom: 70,
  },

  carGlow: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(46,204,113,0.08)",
  },

  infoCar: {
    width: 135,
    height: 145,
    resizeMode: "contain",
    zIndex: 2,
    marginTop: 15,
  },

  /* GENDER */

  genderRow: {
    flexDirection: "row",
    gap: 9,
  },

  genderButton: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  genderButtonSelected: {
    borderColor: color.root.green,
    backgroundColor: "#F2FAF5",
  },

  genderText: {
    fontSize: 13,
    color: "#777",
    fontWeight: "600",
  },

  genderTextSelected: {
    color: color.root.green,
    fontWeight: "800",
  },

  /* OTP */

  otpHero: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },

  otpHeroCircle: {
    width: 145,
    height: 145,
    borderRadius: 73,
    backgroundColor: "#F6F7F8",
    alignItems: "center",
    justifyContent: "center",
  },

  otpHeroImage: {
    width: 105,
    height: 105,
    resizeMode: "contain",
  },

  otpSubtitle: {
    marginTop: 9,
    fontSize: 14,
    lineHeight: 21,
    color: "#777",
    textAlign: "center",
  },

  highlight: {
    color: color.root.secondary,
    fontWeight: "900",
  },

  otpBox: {
    marginTop: 28,
    alignItems: "center",
  },

  timerContainer: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 10,
  },

  /* DOCUMENTS */

  documentsHero: {
    alignItems: "center",
    marginBottom: 12,
  },

  documentsIcon: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: "#EAF8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  docsProgressCard: {
    marginTop: 22,
    padding: 15,
    borderRadius: 17,
    backgroundColor: "#F7F8F8",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  docsProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },

  docsProgressTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#151519",
  },

  docsProgressSubtitle: {
    fontSize: 10,
    color: "#858585",
    marginTop: 3,
  },

  docsProgressPercent: {
    fontSize: 17,
    fontWeight: "900",
    color: color.root.green,
  },

  progressTrackDocs: {
    height: 7,
    borderRadius: 10,
    backgroundColor: "#DFEDE4",
    overflow: "hidden",
  },

  progressFillDocs: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: color.root.green,
  },

  documentsList: {
    gap: 9,
    marginTop: 15,
  },

  documentCard: {
    minHeight: 78,
    padding: 11,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },

  documentCardUploaded: {
    borderColor: "#CFEBDD",
    backgroundColor: "#FCFFFD",
  },

  documentIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  documentIconUploaded: {
    backgroundColor: "#EAF8F0",
  },

  documentInfo: {
    flex: 1,
    paddingRight: 5,
  },

  documentTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  documentTitle: {
    flexShrink: 1,
    fontSize: 12,
    fontWeight: "800",
    color: "#151519",
  },

  required: {
    color: "#D14343",
    fontSize: 13,
    marginLeft: 2,
  },

  documentDescription: {
    fontSize: 10,
    color: "#808080",
    marginTop: 3,
  },

  uploadedCheck: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: color.root.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  uploadButton: {
    minWidth: 57,
    height: 32,
    paddingHorizontal: 9,
    borderRadius: 10,
    backgroundColor: "#EFF8F2",
    alignItems: "center",
    justifyContent: "center",
  },

  replaceButton: {
    backgroundColor: "#F3F3F3",
  },

  uploadButtonText: {
    color: "#278653",
    fontSize: 10,
    fontWeight: "900",
  },

  replaceButtonText: {
    color: "#555",
  },

  warningCard: {
    marginTop: 13,
    padding: 12,
    borderRadius: 13,
    backgroundColor: "#FFF8EB",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  warningText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: "#A16207",
    fontWeight: "600",
  },

  successCard: {
    marginTop: 13,
    padding: 12,
    borderRadius: 13,
    backgroundColor: "#EAF8F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  successText: {
    fontSize: 11,
    color: "#278653",
    fontWeight: "700",
  },
});
