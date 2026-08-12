import { useRouter } from "expo-router";
import Button from "./Button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      title="Voltar"
      variant="outlined"
      onPress={() => {
        router.back();
      }}
    />
  );
}
