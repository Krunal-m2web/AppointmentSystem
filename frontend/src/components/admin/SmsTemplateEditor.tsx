import { useState } from 'react';
import { X, Save, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface SmsTemplate {
  body: string;
}

interface SmsTemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: SmsTemplate) => void;
  template: SmsTemplate;
  title: string;
  description: string;
}

const DYNAMIC_VARIABLES = [
  {
    category: 'Customer Information',
    variables: [
      { name: '{{customer.name}}', description: 'Customer full name' },
      { name: '{{customer.firstName}}', description: 'Customer first name' },
      { name: '{{customer.email}}', description: 'Customer email address' },
      { name: '{{customer.phone}}', description: 'Customer phone number' },
    ],
  },
  {
    category: 'Appointment Details',
    variables: [
      { name: '{{appointment.date}}', description: 'Appointment date (e.g., Jan 15, 2025)' },
      { name: '{{appointment.time}}', description: 'Appointment time (e.g., 2:30 PM)' },
      { name: '{{appointment.duration}}', description: 'Duration (e.g., 60 minutes)' },
      { name: '{{appointment.timezone}}', description: 'Timezone (e.g., PST)' },
      { name: '{{appointment.id}}', description: 'Unique appointment ID' },
    ],
  },
  {
    category: 'Service Information',
    variables: [
      { name: '{{service.name}}', description: 'Service name' },
      { name: '{{service.price}}', description: 'Service price' },
      { name: '{{service.description}}', description: 'Service description' },
    ],
  },
  {
    category: 'Staff Information',
    variables: [
      { name: '{{staff.name}}', description: 'Staff member name' },
      { name: '{{staff.email}}', description: 'Staff member email' },
    ],
  },
  {
    category: 'Company Information',
    variables: [
      { name: '{{company.name}}', description: 'Your company name' },
      { name: '{{company.email}}', description: 'Your business email' },
      { name: '{{company.phone}}', description: 'Your business phone' },
      { name: '{{company.website}}', description: 'Your website URL' },
      { name: '{{company.address}}', description: 'Your business address' },
    ],
  },
  {
    category: 'Actions',
    variables: [
      { name: '{{link.reschedule}}', description: 'Link to reschedule appointment' },
      { name: '{{link.cancel}}', description: 'Link to cancel appointment' },
    ],
  },
];

export function SmsTemplateEditor({
  isOpen,
  onClose,
  onSave,
  template,
  title,
  description,
}: SmsTemplateEditorProps) {
  const [body, setBody] = useState(template.body);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleCopyVariable = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVariable(variable);
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
        onSave({ body });
        setIsSaving(false);
        onClose();
    }, 800);
  };

  const getPreviewContent = () => {
    const previewData = {
      'customer.name': 'John Doe',
      'customer.firstName': 'John',
      'customer.email': 'john.doe@example.com',
      'customer.phone': '+1 (555) 123-4567',
      'appointment.date': 'January 15, 2025',
      'appointment.time': '2:30 PM',
      'appointment.duration': '60 minutes',
      'appointment.timezone': 'PST',
      'appointment.id': 'APT-12345',
      'service.name': 'Consultation',
      'service.price': '$150',
      'service.description': 'Initial consultation session',
      'staff.name': 'Dr. Sarah Smith',
      'staff.email': 'sarah@example.com',
      'company.name': 'My Business',
      'company.email': 'info@mybusiness.com',
      'company.phone': '+1 (555) 987-6543',
      'company.website': 'https://mybusiness.com',
      'company.address': '123 Main St, City, ST 12345',
      'link.reschedule': 'https://mybusiness.com/reschedule/APT-12345',
      'link.cancel': 'https://mybusiness.com/cancel/APT-12345',
    };

    let previewBody = body;

    Object.entries(previewData).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      previewBody = previewBody.replace(regex, value);
    });

    return previewBody;
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const preview = getPreviewContent();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="bg-white border-b border-gray-100 p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
            <p className="text-sm text-gray-500 mt-1 font-normal">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Editor Section (2 columns) */}
            <div className="lg:col-span-2 space-y-8">
              {/* SMS Body */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700">
                    SMS Message Body <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${body.length > 160 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                    {body.length} characters {body.length > 160 && '(Multiple SMS charges may apply)'}
                  </span>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your SMS message here... Use dynamic variables from the right panel."
                  rows={8}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-green-600/10 focus:border-green-600 transition-all outline-none font-mono text-sm shadow-sm ring-offset-white leading-relaxed"
                />
                <p className="text-xs text-gray-400 italic font-medium px-1">
                  Tip: Keep messages under 160 characters to avoid multiple segment billing.
                </p>
              </div>

              {/* Preview Section */}
              <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">Message Preview</span>
                </div>
                
                <div className="flex justify-center py-4 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                  {/* Smartphone Mockup UI */}
                  <div className="max-w-[280px] w-full bg-white rounded-[40px] border-8 border-gray-900 shadow-2xl overflow-hidden aspect-[9/16] p-4 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-2xl z-10"></div>
                    
                    <div className="mt-6 flex flex-col h-full bg-gray-100/50 rounded-2xl relative">
                      <div className="p-3 bg-white border-b border-gray-100 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500">
                          {title.charAt(0)}
                        </div>
                        <span className="text-[10px] font-bold text-gray-900">{title}</span>
                      </div>
                      
                      <div className="flex-1 p-3 overflow-y-auto">
                        <div className="bg-gray-200/50 text-gray-900 p-3 rounded-2xl rounded-tl-none text-[11px] leading-relaxed shadow-sm max-w-[85%] whitespace-pre-wrap animate-in slide-in-from-left-2 duration-300">
                          {isPreviewMode ? preview : (body || <span className="text-gray-400 italic">Message preview will appear here...</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handlePreview}
                    className="text-xs font-bold text-green-600 hover:text-green-700 hover:bg-green-50 px-4 py-2 rounded-lg transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3" />
                    {isPreviewMode ? 'Show Raw Template' : 'Preview with sample data'}
                  </button>
                </div>
              </div>
            </div>

            {/* Variables Section (1 column) */}
            <div className="lg:col-span-1">
              <div className="sticky top-0 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full max-h-[calc(90vh-300px)]">
                <div className="p-4 bg-green-50 border-b border-green-100">
                  <h3 className="text-sm font-bold text-green-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Dynamic Variables
                  </h3>
                  <p className="text-[10px] text-green-700 mt-1 font-medium leading-relaxed">
                    Click to copy and paste into your template. We'll replace these with actual data automatically.
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                  {DYNAMIC_VARIABLES.map((category) => (
                    <div key={category.category}>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">
                        {category.category}
                      </h4>
                      <div className="space-y-2">
                        {category.variables.map((variable) => (
                          <button
                            key={variable.name}
                            onClick={() => handleCopyVariable(variable.name)}
                            className="w-full text-left p-3.5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-green-500 hover:shadow-md hover:shadow-green-100/50 transition-all group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <code className="text-xs font-bold text-green-600 block truncate font-mono">
                                  {variable.name}
                                </code>
                                <p className="text-xs text-gray-500 mt-1 font-medium leading-tight">
                                  {variable.description}
                                </p>
                              </div>
                              <div className="flex-shrink-0 mt-0.5">
                                {copiedVariable === variable.name ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-gray-300 group-hover:text-green-500 transition-colors" />
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${body ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-xs font-bold text-gray-500">
              {body ? 'Ready to save' : 'Message body is required'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!body || isSaving}
              className="flex items-center gap-2 px-8 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-100 hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save SMS Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
