"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  DashboardSquare01Icon,
  AnalyticsUpIcon,
  UserGroupIcon,
  PuzzleIcon,
  Settings01Icon,
  UnfoldMoreIcon,
  Route01Icon,
  Wallet01Icon,
  Car01Icon,
  SteeringIcon,
  Navigation03Icon,
  StartUpIcon,
  Menu01Icon,
  Cancel01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png";
import { useEffect } from "react";

const mainNavItems = [
  {
    to: "/app",
    label: "Dashboard",
    icon: DashboardSquare01Icon,
  },
  {
    to: "/app/drivers",
    label: "Motoristas",
    icon: SteeringIcon,
  },
  {
    to: "/app/passengers",
    label: "Passageiros",
    icon: UserGroupIcon,
  },
  {
    to: "/app/vehicles",
    label: "Veículos",
    icon: Car01Icon,
  },
  {
    to: "/app/trips",
    label: "Viagens",
    icon: Route01Icon,
  },
  {
    to: "/app/payments",
    label: "Pagamentos",
    icon: Wallet01Icon,
  },
  {
    to: "/app/analytics",
    label: "Analytics",
    icon: AnalyticsUpIcon,
  },
  {
    to: "/app/integrations",
    label: "Integrações",
    icon: PuzzleIcon,
  },
  {
    to: "/app/settings",
    label: "Configurações",
    icon: Settings01Icon,
  },
];

const operationItems = [
  {
    to: "/app/rides",
    label: "Corridas",
    icon: Car01Icon,
  },
  {
    to: "/app/requests",
    label: "Solicitações",
    icon: Navigation03Icon,
  },
];

type NavItem = {
  to: string;
  label: string;
  icon: any;
};

function NavRow({
  item,
  collapsed,
  onSelect,
}: {
  item: NavItem;
  collapsed: boolean;
  onSelect?: () => void;
}) {
  const pathname = usePathname();

  const active = pathname === item.to || pathname.startsWith(`${item.to}/`);

  return (
    <Link
      href={item.to}
      onClick={onSelect}
      title={collapsed ? item.label : undefined}
      className={[
        "group flex h-10 items-center rounded-lg",
        "text-sm transition-all duration-200",
        collapsed ? "justify-center px-0" : "gap-3 px-3",

        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
      ].join(" ")}
    >
      <HugeiconsIcon
        icon={item.icon}
        size={18}
        strokeWidth={1.75}
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      />

      <span
        className={[
          "overflow-hidden whitespace-nowrap transition-all duration-200",
          collapsed
            ? "pointer-events-none w-0 translate-x-2 opacity-0"
            : "w-auto translate-x-0 opacity-100",
        ].join(" ")}
      >
        {item.label}
      </span>
    </Link>
  );
}

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export default function Sidebar({
  mobileOpen,
  collapsed,
  setCollapsed,
  setMobileOpen,
}: Props) {
  const sidebarWidth = collapsed ? "w-[72px]" : "w-72";

  return (
    <>
      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex flex-col",
          "border-r border-border bg-background text-foreground",
          "transition-all duration-300 ease-in-out",
          sidebarWidth,

          "max-md:w-72",
          mobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
        ].join(" ")}
      >
        <div className="flex min-h-0 flex-1 flex-col p-3">
          {/* LOGO */}
          <div
            className={[
              "flex h-10 items-center rounded-lg",
              "transition-all duration-200",
              collapsed ? "justify-center px-0" : "gap-2 px-3",
            ].join(" ")}
          >
            <Image
              src={logo}
              alt="MandaVir"
              width={28}
              height={28}
              className={[
                "size-7 shrink-0 rounded-md object-cover",
                collapsed ? "ml-2.5" : "",
              ].join(" ")}
            />

            <span
              className={[
                "flex-1 overflow-hidden whitespace-nowrap",
                "text-sm font-medium text-foreground",
                "transition-all duration-200",
                collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
              ].join(" ")}
            >
              MandaVir
            </span>

            {!collapsed && !mobileOpen && (
              <HugeiconsIcon
                icon={UnfoldMoreIcon}
                size={14}
                strokeWidth={1.75}
                className="text-muted-foreground"
                onClick={() => {
                  setMobileOpen(false);
                }}
              />
            )}
          </div>

          {/* DESKTOP TOGGLE */}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
            className={[
              "absolute -right-3 top-7 hidden size-6",
              "items-center justify-center rounded-full",
              "border border-border bg-background",
              "text-muted-foreground shadow-sm",
              "transition-colors hover:text-foreground",
              "md:flex",
            ].join(" ")}
          >
            <HugeiconsIcon
              icon={collapsed ? ArrowRight01Icon : ArrowLeft01Icon}
              size={13}
              strokeWidth={1.75}
            />
          </button>

          {/* MOBILE CLOSE */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground md:hidden"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={1.75} />
          </button>

          {/* SEARCH */}
          <div
            className={[
              "mt-3 transition-all duration-200",
              collapsed ? "flex justify-center" : "",
            ].join(" ")}
          >
            {collapsed ? (
              <button
                type="button"
                title="Pesquisar"
                className="flex size-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={18}
                  strokeWidth={1.75}
                />
              </button>
            ) : (
              <div className="relative">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={16}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                  placeholder="Pesquisar"
                  className="h-9 rounded-lg border-border bg-muted/40 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                />

                <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  /
                </kbd>
              </div>
            )}
          </div>

          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            <div className="mb-4">
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Operação
                </p>
              )}

              <nav className="flex flex-col gap-0.5">
                {operationItems.map((item) => (
                  <NavRow
                    key={item.to}
                    item={item}
                    collapsed={collapsed}
                    onSelect={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
            </div>

            <div>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Gestão
                </p>
              )}

              <nav className="flex flex-col gap-0.5">
                {mainNavItems.map((item) => (
                  <NavRow
                    key={item.to}
                    item={item}
                    collapsed={collapsed}
                    onSelect={() => setMobileOpen(false)}
                  />
                ))}
              </nav>
            </div>
          </div>

          {/* OPERATION CARD */}
          {!collapsed && (
            <div
              className={[
                "relative mt-3 shrink-0 rounded-xl border border-border bg-card dark:bg-white/3 p-4",
              ].join("")}
            >
              <button
                type="button"
                className="absolute right-3 top-4 text-muted-foreground transition-colors hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={StartUpIcon}
                  size={20}
                  strokeWidth={1.75}
                />
              </button>

              <div className="flex size-9 items-center justify-center rounded-lg bg-secondary/15">
                <HugeiconsIcon
                  icon={DashboardSquare01Icon}
                  size={18}
                  strokeWidth={1.75}
                  className="text-secondary"
                />
              </div>

              <p className="mt-3 text-sm font-semibold text-foreground">
                Central de operação
              </p>

              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Monitore as corridas e acompanhe
                <br />a operação em tempo real.
              </p>

              <Button className="mt-3 h-9 w-full rounded-lg bg-secondary text-sm font-medium text-secondary-foreground hover:bg-secondary/90">
                Ver operação
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* DESKTOP SPACER */}
      <div
        className={[
          "hidden shrink-0 transition-all duration-300 md:block",
          collapsed ? "w-[72px]" : "w-72",
        ].join(" ")}
      />

      <div className="h-14 md:hidden" />
    </>
  );
}
