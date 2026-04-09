import { Toaster } from "sonner";
import { useFlash } from "@/Hooks/useFlash";

export default function LoginLayout({ children }) {
    useFlash();

    return (
        <>
            {children}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    classNames: {
                        toast: "bg-white border border-gray-200",
                        success:
                            "!bg-[#fcf0d9] !rounded-xl !border-[#F9C974] !text-gray-800",
                        error: "!border-l-4 !border-l-red-500 !text-gray-800",
                    },
                }}
            />
        </>
    );
}
