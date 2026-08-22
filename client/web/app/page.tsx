"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "@/assets/images/logo.png";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Call02Icon,
  Loading03Icon,
  Shield01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const RESEND_TIME = 120;

const countries = [
  {
    value: "+244",
    label: "Angola",
    flag: "🇦🇴",
  },
  {
    value: "+351",
    label: "Portugal",
    flag: "🇵🇹",
  },
  {
    value: "+55",
    label: "Brasil",
    flag: "🇧🇷",
  },
  {
    value: "+33",
    label: "França",
    flag: "🇫🇷",
  },
];

export default function LoginPhoneOtp() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("+244");

  const [otp, setOtp] = useState("");

  const [codeSent, setCodeSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [resendIn, setResendIn] = useState(0);

  // ---------------------------------------------------------
  // TIMER
  // ---------------------------------------------------------

  useEffect(() => {
    if (resendIn <= 0) return;

    const timer = window.setInterval(() => {
      setResendIn((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [resendIn]);

  // ---------------------------------------------------------
  // FORMAT TIMER
  // ---------------------------------------------------------

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // ---------------------------------------------------------
  // ENVIAR / REENVIAR CÓDIGO
  // ---------------------------------------------------------

  const handleSendCode = async () => {
    if (phone.trim().length < 9) return;

    if (resendIn > 0) return;

    setLoading(true);

    try {
      // API:
      //
      // await fetch("/api/auth/send-otp", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     phone: `${country}${phone}`,
      //   }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 900));

      setCodeSent(true);
      setOtp("");
      setResendIn(RESEND_TIME);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // VERIFICAR OTP
  // ---------------------------------------------------------

  const handleVerify = async () => {
    if (!codeSent) return;

    if (otp.length !== 6) return;

    setVerifying(true);

    try {
      // API:
      //
      // const response = await fetch("/api/auth/verify-otp", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     phone: `${country}${phone}`,
      //     otp,
      //   }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 900));

      console.log({
        phone: `${country}${phone}`,
        otp,
      });

      // router.push("/app");
    } finally {
      setVerifying(false);
    }
  };

  // ---------------------------------------------------------
  // ALTERAR NÚMERO
  // ---------------------------------------------------------

  const handleChangeNumber = () => {
    setCodeSent(false);
    setOtp("");
    setResendIn(0);
  };

  const selectedCountry = countries.find((item) => item.value === country);

  return (
    <main className="min-h-screen w-full bg-background">
      <div className="flex min-h-screen w-full">
        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <section className="relative hidden h-screen w-1/2 overflow-hidden lg:flex">
          {/* Background */}

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 15% 10%, #1f6f57 0%, #0c3a30 35%, #071d18 65%, #060909 100%)",
            }}
          />

          {/* Glows */}

          <div className="absolute -left-32 -top-32 size-96 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-emerald-500/10 blur-3xl" />

          {/* Content */}

          <div className="relative z-10 flex h-screen w-full items-center justify-center px-12">
            <div className="w-full max-w-md">
              {/* Logo / icon */}

              <div className="mb-8">
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur">
                  <HugeiconsIcon
                    icon={Shield01Icon}
                    size={25}
                    strokeWidth={1.75}
                    className="text-emerald-300"
                  />
                </div>

                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white">
                  Bem-vindo
                  <br />
                  de volta.
                </h1>

                <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-100/65">
                  Entre na sua conta usando o seu número de telemóvel.
                  Enviaremos um código de segurança para confirmar a sua
                  identidade.
                </p>
              </div>

              {/* Steps */}

              <div className="space-y-3">
                <SideStep
                  number="01"
                  title="Introduza o número"
                  description="Use o seu número de telemóvel."
                  active={!codeSent}
                  done={codeSent}
                />

                <SideStep
                  number="02"
                  title="Confirme o código"
                  description="Introduza o código recebido por SMS."
                  active={codeSent}
                  done={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* RIGHT */}
        {/* ================================================= */}

        <section className="flex min-h-screen w-full items-center justify-center px-6 py-10 lg:h-screen lg:w-1/2">
          <div className="w-full max-w-md">
            {/* Header */}

            <div className="mb-8">
              <div className="mb-5 flex size-11 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/50">
                <Image
                  src={logo}
                  alt="MandaVir"
                  width={44}
                  height={44}
                  className="size-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-semibold tracking-tight">
                Entrar na conta
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Introduza o seu número de telemóvel para receber um código de
                acesso.
              </p>
            </div>

            {/* ================================================= */}
            {/* PHONE */}
            {/* ================================================= */}

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Número de telemóvel
                </Label>

                <div className="flex gap-2">
                  {/* COUNTRY */}

                  <Select
                    value={country}
                    onValueChange={(value) => setCountry(value!)}
                    disabled={codeSent}
                  >
                    <SelectTrigger className="h-30 w-25 py-5 ">
                      <SelectValue>
                        {selectedCountry && (
                          <span className="flex items-center gap-2 font-semibold">
                            <span>{selectedCountry.flag}</span>
                            <span>{selectedCountry.value}</span>
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {countries.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          <span className="flex items-center gap-2">
                            <span>{item.flag}</span>

                            <span>{item.label}</span>

                            <span className="text-muted-foreground">
                              {item.value}
                            </span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* PHONE */}

                  <div className="relative flex-1">
                    <HugeiconsIcon
                      icon={Call02Icon}
                      size={17}
                      strokeWidth={1.75}
                      className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="923 000 000"
                      value={phone}
                      disabled={codeSent}
                      onChange={(event) =>
                        setPhone(event.target.value.replace(/\D/g, ""))
                      }
                      className="h-10 pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    {codeSent
                      ? "Código enviado por SMS."
                      : "Enviaremos um código por SMS."}
                  </p>
                </div>

                <Button
                  type="button"
                  variant="link"
                  onClick={handleSendCode}
                  disabled={loading || phone.trim().length < 9 || resendIn > 0}
                  className="h-auto shrink-0 p-0 text-sm text-secondary cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={Loading03Icon}
                        size={15}
                        strokeWidth={1.75}
                        className="animate-spin"
                      />
                      Enviando...
                    </span>
                  ) : resendIn > 0 ? (
                    `Reenviar (${formatTimer(resendIn)})`
                  ) : codeSent ? (
                    "Reenviar código"
                  ) : (
                    "Enviar código"
                  )}
                </Button>
              </div>

              {/* ================================================= */}
              {/* OTP */}
              {/* ================================================= */}

              <div className="border-t border-border pt-6">
                <div className="mb-3 flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Código de verificação
                  </Label>

                  {codeSent && (
                    <span className="text-xs text-emerald-500">
                      Código enviado
                    </span>
                  )}
                </div>

                <div className="flex justify-center items-center w-full ">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={!codeSent || verifying}
                  >
                    <InputOTPGroup className="space-x-2">
                      <InputOTPSlot
                        className="
                          size-12
                          w-16
                          rounded-lg
                          border
                          border-input
                          bg-background
                          text-lg
                          font-semibold
                          shadow-sm
                          transition-all
                          first:rounded-lg
                          last:rounded-lg
                          focus-within:border-ring
                          focus-within:ring-2
                          focus-within:ring-ring/20
                        "
                        index={0}
                      />
                      <InputOTPSlot
                        className="
                          size-12
                           w-16
                          rounded-lg
                          border
                          border-input
                          bg-background
                          text-lg
                          font-semibold
                          shadow-sm
                          transition-all
                          first:rounded-lg
                          last:rounded-lg
                          focus-within:border-ring
                          focus-within:ring-2
                          focus-within:ring-ring/20
                        "
                        index={1}
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="space-x-3" />
                    <InputOTPGroup className="gap-1">
                      <InputOTPSlot
                        className="
                          size-12
                          w-16
                          rounded-lg
                          border
                          border-input
                          bg-background
                          text-lg
                          font-semibold
                          shadow-sm
                          transition-all
                          first:rounded-lg
                          last:rounded-lg
                          focus-within:border-ring
                          focus-within:ring-2
                          focus-within:ring-ring/20
                        "
                        index={2}
                      />
                      <InputOTPSlot
                        className="
                          size-12
                          rounded-lg
                          border
                          w-16
                          border-input
                          bg-background
                          text-lg
                          font-semibold
                          shadow-sm
                          transition-all
                          first:rounded-lg
                          last:rounded-lg
                          focus-within:border-ring
                          focus-within:ring-2
                          focus-within:ring-ring/20
                        "
                        index={3}
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="space-x-3" />
                    <InputOTPGroup className="space-x-3">
                      <InputOTPSlot
                        className="
                          size-12
                             w-16
                          rounded-lg
                          border
                          border-input
                          bg-background
                          text-lg
                          font-semibold
                          shadow-sm
                          transition-all
                          first:rounded-lg
                          last:rounded-lg
                          focus-within:border-ring
                          focus-within:ring-2
                          focus-within:ring-ring/20
                        "
                        index={4}
                      />
                      <InputOTPSlot
                        className="
                          size-12
                          rounded-lg
                          border   w-16
                          border-input
                          bg-background
                          text-lg
                          font-semibold
                          shadow-sm
                          transition-all
                          first:rounded-lg
                          last:rounded-lg
                          focus-within:border-ring
                          focus-within:ring-2
                          focus-within:ring-ring/20
                        "
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {!codeSent && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Envie o código acima para ativar a verificação.
                  </p>
                )}
              </div>

              {/* ================================================= */}
              {/* VERIFY */}
              {/* ================================================= */}

              <Button
                type="button"
                onClick={handleVerify}
                disabled={!codeSent || otp.length !== 6 || verifying}
                className="h-11 w-full"
              >
                {verifying ? (
                  <span className="flex items-center gap-2">
                    <HugeiconsIcon
                      icon={Loading03Icon}
                      size={17}
                      strokeWidth={1.75}
                      className="animate-spin"
                    />
                    A verificar...
                  </span>
                ) : (
                  "Verificar e entrar"
                )}
              </Button>

              {/* ================================================= */}
              {/* CHANGE NUMBER */}
              {/* ================================================= */}

              {codeSent && (
                <button
                  type="button"
                  onClick={handleChangeNumber}
                  className="mx-auto flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon
                    icon={ArrowLeft01Icon}
                    size={14}
                    strokeWidth={1.75}
                  />
                  Alterar número
                </button>
              )}

              {/* ================================================= */}
              {/* TERMS */}
              {/* ================================================= */}

              <p className="pt-4 text-center text-xs leading-5 text-muted-foreground">
                Ao continuar, aceita os{" "}
                <a
                  href="#"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a
                  href="#"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Política de Privacidade
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

// =========================================================
// SIDE STEP
// =========================================================

function SideStep({
  number,
  title,
  description,
  active,
  done,
}: {
  number: string;
  title: string;
  description: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-4 rounded-xl border p-4",
        "transition-all duration-300",
        active
          ? "border-white/20 bg-white/10"
          : "border-white/5 bg-white/[0.03]",
      ].join(" ")}
    >
      <div
        className={[
          "flex size-9 shrink-0 items-center justify-center rounded-lg",
          "text-xs font-semibold",
          done
            ? "bg-emerald-400 text-neutral-950"
            : active
              ? "bg-white text-neutral-950"
              : "bg-white/10 text-white/50",
        ].join(" ")}
      >
        {number}
      </div>

      <div className="min-w-0">
        <p
          className={[
            "text-sm font-medium",
            active ? "text-white" : "text-white/50",
          ].join(" ")}
        >
          {title}
        </p>

        <p className="mt-0.5 text-xs text-white/40">{description}</p>
      </div>
    </div>
  );
}
