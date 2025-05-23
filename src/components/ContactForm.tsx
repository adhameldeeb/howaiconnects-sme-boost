
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { sendToZapier } from "@/utils/formUtils";
import { zapierConfig, n8nConfig } from "@/config/integrationConfig";
import { sendContactEmail } from "@/services/emailService";

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSettings, setEmailSettings] = useState({
    configured: false
  });
  
  useEffect(() => {
    // Check if email settings exist in localStorage
    const savedSettings = localStorage.getItem('emailSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        if (
          parsedSettings.serviceId && 
          parsedSettings.serviceId !== "YOUR_SERVICE_ID" &&
          parsedSettings.contactTemplateId && 
          parsedSettings.publicKey
        ) {
          setEmailSettings({
            configured: true
          });
        }
      } catch (error) {
        console.error("Failed to parse saved email settings:", error);
      }
    }
  }, []);
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (!data.name || !data.email || !data.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send email notification using EmailJS
      if (emailSettings.configured) {
        await sendContactEmail({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message
        });
      }
      
      // Try to send to Zapier if configured
      try {
        if (zapierConfig.contactFormWebhook && 
            zapierConfig.contactFormWebhook !== "YOUR_ZAPIER_CONTACT_FORM_WEBHOOK_URL") {
          await sendToZapier(
            zapierConfig.contactFormWebhook,
            {
              ...data,
              formType: "contact"
            },
            "contact_form"
          );
        }
      } catch (zapierError) {
        console.error("Zapier send error:", zapierError);
        // Continue execution even if Zapier fails
      }
      
      // Try to send to n8n if configured
      try {
        if (n8nConfig.contactFormWebhook && 
            n8nConfig.contactFormWebhook !== "YOUR_N8N_CONTACT_FORM_WEBHOOK_URL") {
          await sendToZapier(
            n8nConfig.contactFormWebhook,
            {
              ...data,
              formType: "contact"
            },
            "contact_form"
          );
        }
      } catch (n8nError) {
        console.error("n8n send error:", n8nError);
        // Continue execution even if n8n fails
      }
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      console.error("Send error:", error);
      toast({
        title: "Failed to send message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center gap-3 text-brand-primary mb-6">
        <Mail className="h-7 w-7" />
        <h3 className="text-2xl font-bold">Send Us a Message</h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} className="mt-1" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="mt-1" required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} className="mt-1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Textarea {...field} className="mt-1" rows={5} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-brand-primary hover:bg-brand-accent"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          
          <p className="text-sm text-gray-500 text-center mt-4">
            We'll respond to your message as soon as possible, typically within 24 hours.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
