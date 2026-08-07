import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

interface DatePickerProps {
  value?: Date;
  onChange(date: Date): void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false);

  function formatDate(date?: Date) {
    if (!date) return "Escolha a data";

    return date.toLocaleDateString("pt-AO");
  }

  return (
    <View>
      <Pressable
        onPress={() => setOpen(!open)}
        style={{
          height: 55,
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 18,
          paddingHorizontal: 16,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: value ? "#000" : "#999",
          }}
        >
          {formatDate(value)}
        </Text>
      </Pressable>

      {open && (
        <View
          style={{
            marginTop: 10,
            borderRadius: 20,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#ddd",
          }}
        >
          <Calendar
            maxDate={new Date().toISOString().split("T")[0]}

            onDayPress={(day) => {
              const date = new Date(day.dateString);

              onChange(date);

              setOpen(false);
            }}

            markedDates={
              value
                ? {
                    [value.toISOString().split("T")[0]]: {
                      selected: true,
                    },
                  }
                : {}
            }
          />
        </View>
      )}
    </View>
  );
}
