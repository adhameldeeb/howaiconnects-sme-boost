// src/components/landing/ProjectValidation.tsx
import { motion } from 'framer-motion';

const statistics = [
  { label: 'Active Users', value: '1,000+' },
  { label: 'Data Processed', value: '1M+' },
  { label: 'Time Saved', value: '1000h' },
  { label: 'ROI', value: '300%' }
];

const testimonials = [
  {
    quote: "This platform has revolutionized our data management processes.",
    author: "Jane Smith",
    role: "CTO",
    company: "TechCorp"
  }
  // ... more testimonials
];

export const ProjectValidation = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <blockquote className="text-gray-700 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
