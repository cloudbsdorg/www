import React, { useState, useEffect } from 'react'
import { CONFIG } from './config'

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/logo-head-only.png" alt="Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-cloudbsd-blue dark:text-blue-400">{CONFIG.projectName}</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium transition-colors">About</a>
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium transition-colors">Features</a>
            <a href="#downloads" className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium transition-colors">Downloads</a>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              )}
            </button>
          </nav>
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              )}
            </button>
            {/* Simple mobile menu button placeholder */}
            <button className="p-2 text-slate-600 dark:text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-bg py-20 md:py-32 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            The Next Generation Cloud Platform
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-50">
            Harness the legendary power, security, and stability of FreeBSD for your cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#about" className="bg-white text-cloudbsd-blue px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">Learn More</a>
            <a href="#downloads" className="bg-cloudbsd-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">Get Started</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">What is {CONFIG.projectName}?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              CloudBSD is a comprehensive distribution built upon FreeBSD, designed to provide a robust environment for hosting assets like Jails, Virtual Machines (Bhyve), and OCI containers.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              It focuses on seamless system discovery, automated worker node installation, and centralized management via a powerful Controller Service.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-800/30 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Unified Controller"
              description="A central configuration point for your entire network. Manage Jails, VMs, and Containers from one place."
            />
            <FeatureCard 
              title="Smart Worker Nodes"
              description="Orchestrated resource management with PXE boot support for effortless base OS deployment."
            />
            <FeatureCard 
              title="Native Virtualization"
              description="Full Bhyve VMM integration for high-performance virtual hosts and hardware passthrough."
            />
            <FeatureCard 
              title="GPU Management"
              description="Advanced hardware discovery and PCI passthrough support to share and manage GPU resources effectively."
            />
            <FeatureCard 
              title="Secure Jails"
              description="FreeBSD-native isolation for high-density, low-overhead containerized workloads."
            />
            <FeatureCard 
              title="OCI Support"
              description="Seamlessly run and manage Linux OCI containers on FreeBSD with built-in orchestration."
            />
            <FeatureCard 
              title="ZFS by Default"
              description="Industry-leading storage reliability and performance with built-in data integrity and snapshotting."
            />
            <FeatureCard 
              title="System Discovery"
              description="Automated hardware reporting for RAM, CPU, Disks, and Network interfaces back to the controller."
            />
            <FeatureCard 
              title="API First"
              description="Exposed management APIs for internal and external system integration and automation."
            />
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">Downloads</h2>
          <div className="max-w-xl mx-auto p-12 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
            <h3 className="text-2xl font-semibold text-slate-400 dark:text-slate-500">Coming Soon</h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400">We are currently finalizing the initial release. Stay tuned for ISO, IMG, and Netboot packages.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold text-white tracking-wider">{CONFIG.projectName}</span>
              <p className="mt-2 text-sm">© 2026 {CONFIG.companyName}. All rights reserved.</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">A project by <a href={`mailto:${CONFIG.ownerEmail}`} className="text-white hover:underline">{CONFIG.ownerName}</a></p>
              <p className="mt-2 text-xs text-slate-500">Built on FreeBSD · Released under 3-Clause BSD License</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard: React.FC<{title: string, description: string}> = ({ title, description }) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700">
    <h3 className="text-xl font-bold mb-3 text-cloudbsd-blue dark:text-blue-400">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
  </div>
)

export default App
