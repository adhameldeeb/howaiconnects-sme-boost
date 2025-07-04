
// Migration Planning Utility for Next.js 15 + Turborepo
const fs = require('fs');
const path = require('path');

class MigrationPlanner {
  constructor() {
    this.migrationPlan = {
      overview: {
        currentStack: 'React + Vite + TypeScript',
        targetStack: 'Next.js 15 + Turborepo + TypeScript',
        estimatedDuration: '12 weeks',
        complexity: 'Medium',
        riskLevel: 'Low'
      },
      monorepoStructure: {},
      componentMigrationMap: {},
      routeMigrationMap: {},
      dependencyAnalysis: {},
      airtableIntegration: {},
      seoImprovements: {}
    };
  }

  generateMonorepoStructure() {
    this.migrationPlan.monorepoStructure = {
      root: {
        'package.json': 'Turborepo configuration with workspaces',
        'turbo.json': 'Build pipeline configuration',
        '.gitignore': 'Updated for monorepo structure',
        'README.md': 'Updated documentation'
      },
      apps: {
        'web/': {
          description: 'Main Next.js 15 application',
          structure: {
            'app/': 'App Router directory structure',
            'components/': 'App-specific components',
            'lib/': 'App-specific utilities',
            'public/': 'Static assets',
            'styles/': 'Global styles and Tailwind config'
          },
          dependencies: [
            'next@15',
            'react@18',
            'typescript',
            '@repo/ui',
            '@repo/shared',
            '@repo/config'
          ]
        },
        'admin/': {
          description: 'Admin dashboard application',
          structure: {
            'app/': 'Admin-specific routes',
            'components/': 'Admin components',
            'lib/': 'Admin utilities'
          },
          dependencies: [
            'next@15',
            '@repo/ui',
            '@repo/shared'
          ]
        },
        'docs/': {
          description: 'Documentation site',
          structure: {
            'app/': 'Documentation routes',
            'content/': 'MDX documentation files'
          },
          dependencies: [
            'next@15',
            '@next/mdx',
            '@repo/ui'
          ]
        }
      },
      packages: {
        'ui/': {
          description: 'Shared UI component library',
          structure: {
            'src/components/': 'Reusable UI components',
            'src/styles/': 'Component styles',
            'package.json': 'Component library config'
          },
          exports: [
            'Button',
            'Card',
            'Form components',
            'Navigation components',
            'Layout components'
          ]
        },
        'shared/': {
          description: 'Shared business logic and utilities',
          structure: {
            'src/lib/': 'Utility functions',
            'src/hooks/': 'Custom React hooks',
            'src/contexts/': 'React contexts',
            'src/services/': 'API and service layer'
          }
        },
        'config/': {
          description: 'Shared configurations',
          structure: {
            'eslint/': 'ESLint configurations',
            'typescript/': 'TypeScript configurations',
            'tailwind/': 'Tailwind CSS configurations'
          }
        },
        'types/': {
          description: 'Shared TypeScript definitions',
          structure: {
            'src/': 'Type definitions for business entities'
          }
        }
      }
    };
  }

  generateComponentMigrationMap() {
    this.migrationPlan.componentMigrationMap = {
      reusableComponents: {
        'SalesDeckHero': {
          currentLocation: 'src/components/sales/SalesDeckHero.tsx',
          targetLocation: 'packages/ui/src/components/sales/SalesDeckHero.tsx',
          migrationComplexity: 'Low',
          dependencies: ['HeroBackground', 'HeroContent', 'DivisionCarousel'],
          modifications: [
            'Convert to server component where possible',
            'Extract client-side interactions to separate hooks',
            'Optimize for SEO with proper meta tags'
          ]
        },
        'DeckSection': {
          currentLocation: 'src/components/sales/deck-section/',
          targetLocation: 'packages/ui/src/components/sales/deck-section/',
          migrationComplexity: 'Low',
          dependencies: ['BenefitsSection', 'FeaturesList', 'CallToAction'],
          modifications: [
            'Convert to server component',
            'Add structured data for SEO',
            'Optimize loading performance'
          ]
        },
        'Navbar': {
          currentLocation: 'src/components/Navbar.tsx',
          targetLocation: 'packages/ui/src/components/layout/Navbar.tsx',
          migrationComplexity: 'Medium',
          dependencies: ['Navigation menu', 'Mobile menu', 'Theme toggle'],
          modifications: [
            'Implement as server component with client islands',
            'Add dynamic route highlighting',
            'Improve accessibility'
          ]
        }
      },
      pageComponents: {
        'Index': {
          currentLocation: 'src/pages/Index.tsx',
          targetLocation: 'apps/web/app/page.tsx',
          migrationComplexity: 'Medium',
          modifications: [
            'Convert to App Router page component',
            'Implement proper metadata',
            'Add structured data',
            'Optimize for Core Web Vitals'
          ]
        },
        'SalesDeck': {
          currentLocation: 'src/pages/SalesDeck.tsx',
          targetLocation: 'apps/web/app/sales-deck/page.tsx',
          migrationComplexity: 'Low',
          modifications: [
            'Convert to server component',
            'Add dynamic metadata',
            'Implement proper SEO tags'
          ]
        },
        'Contact': {
          currentLocation: 'src/pages/Contact.tsx',
          targetLocation: 'apps/web/app/contact/page.tsx',
          migrationComplexity: 'Medium',
          modifications: [
            'Convert form handling to server actions',
            'Add proper validation',
            'Implement reCAPTCHA',
            'Add local business schema'
          ]
        }
      }
    };
  }

  generateRouteMigrationMap() {
    this.migrationPlan.routeMigrationMap = {
      staticRoutes: {
        '/': 'apps/web/app/page.tsx',
        '/about': 'apps/web/app/about/page.tsx',
        '/contact': 'apps/web/app/contact/page.tsx',
        '/services': 'apps/web/app/services/page.tsx',
        '/sales-deck': 'apps/web/app/sales-deck/page.tsx',
        '/sales-presentation': 'apps/web/app/sales-presentation/page.tsx'
      },
      dynamicRoutes: {
        '/courses/[id]': 'apps/web/app/courses/[id]/page.tsx',
        '/resources/[category]': 'apps/web/app/resources/[category]/page.tsx',
        '/resources/downloads/[id]': 'apps/web/app/resources/downloads/[id]/page.tsx'
      },
      nestedRoutes: {
        '/services/ai-automation-solutions/': 'apps/web/app/services/ai-automation-solutions/',
        '/services/ai-consultation/': 'apps/web/app/services/ai-consultation/',
        '/resources/templates/': 'apps/web/app/resources/templates/'
      },
      adminRoutes: {
        '/admin/login': 'apps/admin/app/login/page.tsx',
        '/admin/email-integration': 'apps/admin/app/email-integration/page.tsx'
      },
      improvements: [
        'Add middleware for authentication',
        'Implement proper error boundaries',
        'Add loading states',
        'Implement progressive enhancement'
      ]
    };
  }

  generateDependencyAnalysis() {
    this.migrationPlan.dependencyAnalysis = {
      currentDependencies: {
        framework: 'React 18 + Vite',
        routing: 'react-router-dom',
        styling: 'Tailwind CSS + shadcn/ui',
        forms: 'react-hook-form + zod',
        state: 'React hooks + Context API',
        email: '@emailjs/browser',
        charts: 'recharts',
        icons: 'lucide-react'
      },
      targetDependencies: {
        framework: 'Next.js 15',
        routing: 'App Router (built-in)',
        styling: 'Tailwind CSS + shadcn/ui (migrated)',
        forms: 'react-hook-form + zod + server actions',
        state: 'Zustand + React Query',
        email: 'Resend or SendGrid',
        charts: 'recharts (compatible)',
        icons: 'lucide-react (compatible)'
      },
      newDependencies: [
        '@vercel/analytics',
        '@vercel/speed-insights',
        'next-themes (improved)',
        '@next/bundle-analyzer',
        'sharp (image optimization)'
      ],
      removalTargets: [
        'react-router-dom',
        'react-helmet-async (replaced by Next.js metadata)',
        'vite (replaced by Next.js build system)'
      ]
    };
  }

  generateAirtableIntegration() {
    this.migrationPlan.airtableIntegration = {
      schema: {
        pages: {
          purpose: 'Content management for all pages',
          fields: [
            'Page Title (Primary)',
            'URL Path',
            'Meta Description',
            'Primary Keywords (Multiple Select)',
            'Content Status (Single Select)',
            'Business Purpose (Single Select)',
            'Last Updated (Date)',
            'Performance Score (Number)',
            'A/B Test Status (Single Select)'
          ]
        },
        contentBlocks: {
          purpose: 'Reusable content components',
          fields: [
            'Block Name (Primary)',
            'Block Type (Single Select)',
            'Content (Long Text)',
            'Used On Pages (Linked Record)',
            'Conversion Rate (Percent)',
            'Last Modified (Date)'
          ]
        },
        seoData: {
          purpose: 'SEO optimization tracking',
          fields: [
            'Page (Linked Record)',
            'Target Keywords (Multiple Select)',
            'Meta Title',
            'Meta Description',
            'Schema Markup (Long Text)',
            'Search Volume (Number)',
            'Current Ranking (Number)',
            'Optimization Score (Number)'
          ]
        },
        mediaAssets: {
          purpose: 'Asset management and optimization',
          fields: [
            'Asset Name (Primary)',
            'File (Attachment)',
            'Alt Text',
            'Usage Context (Multiple Select)',
            'Optimization Status (Single Select)',
            'SEO Value (Single Select)',
            'Used On Pages (Linked Record)'
          ]
        }
      },
      apiIntegration: {
        approach: 'Server-side API routes in Next.js',
        caching: 'Next.js caching with revalidation',
        realtime: 'Webhook-based updates',
        fallback: 'Static content as backup'
      },
      workflows: {
        contentCreation: [
          'Content planning in Airtable',
          'Draft creation with AI assistance (Claude integration)',
          'SEO optimization using keyword data',
          'Review and approval workflow',
          'Publication to Next.js',
          'Performance monitoring'
        ],
        seoOptimization: [
          'Keyword research and tracking',
          'Content gap analysis',
          'Meta data optimization',
          'Internal linking strategy',
          'Performance tracking',
          'Continuous improvement recommendations'
        ]
      }
    };
  }

  generateSEOImprovements() {
    this.migrationPlan.seoImprovements = {
      technicalSEO: {
        currentLimitations: [
          'Client-side rendering impacts initial load',
          'Limited meta tag management',
          'Basic sitemap generation',
          'No structured data implementation'
        ],
        nextJsImprovements: [
          'Server-side rendering with streaming',
          'Dynamic metadata API',
          'Automatic sitemap generation',
          'Built-in structured data support',
          'Image optimization with next/image',
          'Core Web Vitals optimization'
        ]
      },
      contentSEO: {
        currentState: [
          'Basic meta descriptions',
          'Limited keyword optimization',
          'Manual internal linking',
          'Static content structure'
        ],
        improvements: [
          'Dynamic meta generation from Airtable',
          'AI-powered keyword optimization',
          'Automated internal linking suggestions',
          'Content gap analysis and recommendations',
          'A/B testing for meta descriptions',
          'Performance-based content optimization'
        ]
      },
      localSEO: {
        currentImplementation: 'Basic contact information',
        improvements: [
          'Structured data for local business',
          'Google My Business integration',
          'Local keyword optimization',
          'Location-based landing pages',
          'Review management integration'
        ]
      }
    };
  }

  generateImplementationPlan() {
    return {
      week1_2: {
        title: 'Content Extraction & Analysis',
        deliverables: [
          'Complete content audit (JSON, Markdown, HTML exports)',
          'LLM analysis report using Claude Opus 4',
          'Content gap analysis',
          'SEO opportunity assessment',
          'Airtable schema design'
        ],
        timeline: '10 business days',
        resources: 'Content strategist + LLM analysis'
      },
      week3_4: {
        title: 'Foundation Setup',
        deliverables: [
          'Turborepo initialization',
          'Next.js 15 app structure',
          'Shared component library setup',
          'TypeScript configuration',
          'Development environment',
          'Basic Airtable integration'
        ],
        timeline: '10 business days',
        resources: 'Full-stack developer + DevOps'
      },
      week5_8: {
        title: 'Core Migration',
        deliverables: [
          'All pages migrated to App Router',
          'Component library populated',
          'SEO infrastructure implemented',
          'Airtable content management active',
          'Internal linking optimization',
          'Performance optimizations'
        ],
        timeline: '20 business days',
        resources: 'Full-stack developer + Content manager'
      },
      week9_12: {
        title: 'Enhancement & Optimization',
        deliverables: [
          'Advanced SEO features',
          'Analytics implementation',
          'A/B testing infrastructure',
          'Content automation workflows',
          'Performance monitoring',
          'Final testing and launch'
        ],
        timeline: '20 business days',
        resources: 'Full-stack developer + SEO specialist'
      }
    };
  }

  exportMigrationPlan() {
    this.generateMonorepoStructure();
    this.generateComponentMigrationMap();
    this.generateRouteMigrationMap();
    this.generateDependencyAnalysis();
    this.generateAirtableIntegration();
    this.generateSEOImprovements();

    const implementationPlan = this.generateImplementationPlan();
    this.migrationPlan.implementationPlan = implementationPlan;

    const planPath = path.join(__dirname, '..', '..', 'migration-plan-detailed.json');
    fs.writeFileSync(planPath, JSON.stringify(this.migrationPlan, null, 2));
    
    console.log(`📋 Detailed migration plan saved to ${planPath}`);
    return planPath;
  }

  generateMarkdownPlan() {
    const markdown = `# Next.js 15 + Turborepo Migration Plan

## Overview
- **Current Stack**: ${this.migrationPlan.overview.currentStack}
- **Target Stack**: ${this.migrationPlan.overview.targetStack}
- **Duration**: ${this.migrationPlan.overview.estimatedDuration}
- **Complexity**: ${this.migrationPlan.overview.complexity}
- **Risk Level**: ${this.migrationPlan.overview.riskLevel}

## Monorepo Structure
\`\`\`
project-root/
├── apps/
│   ├── web/           # Main Next.js 15 application
│   ├── admin/         # Admin dashboard
│   └── docs/          # Documentation site
├── packages/
│   ├── ui/            # Shared UI components
│   ├── shared/        # Business logic & utilities
│   ├── config/        # Shared configurations
│   └── types/         # TypeScript definitions
├── turbo.json         # Turborepo configuration
└── package.json       # Root package.json with workspaces
\`\`\`

## Implementation Timeline

### Phase 1: Content Extraction & Analysis (Weeks 1-2)
- [ ] Run comprehensive content extraction
- [ ] LLM analysis with Claude Opus 4
- [ ] Content gap identification
- [ ] SEO opportunity assessment
- [ ] Airtable schema design

### Phase 2: Foundation Setup (Weeks 3-4)
- [ ] Initialize Turborepo structure
- [ ] Set up Next.js 15 with App Router
- [ ] Create shared component library
- [ ] Configure TypeScript and tooling
- [ ] Set up development environment

### Phase 3: Core Migration (Weeks 5-8)
- [ ] Migrate all pages to App Router
- [ ] Populate shared component library
- [ ] Implement SEO infrastructure
- [ ] Set up Airtable integration
- [ ] Optimize internal linking
- [ ] Performance optimizations

### Phase 4: Enhancement & Optimization (Weeks 9-12)
- [ ] Advanced SEO features (structured data, sitemaps)
- [ ] Analytics and tracking setup
- [ ] A/B testing infrastructure
- [ ] Content automation workflows
- [ ] Final testing and deployment

## Key Benefits
1. **Better SEO**: Server-side rendering, dynamic metadata, structured data
2. **Improved Performance**: App Router, image optimization, Core Web Vitals
3. **Enhanced DX**: Turborepo builds, shared components, type safety
4. **Content Management**: Airtable integration, automated workflows
5. **Scalability**: Monorepo structure, modular architecture

## Risk Mitigation
- Incremental migration approach
- Comprehensive testing at each phase
- Fallback strategies for critical components
- Performance monitoring throughout migration
`;

    const markdownPath = path.join(__dirname, '..', '..', 'migration-plan.md');
    fs.writeFileSync(markdownPath, markdown);
    
    console.log(`📝 Migration plan markdown saved to ${markdownPath}`);
    return markdownPath;
  }
}

// Export for use
module.exports = { MigrationPlanner };

// Run if called directly
if (require.main === module) {
  const planner = new MigrationPlanner();
  planner.exportMigrationPlan();
  planner.generateMarkdownPlan();
  console.log('🎉 Migration planning completed!');
}
