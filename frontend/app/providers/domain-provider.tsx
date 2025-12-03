"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Domain = "zorg" | "autotechniek" | "jeugdzorg" | "assessor";

interface DomainContextType {
  domain: Domain;
  setDomain: (domain: Domain) => void;
}

const DomainContext = createContext<DomainContextType | undefined>(undefined);

export function DomainProvider({ children }: { children: React.ReactNode }) {
  const [domain, setDomainState] = useState<Domain>("zorg");

  const setDomain = (newDomain: Domain) => {
    setDomainState(newDomain);
    localStorage.setItem("skillval-domain", newDomain);
  };

  useEffect(() => {
    const storedDomain = localStorage.getItem("skillval-domain") as Domain;
    if (storedDomain && (storedDomain === "zorg" || storedDomain === "autotechniek" || storedDomain === "jeugdzorg" || storedDomain === "assessor")) {
      setDomainState(storedDomain);
    }
  }, []);

  return (
    <DomainContext.Provider value={{ domain, setDomain }}>
      {children}
    </DomainContext.Provider>
  );
}

export function useDomain() {
  const context = useContext(DomainContext);
  if (context === undefined) {
    throw new Error("useDomain must be used within a DomainProvider");
  }
  return context;
}