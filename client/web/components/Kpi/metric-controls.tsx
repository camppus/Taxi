"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { HugeiconsIcon } from "@hugeicons/react";
import { Chart01Icon, ChartLineData02Icon } from "@hugeicons/core-free-icons";

import type { ChartView } from "./metric-chart";

export interface PeriodOption {
  label: string;
  points?: number;
}

interface PeriodSelectProps {
  value: string;
  options: PeriodOption[];
  onChange: (option: PeriodOption) => void;
  accentText?: string;
}

export function PeriodSelect({ value, options, onChange }: PeriodSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(selected) => {
        const option = options.find((item) => item.label === selected);

        if (option) {
          onChange(option);
        }
      }}
    >
      <SelectTrigger className="h-8 w-32 border-border/60 bg-background/50 text-xs">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.label} value={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

interface ViewToggleProps {
  value: ChartView;
  onChange: (value: ChartView) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <ToggleGroup
      value={value as any}
      onValueChange={(next) => {
        if (next) {
          onChange(next as any as ChartView);
        }
      }}
      className="pointer-events-auto h-7 rounded-md border border-border/60 bg-background/50 p-0.5"
    >
      <ToggleGroupItem
        value="curve"
        aria-label="Gráfico de linha"
        className="size-6 rounded-sm p-0"
      >
        <HugeiconsIcon icon={ChartLineData02Icon} size={13} />
      </ToggleGroupItem>

      <ToggleGroupItem
        value="bar"
        aria-label="Gráfico de barras"
        className="size-6 rounded-sm p-0"
      >
        <HugeiconsIcon icon={Chart01Icon} size={13} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
