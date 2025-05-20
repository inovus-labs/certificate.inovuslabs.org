"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Shield, Eye, Database, Lock, UserCheck, Globe, Bell, FileText, Mail, CheckCircle } from 'lucide-react'
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src="/inovus-logo.png" alt="Inovus Labs" width={180} height={48} className="h-10 w-auto" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-teal-300 hover:text-teal-100 hover:bg-teal-900/50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="rounded-lg bg-slate-800/50 p-6 md:p-8 backdrop-blur-sm mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <div className="flex-shrink-0 bg-teal-500/20 p-4 rounded-full">
              <Shield className="h-12 w-12 text-teal-400" />
            </div>
            <div>
              <Badge variant="outline" className="mb-3 border-teal-500/30 bg-teal-500/10 text-teal-300">
                Last Updated: May 20, 2025
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
              <p className="text-slate-300 text-lg max-w-3xl">
                At Inovus Labs, we take your privacy seriously. This policy outlines how we collect, use, and protect your
                personal information when you use our Certificate Verification Platform.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-8 space-y-2">
                <Tabs defaultValue="sections" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="sections" className="data-[state=active]:bg-teal-900/50 data-[state=active]:text-teal-300">
                      Sections
                    </TabsTrigger>
                    <TabsTrigger value="summary" className="data-[state=active]:bg-teal-900/50 data-[state=active]:text-teal-300">
                      Summary
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sections" className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'introduction' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('introduction')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Introduction
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'collection' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('collection')}
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Information We Collect
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'usage' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('usage')}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      How We Use Information
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'security' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('security')}
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Data Security
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'rights' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('rights')}
                    >
                      <UserCheck className="h-4 w-4 mr-2" />
                      Your Rights
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'thirdparty' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('thirdparty')}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Third-Party Services
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'changes' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('changes')}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Changes to Policy
                    </Button>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start text-left ${activeSection === 'contact' ? 'bg-teal-900/50 text-teal-300' : 'text-slate-300'}`}
                      onClick={() => toggleSection('contact')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="summary" className="bg-slate-900/70 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-medium text-white mb-2">Key Points</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                          <Database className="h-3 w-3 text-teal-400" />
                        </div>
                        <span>We collect personal and certificate information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                          <Lock className="h-3 w-3 text-teal-400" />
                        </div>
                        <span>Your data is secured with encryption</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                          <UserCheck className="h-3 w-3 text-teal-400" />
                        </div>
                        <span>You have rights to access and delete your data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                          <Bell className="h-3 w-3 text-teal-400" />
                        </div>
                        <span>We'll notify you of policy changes</span>
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="md:col-span-3">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                <motion.section 
                  variants={item} 
                  id="introduction"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'introduction' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Eye className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-3">
                      Inovus Labs IEDC ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
                      explains how we collect, use, disclose, and safeguard your information when you use our Certificate
                      Verification Platform ("Platform").
                    </p>
                    <p className="text-slate-300">
                      By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound
                      by all the terms of this Privacy Policy.
                    </p>
                  </div>
                </motion.section>

                <motion.section 
                  variants={item} 
                  id="collection"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'collection' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Database className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">2. Information We Collect</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">We may collect the following types of information:</p>
                    <div className="space-y-4">
                      <div className="bg-slate-800/70 p-4 rounded-lg border-l-4 border-teal-500">
                        <h3 className="font-medium text-white mb-1">Personal Information</h3>
                        <p className="text-slate-300 text-sm">
                          When you use our Platform, we may collect personal information such as your name, email address, and
                          educational qualifications.
                        </p>
                      </div>
                      <div className="bg-slate-800/70 p-4 rounded-lg border-l-4 border-teal-500">
                        <h3 className="font-medium text-white mb-1">Certificate Information</h3>
                        <p className="text-slate-300 text-sm">
                          Information related to certificates issued, including certificate IDs, issue dates, and verification
                          status.
                        </p>
                      </div>
                      <div className="bg-slate-800/70 p-4 rounded-lg border-l-4 border-teal-500">
                        <h3 className="font-medium text-white mb-1">Usage Data</h3>
                        <p className="text-slate-300 text-sm">
                          Information on how you use the Platform, including log data, device information, and IP addresses.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  variants={item} 
                  id="usage"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'usage' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <UserCheck className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">3. How We Use Your Information</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">We use the information we collect for various purposes, including:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-slate-800/70 p-3 rounded-lg flex items-center gap-2">
                        <div className="bg-teal-500/20 p-1 rounded-full">
                          <FileText className="h-4 w-4 text-teal-400" />
                        </div>
                        <span className="text-slate-300 text-sm">Providing and maintaining the Platform</span>
                      </div>
                      <div className="bg-slate-800/70 p-3 rounded-lg flex items-center gap-2">
                        <div className="bg-teal-500/20 p-1 rounded-full">
                          <Shield className="h-4 w-4 text-teal-400" />
                        </div>
                        <span className="text-slate-300 text-sm">Verifying certificate authenticity</span>
                      </div>
                      <div className="bg-slate-800/70 p-3 rounded-lg flex items-center gap-2">
                        <div className="bg-teal-500/20 p-1 rounded-full">
                          <UserCheck className="h-4 w-4 text-teal-400" />
                        </div>
                        <span className="text-slate-300 text-sm">Improving user experience</span>
                      </div>
                      <div className="bg-slate-800/70 p-3 rounded-lg flex items-center gap-2">
                        <div className="bg-teal-500/20 p-1 rounded-full">
                          <Database className="h-4 w-4 text-teal-400" />
                        </div>
                        <span className="text-slate-300 text-sm">Analyzing usage patterns</span>
                      </div>
                      <div className="bg-slate-800/70 p-3 rounded-lg flex items-center gap-2">
                        <div className="bg-teal-500/20 p-1 rounded-full">
                          <Bell className="h-4 w-4 text-teal-400" />
                        </div>
                        <span className="text-slate-300 text-sm">Communicating platform updates</span>
                      </div>
                      <div className="bg-slate-800/70 p-3 rounded-lg flex items-center gap-2">
                        <div className="bg-teal-500/20 p-1 rounded-full">
                          <Lock className="h-4 w-4 text-teal-400" />
                        </div>
                        <span className="text-slate-300 text-sm">Ensuring platform security</span>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section 
                  variants={item} 
                  id="security"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'security' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Lock className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">4. Data Security</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">
                      We implement appropriate technical and organizational measures to protect your personal information
                      against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                    </p>
                    <div className="bg-slate-800/70 p-4 rounded-lg border border-teal-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-5 w-5 text-teal-400" />
                        <h3 className="font-medium text-white">Security Measures</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-teal-400" />
                          </div>
                          <span>Encryption of sensitive data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-teal-400" />
                          </div>
                          <span>Regular security assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-teal-400" />
                          </div>
                          <span>Secure access controls</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-teal-400" />
                          </div>
                          <span>Continuous monitoring for threats</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-slate-300 mt-4 text-sm">
                      However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
                      guarantee absolute security.
                    </p>
                  </div>
                </motion.section>

                <motion.section 
                  variants={item} 
                  id="rights"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'rights' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <UserCheck className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">5. Your Rights</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">
                      Depending on your location, you may have certain rights regarding your personal information:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/70 p-4 rounded-lg">
                        <h3 className="font-medium text-teal-400 mb-2">Access</h3>
                        <p className="text-slate-300 text-sm">
                          You can request access to your personal information that we hold.
                        </p>
                      </div>
                      <div className="bg-slate-800/70 p-4 rounded-lg">
                        <h3 className="font-medium text-teal-400 mb-2">Rectification</h3>
                        <p className="text-slate-300 text-sm">
                          You can request correction of inaccurate or incomplete information.
                        </p>
                      </div>
                      <div className="bg-slate-800/70 p-4 rounded-lg">
                        <h3 className="font-medium text-teal-400 mb-2">Erasure</h3>
                        <p className="text-slate-300 text-sm">
                          You can request deletion of your personal information in certain circumstances.
                        </p>
                      </div>
                      <div className="bg-slate-800/70 p-4 rounded-lg">
                        <h3 className="font-medium text-teal-400 mb-2">Restriction</h3>
                        <p className="text-slate-300 text-sm">
                          You can request restriction of processing of your personal information.
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-300 mt-4">
                      To exercise these rights, please contact us using the information provided in the "Contact Us" section.
                    </p>
                  </div>
                </motion.section>

                <motion.section 
                  variants={item} 
                  id="thirdparty"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'thirdparty' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Globe className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">6. Third-Party Services</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300">
                      Our Platform may contain links to third-party websites or services. We are not responsible for the privacy
                      practices or content of these third-party sites. We encourage you to review the privacy policies of any
                      third-party sites you visit.
                    </p>
                  </div>
                </motion.section>

                <motion.section 
                  variants={item} 
                  id="changes"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'changes' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Bell className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">7. Changes to This Privacy Policy</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300">
                      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                      Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
                      Policy periodically for any changes.
                    </p>
                  </div>
                </motion.section>

                <motion.section 
                  variants={item} 
                  id="contact"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === 'contact' ? 'bg-teal-900/20 border border-teal-500/30' : 'bg-slate-900/30'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">8. Contact Us</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">
                      If you have any questions or concerns about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-slate-800/70 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-5 w-5 text-teal-400" />
                        <h3 className="font-medium text-white">Contact Information</h3>
                      </div>
                      <p className="text-slate-300">
                        Email: <a href="mailto:contact@inovuslabs.org" className="text-teal-400 hover:underline">contact@inovuslabs.org</a>
                        <br />
                        Address: Rajagiri School of Engineering & Technology, Kakkanad, Kochi
                      </p>
                    </div>
                  </div>
                </motion.section>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
