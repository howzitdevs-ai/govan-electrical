import { createContext, useContext, useState } from "react";

interface LeadFormContextValue {
  isOpen: boolean;
  prefilledService: string;
  openLeadForm: (service?: string) => void;
  closeLeadForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue>({
  isOpen: false,
  prefilledService: "",
  openLeadForm: () => {},
  closeLeadForm: () => {},
});

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState("");

  const openLeadForm = (service = "") => {
    setPrefilledService(service);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLeadForm = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <LeadFormContext.Provider value={{ isOpen, prefilledService, openLeadForm, closeLeadForm }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  return useContext(LeadFormContext);
}
