import { useState } from 'react';
import { X, Copy, Check, Mail, Link as LinkIcon, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { createInvite, sendInviteEmail } from '../../services/inviteApi';

interface InviteStaffModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InviteStaffModal({ isOpen, onClose }: InviteStaffModalProps) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [inviteToken, setInviteToken] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    // Send email state
    const [sendEmail, setSendEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    if (!isOpen) return null;

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setInviteLink(null);
        setInviteToken(null);

        try {
            const res = await createInvite(email || undefined);
            
            const baseUrl = window.location.origin;
            const fullLink = `${baseUrl}/auth/staff?token=${res.token}`;
            
            setInviteLink(fullLink);
            setInviteToken(res.token);
            // Pre-fill the send email field with the restriction email if provided
            if (email) {
                setSendEmail(email);
            }
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

    const handleSendEmail = async () => {
        if (!sendEmail.trim()) {
            toast.error("Please enter an email address");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sendEmail)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!inviteToken || !inviteLink) return;

        setIsSending(true);
        try {
            await sendInviteEmail(inviteToken, sendEmail, inviteLink);
            setEmailSent(true);
            toast.success(`Invitation sent to ${sendEmail}`);
        } catch (err: any) {
            toast.error(err.message || "Failed to send email");
        } finally {
            setIsSending(false);
        }
    };

    const handleClose = () => {  
        setEmail('');
        setSendEmail('');
        setInviteLink(null);
        setInviteToken(null);
        setEmailSent(false);
        onClose();
    }

    const handleReset = () => {
        setInviteLink(null);
        setInviteToken(null);
        setEmail('');
        setSendEmail('');
        setEmailSent(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Invite Staff Member</h2>
                        <p className="text-sm text-gray-500">Generate a secure registration link</p>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {!inviteLink ? (
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Staff Email (Optional)
                                </label>
                                <div className="relative">
                                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="e.g. staff@company.com"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1.5">If specified, the link will only work for this email and will be pre-filled for sending.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                        <div className="space-y-5">
                            {/* Registration Link */}
                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Registration Link</p>
                                <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-indigo-100">
                                    <code className="text-xs text-gray-600 flex-1 truncate font-mono select-all">
                                        {inviteLink}
                                    </code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-1.5 hover:bg-indigo-50 rounded-md text-indigo-600 transition-colors flex-shrink-0 cursor-pointer"
                                        title="Copy to clipboard"
                                    >
                                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Send via Email */}
                            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Send via Email</p>
                                {emailSent ? (
                                    <div className="flex items-center gap-2 text-emerald-700 bg-white p-3 rounded-lg border border-emerald-200">
                                        <div className="p-1 bg-emerald-100 rounded-full">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Email sent to <strong>{sendEmail}</strong>
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="relative mb-3">
                                            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input
                                                type="email"
                                                value={sendEmail}
                                                onChange={(e) => setSendEmail(e.target.value)}
                                                placeholder="Enter staff member's email"
                                                className="w-full pl-10 pr-4 py-2.5 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-sm transition-all"
                                            />
                                        </div>
                                        <button
                                            onClick={handleSendEmail}
                                            disabled={isSending || !sendEmail.trim()}
                                            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSending ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Send Registration Link
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            {/* Footer Actions */}
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer transition-colors"
                                >
                                    Generate Another
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-gray-900 text-white hover:bg-gray-800 text-sm font-medium cursor-pointer transition-colors"
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
