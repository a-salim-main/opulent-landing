"use client";

import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  FormSection,
  Input,
  Textarea,
  TimeInput,
  TimezoneSelect
} from "@/components/form";
import { InfoTooltip } from "@/components/ui/info-tooltip";

export default function TempForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setError("");
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#080808] flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                Password Protected
              </h1>
              <p className="text-white/40">
                Please enter the password to access the form.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/90 focus:outline-none focus:border-white/20"
                placeholder="Enter password"
              />
              
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full px-4 py-2 bg-white/10 hover:bg-white/15 text-white/90 rounded-lg transition-all duration-200"
              >
                Access Form
              </Button>
            </form>
          </motion.div>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit form');
      }
      
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission Error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-[#080808] overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] to-[#0A0A0A]" />
      
      {/* Header */}
      <header className="absolute top-0 w-full z-20">
        <div className="mx-auto">
          <div className="relative bg-black/40 border-b border-white/[0.08] px-8 py-8">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex justify-between items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 1.5 }}
                  className="text-sm text-white/50"
                >
                  Client Onboarding
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 1.5 }}
                  className="text-sm text-white/50"
                >
                  Opulent Solutions
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <div className="relative z-20 pt-32 pb-32 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              Client Onboarding Form
            </h1>
            <p className="text-white/40">
              Fill out this form completely for each client onboarding.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Agency & Location Details */}
            <FormSection title="Agency & Location Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Agency Name"
                  name="agencyName"
                  required
                  placeholder="TechFlow Agency"
                  helpText="Use the name from our onboarding emails"
                />

                <Input
                  label="Agency ID"
                  name="agencyId"
                  required
                  placeholder="TF789XYZ123"
                  tooltip="Found in your agency onboarding confirmation email"
                />

                <Input
                  label="Location Name"
                  name="locationName"
                  required
                  placeholder="Quantum Fitness Studio"
                  helpText="Your client's business name"
                />

                <Input
                  label="Location ID"
                  name="locationId"
                  required
                  placeholder="QFS456ABC789"
                  tooltip="Found in GHL Subaccount > Settings > Business"
                />
              </div>
            </FormSection>

            {/* Contact & Calendar Setup */}
            <FormSection title="Contact & Calendar Setup">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Fallback Transfer Number"
                  name="fallbackNumber"
                  required
                  type="tel"
                  placeholder="+18148220152"
                  tooltip="In E.164 Format - Main business line for connection error fallback"
                />

                <TimezoneSelect
                  label="Timezone"
                  name="timezone"
                  required
                />

                <Input
                  label="Calendar ID"
                  name="calendarId"
                  required
                  placeholder="b5GEmdXK3ZoSaQHZRq5P"
                  tooltip="Booking Calendar ID - Found in GoHighLevel > Settings > Calendars"
                />

                <Input
                  label="Calendar Link"
                  name="calendarLink"
                  required
                  type="url"
                  placeholder="https://api.leadconnectorhq.com/widget/booking/..."
                  tooltip="Booking Calendar Link - Found in GoHighLevel > Settings > Calendars"
                />

                <Input
                  label="Call Later Calendar ID"
                  name="callLaterCalendarId"
                  required
                  placeholder="FoVRh3TAhtS8uL4u2sGd"
                  tooltip="ID for scheduling follow-up calls - Found in GoHighLevel > Settings > Calendars"
                />
              </div>
            </FormSection>

            {/* Business Details */}
            <FormSection title="Business Details">
              <div className="space-y-6">
                <Input
                  label="Location Address"
                  name="locationAddress"
                  required
                  placeholder="742 Innovation Avenue, Silicon Valley,"
                  tooltip="e.g. (742 Innovation Avenue, Silicon Valley, California, 94025) - Do not include country, Make sure to make it verbal. e.g. Avenue instead of Ave."
                />

                <div className="grid grid-cols-1 gap-6">
                  <TimeInput
                    label="Working Hours"
                    name="workingHours"
                    required
                    tooltip="Include closing days if there's any"
                  />
                </div>

                <Textarea
                  label="Services Provided"
                  name="services"
                  required
                  rows={6}
                  placeholder="- Personal Training Sessions
- Group Fitness Classes
- Nutrition Consultation
- Advanced Fitness Assessment
- Recovery and Wellness Programs
- Smart Fitness Technology Integration"
                  tooltip="List ALL services you provide - Be as specific as possible"
                />

                <Textarea
                  label="Business Context"
                  name="businessContext"
                  required
                  rows={6}
                  placeholder="Quantum Fitness Studio is Silicon Valley's premier smart fitness facility. We combine cutting-edge technology with personalized training to deliver an unmatched fitness experience... Include your Financing Options if there's any"
                  tooltip="Info about the Business - Provide concise and informative details, including who you are, what makes your business unique Aswell as your Financing Options if there's any"
                />

                <Textarea
                  label="Additional Notes"
                  name="additionalNotes"
                  rows={6}
                  placeholder="**Membership Options**:
- Basic Smart Fitness: $89/month
- Premium Training Package: From $149/month
- Elite Technology Integration: Custom pricing
- First Assessment: Complimentary

**Special Instructions**:
If someone asks about the pricing, just say that it's on the website."
                  tooltip="Additional Instructions to the AI - Include pricing guidelines and other special handling instructions"
                />
              </div>
            </FormSection>

            {/* Technical Configuration */}
            <FormSection title="Technical Configuration">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg text-white/80">Twilio Setup</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Twilio SID"
                      name="twilioSid"
                      required
                      placeholder="Should Start with AC..."
                      tooltip="Found in Twilio Dashboard"
                    />

                    <Input
                      label="Twilio Auth Token"
                      name="twilioAuthToken"
                      required
                      type="password"
                      tooltip="Found in Twilio Dashboard"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg text-white/80">Phone Numbers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Outbound Caller ID"
                      name="outboundCallerId"
                      required
                      type="tel"
                      placeholder="+15874155128"
                      tooltip="In E.164 Format - Preferable having A2P Verfication"
                    />

                    <Input
                      label="Inbound Caller ID"
                      name="inboundCallerId"
                      required
                      type="tel"
                      placeholder="+16892654681"
                      tooltip="Twilio's Number that people will call to be answered by AI - In E.164 Format (CAN BE THE SAME AS OUTBOUND CALLER ID)"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg text-white/80">VAPI Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="VAPI Billing Email"
                      name="vapiBillingEmail"
                      required
                      type="email"
                      placeholder="example@domain.com"
                      tooltip="Email used to create VAPI account - for white-labeled reports"
                    />

                    <Input
                      label="VAPI Private Key"
                      name="vapiPrivateKey"
                      required
                      type="password"
                      tooltip="Found in VAPI Dashboard under API Keys"
                    />

                    <Input
                      label="VAPI Public Key"
                      name="vapiPublicKey"
                      required
                      placeholder="0f9c822b-019b-49ee-bcd3-d0f108252104"
                      tooltip="Found in VAPI Dashboard under API Keys"
                    />
                  </div>
                </div>
              </div>
            </FormSection>

            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white/90 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Submitting...
                  </>
                ) : (
                  'Submit Form'
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full z-20">
        <div className="mx-auto">
          <div className="relative bg-black/40 border-t border-white/[0.08] px-8 py-8">
            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex justify-center items-center text-sm text-white/30"
              >
                © 2024 Opulent Solutions LTD. All Rights Reserved.
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 