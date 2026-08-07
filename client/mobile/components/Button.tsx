import { Pressable, Text, PressableProps } from "react-native";
import color from "@/styles/color";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "outlined";
}

export default function Button({
  title,
  variant = "primary",
  ...props
}: ButtonProps) {
  const isOutlined = variant === "outlined";

  return (
    <Pressable
      {...props}
      style={[styles.container, isOutlined ? styles.outlined : styles.primary]}
    >
      <Text style={[styles.text, isOutlined && styles.outlinedText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = {
  container: {
    height: 56,
    borderRadius: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    width: "100%" as const,
  },

  primary: {
    backgroundColor: color.root.secondary,
  },

  outlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: color.root.secondary,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600" as const,
  },

  outlinedText: {
    color: color.root.secondary,
  },
};
