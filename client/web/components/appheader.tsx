"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/provider/ThemeProvider";

import logo from "@/assets/images/logo.png";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Menu01Icon,
  Search01Icon,
  Notification03Icon,
  Sun03Icon,
  Moon02Icon,
  LanguageCircleIcon,
  UserIcon,
  Settings01Icon,
  Logout01Icon,
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

type AppHeaderProps = {
  onMenuClick?: () => void;
  sidebarCollapsed: boolean;
};

const pageTitles: Record<string, string> = {
  "/app": "Dashboard",
  "/app/dashboard": "Dashboard",
  "/app/rides": "Corridas",
  "/app/requests": "Solicitações",
  "/app/drivers": "Motoristas",
  "/app/passengers": "Passageiros",
  "/app/vehicles": "Veículos",
  "/app/trips": "Viagens",
  "/app/payments": "Pagamentos",
  "/app/analytics": "Analytics",
  "/app/integrations": "Integrações",
  "/app/settings": "Configurações",
};

const languages = [
  {
    code: "pt",
    label: "Português",
    short: "PT",
  },
  {
    code: "en",
    label: "English",
    short: "EN",
  },
  {
    code: "fr",
    label: "Français",
    short: "FR",
  },
];

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const pathname = usePathname();
  const [language, setLanguage] = useState("pt");

  const title =
    pageTitles[pathname] ||
    Object.entries(pageTitles).find(([path]) =>
      pathname.startsWith(`${path}/`),
    )?.[1] ||
    "Dashboard";

  const currentLanguage =
    languages.find((item) => item.code === language) || languages[0];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center border-b border-border bg-background/90 px-4 backdrop-blur-md md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="size-9"
          aria-label="Abrir menu"
        >
          <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={1.75} />
        </Button>

        <div className="ml-3 flex items-center gap-2">
          <Image
            src={logo}
            alt="MandaVir"
            width={28}
            height={28}
            className="rounded-md"
          />

          <span className="text-sm font-semibold text-foreground">
            MandaVir
          </span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <NotificationButton />

          <ThemeButton />

          <LanguageMenu
            language={language}
            setLanguage={setLanguage}
            currentLanguage={currentLanguage}
          />
          <UserMenu />
        </div>
      </header>

      <header
        className={[
          "hidden h-16 items-center",
          "border-b border-border",
          "bg-background/80 backdrop-blur-md",
          "px-6 md:flex",
          "transition-all duration-300",
        ].join(" ")}
      >
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold text-foreground">
            {title}
          </h1>

          <p className="text-xs text-muted-foreground">
            Gerencie e acompanhe a operação da plataforma
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 w-48 justify-start border-border bg-background px-3 lg:w-64"
          >
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              strokeWidth={1.75}
              className="shrink-0 text-muted-foreground"
            />

            <span className="ml-2 text-sm text-muted-foreground">
              Pesquisar...
            </span>

            <kbd className="ml-auto rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
              ⌘ K
            </kbd>
          </Button>

          <NotificationButton />

          <ThemeButton />

          <LanguageMenu
            language={language}
            setLanguage={setLanguage}
            currentLanguage={currentLanguage}
          />

          <UserMenu />
        </div>
      </header>
    </>
  );
}
function NotificationButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative size-9"
      aria-label="Notificações"
    >
      <HugeiconsIcon icon={Notification03Icon} size={19} strokeWidth={1.75} />

      <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-secondary ring-2 ring-background" />
    </Button>
  );
}

function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative size-9 overflow-hidden"
      aria-label="Alternar tema"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <HugeiconsIcon icon={Sun03Icon} size={18} strokeWidth={1.75} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{
              opacity: 0,
              rotate: 90,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: -90,
              scale: 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <HugeiconsIcon icon={Moon02Icon} size={18} strokeWidth={1.75} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

function LanguageMenu({
  language,
  setLanguage,
  currentLanguage,
}: {
  language: string;
  setLanguage: (value: string) => void;
  currentLanguage: {
    code: string;
    label: string;
    short: string;
  };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-9 gap-2 px-2">
            <HugeiconsIcon
              icon={LanguageCircleIcon}
              size={18}
              strokeWidth={1.75}
            />

            <span className="text-xs font-medium">{currentLanguage.short}</span>

            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={13}
              strokeWidth={1.75}
              className="text-muted-foreground"
            />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Idioma</DropdownMenuLabel>

          {[
            {
              code: "pt",
              label: "Português",
            },
            {
              code: "en",
              label: "English",
            },
            {
              code: "fr",
              label: "Français",
            },
          ].map((item) => (
            <DropdownMenuItem
              key={item.code}
              onClick={() => setLanguage(item.code)}
              className="cursor-pointer"
            >
              <HugeiconsIcon
                icon={LanguageCircleIcon}
                size={16}
                strokeWidth={1.75}
              />

              <span>{item.label}</span>

              {language === item.code && (
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  size={16}
                  strokeWidth={1.75}
                  className="ml-auto text-secondary"
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="h-10 gap-2 rounded-lg px-2">
            <Avatar className="size-8">
              <AvatarImage src="/avatar.png" alt="Francisco" />

              <AvatarFallback>FD</AvatarFallback>
            </Avatar>

            <div className="hidden text-left lg:block">
              <p className="max-w-32 truncate text-sm font-medium">Francisco</p>

              <p className="text-[11px] text-muted-foreground">Administrador</p>
            </div>

            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={14}
              strokeWidth={1.75}
              className="hidden text-muted-foreground lg:block"
            />
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex items-center gap-3 py-1">
              <Avatar className="size-9">
                <AvatarImage src="/avatar.png" alt="Francisco" />

                <AvatarFallback>FD</AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Francisco</p>

                <p className="truncate text-xs text-muted-foreground">
                  admin@mandavir.com
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <HugeiconsIcon icon={UserIcon} size={16} strokeWidth={1.75} />
            Perfil
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <HugeiconsIcon icon={Settings01Icon} size={16} strokeWidth={1.75} />
            Configurações
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
          <HugeiconsIcon icon={Logout01Icon} size={16} strokeWidth={1.75} />
          Terminar sessão
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
