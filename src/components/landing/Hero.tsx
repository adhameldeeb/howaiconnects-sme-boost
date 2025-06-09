// src/components/landing/Hero.tsx
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />

      {/* Content */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your Business with
            <span className="text-accent-400"> AI-Powered </span>
            Data Management
          </h1>

          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Seamlessly integrate Airtable with AI capabilities for intelligent
            data processing, automation, and business insights.
          </p>

          <div className="flex justify-center gap-4">
            <Button size="lg" variant="primary">
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
