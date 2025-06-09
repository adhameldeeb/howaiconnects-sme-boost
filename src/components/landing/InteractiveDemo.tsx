// src/components/landing/InteractiveDemo.tsx
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import AirtableConnectionDemo from './AirtableConnectionDemo';
import AIConfigurationDemo from './AIConfigurationDemo';
import WorkflowAutomationDemo from './WorkflowAutomationDemo';

const demoSteps = [
  {
    title: 'Connect Airtable',
    description: 'Seamlessly integrate your Airtable bases',
    component: <AirtableConnectionDemo />
  },
  {
    title: 'Configure AI',
    description: 'Set up AI-powered data processing',
    component: <AIConfigurationDemo />
  },
  {
    title: 'Automate Workflows',
    description: 'Create intelligent automation rules',
    component: <WorkflowAutomationDemo />
  }
];

export const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          See It in Action
        </h2>

        <Tabs defaultValue="connect-airtable" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 gap-4 mb-8">
            {demoSteps.map((step, index) => (
              <TabsTrigger
                key={index}
                value={step.title.toLowerCase().replace(/\s+/g, '-')}
                className="w-full"
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {demoSteps.map((step, index) => (
            <TabsContent
              key={index}
              value={step.title.toLowerCase().replace(/\s+/g, '-')}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                {step.component}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
