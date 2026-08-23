"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  page: number;
  lastPage: number;
  totalItems: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  lastPage,
  totalItems,
  pageSize = 10,
  onPageChange,
  className = "",
}: PaginationProps) {
  const currentPage = Math.max(page, 1);
  const totalPages = Math.max(lastPage, 1);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const rangeEnd = Math.min(currentPage * pageSize, totalItems);

  const goTo = (target: number) => {
    const nextPage = Math.min(Math.max(target, 1), totalPages);

    if (nextPage !== currentPage) {
      onPageChange(nextPage);
    }
  };

  return (
    <div
      className={[
        "flex items-center justify-between gap-4",
        "border-t border-border/50",
        "px-5 py-3.5",
        className,
      ].join(" ")}
    >
      {/* Range */}
      <div className="min-w-0">
        {totalItems === 0 ? (
          <p className="text-xs text-muted-foreground">
            Nenhum resultado encontrado
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Mostrando{" "}
            <span className="font-medium text-foreground tabular-nums">
              {rangeStart}–{rangeEnd}
            </span>{" "}
            de{" "}
            <span className="font-medium text-foreground tabular-nums">
              {totalItems}
            </span>
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* First / Previous */}
        <div className="flex items-center rounded-lg border border-border/60 bg-background p-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="
              size-7
              rounded-md
              text-muted-foreground
              hover:bg-muted
              hover:text-foreground
            "
            disabled={isFirstPage}
            onClick={() => goTo(1)}
            aria-label="Primeira página"
          >
            <ChevronsLeft className="size-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="
              size-7
              rounded-md
              text-muted-foreground
              hover:bg-muted
              hover:text-foreground
            "
            disabled={isFirstPage}
            onClick={() => goTo(currentPage - 1)}
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
        </div>

        {/* Page indicator */}
        <div
          className="
            flex h-8 items-center
            rounded-lg
            border border-border/60
            bg-muted/30
            px-2.5
            text-xs
            font-medium
            tabular-nums
          "
        >
          <span className="text-foreground">{currentPage}</span>

          <span className="mx-1.5 text-muted-foreground">/</span>

          <span className="text-muted-foreground">{totalPages}</span>
        </div>

        {/* Next / Last */}
        <div className="flex items-center rounded-lg border border-border/60 bg-background p-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="
              size-7
              rounded-md
              text-muted-foreground
              hover:bg-muted
              hover:text-foreground
            "
            disabled={isLastPage}
            onClick={() => goTo(currentPage + 1)}
            aria-label="Próxima página"
          >
            <ChevronRight className="size-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="
              size-7
              rounded-md
              text-muted-foreground
              hover:bg-muted
              hover:text-foreground
            "
            disabled={isLastPage}
            onClick={() => goTo(totalPages)}
            aria-label="Última página"
          >
            <ChevronsRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
