export const projectsData = [
  {
    id: 1,
    slug: 'data-acquisition-portal',
    title: 'Data Acquisition Portal (D.A.P.)',
    subtitle: 'Enterprise-grade platform for meter test data acquisition and field services work order management',
    description: 'Data Acquisition Portal (D.A.P.) is an enterprise-grade platform for meter test data acquisition and field services work order management, designed to streamline operations for utility and contractor companies.',
    fullDescription: `Data Acquisition Portal (D.A.P.) is a robust, enterprise-grade solution built to modernize and optimize meter test data collection and field services work order management. 
    
    Developed for utility contractor companies, D.A.P. centralizes all meter test data and field service activities within a secure, cloud-based platform. The system enables real-time data capture from the field, efficient scheduling and assignment of work orders, and comprehensive tracking of project progress. 
    
    With integrated analytics, reporting, and digital documentation, D.A.P. empowers organizations to reduce manual errors, enhance compliance, and improve overall productivity—all while ensuring data security and reliability at scale.`,
    image: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/dap-pbwweb-art.jpg',
    heroImage: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/dap-pbwweb-art.jpg',
    category: 'Cloud Web Application Solution',
    technologies: ['.NET 9', 'Azure App Service', 'Azure SQL', 'Azure Functions', 'Azure Blob Storage', 'Azure DevOps'],
    azureServices: [
      'Azure App Service',
      'Azure SQL Database', 
      'Azure Functions',
      'Azure Blob Storage', 
      'Azure Key Vault',
      'Azure Application Insights'
    ],
    features: [
      'Shop Work inventory management',
      'Meter search and filtering',
      'Data management for meter test data workflow, Teco, Florida Public Utilities',
      'Field services work order management',
      'Leak Surveys',
      'Full integration with Google Maps for location services',
      'Customer portal for meter test data access',
      'Customer Portal for field services work order management',
      'Azure DevOps CI/CD pipeline for automated deployments with GitHub as repo manager',
    ],
    challenges: [
      'Manual data entry and management',
      'Work order management using PDF forms',
      'Lack of real-time data access',
      'Customer Portal for field services work order management'
    ],
    solutions: [
      'Azure App Service for scalable web hosting (Portal and API)',
      'Azure SQL with automatic scaling',
      'Azure Functions for serverless processing',
      'Azure Key Vault for secure credential management'
    ],
    results: [
      '99.9% uptime achieved',
      '99% reduction in manual data entry errors',
      '100% automated work order management',
      '99% increase in customer satisfaction',
      '100% increase in customer collaboration',
      '300% improvement in scalability'
    ],
    github: '#',
    live: 'https://dap.pbw.network/',
    featured: true,
    duration: '8 months',
    teamSize: '3 developers',
    clientType: 'Utilities and Energy Contractors'
  },
  {
    id: 2,
    slug: 'pha-web-presence', 
    title: 'PHA Web Presence',
    subtitle: 'Complete custom web application/cms solution for Public Housing Authorities',
    description: 'PHA Web Presence is a modern, custom web application and CMS designed specifically for Public Housing Authorities, delivering secure, accessible, and easy-to-manage Marketing Websites and Resident Portals hosted on the Azure cloud.',
    fullDescription: `PHA Web Presence is a comprehensive, enterprise-grade web application and content management system (CMS) tailored for Public Housing Authorities. 
    
    Built on Azure Cloud, this solution empowers PHAs to create and maintain dynamic, accessible, and mobile-friendly websites with ease. The platform combines robust content management features—such as news updates, event calendars, document libraries, and custom forms—with secure user authentication and role-based access. 
    
    Designed for reliability and scalability, PHA Web Presence ensures agencies can efficiently share critical information with residents, meet compliance requirements, and streamline community engagement, all within a secure Azure cloud environment.`,
    image: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/pha-presence-art.jpg',
    heroImage: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/pha-presence-art.jpg',
    category: 'Cloud Web Application Solution',
    technologies: ['.NET 8', 'Azure App Service', 'Azure SQL', 'Azure Functions', 'Azure Blob Storage', 'Azure DevOps'],
    azureServices: [
      'Azure DevOps', 
      'Azure SQL Database',
      'Azure Application Insights',
      'Azure Key Vault', 
    ],
    features: [
      'Full dedicated CMS Manager Site',
      'Automated CI/CD pipelines with Azure DevOps and GiHub as repo manager',
      'Clients Portal for access to PHA Pre-Application and other services',
      'Multi-environment deployments',
      'Automated testing and security scanning',
      'Blue-green deployment strategies',
      'Automated rollback capabilities',
      'Compliance and governance automation',
      'Real-time monitoring and alerting'
    ],
    challenges: [
      'Use of WordPress and other CMS platforms',
      'Ensuring consistent infrastructure',
      'Automated security and compliance',
      'Zero-downtime deployments'
    ],
    solutions: [
      'GitHub for source control and collaboration',
      'Azure App Service for scalable web hosting (Portal and API)',
      'Azure DevOps for CI/CD automation',
      'Azure SQL with automatic scaling',
      'Azure Functions for serverless processing',
    ],
    results: [
      '98% reduction in deployment time',
      '99.9% deployment success rate',
      '100% increase in customer satisfaction',
      '100% increase in Cllient Interaction',
    ],
    github: '#',
    live: 'https://www.lakelandhousing.org/',
    featured: true,
    duration: '8 months',
    teamSize: '2 developers',
    clientType: 'Public Housing Authorities'
  },
  {
    id: 3,
    slug: 'pha-applications-monger',
    title: 'PHA Applications Monger',
    subtitle: 'Web Application Solutions for Public Housing Authorities',
    description: 'PHA Applications Monger is a comprehensive suite of web application solutions for Public Housing Authorities, offering modules such as Audit Portal, Monthly Property Inspections, Internal Invoice Management, and flexible a la carte options to maximize value for PHAs.',
    fullDescription: `PHA Applications Monger is an all-in-one web application platform designed specifically for Public Housing Authorities. 
    
    The solution includes a range of powerful modules: an Audit Portal for streamlined HUD audit management, tools for conducting and tracking Monthly Property Inspections, and an Internal Invoice Management system to simplify billing and financial workflows. 
    
    With a flexible a la carte offering, PHAs can select and deploy the solutions that deliver the most value for their unique needs. Built for security, scalability, and ease of use, PHA Applications Monger empowers agencies to modernize operations, ensure compliance, and deliver exceptional service to their communities.`,
    image: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/pha-apps-monger.jpg',
    heroImage: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/pha-apps-monger.jpg',
    category: 'Cloud A La-Carte Web Application Solution',
    technologies: ['.NET 8', 'Azure App Service', 'Azure SQL', 'Azure Web Jobs', 'Azure Blob Storage', 'Azure DevOps'],
    azureServices: [
      'Azure App Service',
      'Azure SQL Database', 
      'Azure Functions',
      'Azure Blob Storage', 
      'Azure Key Vault',
      'Azure DevOps',
      'Azure Application Insights'
    ],
    features: [
      'A-La-Carte Module Engineering',
      'Audit Portal for HUD finacial audits',
      'Invoice Management for Internal Workflows',
      'Property Inspections for Monthly Inspections on PHA Properties'
    ],
    challenges: [
      'Use of legacy systems for data management',
      'Use of Excel and manual processes for audits',
      'Non-Existent data visualization and reporting',
      'Integration with existing systems'
    ],
    solutions: [
      'Audit Portal for HUD financial audits',
      'Invoice Management for Internal Workflows',
      'Property Inspections for Monthly Inspections on PHA Properties',
      'Azure Cloud Integration for secure, scalable hosting',
      'Azure SQL for data storage and management',
      'Azure Storage for secure document management',
      'Azure Functions for serverless processing'
    ],
    results: [
      '100% uptime achieved',
      '0% reduction in manual data entry errors and use of Excel and other legacy systems',
      '100% adoption of Auditors and Inspectors',
      '100% Increase in Team Collaboration'
    ],
    github: '#',
    live: '',
    featured: true,
    duration: '6 months',
    teamSize: '2 developers',
    clientType: 'Public Housing Authorities'
  },
  {
    id: 4,
    slug: 'origin-pc-backend-services-ocart',
    title: 'Origin PC Backend Services - OCart',
    subtitle: 'Ecommerce Backend Services for Origin PC',
    description: 'Origin PC Ocart is a comprehensive solution for migrating legacy Web Forms monolithic applications to a modern, distributed monolith architecture, enabling enhanced scalability, maintainability, and integration with contemporary web technologies.',
    fullDescription: `Ocart is a cutting-edge migration and modernization platform for legacy Web Forms applications, purpose-built for Origin PC seeking agility and cloud readiness. 
    
    Ocart transitions monolithic web apps into a distributed monolith solution, leveraging .NET, Azure SQL, and modern frontend frameworks to deliver modularity, scalability, and superior maintainability.

    The platform offers guided refactoring tools, code analysis, and phased migration workflows that minimize downtime and risk. By preserving critical business logic and enhancing integration with Azure cloud services, Ocart empowers product owners to unlock new capabilities, reduce technical debt, and confidently accelerate digital transformation.`,
    image: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/ocart-art.jpg',
    heroImage: 'https://pbwblobs.blob.core.windows.net/pnw-network-images/ocart-art.jpg',
    category: 'Cloud Custom ECommerce Backend Solution',
    technologies: ['.NET Framework', 'Azure App Service', 'Azure SQL', 'Azure Web Jobs', 'Azure Blob Storage', 'Azure DevOps'],
    azureServices: [
      'Azure App Service',
      'Azure SQL Database', 
      'Azure Functions',
      'Azure Blob Storage', 
      'Azure Key Vault',
      'Azure DevOps',
      'Azure Application Insights'
    ],
    features: [
      'Custom Ecommerce Backend Solution',
      'Module Engineering',
      'Full Integration with Origin PC’s System Configurator', 
      'Full DevOps pipeline for CI/CD',
    ],
    challenges: [
      'Legacy Web Forms monolithic applications',
      'Lack of modularity and scalability',
      'Non-use of Modern web technologies and cloud services',
      'Use of Windows IIS for hosting',
      'Limited scalability and performance issues',
      'Manually managing deployments and updates'
    ],
    solutions: [
      '7+ Portals to support Origin PC’s ecommerce backend',
      'Full DevOps pipeline for CI/CD',
      'Migration from Windows IIS to Azure App Service',
      'Migration from MS SQL Server to Azure SQL for data storage and management with comprehensive security and scalability',
      'Migration from Legacy Web Forms to modern .NET technologies',
      'Azure Storage and CDN media item management',
      'Azure Web Jobs to support background processing and scheduled tasks'
    ],
    results: [
      '100% uptime achieved',
      '99% Improvement in scalability',
      '100% Deployment success rate',
      '65% reduction of SQL Server licensing costs',
    ],
    github: '#',
    live: '',
    featured: false,
    duration: '14 months',
    teamSize: '4 developers',
    clientType: 'ECommerce and Technology Retailers'
  }
];

export const getProjectBySlug = (slug) => {
  return projectsData.find(project => project.slug === slug);
};

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getAllProjects = () => {
  return projectsData;
};