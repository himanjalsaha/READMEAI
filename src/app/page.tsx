'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Moon, Sun, Zap, Code, FileText, Github, Twitter, Linkedin, Terminal, Check, Menu, X, FileCode2, Copy } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Component() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [username, setUsername] = useState('')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">README AI</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
              <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {darkMode ? <Sun/> : <Moon/>}
              </button>
            </div>
            <button className="md:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-left">
              {darkMode ? <Sun/> : <Moon/>}
            </button>
          </div>
        </div>
      )}

      <main>
      <section className="py-12 md:py-20 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Craft <span className="text-indigo-600 dark:text-indigo-400">Epic READMEs</span> with AI Power
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-lg">
              Unleash your projects' potential. Let AI create stunning READMEs while you conquer code.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href='/sign-in' className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md transition-colors shadow-md hover:shadow-lg">
                Generate README
              </Link>
              <button className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 font-semibold py-3 px-8 rounded-md transition-colors">
                View Demos
              </button>
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 transform hover:rotate-0 transition-transform duration-300 max-w-xs md:max-w-xl  mx-auto relative"
              initial={{ rotate: 1 }}
              whileHover={{ rotate: 0 }}
            >
              <FileCode2 className="absolute top-2 left-2 w-6 h-6  bg-green-200 p-5 rounded-full text-indigo-600 dark:text-indigo-400" />
              <Copy className="absolute bottom-2 right-2 w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <div className="bg-gray-100 dark:bg-gray-700 rounded-md p-3 overflow-hidden">
                <pre className="text-xs md:text-sm overflow-x-auto">
                  <code className="language-markdown text-gray-800 dark:text-gray-200">
{`# 👋 Hello, I'm Sarah

![Views](https://komarev.com/ghpvc/?username=sarahdev&color=brightgreen)
[![Followers](https://img.shields.io/github/followers/sarahdev?label=Follow&style=social)](https://github.com/sarahdev)

## 🚀 About Me
Full-stack dev passionate about elegant solutions.

## 💻 Tech Stack
Frontend: React, Vue.js, TypeScript
Backend: Node.js, Python, Go
Database: PostgreSQL, MongoDB
DevOps: Docker, Kubernetes, AWS

## 🌟 Projects
1. [Project Alpha](https://github.com/sarahdev/project-alpha)
2. [Beta App](https://github.com/sarahdev/beta-app)

## 📫 Contact
[LinkedIn](https://linkedin.com/in/sarah-dev) | [@sarahcodes](https://twitter.com/sarahcodes) | [sarahdev.com](https://sarahdev.com)

Happy coding! 👩‍💻✨`}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Code className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-4" />,
                  title: "AI-Powered Generation",
                  description: "Leverage cutting-edge AI to create professional READMEs tailored to your project."
                },
                {
                  icon: <FileText className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-4" />,
                  title: "Customizable Templates",
                  description: "Choose from a variety of templates or create your own to match your project's style."
                },
                {
                  icon: <Zap className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-4" />,
                  title: "Instant Preview",
                  description: "See your README come to life in real-time as you make changes and adjustments."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl sm:text-5xl font-semibold mb-12 sm:mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              How It Works
            </h3>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div 
                  className="bg-gray-900 p-6 sm:p-8 rounded-lg border border-indigo-500 mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <pre className="text-xs sm:text-sm overflow-x-auto">
                    <code className="language-markdown text-purple-400">
{`# 1. Enter your GitHub username
$ readme-ai generate --user ${username || 'YourUsername'}

# 2. AI analyzes your profile
Analyzing... ████████████████████ 100%

# 3. Generate a customized README
Generating... ████████████████████ 100%

# 4. Review and edit the content
$ readme-ai edit

# 5. Update your GitHub README
$ readme-ai push --confirm`}
                    </code>
                  </pre>
                </motion.div>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <input 
                    type="text"
                    className="w-full sm:w-auto max-w-md bg-gray-900 border border-indigo-500 text-white placeholder-gray-400 rounded-md px-4 py-2"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <motion.button 
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Generate README
                  </motion.button>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">Simple Steps to Your Perfect README</h4>
                <ul className="space-y-4">
                  {[
                    "Enter your GitHub username to start the process",
                    "Our AI analyzes your GitHub profile and repositories",
                    "A customized README is generated based on your profile",
                    "Review and edit the generated content as needed",
                    "Push the updated README to your GitHub profile"
                  ].map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">{index + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
              # Pricing Plans
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
              Choose the perfect plan for your README needs
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Basic",
                  price: "Free",
                  icon: <Terminal className="w-12 h-12 mb-4 text-indigo-500" />,
                  features: ["5 README generations/month", "Basic templates", "Community support"],
                  cta: "Start Free",
                  popular: false
                },
                {
                  title: "Pro",
                  price: "$9.99/mo",
                  icon: <Code className="w-12 h-12 mb-4 text-indigo-500" />,
                  features: ["Unlimited generations", "Premium templates", "Priority support", "Custom branding"],
                  cta: "Go Pro",
                  popular: true
                },
                {
                  title: "Enterprise",
                  price: "Custom",
                  icon: <Zap className="w-12 h-12 mb-4 text-indigo-500" />,
                  features: ["Unlimited generations", "Custom AI training", "Dedicated account manager", "API access"],
                  cta: "Contact Us",
                  popular: false
                }
              ].map((plan, index) => (
                <motion.div 
                  key={index} 
                  className={`bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 ${
                    plan.popular ? 'border-indigo-500' : 'border-transparent'
                  }`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {plan.popular && (
                    <span className="bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </span>
                  )}
                  <div className="text-center">
                    {plan.icon}
                    <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">## {plan.title}</h3>
                    <p className="text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">{plan.price}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                        <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-300 transform hover:scale-105">
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">README AI</h4>
              <p className="text-gray-600 dark:text-gray-300">Empowering developers to showcase their awesomeness.</p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">How It Works</a></li>
                <li><a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-300">
            <p>&copy; {new Date().getFullYear()} README AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}