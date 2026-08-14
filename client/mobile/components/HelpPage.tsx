import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import colors from "@/styles/color";
import { handleCall, handleEmail, openLink } from "@/util/lib";

export default function HelpPage() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [faqRole, setFaqRole] = useState<"passenger" | "driver">("passenger");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const passengerFaqs = [
    {
      question: "Como faço para pedir uma viagem?",
      answer:
        "Escolhe o teu destino, confirma o ponto de partida e seleciona a viagem ou motorista disponível. Depois confirma o pedido.",
    },
    {
      question: "Posso cancelar uma viagem?",
      answer:
        "Sim. Podes cancelar a viagem antes do início. Dependendo do momento do cancelamento, podem existir regras ou taxas aplicáveis.",
    },
    {
      question: "Como funciona uma viagem partilhada?",
      answer:
        "Uma viagem partilhada permite que outros passageiros com uma rota semelhante entrem na mesma viagem e dividam o custo.",
    },
    {
      question: "O motorista consegue ver a minha localização?",
      answer:
        "Durante uma viagem, podes permitir que o motorista veja a tua localização para facilitar o encontro e o acompanhamento da viagem.",
    },
    {
      question: "Como contacto o motorista?",
      answer:
        "Podes contactar o motorista através do chat ou da opção de chamada, caso as chamadas estejam permitidas.",
    },
    {
      question: "O que faço se esquecer um objeto no carro?",
      answer:
        "Entra em contacto com o suporte o mais rápido possível e informa os detalhes da viagem para ajudarmos a localizar o motorista.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "O valor da viagem é apresentado antes da confirmação. O método de pagamento disponível depende das opções configuradas na tua conta.",
    },
  ];

  const driverFaqs = [
    {
      question: "Como publico uma viagem?",
      answer:
        "Define a origem, destino, horário, preço e número de lugares disponíveis. Depois publica a viagem para que passageiros possam reservá-la.",
    },
    {
      question: "Posso cancelar uma viagem publicada?",
      answer:
        "Sim, mas deves cancelar o mais cedo possível para que os passageiros sejam informados e possam procurar outra opção.",
    },
    {
      question: "Como funciona o compartilhamento de viagens?",
      answer:
        "Outros passageiros podem entrar na tua rota quando tiverem uma origem e destino compatíveis, permitindo dividir o custo da viagem.",
    },
    {
      question: "Como recebo o dinheiro da viagem?",
      answer:
        "Depois da viagem ser concluída, o valor correspondente é processado de acordo com o método de pagamento configurado na tua conta.",
    },
    {
      question: "Posso falar com o passageiro?",
      answer:
        "Sim. Durante uma reserva ativa podes usar o chat e, quando permitido, efetuar uma chamada.",
    },
    {
      question: "O que acontece se o passageiro não aparecer?",
      answer:
        "A situação deve ser registada na viagem. Em caso de conflito ou necessidade de suporte, a equipa poderá analisar o caso.",
    },
    {
      question: "Como atualizo os meus dados?",
      answer:
        "Vai ao teu perfil para atualizar os dados permitidos. Informações que exigem verificação podem precisar de confirmação adicional.",
    },
  ];

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      Alert.alert("Mensagem vazia", "Escreve uma mensagem antes de enviar.");
      return;
    }

    setSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setMessage("");

      Alert.alert(
        "Mensagem enviada",
        "A nossa equipa recebeu a tua mensagem e irá responder assim que possível.",
      );
    } finally {
      setSending(false);
    }
  };
  const scrollRef = useRef<ScrollView>(null);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Ajuda e suporte</Text>
            <Text style={styles.subtitle}>Estamos aqui para ajudar</Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="headset-outline"
              size={22}
              color={colors.root.green}
            />
          </View>
        </View>

        {/* Quick contact */}
        <View style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <View style={styles.contactIcon}>
              <Ionicons
                name="chatbubbles-outline"
                size={22}
                color={colors.root.primary}
              />
            </View>

            <View style={styles.contactHeaderContent}>
              <Text style={styles.contactTitle}>Fala com a nossa equipa</Text>

              <Text style={styles.contactDescription}>
                Escolhe uma das formas abaixo para entrares em contacto
                connosco.
              </Text>
            </View>
          </View>

          <View style={styles.contactActions}>
            <Pressable
              onPress={() => {
                handleCall("+244 923 000 000");
              }}
              style={({ pressed }) => [
                styles.contactButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="call-outline"
                size={19}
                color={colors.root.green}
              />

              <View>
                <Text style={styles.contactButtonTitle}>Ligar</Text>
                <Text style={styles.contactButtonText}>+244 923 000 000</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => {
                handleEmail("suporte@mandavir.ao");
              }}
              style={({ pressed }) => [
                styles.contactButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={19}
                color={colors.root.green}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.contactButtonTitle}>Email</Text>
                <Text style={styles.contactButtonText} numberOfLines={1}>
                  suporte@mandavir.ao
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Envia-nos uma mensagem</Text>

          <View style={styles.messageCard}>
            <Text style={styles.inputLabel}>Como podemos ajudar?</Text>

            <TextInput
              value={message}
              onChangeText={(text) => {
                if (text.length <= 500) {
                  setMessage(text);
                }
              }}
              placeholder="Descreve o teu problema ou dúvida..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              style={styles.messageInput}
              onFocus={() => {
                setTimeout(() => {
                  scrollRef.current?.scrollTo({
                    y: 180,
                    animated: true,
                  });
                }, 150);
              }}
            />

            <View style={styles.messageFooter}>
              <Text style={styles.characterCount}>{message.length}/500</Text>

              <Pressable
                onPress={handleSend}
                disabled={!message.trim() || sending}
                style={({ pressed }) => [
                  styles.sendButton,
                  (!message.trim() || sending) && styles.sendButtonDisabled,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name={sending ? "time-outline" : "send-outline"}
                  size={17}
                  color={colors.root.primary}
                />

                <Text style={styles.sendButtonText}>
                  {sending ? "A enviar..." : "Enviar mensagem"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contactos da empresa</Text>

          <View style={styles.card}>
            <ContactRow
              icon="location-outline"
              title="Morada"
              value="Luanda, Angola"
            />

            <View style={styles.separator} />

            <ContactRow
              icon="time-outline"
              title="Horário de atendimento"
              value="Segunda - Sexta · 08:00 - 18:00"
            />

            <View style={styles.separator} />

            <ContactRow
              icon="mail-outline"
              title="Email"
              value="suporte@mandavir.ao"
            />

            <View style={styles.separator} />

            <ContactRow
              icon="call-outline"
              title="Telefone"
              value="+244 923 000 000"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segue-nos</Text>

          <View style={styles.socialCard}>
            <SocialButton
              icon="logo-instagram"
              label="Instagram"
              onPress={() => openLink("https://instagram.com/mandavir")}
            />

            <SocialButton
              icon="logo-facebook"
              label="Facebook"
              onPress={() => openLink("https://facebook.com/mandavir")}
            />

            <SocialButton
              icon="logo-tiktok"
              label="TikTok"
              onPress={() => openLink("https://tiktok.com/@mandavir")}
            />

            <SocialButton
              icon="logo-linkedin"
              label="LinkedIn"
              onPress={() => openLink("https://linkedin.com/company/mandavir")}
            />
          </View>
        </View>

        <Pressable
          onPress={() => {
            setShowFaq((current) => !current);
            setOpenFaq(null);
          }}
          style={({ pressed }) => [styles.faqButton, pressed && styles.pressed]}
        >
          <View style={styles.faqIcon}>
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={colors.root.green}
            />
          </View>

          <View style={styles.faqContent}>
            <Text style={styles.faqTitle}>Perguntas frequentes</Text>

            <Text style={styles.faqDescription}>
              Dúvidas para passageiros e motoristas.
            </Text>
          </View>

          <Ionicons
            name={showFaq ? "chevron-up" : "chevron-forward"}
            size={20}
            color="#9CA3AF"
          />
        </Pressable>

        {showFaq && (
          <View style={styles.faqPanel}>
            <View style={styles.faqTabs}>
              <Pressable
                onPress={() => {
                  setFaqRole("passenger");
                  setOpenFaq(null);
                }}
                style={[
                  styles.faqTab,
                  faqRole === "passenger" && styles.faqTabActive,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={16}
                  color={
                    faqRole === "passenger"
                      ? colors.root.primary
                      : colors.root.secondary
                  }
                />

                <Text
                  style={[
                    styles.faqTabText,
                    faqRole === "passenger" && styles.faqTabTextActive,
                  ]}
                >
                  Passageiro
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setFaqRole("driver");
                  setOpenFaq(null);
                }}
                style={[
                  styles.faqTab,
                  faqRole === "driver" && styles.faqTabActive,
                ]}
              >
                <Ionicons
                  name="car-outline"
                  size={16}
                  color={
                    faqRole === "driver"
                      ? colors.root.primary
                      : colors.root.secondary
                  }
                />

                <Text
                  style={[
                    styles.faqTabText,
                    faqRole === "driver" && styles.faqTabTextActive,
                  ]}
                >
                  Motorista
                </Text>
              </Pressable>
            </View>

            <View style={styles.faqQuestions}>
              {(faqRole === "passenger" ? passengerFaqs : driverFaqs).map(
                (faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <Pressable
                      key={faq.question}
                      onPress={() => setOpenFaq(isOpen ? null : index)}
                      style={styles.faqQuestion}
                    >
                      <View style={styles.faqQuestionTop}>
                        <Text style={styles.faqQuestionText}>
                          {faq.question}
                        </Text>

                        <Ionicons
                          name={isOpen ? "chevron-up" : "chevron-down"}
                          size={18}
                          color="#8A8A8A"
                        />
                      </View>

                      {isOpen && (
                        <Text style={styles.faqAnswer}>{faq.answer}</Text>
                      )}
                    </Pressable>
                  );
                },
              )}
            </View>
          </View>
        )}

        <Text style={styles.footer}>MandaVir • Suporte ao cliente</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ContactRow({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.contactRow}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={19} color={colors.root.secondary} />
      </View>

      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={21} color={colors.root.secondary} />

      <Text style={styles.socialText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
    marginBottom: 22,
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

  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EAF7F1",
    alignItems: "center",
    justifyContent: "center",
  },

  contactCard: {
    backgroundColor: colors.root.secondary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 26,
  },

  contactHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.root.green,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  contactHeaderContent: {
    flex: 1,
  },

  contactTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.root.primary,
  },

  contactDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
    color: "rgba(255,255,255,0.65)",
  },

  contactActions: {
    marginTop: 18,
    gap: 9,
  },

  contactButton: {
    minHeight: 58,
    borderRadius: 14,
    paddingHorizontal: 13,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  contactButtonTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.primary,
  },

  contactButtonText: {
    marginTop: 2,
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
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

  messageCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 14,
    borderColor: "#ebeef0",
    borderWidth: 1,
  },

  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#969696",
    marginBottom: 8,
  },

  messageInput: {
    minHeight: 130,
    padding: 0,
    fontSize: 14,
    lineHeight: 20,
    color: colors.root.secondary,
  },

  messageFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },

  characterCount: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  sendButton: {
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.root.secondary,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sendButtonDisabled: {
    opacity: 0.45,
  },

  sendButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.primary,
  },

  card: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    paddingHorizontal: 16,
    overflow: "hidden",
  },

  contactRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
  },

  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F1F3F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  rowContent: {
    flex: 1,
  },

  rowTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#969696",
  },

  rowValue: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  separator: {
    height: 1,
    backgroundColor: "#EEEEEE",
  },

  socialCard: {
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 10,
    gap: 8,
  },

  socialButton: {
    height: 48,
    borderRadius: 13,
    paddingHorizontal: 13,
    backgroundColor: "#F7F8F8",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  socialText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.root.secondary,
  },

  faqButton: {
    minHeight: 72,
    borderRadius: 18,
    backgroundColor: colors.root.primary,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  faqIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EAF7F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  faqContent: {
    flex: 1,
  },

  faqTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  faqDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 15,
    color: "#888",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  footer: {
    textAlign: "center",
    marginTop: 22,
    fontSize: 11,
    color: "#A0A0A0",
    marginBottom: 100,
  },

  faqPanel: {
    marginTop: 10,
    backgroundColor: colors.root.primary,
    borderRadius: 18,
    padding: 12,
  },

  faqTabs: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  faqTab: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F3F4F4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  faqTabActive: {
    backgroundColor: colors.root.secondary,
  },

  faqTabText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  faqTabTextActive: {
    color: colors.root.primary,
  },

  faqQuestions: {
    borderRadius: 14,
    overflow: "hidden",
  },

  faqQuestion: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "#F8F9FA",
    marginBottom: 6,
    borderRadius: 12,
  },

  faqQuestionTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  faqQuestionText: {
    flex: 1,
    paddingRight: 12,
    fontSize: 13,
    fontWeight: "800",
    color: colors.root.secondary,
  },

  faqAnswer: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    color: "#777",
  },
});
