// app/sign-in/[[...rest]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          card: "bg-card text-foreground shadow-md border border-border rounded-xl px-6 py-4",
          headerTitle: "text-xl font-bold text-foreground",
          headerSubtitle: "text-sm text-muted",
          socialButtonsBlockButton:
            "bg-primary text-white rounded-md hover:bg-primary/90 transition-all",
          formButtonPrimary:
            "bg-primary text-white rounded-md hover:bg-primary/90 transition-all",
          formFieldInput:
            "bg-white border border-border rounded-md px-3 py-2 text-sm",
          formFieldLabel: "text-sm text-foreground",
          footerActionText: "text-sm text-muted",
          footerActionLink:
            "text-sm text-primary underline hover:text-primary/80",
        },
        variables: {
          colorPrimary: "#ff6b81",
          colorBackground: "#f9fafb",
          colorText: "#1e1e1e",
          colorTextSecondary: "#6b7280",
        },
      }}
    />
  );
}
