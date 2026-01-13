import { useState } from 'react';
import { X, Save, Copy, Check, Mail, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface EmailTemplate {
  subject: string;
  body: string;
}

interface EmailTemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: EmailTemplate) => void;
  template: EmailTemplate;
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
      { name: '{{staff.title}}', description: 'Staff member title' },
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
      { name: '{{link.viewAppointment}}', description: 'Link to view appointment details' },
    ],
  },
];

export function EmailTemplateEditor({
  isOpen,
  onClose,
  onSave,
  template,
  title,
  description,
}: EmailTemplateEditorProps) {
  const [subject, setSubject] = useState(template.subject);
  const [body, setBody] = useState(template.body);
  const [copiedVariable, setCopiedVariable] = useState<string | null>(null);

  const handleCopyVariable = (variable: string) => {
    navigator.clipboard.writeText(variable);
    setCopiedVariable(variable);
    setTimeout(() => setCopiedVariable(null), 2000);
  };

  const handleInsertVariable = (variable: string) => {
    setBody(body + ' ' + variable);
  };

  const handleSave = () => {
    onSave({ subject, body });
    onClose();
  };

  const handlePreview = () => {
    // Create a preview with sample data
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
      'staff.title': 'Senior Consultant',
      'staff.email': 'sarah@example.com',
      'company.name': 'My Business',
      'company.email': 'info@mybusiness.com',
      'company.phone': '+1 (555) 987-6543',
      'company.website': 'https://mybusiness.com',
      'company.address': '123 Main St, City, ST 12345',
      'link.reschedule': 'https://mybusiness.com/reschedule/APT-12345',
      'link.cancel': 'https://mybusiness.com/cancel/APT-12345',
      'link.viewAppointment': 'https://mybusiness.com/appointments/APT-12345',
    };

    let previewSubject = subject;
    let previewBody = body;

    Object.entries(previewData).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      previewSubject = previewSubject.replace(regex, value);
      previewBody = previewBody.replace(regex, value);
    });

    toast.info(`Preview for: ${previewSubject}`);
    console.log("Template Preview:", { subject: previewSubject, body: previewBody });
    // Note: Inline preview already shows this. 
    // If the user really wants a popup, we suggest a dedicated PreviewModal later.
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <h2>{title}</h2>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Editor Section (2 columns) */}
            <div className="col-span-2 space-y-6">
              {/* Subject Line */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    Subject Line <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your email message here... Use dynamic variables from the right panel."
                  rows={16}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Click on variables in the right panel to copy them, then paste into the subject or body.
                </p>
              </div>

              {/* Preview Section */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-900">Email Preview</span>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300">
                  <div className="mb-3 pb-3 border-b border-gray-200">
                    <p className="text-xs text-gray-500">Subject:</p>
                    <p className="text-sm text-gray-900 mt-1">
                      {subject || <span className="text-gray-400">Subject will appear here...</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Body:</p>
                    <div className="text-sm text-gray-900 whitespace-pre-wrap">
                      {body || <span className="text-gray-400">Email body will appear here...</span>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handlePreview}
                  className="mt-3 text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Preview with sample data
                </button>
              </div>
            </div>

            {/* Variables Section (1 column) */}
            <div className="col-span-1">
              <div className="sticky top-0">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
                  <h3 className="text-sm text-indigo-900 mb-2">Dynamic Variables</h3>
                  <p className="text-xs text-indigo-700">
                    Click to copy and paste into your email template. Variables will be replaced with actual data when emails are sent.
                  </p>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {DYNAMIC_VARIABLES.map((category) => (
                    <div key={category.category}>
                      <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        {category.category}
                      </h4>
                      <div className="space-y-1">
                        {category.variables.map((variable) => (
                          <button
                            key={variable.name}
                            onClick={() => handleCopyVariable(variable.name)}
                            className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-colors group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <code className="text-xs text-indigo-600 block truncate">
                                  {variable.name}
                                </code>
                                <p className="text-xs text-gray-600 mt-1">
                                  {variable.description}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                {copiedVariable === variable.name ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
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
          <div className="text-sm text-gray-600">
            {subject && body ? (
              <span className="text-green-600">✓ Template is complete</span>
            ) : (
              <span>Subject and body are required</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!subject || !body}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
