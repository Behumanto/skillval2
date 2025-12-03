"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTheme } from "@/app/providers/theme-provider";
import { useDomain } from "@/app/providers/domain-provider";
import { getDomainNavigation, domainLabels, type NavItem } from "@/app/config/domain-navigation";

export function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { domain, setDomain } = useDomain();
  const isSamen = theme === "samenai";
  
  const navigation = getDomainNavigation(domain);

  return (
    <aside
      className={clsx(
        "sidebar fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r shadow-xl transition-all",
        isSamen ? "border-[#2DA3B5]/40 bg-[#102b37]/90" : "border-gray-200 bg-white"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div
          className={clsx(
            "sidebar__header border-b p-6",
            isSamen ? "border-[#2DA3B5]/30 bg-transparent" : "border-gray-200 bg-gradient-to-r from-skillval-cream to-white"
          )}
        >
          <div className="flex flex-col items-center space-y-4">
            <Image src="/logo-skillval.png" alt="SkillVal" width={180} height={60} className="h-12 w-auto" />
            
            {/* Domain Switcher */}
            <div className="w-full">
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as any)}
                className={clsx(
                  "w-full rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  isSamen 
                    ? "border-[#2DA3B5] bg-[#174e5e]/60 text-white focus:border-[#2DA3B5] focus:ring-[#2DA3B5]"
                    : "border-skillval-warm bg-white text-skillval-night focus:border-skillval-warm focus:ring-skillval-warm"
                )}
              >
                <option value="zorg">{domainLabels.zorg}</option>
                <option value="autotechniek">{domainLabels.autotechniek}</option>
                <option value="jeugdzorg">{domainLabels.jeugdzorg}</option>
                <option value="assessor">{domainLabels.assessor}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className={clsx(
            "sidebar__nav flex-1 space-y-2 overflow-y-auto p-4",
            isSamen ? "bg-transparent" : "bg-gradient-to-b from-white to-skillval-cream"
          )}
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                  isActive
                    ? "bg-skillval-cream text-skillval-warm shadow-md border-l-4 border-skillval-warm"
                    : "text-skillval-night hover:bg-skillval-cream hover:text-skillval-warm"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div
          className={clsx(
            "sidebar__user border-t p-4",
            isSamen ? "border-[#2DA3B5]/30 bg-transparent" : "border-gray-200 bg-skillval-cream"
          )}
        >
          <div
            className={clsx(
              "flex items-center gap-3 rounded-xl px-4 py-3 shadow-sm",
              isSamen ? "bg-[#174e5e]/60" : "bg-white"
            )}
          >
            <div className="flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-skillval-warm">
              <Image
                src={domain === "assessor" ? "/m-havekes.jpeg" : "/ramin.jpeg"}
                alt={domain === "assessor" ? "M. Havekes" : "Ramin"}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className={clsx("truncate text-sm font-semibold", isSamen ? "text-white" : "text-skillval-night")}>
                {domain === "assessor" ? "M. Havekes" : "Ramin"}
              </p>
              <p className={clsx("truncate text-xs", isSamen ? "text-[#A3B1B6]" : "text-gray-600")}>
                {domain === "assessor" ? "Assessor Autotechniek" : "Kandidaat"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
