import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X } from 'lucide-react';

interface ScannerModalProps {
    onClose: () => void;
    onScanSuccess: (decodedText: string) => void;
}

const ScannerModal: React.FC<ScannerModalProps> = ({ onClose, onScanSuccess }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {
        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        scannerRef.current.render(
            (decodedText) => {
                onScanSuccess(decodedText);
            },
            (errorMessage) => {
                // handle scan failure, usually better to ignore and let it continue scanning
            }
        );

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(e => console.error("Failed to clear scanner", e));
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-6">
            <div className="bg-[#0a0a0a] border border-[var(--gold)]/20 rounded-[3rem] w-full max-w-lg overflow-hidden relative shadow-2xl">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>
                
                <div className="p-8 pt-12 text-center border-b border-white/5">
                    <h3 className="text-xl font-serif italic text-[var(--gold)]">Biometric QR Link</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">Position the fabric code within the frame</p>
                </div>

                <div className="p-4 bg-black">
                    <div id="reader" className="overflow-hidden rounded-2xl border border-white/5"></div>
                </div>

                <div className="p-8 text-center bg-[#0d0d0d]">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gold)]/5 rounded-full border border-[var(--gold)]/20">
                        <div className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-[var(--gold)]">Awaiting Secure Pulse</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScannerModal;
