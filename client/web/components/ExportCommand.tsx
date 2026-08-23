"use client";

import * as React from "react";
import Image from "next/image";
import { Download, ChevronDown, Loader2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import csvIcon from "@/assets/icons/document.png";
import excelIcon from "@/assets/icons/excel.png";
import pdfIcon from "@/assets/icons/pdf.png";

type ExportType = "csv" | "excel" | "pdf";

interface ExportCommandProps {
  title: string;
  onExport?: (type: ExportType) => void | Promise<void>;
}

const EXPORT_OPTIONS = [
  {
    type: "csv" as const,
    label: "CSV",
    description: "Dados separados por vírgulas",
    extension: ".csv",
    icon: csvIcon,
  },
  {
    type: "excel" as const,
    label: "Excel",
    description: "Planilha do Microsoft Excel",
    extension: ".xlsx",
    icon: excelIcon,
  },
  {
    type: "pdf" as const,
    label: "PDF",
    description: "Documento pronto para impressão",
    extension: ".pdf",
    icon: pdfIcon,
  },
];

export function ExportCommand({ title, onExport }: ExportCommandProps) {
  const [loading, setLoading] = React.useState<ExportType | null>(null);

  const [completed, setCompleted] = React.useState<ExportType | null>(null);

  const handleExport = async (type: ExportType) => {
    if (loading) return;

    setLoading(type);
    setCompleted(null);

    try {
      await onExport?.(type);

      setCompleted(type);

      setTimeout(() => {
        setCompleted(null);
      }, 1400);
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="
              h-10
              gap-2
              rounded-xl
              border-border/60
              bg-card
              px-3.5
              text-sm
              font-medium
              shadow-sm
              hover:bg-muted/50
            "
          >
            <Download size={15} />
            Exportar
            <ChevronDown size={14} className="text-muted-foreground" />
          </Button>
        }
      />

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="
          w-[310px]
          rounded-2xl
          border-border/60
          bg-background
          p-2
          shadow-xl
          backdrop-blur-xl
        "
      >
        {/* Header */}
        <div className="px-2.5 py-2">
          <p className="text-sm font-semibold">Exportar dados</p>

          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
            {title}
          </p>
        </div>

        <DropdownMenuSeparator className="my-1.5" />

        {/* Formats */}
        <div className="space-y-0.5">
          {EXPORT_OPTIONS.map((option) => {
            const isLoading = loading === option.type;
            const isCompleted = completed === option.type;

            return (
              <DropdownMenuItem
                key={option.type}
                disabled={!!loading}
                onClick={() => handleExport(option.type)}
                className="
                  group
                  cursor-pointer
                  rounded-xl
                  px-2.5
                  py-2.5
                  outline-none
                  focus:bg-muted
                "
              >
                {/* Icon */}
                <div
                  className="
                    flex
                    size-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-muted/50
                    transition-all
                    group-hover:bg-background
                  "
                >
                  {isLoading ? (
                    <Loader2
                      size={17}
                      className="animate-spin text-muted-foreground"
                    />
                  ) : isCompleted ? (
                    <Check
                      size={18}
                      strokeWidth={2.5}
                      className="text-emerald-500"
                    />
                  ) : (
                    <Image
                      src={option.icon}
                      alt={option.label}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="ml-2.5 flex min-w-0 flex-1 flex-col">
                  <span className="text-xs font-semibold">
                    {isLoading
                      ? "A processar..."
                      : isCompleted
                        ? "Exportado"
                        : option.label}
                  </span>

                  <span className="truncate text-[10px] text-muted-foreground">
                    {isLoading
                      ? "A preparar o ficheiro"
                      : isCompleted
                        ? "Ficheiro gerado com sucesso"
                        : option.description}
                  </span>
                </div>

                {/* Extension */}
                {!isLoading && !isCompleted && (
                  <span className="text-[10px] text-muted-foreground">
                    {option.extension}
                  </span>
                )}
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator className="my-1.5" />

        <p className="px-2.5 py-1.5 text-[10px] leading-relaxed text-muted-foreground">
          O ficheiro será gerado com os dados atualmente filtrados.
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
