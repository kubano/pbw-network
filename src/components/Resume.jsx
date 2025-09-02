import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Mail, 
  Linkedin, 
  Globe, 
  Calendar,
  Award,
  Code,
  Building,
  GraduationCap,
  Briefcase
} from 'lucide-react'

const Resume = () => {
  const navigate = useNavigate()
  
  const handleContactClick = () => {
    navigate('/')
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const experience = [
    {
      title: "President & Lead Web Architect",
      company: "PBW Web Architects, LLC",
      period: "January 2005 - Present",
      location: "United States",
      responsibilities: [
        "Founded and served as Chief Architect, overseeing all aspects of enterprise full stack web development using MS Stack and Azure Cloud, leading to successful delivery of 50+ web projects and App Modernizations/Migrations",
        "Led enterprise full stack web development for 45+ enterprise projects using MS Stack, Azure Cloud, and modern JS Frameworks, accelerating project turnaround by 45%",
        "Developed and managed databases using MSSQL, TSQL, SSIS, SSRS, Cosmos DB, and MongoDB, enhancing data processing efficiency by 25%",
        "Designed and implemented RESTful APIs and Microservices, increasing system reliability and scalability by 20%",
        "Implemented Agile, Scrum, and Lean processes using Azure DevOps and Git, leading to a 15% increase in team productivity and project delivery speed"
      ]
    },
    {
      title: "Sr. Software Engineer (Resident Architect)",
      company: "Broward County Enterprise Technology Services",
      period: "December 2016 - Present",
      location: "Florida, United States",
      responsibilities: [
        "Led the App Modernization initiative for 36 enterprise applications and configured the Azure Landing Zone for Product Development, leveraging Azure Functions, Azure Web Apps, Azure SQL, and Azure Service Bus to optimize cloud scalability, improve security, and enhance deployment efficiency",
        "Spearheaded DevOps initiatives using Azure DevOps and Git Enterprise, leading to a 30% increase in deployment efficiency. Configured CI/CD pipelines, integrated SonarQube, and implemented team branching strategies, Git flows, pull requests, and code reviews",
        "Architected enterprise software using ASP.NET Core, ASP.NET MVC, REST Web API, and Microservices, resulting in improved system scalability and performance",
        "Led the centralization of application authorization for 15+ county apps by implementing ASP.NET Identity Core in a multi-tenant environment, reducing custom authorization implementation by 100%",
        "Designed and developed the Broward County CARES ACT Portal using MS Stack .NET Framework (MVC/MSSQL), jQuery, Clean Architecture, CQRS, Entity Framework, and OOP best practices, achieving 99.9% availability",
        "Spearheaded the re-architecture of the County's Ecommerce Platform using software development best practices: Clean Architecture, DDD, OOP, increasing platform scalability by 99.9%"
      ]
    },
    
    {
      title: "Information Technology Operations Manager",
      company: "Lakeland Housing Authority",
      period: "May 2012 - December 2016",
      location: "Lakeland, Florida",
      responsibilities: [
        "Led IT infrastructure modernization by migrating legacy systems to a virtualized environment, resulting in 95% uptime and enhanced operational efficiency",
        "Administered Intranet using SharePoint Portal Server, implementing and configuring applications that enhanced internal communication and collaboration by 25%",
        "Architected and developed the agency's web portal using ASP.NET MVC, Bootstrap CSS, and CMS technologies, boosting user engagement by 85%",
        "Developed and supported in-house Web Apps (Log Master, PO Approval Generator, Work Order, Call Log, IT Invoicing, Audit Portal), streamlining operations and reducing processing time by 65%",
        "Implemented and managed Agency Code Repo using Team Foundation Server 2015, later migrating to Visual Studio Online and Azure DevOps Services, improving code management and collaboration by 30%"
      ]
    },
    {
      title: "Sr. Web Applications Developer",
      company: "Tampa Housing Authority",
      period: "May 2005 - September 2012",
      location: "Tampa, Florida",
      responsibilities: [
        "Led development and administration of Tampa Housing Authority Website (www.THAFL.com) using Visual Studio, MSSQL, ASP.NET, VB, and Bootstrap CSS Framework, resulting in a 25% increase in website traffic and user engagement",
        "Developed the North Tampa Housing Developing Corp (www.NTHDC.org) Web Portal using Adobe Web Suite CS4 and MSSQL (ASP Classic, Adobe Ajax Spry Framework), enhancing user experience and functionality by 30%",
        "Developed Tampa Housing Authority's BTOP Portal using Adobe Web Suite CS4 and SQL databases (ASP Classic, Adobe Ajax Spry Framework, jQuery), improving data accessibility and user interaction by 20%",
        "Led the development and supported internal web apps (Fleet Manager, Trip Logger, Corporate Employee Lookup) using ASP.NET, VB, and MSSQL Server, streamlining internal processes and improving data management by 25%",
        "Integrated PowerWeb by Westbrook (imaging database) with THA website, enhancing public access to agency information and improving data retrieval efficiency by 99.9%"
      ]
    }
  ]

  const skills = {
    "Programming Languages": ["C#", "Microsoft Stack", "JavaScript Frameworks/Libraries", "ES6", "TSQL", "HTML5", "SPA"],
    "Cloud Platforms": ["Microsoft Azure", "Google Cloud"],
    "Database Technologies": ["MSSQL Server", "PostgreSQL", "MySQL", "Cosmos DB", "MongoDB"],
    "Development Tools": ["Visual Studio", "VS Code", "JetBrains Rider", "Azure DevOps", "Git", "DevExpress", "Syncfusion", "Dreamweaver CC", "Docker Desktop"],
    "Web Technologies": [".NET/ASP.NET Core", "ASP.NET MVC/Razor/Blazor", "EF Core", "jQuery", "SPA", "CSS3", "HTML5", "Web API/REST", "Azure Cloud", "Bootstrap CSS", "Foundation", "Bulma", "Tailwinds"],
    "Reporting Tools": ["MS SQL Server Reporting Services (SSRS)", "MS PowerBI"]
  }

  const education = [
    {
      degree: "Management Information Systems, Computer Engineering",
      school: "University of Camagüey",
      year: "1993 - 1998",
      details: "Camagüey, Cuba"
    },
    {
      degree: "Postgraduate Course, Web Programming and Graphic Design",
      school: "University of Camagüey",
      year: "2000 - 2001",
      details: "Camagüey, Cuba"
    },
    {
      degree: "English as Second Language and Pre-Employment Training",
      school: "West Side Learning Center",
      year: "2004",
      details: "Syracuse, NY"
    }
  ]

  const certifications = [
    "Pursuing Azure DevOps Expert AZ-400 Certification Path (2024)",
    "AZ-204 Azure Developer Associated - New Horizons Computer Learning Center (2023)",
    "PL-400T00 Microsoft Power Platform Developer - New Horizons Computer Learning Center (2022)",
    "DevOps Culture and Mindset - University of California, Davis (2021)",
    "Continuous Delivery - University of Virginia School of Business (2021)",
    "Secure Coding with .NET - SANS Technology Institute (2018)",
    "Microsoft Certified Technology Specialist - ASP.NET Web Development Framework 3.5 (2009)",
    "Microsoft Certified Technology Specialist - Data Architecture SQL Server 2005 Database Administrator (2009)",
    "Microsoft Certified Systems Engineer - LaSalle Computer Learning Center (2006-2008)"
  ]

  const awards = [
    "1st Place Web Development Competition, Camaguey Province, Science and Technology Ministry (Oct 2002)",
    "1st Place Data Driven Web Applications, Web Development National Competition, Computer Learning Center, Camagüey (Jan 2003)",
    "Employee of the Month, Tampa Housing Authority (Jun 2007)",
    "Best Practice Award Website Development 2014 Mid-size Housing Authorities, FAHRO (lakelandhousing.org)",
    "1st Place for Best Website, 2016 Mid-size Housing Authorities, FAHRO (lakelandhousing.org)",
    "Best Practice Award Website Development 2018 Mid-size Housing Authorities, FAHRO (lakelandhousing.org)"
  ]

  const achievements = [
    "Over 20 years of Enterprise Web Development experience with expertise in full software design lifecycle",
    "Successfully modernized 36+ enterprise applications using Azure Cloud Platform",
    "Led teams achieving 30% increase in deployment efficiency through DevOps implementation",
    "Architected solutions resulting in 99.9% system availability and improved scalability",
    "Founded and grew PBW Web Architects, delivering 50+ successful web projects and modernizations"
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     
      <div className="py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-custom"
        >
        {/* Header */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                Cesar L. Diaz
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-6">
              Sr. Software Engineer (Resident Architect) • President & Lead Web Architect
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Florida, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>cesard@pbwweb.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>pbwweb.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                <span>linkedin.com/in/kubano</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-6xl mx-auto">
              Over 20 years of Enterprise Web Development experience, with main roles in the full life cycle of the software design process 
              including requirements, definitions, prototyping, proof of concept, design, interface implementation, testing and maintenance. 
              Creative, highly organized and expert developing and delivering cost effective, high-performance web technology enterprise 
              solutions, full stack development using current web technologies, .NET/ASP.NET Core C#/MVC/Razor, MVVM, Web API / RESTful 
              Services, Microservices, Azure Cloud, HTML5, CSS3, MSSQL, MySQL, PostgreSQL and NoSQL Databases.
            </p>
          </div>
        </motion.div>

        {/* Professional Experience */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
              Professional Experience
            </h2>
          </div>

          <div className="space-y-8">
            {experience.map((job) => (
              <div key={`${job.company}-${job.period}`} className="relative">
                {experience.indexOf(job) < experience.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-24 bg-gradient-to-b from-primary-600 to-blue-600"></div>
                )}
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Building className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{job.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        {job.company}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {job.responsibilities.map((responsibility) => (
                        <li key={responsibility.substring(0, 50)} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
              Technical Skills
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Education
              </h2>
            </div>

            {education.map((edu) => (
              <div key={`${edu.school}-${edu.year}`} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {edu.school}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  {edu.year}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {edu.details}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Certifications
              </h2>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Awards & Achievements */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Awards */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Awards
              </h2>
            </div>

            <div className="space-y-3">
              {awards.map((award) => (
                <div key={award.substring(0, 30)} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{award}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Key Achievements */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
                Key Achievements
              </h2>
            </div>

            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.substring(0, 30)} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hobbies & Interests */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
              Hobbies & Interests
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {["Overlanding and Adventure Traveling", "Photography", "Pottery/Sculpture", "Software Architecture/Agile Development", "Git", "Open Source"].map((hobby) => (
              <span
                key={hobby}
                className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
              >
                {hobby}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div variants={itemVariants} className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl shadow-xl p-8 mt-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Let's Build Something Amazing Together
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Ready to discuss your next project or explore how we can drive your digital transformation initiatives forward?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </button>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-800 transition-colors"
            >
              <Globe className="w-5 h-5" />
              View Portfolio
            </a>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Resume
