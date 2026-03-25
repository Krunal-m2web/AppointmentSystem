"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group flex items-center gap-3 p-4 bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl w-full",
          title: "text-gray-900 font-semibold text-sm leading-tight",
          description: "text-gray-500 text-xs mt-1",
          actionButton:
            "bg-indigo-600 text-white hover:bg-indigo-700 font-medium rounded-lg px-3 py-1.5 text-xs transition-colors",
          cancelButton:
            "bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium rounded-lg px-3 py-1.5 text-xs transition-colors",
          success: "!bg-green-50/95 !border-green-200 !text-green-800",
          error: "!bg-red-50/95 !border-red-200 !text-red-800",
          info: "!bg-blue-50/95 !border-blue-200 !text-blue-800",
          warning: "!bg-amber-50/95 !border-amber-200 !text-amber-800",
          closeButton:
            "!left-auto !right-2 !top-2 !translate-x-0 !translate-y-0 !absolute !bg-transparent hover:!bg-black/5 !text-gray-400 hover:!text-gray-900 !border-none !shadow-none transition-colors",
        },
      }}
      closeButton
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
