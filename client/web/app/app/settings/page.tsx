"use client";

import * as React from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  LockPasswordIcon,
  Upload01Icon,
  CheckmarkCircle02Icon,
  Shield01Icon,
  Logout01Icon,
  Mail01Icon,
  Call02Icon,
  Edit02Icon,
  Alert02Icon,
  Key01Icon,
  SecurityCheckIcon,
  DeviceAccessIcon,
} from "@hugeicons/core-free-icons";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

const MOCK_PROFILE: AdminProfile = {
  name: "Ricardino Faife",
  email: "ricardino.faife@taxi.co.ao",
  phone: "+244 923 456 789",
  role: "Administrador Supremo",
  avatar: "https://i.pravatar.cc/150?img=21",
};

export default function AdminSettingsPage() {
  const [profile, setProfile] = React.useState(MOCK_PROFILE);

  const [isSavingProfile, setIsSavingProfile] = React.useState(false);

  const [profileSaved, setProfileSaved] = React.useState(false);

  const [currentPassword, setCurrentPassword] = React.useState("");

  const [newPassword, setNewPassword] = React.useState("");

  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const [isSavingPassword, setIsSavingPassword] = React.useState(false);

  const [passwordSaved, setPasswordSaved] = React.useState(false);

  const passwordsMatch =
    newPassword.length > 0 && newPassword === confirmPassword;

  const passwordTooShort = newPassword.length > 0 && newPassword.length < 8;

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    setProfileSaved(false);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSavingProfile(false);
    setProfileSaved(true);

    setTimeout(() => {
      setProfileSaved(false);
    }, 2500);
  };

  const handleChangePassword = async () => {
    if (!passwordsMatch || passwordTooShort || !currentPassword) {
      return;
    }

    setIsSavingPassword(true);
    setPasswordSaved(false);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSavingPassword(false);
    setPasswordSaved(true);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setPasswordSaved(false);
    }, 2500);
  };

  return (
    <div className="w-full space-y-6">
      {/* ================================================================ */}
      {/* HEADER                                                           */}
      {/* ================================================================ */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary/10">
              <HugeiconsIcon
                icon={Shield01Icon}
                size={19}
                strokeWidth={1.8}
                className="text-secondary"
              />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Configurações
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Gere a tua conta, segurança e credenciais de acesso ao painel
                administrativo.
              </p>
            </div>
          </div>
        </div>

        <Badge
          variant="outline"
          className="w-fit rounded-full border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[11px] text-emerald-500"
        >
          <span className="mr-1.5 size-1.5 rounded-full bg-current" />
          Conta protegida
        </Badge>
      </div>

      {/* ================================================================ */}
      {/* TABS                                                             */}
      {/* ================================================================ */}

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="h-11 w-full justify-start gap-1 rounded-xl border border-border/60 bg-muted/40 p-1 sm:w-fit">
          <TabsTrigger
            value="account"
            className="h-9 gap-2 rounded-lg px-4 text-xs"
          >
            <HugeiconsIcon icon={UserIcon} size={15} strokeWidth={1.8} />
            Dados da conta
          </TabsTrigger>

          <TabsTrigger
            value="credentials"
            className="h-9 gap-2 rounded-lg px-4 text-xs"
          >
            <HugeiconsIcon
              icon={LockPasswordIcon}
              size={15}
              strokeWidth={1.8}
            />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* ============================================================ */}
        {/* ACCOUNT                                                        */}
        {/* ============================================================ */}

        <TabsContent value="account" className="mt-5 space-y-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            {/* Main profile */}
            <Card className="rounded-2xl border-border/60 shadow-none">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="text-sm font-semibold">
                  Informações pessoais
                </CardTitle>

                <CardDescription className="text-xs">
                  Atualiza os dados utilizados para identificar a tua conta
                  administrativa.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {/* Avatar */}
                <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-16 border border-border/60">
                      <AvatarImage src={profile.avatar} alt={profile.name} />

                      <AvatarFallback className="bg-secondary/10 text-sm font-semibold text-secondary">
                        {profile.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">{profile.name}</p>

                        <Badge
                          variant="secondary"
                          className="gap-1 rounded-full px-2 py-0.5 text-[9px]"
                        >
                          <HugeiconsIcon
                            icon={Shield01Icon}
                            size={10}
                            strokeWidth={2}
                          />

                          {profile.role}
                        </Badge>
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Administrador da plataforma
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden h-9 rounded-lg sm:flex"
                  >
                    <HugeiconsIcon
                      icon={Upload01Icon}
                      size={14}
                      strokeWidth={1.8}
                    />
                    Alterar foto
                  </Button>
                </div>

                <Separator />

                {/* Form */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs">
                      Nome completo
                    </Label>

                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          name: e.target.value,
                        }))
                      }
                      className="h-10 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs">
                      Número de telefone
                    </Label>

                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          phone: e.target.value,
                        }))
                      }
                      className="h-10 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="text-xs">
                      Email administrativo
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          email: e.target.value,
                        }))
                      }
                      className="h-10 rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-3 border-t border-border/50 pt-4">
                {profileSaved && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-500">
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      size={14}
                      strokeWidth={2}
                    />
                    Alterações guardadas
                  </span>
                )}

                <Button
                  onClick={handleSaveProfile}
                  disabled={isSavingProfile}
                  className="h-9 rounded-lg"
                >
                  {isSavingProfile ? "A guardar..." : "Guardar alterações"}
                </Button>
              </CardFooter>
            </Card>

            {/* Account overview */}
            <div className="space-y-5">
              <Card className="rounded-2xl border-border/60 shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm">Resumo da conta</CardTitle>

                  <CardDescription className="text-xs">
                    Informações da tua conta administrativa.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <InfoRow
                    icon={UserIcon}
                    label="Função"
                    value="Administrador Supremo"
                  />

                  <InfoRow
                    icon={Mail01Icon}
                    label="Email"
                    value={profile.email}
                  />

                  <InfoRow
                    icon={Call02Icon}
                    label="Telefone"
                    value={profile.phone}
                  />

                  <InfoRow
                    icon={SecurityCheckIcon}
                    label="Estado"
                    value="Ativo"
                    valueClassName="text-emerald-500"
                  />
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-border/60 bg-muted/20 shadow-none">
                <CardContent className="p-5">
                  <div className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                      <HugeiconsIcon
                        icon={Shield01Icon}
                        size={17}
                        className="text-secondary"
                      />
                    </div>

                    <div>
                      <p className="text-xs font-semibold">
                        Conta administrativa
                      </p>

                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        Esta conta possui permissões elevadas para gerir
                        motoristas, passageiros, pagamentos e operações.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ============================================================ */}
        {/* SECURITY                                                       */}
        {/* ============================================================ */}

        <TabsContent value="credentials" className="mt-5 space-y-5">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            {/* Password */}
            <Card className="rounded-2xl border-border/60 shadow-none">
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-secondary/10">
                    <HugeiconsIcon
                      icon={Key01Icon}
                      size={17}
                      className="text-secondary"
                    />
                  </div>

                  <div>
                    <CardTitle className="text-sm">Palavra-passe</CardTitle>

                    <CardDescription className="mt-1 text-xs">
                      Atualiza a palavra-passe utilizada para entrar no painel.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-xs">
                    Palavra-passe atual
                  </Label>

                  <PasswordInput
                    id="current-password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    showPassword={showPassword}
                    onToggle={() => setShowPassword((v) => !v)}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-xs">
                      Nova palavra-passe
                    </Label>

                    <PasswordInput
                      id="new-password"
                      value={newPassword}
                      onChange={setNewPassword}
                      showPassword={showPassword}
                      onToggle={() => setShowPassword((v) => !v)}
                    />

                    {passwordTooShort && (
                      <p className="text-[11px] text-red-500">
                        A palavra-passe deve ter pelo menos 8 caracteres.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-xs">
                      Confirmar palavra-passe
                    </Label>

                    <PasswordInput
                      id="confirm-password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      showPassword={showPassword}
                      onToggle={() => setShowPassword((v) => !v)}
                    />

                    {confirmPassword.length > 0 && !passwordsMatch && (
                      <p className="text-[11px] text-red-500">
                        As palavras-passe não coincidem.
                      </p>
                    )}
                  </div>
                </div>

                {/* Password rules */}
                <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <p className="mb-3 text-[11px] font-medium">
                    Requisitos da palavra-passe
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <PasswordRule
                      valid={newPassword.length >= 8}
                      text="Pelo menos 8 caracteres"
                    />

                    <PasswordRule
                      valid={/[A-Z]/.test(newPassword)}
                      text="Uma letra maiúscula"
                    />

                    <PasswordRule
                      valid={/[0-9]/.test(newPassword)}
                      text="Um número"
                    />

                    <PasswordRule
                      valid={/[^A-Za-z0-9]/.test(newPassword)}
                      text="Um carácter especial"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-3 border-t border-border/50 pt-4">
                {passwordSaved && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-500">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} />
                    Palavra-passe alterada
                  </span>
                )}

                <Button
                  onClick={handleChangePassword}
                  disabled={
                    isSavingPassword ||
                    !currentPassword ||
                    !passwordsMatch ||
                    passwordTooShort
                  }
                  className="h-9 rounded-lg"
                >
                  {isSavingPassword ? "A alterar..." : "Alterar palavra-passe"}
                </Button>
              </CardFooter>
            </Card>

            {/* Security overview */}
            <div className="space-y-5">
              <Card className="rounded-2xl border-border/60 shadow-none">
                <CardHeader>
                  <CardTitle className="text-sm">Segurança</CardTitle>

                  <CardDescription className="text-xs">
                    Estado atual da proteção da conta.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <SecurityItem
                    icon={CheckmarkCircle02Icon}
                    title="Palavra-passe"
                    description="Configurada"
                    status="Protegida"
                  />

                  <SecurityItem
                    icon={CheckmarkCircle02Icon}
                    title="Email"
                    description="Email verificado"
                    status="Verificado"
                  />

                  <SecurityItem
                    icon={CheckmarkCircle02Icon}
                    title="Sessão"
                    description="Dispositivo atual"
                    status="Ativa"
                  />
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-red-500/20 bg-red-500/[0.03] shadow-none">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-red-500/10">
                      <HugeiconsIcon
                        icon={Alert02Icon}
                        size={17}
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <CardTitle className="text-sm">
                        Zona de segurança
                      </CardTitle>

                      <CardDescription className="text-xs">
                        Ações que afetam o acesso à conta.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    Se suspeitares que outra pessoa teve acesso à tua conta,
                    podes terminar todas as sessões ativas.
                  </p>

                  <Button
                    variant="destructive"
                    className="mt-4 h-9 w-full rounded-lg"
                  >
                    <HugeiconsIcon icon={Logout01Icon} size={14} />
                    Encerrar todas as sessões
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sessions */}
          <Card className="rounded-2xl border-border/60 shadow-none">
            <CardHeader>
              <CardTitle className="text-sm">Dispositivos e sessões</CardTitle>

              <CardDescription className="text-xs">
                Dispositivos que utilizaram recentemente esta conta
                administrativa.
              </CardDescription>
            </CardHeader>

            <CardContent className="divide-y divide-border/50">
              <Session
                current
                device="Firefox · Ubuntu"
                location="Luanda, Angola"
                lastAccess="Agora"
              />

              <Session
                device="Chrome · Windows"
                location="Luanda, Angola"
                lastAccess="Há 2 horas"
              />

              <Session
                device="Safari · iPhone"
                location="Luanda, Angola"
                lastAccess="Ontem"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ========================================================================== */
/* Components                                                                 */
/* ========================================================================== */

function InfoRow({
  icon,
  label,
  value,
  valueClassName = "",
}: {
  icon: any;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <HugeiconsIcon
          icon={icon}
          size={14}
          className="text-muted-foreground"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-muted-foreground">{label}</p>

        <p className={`mt-0.5 truncate text-xs font-medium ${valueClassName}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  value,
  onChange,
  showPassword,
  onToggle,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-xl pr-10"
        placeholder="••••••••"
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </button>
    </div>
  );
}

function PasswordRule({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <HugeiconsIcon
        icon={CheckmarkCircle02Icon}
        size={13}
        className={valid ? "text-emerald-500" : "text-muted-foreground/30"}
      />

      <span
        className={[
          "text-[10px]",
          valid ? "text-emerald-500" : "text-muted-foreground",
        ].join(" ")}
      >
        {text}
      </span>
    </div>
  );
}

function SecurityItem({
  icon,
  title,
  description,
  status,
}: {
  icon: any;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/50 p-3">
      <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/10">
        <HugeiconsIcon icon={icon} size={14} className="text-emerald-500" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium">{title}</p>

        <p className="text-[10px] text-muted-foreground">{description}</p>
      </div>

      <span className="text-[9px] font-medium text-emerald-500">{status}</span>
    </div>
  );
}

function Session({
  device,
  location,
  lastAccess,
  current = false,
}: {
  device: string;
  location: string;
  lastAccess: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
        <HugeiconsIcon
          icon={DeviceAccessIcon}
          size={17}
          className="text-muted-foreground"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold">{device}</p>

          {current && (
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-0.5 text-[9px] text-emerald-500"
            >
              Sessão atual
            </Badge>
          )}
        </div>

        <p className="mt-1 text-[10px] text-muted-foreground">{location}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-[10px] font-medium">{lastAccess}</p>

        <p className="mt-1 text-[9px] text-muted-foreground">Último acesso</p>
      </div>
    </div>
  );
}
