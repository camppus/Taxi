import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import SectionCard from "@/components/vehicles/register/SectionCard";
import ChipSelect from "@/components/vehicles/register/ChipSelect";
import FormInput from "@/components/vehicles/register/FormInput";
import DocumentUploadRow, {
  PickedDocument,
} from "@/components/vehicles/register/DocumentUploadRow";
import color from "@/styles/color";
import {
  FuelType,
  Transmission,
  VehicleDocumentTypeDto,
} from "@/types/Vehicle";

const VEHICLE_TYPES: { value: string; label: string }[] = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "hatchback", label: "Hatchback" },
  { value: "van", label: "Van" },
  { value: "minibus", label: "Minibus" },
];

const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: "PETROL", label: "Gasolina" },
  { value: "DIESEL", label: "Diesel" },
  { value: "HYBRID", label: "Híbrido" },
  { value: "ELECTRIC", label: "Elétrico" },
];

const TRANSMISSIONS: { value: Transmission; label: string }[] = [
  { value: "AUTOMATIC", label: "Automática" },
  { value: "MANUAL", label: "Manual" },
];

interface FormState {
  name: string;
  description: string;
  vehicleTypeId: string | null;
  brand: string;
  model: string;
  year: string;
  color: string;
  plateNumber: string;
  totalSeats: string;
  passengerSeats: string;
  fuelType: FuelType | null;
  transmission: Transmission | null;
  photo: string | null;
  documents: Record<
    Exclude<VehicleDocumentTypeDto, VehicleDocumentTypeDto.PHOTO>,
    PickedDocument | null
  >;
}

const INITIAL_STATE: FormState = {
  name: "",
  description: "",
  vehicleTypeId: null,
  brand: "",
  model: "",
  year: "",
  color: "",
  plateNumber: "",
  totalSeats: "",
  passengerSeats: "",
  fuelType: null,
  transmission: null,
  photo: null,
  documents: {
    [VehicleDocumentTypeDto.REGISTRATION]: null,
    [VehicleDocumentTypeDto.INSURANCE]: null,
    [VehicleDocumentTypeDto.INSPECTION]: null,
  },
};

export default function VehicleRegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateDocument(
    type: Exclude<VehicleDocumentTypeDto, VehicleDocumentTypeDto.PHOTO>,
    doc: PickedDocument | null,
  ) {
    setForm((prev) => ({
      ...prev,
      documents: { ...prev.documents, [type]: doc },
    }));
  }

  async function handlePickPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      aspect: [4, 3],
      allowsEditing: true,
    });

    if (!result.canceled) {
      update("photo", result.assets[0].uri);
    }
  }

  const errors = {
    name: !form.name.trim(),
    vehicleTypeId: !form.vehicleTypeId,
    brand: !form.brand.trim(),
    model: !form.model.trim(),
    year: !/^\d{4}$/.test(form.year),
    color: !form.color.trim(),
    plateNumber: !form.plateNumber.trim(),
    totalSeats: !form.totalSeats || Number(form.totalSeats) <= 0,
    passengerSeats: !form.passengerSeats || Number(form.passengerSeats) <= 0,
    fuelType: !form.fuelType,
    transmission: !form.transmission,
    photo: !form.photo,
    registration: !form.documents[VehicleDocumentTypeDto.REGISTRATION],
    insurance: !form.documents[VehicleDocumentTypeDto.INSURANCE],
    inspection: !form.documents[VehicleDocumentTypeDto.INSPECTION],
  };

  const hasErrors = Object.values(errors).some(Boolean);

  async function handleSubmit() {
    if (hasErrors) {
      setShowErrors(true);
      Alert.alert(
        "Faltam informações",
        "Preencha todos os campos obrigatórios e anexe os documentos pedidos.",
      );
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      Alert.alert(
        "Veículo enviado para análise",
        "Vamos verificar os documentos e avisamos assim que for aprovado.",
        [{ text: "OK", onPress: () => router.back() }],
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color="#1C1C1E" />
        </Pressable>
        <Text style={styles.headerTitle}>Registrar veículo</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Foto principal */}
        <SectionCard
          title="Foto do veículo"
          subtitle="Uma foto clara, de frente ou 3/4"
        >
          <Pressable
            onPress={handlePickPhoto}
            style={[
              styles.photoBox,
              showErrors && errors.photo && styles.photoBoxError,
            ]}
          >
            {form.photo ? (
              <Image source={{ uri: form.photo }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera-outline" size={26} color="#8E8E93" />
                <Text style={styles.photoPlaceholderText}>Adicionar foto</Text>
              </View>
            )}
          </Pressable>
        </SectionCard>
        {/* Informações básicas */}
        <SectionCard title="Informações do veículo">
          <FormInput
            label="Nome de exibição"
            required
            placeholder="Ex: Toyota Corolla Branco"
            value={form.name}
            onChangeText={(v) => update("name", v)}
            error={showErrors && errors.name}
          />

          <FormInput
            label="Descrição"
            placeholder="Ex: Sedan confortável e climatizado"
            value={form.description}
            onChangeText={(v) => update("description", v)}
            multiline
            style={{ minHeight: 70, textAlignVertical: "top" }}
          />

          <Text style={styles.fieldLabel}>
            Tipo de veículo<Text style={styles.required}> *</Text>
          </Text>
          <View style={{ marginBottom: 14 }}>
            <ChipSelect
              options={VEHICLE_TYPES}
              value={form.vehicleTypeId}
              onChange={(v) => update("vehicleTypeId", v)}
              error={showErrors && errors.vehicleTypeId}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <FormInput
                label="Marca"
                required
                placeholder="Toyota"
                value={form.brand}
                onChangeText={(v) => update("brand", v)}
                error={showErrors && errors.brand}
              />
            </View>
            <View style={styles.half}>
              <FormInput
                label="Modelo"
                required
                placeholder="Corolla"
                value={form.model}
                onChangeText={(v) => update("model", v)}
                error={showErrors && errors.model}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <FormInput
                label="Ano"
                required
                placeholder="2022"
                keyboardType="number-pad"
                maxLength={4}
                value={form.year}
                onChangeText={(v) => update("year", v)}
                error={showErrors && errors.year}
              />
            </View>
            <View style={styles.half}>
              <FormInput
                label="Cor"
                required
                placeholder="Branco"
                value={form.color}
                onChangeText={(v) => update("color", v)}
                error={showErrors && errors.color}
              />
            </View>
          </View>

          <FormInput
            label="Matrícula"
            required
            placeholder="LD-00-00-AA"
            autoCapitalize="characters"
            value={form.plateNumber}
            onChangeText={(v) => update("plateNumber", v)}
            error={showErrors && errors.plateNumber}
          />
        </SectionCard>
        {/* Capacidade e mecânica */}
        <SectionCard title="Capacidade e mecânica">
          <View style={styles.row}>
            <View style={styles.half}>
              <FormInput
                label="Total de lugares"
                required
                placeholder="5"
                keyboardType="number-pad"
                value={form.totalSeats}
                onChangeText={(v) => update("totalSeats", v)}
                error={showErrors && errors.totalSeats}
              />
            </View>
            <View style={styles.half}>
              <FormInput
                label="Lugares p/ passageiros"
                required
                placeholder="4"
                keyboardType="number-pad"
                value={form.passengerSeats}
                onChangeText={(v) => update("passengerSeats", v)}
                error={showErrors && errors.passengerSeats}
              />
            </View>
          </View>

          <Text style={styles.fieldLabel}>
            Combustível<Text style={styles.required}> *</Text>
          </Text>
          <View style={{ marginBottom: 14 }}>
            <ChipSelect
              options={FUEL_TYPES}
              value={form.fuelType}
              onChange={(v) => update("fuelType", v)}
              error={showErrors && errors.fuelType}
            />
          </View>

          <Text style={styles.fieldLabel}>
            Câmbio<Text style={styles.required}> *</Text>
          </Text>
          <ChipSelect
            options={TRANSMISSIONS}
            value={form.transmission}
            onChange={(v) => update("transmission", v)}
            error={showErrors && errors.transmission}
          />
        </SectionCard>
        {/* Documentos */}
        <SectionCard
          title="Documentos do veículo"
          subtitle="Necessários para a verificação e aprovação"
        >
          <DocumentUploadRow
            label="Registo / Livrete"
            required
            value={form.documents[VehicleDocumentTypeDto.REGISTRATION]}
            onChange={(doc) =>
              updateDocument(VehicleDocumentTypeDto.REGISTRATION, doc)
            }
            error={showErrors && errors.registration}
          />
          <DocumentUploadRow
            label="Seguro"
            required
            value={form.documents[VehicleDocumentTypeDto.INSURANCE]}
            onChange={(doc) =>
              updateDocument(VehicleDocumentTypeDto.INSURANCE, doc)
            }
            error={showErrors && errors.insurance}
          />
          <DocumentUploadRow
            label="Inspeção"
            required
            value={form.documents[VehicleDocumentTypeDto.INSPECTION]}
            onChange={(doc) =>
              updateDocument(VehicleDocumentTypeDto.INSPECTION, doc)
            }
            error={showErrors && errors.inspection}
          />
        </SectionCard>
        <Pressable
          onPress={handleSubmit}
          disabled={submitting}
          style={[
            styles.submitButton,
            submitting && styles.submitButtonDisabled,
          ]}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Registrar veículo</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  half: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  required: {
    color: "#DC2626",
  },
  photoBox: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
  },
  photoBoxError: {
    borderColor: "#DC2626",
  },
  photoPreview: {
    width: "100%",
    height: 160,
  },
  photoPlaceholder: {
    width: "100%",
    height: 140,
    backgroundColor: "#F2F2F7",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  photoPlaceholderText: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 6,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: color.root.green,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
