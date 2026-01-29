import React from "react";
import { TamboProvider } from "@tambo-ai/react";
import { components } from "./registry";
import { ApiKeyError } from "../components/ApiKeyError";

interface ProviderProps {
  children: React.ReactNode;
}

export function AppTamboProvider({ children }: ProviderProps) {
  const apiKey = import.meta.env.VITE_TAMBO_API_KEY;

  // Show helpful error if API key is missing or still placeholder
  if (!apiKey || apiKey === "tambo_..." || apiKey.trim() === "") {
    return <ApiKeyError />;
  }

  return (
    <TamboProvider components={components} apiKey={apiKey}>
      {children}
    </TamboProvider>
  );
}
