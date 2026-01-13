import { useState } from 'react';
import { X, Copy, Check, Mail, Link as LinkIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { createInvite } from '../../services/inviteApi';

interface InviteStaffModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InviteStaffModal({ isOpen, onClose }: InviteStaffModalProps) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    if (!isOpen) return null;

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setInviteLink(null);

        try {
            const res = await createInvite(email || undefined);
            
            // Construct the full URL
            const baseUrl = window.location.origin;
            const fullLink = `${baseUrl}/auth/staff?token=${res.token}`;
            // Wait, LoginPage activeTab='register' isn't a route "/register".
            // It is usually "/auth" or just "/".
            // The route for the page containing StaffAuth is "/staff-auth" or "/register"?
            // I need to check App.tsx routes.
            // For now I'll assume "/register" or "/auth?tab=register&token=..."
            // "StaffAuth" handles "/auth/staff" usually?
            // "StaffAuth" is likely at "/staff/login" or similar.
            // The image showed "Staff Registration".
            // I'll check App.tsx to find the route for StaffAuth.
            // For now I will use a placeholder and fix it in next step.
            
            setInviteLink(fullLink);
            toast.success("Invite link generated!");
        } catch (err: any) {
             toast.error(err.message || "Failed to generate invite");
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (inviteLink) {
            navigator.clipboard.writeText(inviteLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            toast.success("Link copied to clipboard");
        }
    };

    const handleClose = () => {  
        setEmail('');
        setInviteLink(null);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Invite Staff Member</h2>
                        <p className="text-sm text-gray-500">Generate a secure registration link</p>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {!inviteLink ? (
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Restrict to Email (Optional)
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="e.g. staff@company.com"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">If specified, the link will only work for this email.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <LinkIcon className="w-4 h-4" />
                                        Generate Invite Link
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Registration Link</p>
                                <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-indigo-100">
                                    <code className="text-xs text-gray-600 flex-1 truncate font-mono select-all">
                                        {inviteLink}
                                    </code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-1.5 hover:bg-indigo-50 rounded-md text-indigo-600 transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setInviteLink(null); setEmail(''); }}
                                    className="flex-1 py-2 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
                                >
                                    Generate Another
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="flex-1 py-2 px-4 rounded-xl bg-gray-900 text-white hover:bg-gray-800 text-sm font-medium"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
