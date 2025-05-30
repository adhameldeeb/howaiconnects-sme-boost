
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { emailjsConfig, smtpConfig } from "@/config/integrationConfig";
import emailjs from '@emailjs/browser';
import { Switch } from "@/components/ui/switch";

interface EmailSettingsProps {
  onUpdate?: () => void;
}

const EmailSettings = ({ onUpdate }: EmailSettingsProps) => {
  const [settings, setSettings] = useState({
    serviceId: emailjsConfig.serviceId,
    contactTemplateId: emailjsConfig.contactTemplateId,
    bookingTemplateId: emailjsConfig.bookingTemplateId,
    publicKey: emailjsConfig.publicKey,
  });
  
  const [smtpSettings, setSmtpSettings] = useState({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    user: smtpConfig.user,
    appPassword: smtpConfig.appPassword,
  });
  
  const [testEmail, setTestEmail] = useState({
    to: "",
    subject: "Test Email from HowAIConnects",
    message: "This is a test email to verify your EmailJS configuration is working correctly."
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [smtpEnabled, setSmtpEnabled] = useState(true);

  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('emailSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
      } catch (error) {
        console.error("Failed to parse saved email settings:", error);
      }
    }
    
    const savedSmtpSettings = localStorage.getItem('smtpSettings');
    if (savedSmtpSettings) {
      try {
        const parsedSettings = JSON.parse(savedSmtpSettings);
        setSmtpSettings(prevSettings => ({
          ...prevSettings,
          ...parsedSettings
        }));
        setSmtpEnabled(parsedSettings.enabled !== false);
      } catch (error) {
        console.error("Failed to parse saved SMTP settings:", error);
      }
    }
  }, []);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSmtpSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSmtpSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTestEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTestEmail(prev => ({ ...prev, [name]: value }));
  };

  const saveSettings = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('emailSettings', JSON.stringify(settings));
      localStorage.setItem('smtpSettings', JSON.stringify({
        ...smtpSettings,
        enabled: smtpEnabled
      }));
      
      // Update emailjs with new settings
      emailjs.init(settings.publicKey);
      
      toast({
        title: "Settings saved",
        description: "Email integration settings have been saved successfully."
      });
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail.to) {
      toast({
        title: "Missing information",
        description: "Please enter a recipient email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    try {
      await emailjs.send(
        settings.serviceId,
        settings.contactTemplateId,
        {
          from_name: "Email Test",
          from_email: "test@howaiconnects.com",
          to_email: testEmail.to,
          subject: testEmail.subject,
          message: testEmail.message
        },
        settings.publicKey
      );
      
      toast({
        title: "Test email sent",
        description: `Email was successfully sent to ${testEmail.to}`
      });
    } catch (error) {
      console.error("Error sending test email:", error);
      toast({
        title: "Failed to send test email",
        description: "Please check your EmailJS configuration and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Integration Settings</CardTitle>
        <CardDescription>
          Configure your email services to send emails from forms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings">
          <TabsList className="mb-4">
            <TabsTrigger value="settings">EmailJS</TabsTrigger>
            <TabsTrigger value="smtp">SMTP</TabsTrigger>
            <TabsTrigger value="test">Test Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="serviceId">EmailJS Service ID</Label>
              <Input
                id="serviceId"
                name="serviceId"
                value={settings.serviceId}
                onChange={handleSettingChange}
                placeholder="e.g., service_jz8senj"
              />
              <p className="text-sm text-muted-foreground">
                Default is set to use your SMTP service: service_jz8senj
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactTemplateId">Contact Form Template ID</Label>
              <Input
                id="contactTemplateId"
                name="contactTemplateId"
                value={settings.contactTemplateId}
                onChange={handleSettingChange}
                placeholder="e.g., template_abc123"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bookingTemplateId">Booking Form Template ID</Label>
              <Input
                id="bookingTemplateId"
                name="bookingTemplateId"
                value={settings.bookingTemplateId}
                onChange={handleSettingChange}
                placeholder="e.g., template_xyz789"
              />
              <p className="text-sm text-muted-foreground">
                Create email templates in the Email Templates section of EmailJS
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="publicKey">EmailJS Public Key</Label>
              <Input
                id="publicKey"
                name="publicKey"
                value={settings.publicKey}
                onChange={handleSettingChange}
                type="password"
                placeholder="Your EmailJS public key"
              />
              <p className="text-sm text-muted-foreground">
                Found in Account &gt; API Keys section of your EmailJS dashboard
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md mt-4">
              <h4 className="font-medium text-blue-800">Getting started with EmailJS</h4>
              <ol className="list-decimal ml-5 text-sm text-blue-700 space-y-1 mt-2">
                <li>Create an account at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
                <li>Set up an Email Service (Gmail, Outlook, etc.)</li>
                <li>Create Email Templates for contact and booking forms</li>
                <li>Copy your IDs and keys to this settings page</li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="smtp" className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Switch 
                id="smtp-enabled"
                checked={smtpEnabled}
                onCheckedChange={setSmtpEnabled}
              />
              <Label htmlFor="smtp-enabled">Use SMTP as backup</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="host">SMTP Host</Label>
              <Input
                id="host"
                name="host"
                value={smtpSettings.host}
                onChange={handleSmtpSettingChange}
                placeholder="e.g., smtp.hostinger.com"
                disabled={!smtpEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="port">SMTP Port</Label>
              <Input
                id="port"
                name="port"
                value={smtpSettings.port.toString()}
                onChange={handleSmtpSettingChange}
                placeholder="e.g., 465"
                disabled={!smtpEnabled}
              />
            </div>
            
            <div className="flex items-center space-x-2 my-4">
              <Switch 
                id="secure"
                checked={smtpSettings.secure}
                onCheckedChange={(checked) => 
                  setSmtpSettings(prev => ({ ...prev, secure: checked }))
                }
                disabled={!smtpEnabled}
              />
              <Label htmlFor="secure">Use SSL/TLS</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user">Username/Email</Label>
              <Input
                id="user"
                name="user"
                value={smtpSettings.user}
                onChange={handleSmtpSettingChange}
                placeholder="e.g., support@howaiconnects.com"
                disabled={!smtpEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appPassword">App Password</Label>
              <Input
                id="appPassword"
                name="appPassword"
                value={smtpSettings.appPassword}
                onChange={handleSmtpSettingChange}
                type="password"
                placeholder="Your app-specific password"
                disabled={!smtpEnabled}
              />
              <p className="text-sm text-muted-foreground">
                For security reasons, use an app-specific password instead of your main account password
              </p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-md mt-4">
              <h4 className="font-medium text-amber-800">SMTP Configuration Note</h4>
              <p className="text-sm text-amber-700 mt-2">
                Your SMTP settings are now pre-configured for <strong>smtp.hostinger.com</strong>. 
                These credentials will be used as a fallback if EmailJS fails.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="test" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to">Recipient Email</Label>
              <Input
                id="to"
                name="to"
                value={testEmail.to}
                onChange={handleTestEmailChange}
                placeholder="Enter email address to receive test"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={testEmail.subject}
                onChange={handleTestEmailChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={testEmail.message}
                onChange={handleTestEmailChange}
                rows={4}
              />
            </div>
            
            <Button 
              onClick={sendTestEmail} 
              disabled={isSending}
              className="mt-2"
            >
              {isSending ? "Sending..." : "Send Test Email"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={saveSettings} disabled={isSaving} className="mr-2">
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmailSettings;
