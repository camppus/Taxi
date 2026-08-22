"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";

interface FreelancerCardProps {
  name?: string;
  role?: string;
  avatar?: string;
  cover?: string;
  rating?: string;
  earned?: string;
  rate?: string;
  online?: boolean;
}

export function DriverCard({
  name = "Lia Hartwell",
  role = "Middle Graphic Designer",
  avatar = "https://i.pravatar.cc/150?img=47",
  cover = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1000&auto=format&fit=crop",
  rating = "4.9",
  earned = "$12K",
  rate = "$35/hr",
  online = true,
}: FreelancerCardProps) {
  return (
    <div className="rounded-[31px]  bg-card/50 p-2 text-white shadow-sm">
      <div className="relative h-[167px] w-full overflow-visible rounded-[24px]">
        <div className="relative h-full w-full overflow-hidden rounded-[24px] dark:bg-[#0502]">
          {/* Green glow */}
          <div
            className="
      absolute inset-0
      bg-[radial-gradient(
        ellipse_at_15%_50%,
        rgba(34,197,94,0.95)_0%,
        rgba(22,163,74,0.8)_20%,
        rgba(5,60,30,0.45)_45%,
        transparent_70%
      )]
    "
          />

          {/* Secondary green glow */}
          <div
            className="
      absolute inset-0
      bg-[radial-gradient(
        ellipse_at_90%_45%,
        rgba(16,185,129,0.8)_0%,
        rgba(6,78,59,0.55)_25%,
        transparent_65%
      )]
    "
          />

          {/* Green vertical light bars */}
          <div className="absolute inset-y-0 left-0 w-[48%] opacity-80">
            <div
              className="
        h-full w-full
        bg-[repeating-linear-gradient(
          90deg,
          rgba(74,222,128,0.75)_0px,
          rgba(74,222,128,0.75)_3px,
          transparent_3px,
          transparent_11px
        )]
        blur-[1px]
      "
            />
          </div>

          {/* Right green bars */}
          <div className="absolute inset-y-0 right-0 w-[40%] opacity-55">
            <div
              className="
        h-full w-full
        bg-[repeating-linear-gradient(
          90deg,
          rgba(34,197,94,0.7)_0px,
          rgba(34,197,94,0.7)_3px,
          transparent_3px,
          transparent_11px
        )]
        blur-[1px]
      "
            />
          </div>

          {/* Black center */}
          <div
            className="
      absolute inset-0
      bg-[radial-gradient(
        ellipse_at_center,
        rgba(0,0,0,0.98)_0%,
rgba(0,0,0,0.90)_24%,
rgba(4,18,12,0.72)_45%,
rgba(10,45,28,0.45)_62%,
rgba(16,185,129,0.18)_78%,
rgba(0,0,0,0.10)_100%,
        transparent_75%
      )]
    "
          />

          <div
            className="
      absolute left-[18%] top-[-30%]
      h-[150%] w-[18%]
      rotate-[18deg]
      bg-white/10
      blur-[18px]
    "
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/15" />
        </div>

        <div className="absolute -bottom-[38px] left-[15px] z-10 h-[82px] w-[82px] overflow-hidden rounded-full border-[3px] border-[#111111] bg-[#222]">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="82px"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-[10px] pb-[16px] pt-[40px]">
        {/* Name + Online */}
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-[5px]">
            <h3 className="truncate text-[21px] font-semibold leading-[25px] tracking-[-0.5px]">
              {name}
            </h3>

            <BadgeCheck
              size={16}
              strokeWidth={2.5}
              className="shrink-0 fill-[#176cce] text-black"
            />
          </div>

          <div className="ml-3 flex shrink-0 items-center gap-[7px]">
            <span
              className={`h-[7px] w-[7px] rounded-full ${
                online ? "bg-[#63d471]" : "bg-[#777]"
              }`}
            />

            <span className="text-[15px] font-medium text-[#777]">
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        <p className="mt-[3px] text-[15px] leading-[20px] text-[#858585]">
          {role}
        </p>

        <div className="mt-[17px] flex h-[44px] w-full items-center rounded-[13px] dark:bg-[#292929] bg-muted/40 text-[#171717] dark:text-white">
          {/* Rating */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-emerald-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className="text-[13px] leading-none">
                    ★
                  </span>
                ))}
              </div>

              <span className="text-[15px] font-semibold leading-[17px]">
                {rating}
              </span>
            </div>

            <span className="mt-[3px] text-[13px] leading-[15px] text-neutral-500 dark:text-[#929292]">
              avaliações
            </span>
          </div>

          <div className="h-[27px] w-px dark:bg-[#444444]" />

          {/* Earned */}
          <div className="flex  flex-1 flex-col items-center justify-center">
            <span className="text-[15px] font-semibold leading-[17px]">
              {earned}
            </span>

            <span className="mt-[2px] text-[13px] leading-[15px] dark:text-[#929292]">
              viagens
            </span>
          </div>

          <div className="h-[27px] w-px dark:bg-[#444444]" />

          {/* Rate */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <span className="text-[15px] font-semibold leading-[17px]">
              {rate}
            </span>

            <span className="mt-[2px] text-[13px] leading-[15px] dark:text-[#929292]">
              veículos
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          className="mt-[15px] h-[41px] w-full rounded-[12px] dark:bg-white text-[14px] font-semibold dark:text-[#171717] transition-all dark:hover:bg-[#eeeeee] active:scale-[0.99] bg-secondary hover:bg-secondary/80 cursor-pointer"
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
