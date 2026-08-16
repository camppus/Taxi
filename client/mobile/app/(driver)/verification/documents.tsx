import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import color from "@/styles/color";

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

export default function DriverVerificationDocumentsScreen() {
  const router = useRouter();
  const [files, setFiles] = useState<
    Partial<Record<DriverDocumentType, UploadedDocument>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const [pickingType, setPickingType] = useState<DriverDocumentType | null>(
    null,
  );

  const requiredDocuments = DOCUMENTS.filter((document) => document.required);
  const uploadedCount = Object.keys(files).length;
  const missingRequired = requiredDocuments.filter(
    (document) => !files[document.type],
  );
  const progress = Math.round((uploadedCount / DOCUMENTS.length) * 100);
  const verificationStatus = submitted
    ? "EM ANÁLISE"
    : uploadedCount === 0
      ? "PENDENTE"
      : "EM PREPARAÇÃO";

  const apiPayload = useMemo(
    () =>
      Object.entries(files).map(([type, file]) => ({
        type: type as DriverDocumentType,
        fileUrl: file!.fileUrl,
      })),
    [files],
  );

  const pickFile = async (document: DocumentDefinition) => {
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
  };

  const submitDocuments = () => {
    if (missingRequired.length > 0) {
      Alert.alert(
        "Documentos obrigatórios em falta",
        `Envie: ${missingRequired.map((document) => document.title).join(", ")}.`,
      );
      return;
    }

    // Payload preparado conforme CreateDriverDocumentDto: { type, fileUrl, expiresAt? }.
    // A integração HTTP será feita quando a autenticação e o upload de ficheiros estiverem ligados.
    if (!apiPayload.length) return;
    setSubmitted(true);
    Alert.alert(
      "Documentos enviados",
      "Os seus documentos foram enviados para análise. Avisaremos assim que a verificação terminar.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={10}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={color.root.secondary}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Verificação de motorista</Text>
        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={27}
              color={color.root.green}
            />
          </View>
          <View style={styles.heroText}>
            <Text style={styles.title}>Verifique a sua conta</Text>
            <Text style={styles.subtitle}>
              Envie os documentos para poder publicar viagens e aceitar
              passageiros.
            </Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusTop}>
            <View>
              <Text style={styles.statusLabel}>ESTADO DA VERIFICAÇÃO</Text>
              <Text style={styles.statusValue}>{verificationStatus}</Text>
            </View>
            <View style={[styles.badge, submitted && styles.badgeReview]}>
              <Ionicons
                name={submitted ? "time-outline" : "alert-circle-outline"}
                size={14}
                color={submitted ? "#A56800" : "#7A5D17"}
              />
              <Text
                style={[styles.badgeText, submitted && styles.badgeReviewText]}
              >
                {submitted ? "Em análise" : "Pendente"}
              </Text>
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {uploadedCount} de {DOCUMENTS.length} documentos adicionados
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{uploadedCount}</Text>
              <Text style={styles.statLabel}>enviados</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>
                {submitted ? uploadedCount : 0}
              </Text>
              <Text style={styles.statLabel}>em análise</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{missingRequired.length}</Text>
              <Text style={styles.statLabel}>obrigatórios</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Os seus documentos</Text>
            <Text style={styles.sectionSubtitle}>
              Os campos marcados com * são obrigatórios.
            </Text>
          </View>
        </View>
        <View style={styles.list}>
          {DOCUMENTS.map((document) => {
            const file = files[document.type];
            const isPicking = pickingType === document.type;
            const status = file
              ? submitted
                ? "Em análise"
                : "Pronto para envio"
              : "Não enviado";
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
                    size={21}
                    color={file ? color.root.green : "#737373"}
                  />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>
                    {document.title}
                    {document.required && (
                      <Text style={styles.required}> *</Text>
                    )}
                  </Text>
                  <Text style={styles.documentDescription} numberOfLines={1}>
                    {file ? file.fileName : document.description}
                  </Text>
                  <View style={styles.documentStatus}>
                    <Ionicons
                      name={
                        file
                          ? submitted
                            ? "time-outline"
                            : "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={13}
                      color={
                        file
                          ? submitted
                            ? "#B7791F"
                            : color.root.green
                          : "#9CA3AF"
                      }
                    />
                    <Text
                      style={[
                        styles.documentStatusText,
                        file && !submitted && styles.documentStatusReady,
                        submitted && file && styles.documentStatusReview,
                      ]}
                    >
                      {status}
                    </Text>
                  </View>
                </View>
                <Pressable
                  disabled={isPicking || submitted}
                  onPress={() => pickFile(document)}
                  style={[
                    styles.uploadButton,
                    file && styles.replaceButton,
                    submitted && styles.uploadButtonDisabled,
                  ]}
                >
                  {isPicking ? (
                    <Ionicons
                      name="hourglass-outline"
                      size={17}
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

        <View style={styles.infoBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#587063" />
          <Text style={styles.infoText}>
            Os seus documentos são usados apenas para validar a sua conta e são
            tratados de forma segura.
          </Text>
        </View>

        <View style={styles.footer}>
          <Pressable
            disabled={submitted}
            onPress={submitDocuments}
            style={[
              styles.submitButton,
              (missingRequired.length > 0 || submitted) &&
                styles.submitButtonDisabled,
            ]}
          >
            <Text style={styles.submitText}>
              {submitted ? "Documentos em análise" : "Enviar para verificação"}
            </Text>
            <Ionicons
              name={submitted ? "time-outline" : "arrow-forward"}
              size={19}
              color="#fff"
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#F5F5F5",
  },
  headerTitle: { fontSize: 16, fontWeight: "800", color: color.root.secondary },
  headerSpace: { width: 40 },
  content: { padding: 16, paddingBottom: 22 },
  hero: { flexDirection: "row", gap: 12, paddingTop: 6, paddingBottom: 20 },
  heroIcon: {
    width: 49,
    height: 49,
    borderRadius: 16,
    backgroundColor: "#EAF8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: { flex: 1 },
  title: { fontSize: 20, fontWeight: "800", color: color.root.secondary },
  subtitle: { marginTop: 4, fontSize: 12, lineHeight: 17, color: "#737373" },
  statusCard: {
    borderRadius: 19,
    backgroundColor: "#F7FBF8",
    padding: 15,
    borderWidth: 1,
    borderColor: "#E1F1E6",
  },
  statusTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLabel: {
    color: "#737373",
    fontWeight: "800",
    fontSize: 9,
    letterSpacing: 0.75,
  },
  statusValue: {
    color: color.root.secondary,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF3CF",
    paddingHorizontal: 9,
    height: 28,
    borderRadius: 14,
  },
  badgeReview: { backgroundColor: "#FFF3CF" },
  badgeText: { color: "#7A5D17", fontSize: 11, fontWeight: "800" },
  badgeReviewText: { color: "#A56800" },
  progressTrack: {
    overflow: "hidden",
    height: 7,
    borderRadius: 4,
    backgroundColor: "#DCEDE2",
    marginTop: 15,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: color.root.green,
  },
  progressText: { fontSize: 11, color: "#587063", marginTop: 6 },
  statsRow: { marginTop: 14, flexDirection: "row", alignItems: "center" },
  stat: { flex: 1, alignItems: "center" },
  statNumber: { color: color.root.secondary, fontSize: 16, fontWeight: "800" },
  statLabel: { color: "#737373", fontSize: 10, marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: "#DDEAE1" },
  sectionHeader: { marginTop: 24, marginBottom: 11 },
  sectionTitle: {
    fontSize: 16,
    color: color.root.secondary,
    fontWeight: "800",
  },
  sectionSubtitle: { fontSize: 11, color: "#737373", marginTop: 3 },
  list: { gap: 9 },
  documentCard: {
    minHeight: 88,
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
  documentTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: color.root.secondary,
  },
  required: { color: "#D14343" },
  documentDescription: { fontSize: 11, color: "#737373", marginTop: 3 },
  documentStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 5,
  },
  documentStatusText: { fontSize: 10, color: "#9CA3AF", fontWeight: "600" },
  documentStatusReady: { color: "#278653" },
  documentStatusReview: { color: "#B7791F" },
  uploadButton: {
    minWidth: 58,
    height: 33,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F8F3",
  },
  replaceButton: { backgroundColor: "#F4F4F5" },
  uploadButtonDisabled: { opacity: 0.65 },
  uploadButtonText: { color: "#278653", fontSize: 11, fontWeight: "800" },
  replaceButtonText: { color: "#52525B" },
  infoBox: {
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#F1F7F3",
    marginTop: 17,
  },
  infoText: { flex: 1, color: "#587063", fontSize: 11, lineHeight: 16 },
  footer: {
    paddingTop: 12,
    paddingBottom: 15,
    marginBottom: 40,
  },
  submitButton: {
    height: 53,
    backgroundColor: color.root.green,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitButtonDisabled: { backgroundColor: "#A7DDBB" },
  submitText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
