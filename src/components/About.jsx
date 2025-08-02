import React from 'react'
import { Users, Code, Lightbulb, Shield } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Code,
      title: 'Technology Excellence',
      description: 'We leverage the latest .NET technologies and Azure services following Microsoft best practices and design patterns.',
      color: 'bg-blue-500'
    },
    {
      icon: Lightbulb,
      title: 'Cloud Innovation',
      description: 'We stay ahead of Azure Cloud updates and new services to provide cutting-edge cloud solutions that give you a competitive edge.',
      color: 'bg-orange-500'
    },
    {
      icon: Users,
      title: 'Enterprise Focus',
      description: 'We understand enterprise needs and deliver scalable, maintainable solutions that grow with your business.',
      color: 'bg-green-500'
    },
    {
      icon: Shield,
      title: 'Azure Security',
      description: 'We implement Azure security best practices and compliance standards to protect your data and applications.',
      color: 'bg-purple-500'
    }
  ]
 

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <div>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="text-gray-900 dark:text-white">About </span>
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">PBW Web Architects</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed">
              PBW Web Architects, LLC is a boutique software consulting firm specializing in custom software development and web engineering solutions. With a strong focus on Microsoft technologies and Azure Cloud, we partner with businesses to deliver robust, scalable, and secure digital platforms tailored to their unique needs.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-1 gap-16 mb-20">
            {/* Story Section */}
            <div className="space-y-8">
              <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white">
                Our Story
              </h3>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Founded in 2004, PBW Web Architects began its journey building custom solutions on the original .NET Framework. Over the years, we’ve embraced every major technology wave, evolving our expertise with each new generation of Microsoft tools. Today, we proudly engineer modern, cloud-based applications on the cutting edge of new .NET and Azure Cloud.
                </p>
                <p className="text-lg">
                  Our team’s commitment to excellence ensures every project receives expert attention and care from start to finish. We invest in ongoing learning and leverage the latest Microsoft and Azure advancements to maximize value for our clients. PBW Web Architects is your trusted partner for navigating technology change and achieving lasting business growth.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid md:grid-cols-2 gap-8 mt-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                    Our Mission
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To empower organizations with innovative, reliable, and scalable software solutions, leveraging Microsoft technologies and Azure Cloud to drive digital transformation, operational efficiency, and long-term client success.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                    Our Vision
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To be a trusted leader in custom software and web engineering, recognized for technical excellence, client partnerships, and the ability to help businesses thrive in a rapidly evolving digital world.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-5">
            <h3 className="text-3xl font-display font-bold text-center text-gray-900 dark:text-white mb-12">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-lg transition-shadow duration-200"
                >
                  <div className={`w-16 h-16 ${value.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

         
        </div>
      </div>
    </section>
  )
}

export default About
