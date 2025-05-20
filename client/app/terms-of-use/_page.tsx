"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  FileCheck,
  FileText,
  Users,
  Copyright,
  BadgeIcon as Certificate,
  ShieldAlert,
  UserCheck,
  Settings,
  RefreshCw,
  Scale,
  Mail,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState<string>("acceptance")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
              <FileCheck className="h-12 w-12 text-teal-400" />
            </div>
            <div>
              <Badge variant="outline" className="mb-3 border-teal-500/30 bg-teal-500/10 text-teal-300">
                Last Updated: May 20, 2025
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Use</h1>
              <p className="text-slate-300 text-lg max-w-3xl">
                These terms govern your use of the Inovus Labs Certificate Verification Platform. By using our platform,
                you agree to these terms in full.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3 lg:col-span-2">
              <div className="sticky top-8 space-y-2 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                <h3 className="text-white font-medium mb-3">Table of Contents</h3>
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "acceptance" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("acceptance")}
                  >
                    <FileText className="h-3.5 w-3.5 mr-2" />
                    1. Acceptance
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "description" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("description")}
                  >
                    <FileText className="h-3.5 w-3.5 mr-2" />
                    2. Description
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "responsibilities" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("responsibilities")}
                  >
                    <Users className="h-3.5 w-3.5 mr-2" />
                    3. Responsibilities
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "intellectual" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("intellectual")}
                  >
                    <Copyright className="h-3.5 w-3.5 mr-2" />
                    4. Intellectual Property
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "certificate" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("certificate")}
                  >
                    <Certificate className="h-3.5 w-3.5 mr-2" />
                    5. Certificate Info
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "limitation" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("limitation")}
                  >
                    <ShieldAlert className="h-3.5 w-3.5 mr-2" />
                    6. Limitation of Liability
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "indemnification" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("indemnification")}
                  >
                    <UserCheck className="h-3.5 w-3.5 mr-2" />
                    7. Indemnification
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "modifications" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("modifications")}
                  >
                    <Settings className="h-3.5 w-3.5 mr-2" />
                    8. Modifications
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "changes" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("changes")}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-2" />
                    9. Changes to Terms
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "governing" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("governing")}
                  >
                    <Scale className="h-3.5 w-3.5 mr-2" />
                    10. Governing Law
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left text-sm ${activeSection === "contact" ? "bg-teal-900/50 text-teal-300" : "text-slate-300"}`}
                    onClick={() => setActiveSection("contact")}
                  >
                    <Mail className="h-3.5 w-3.5 mr-2" />
                    11. Contact
                  </Button>
                </nav>
              </div>
            </div>

            <div className="md:col-span-9 lg:col-span-10">
              <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                <motion.section
                  variants={item}
                  id="acceptance"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === "acceptance" ? "bg-teal-900/20 border border-teal-500/30 shadow-lg" : "bg-slate-900/30"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300">
                      By accessing or using the Inovus Labs Certificate Verification Platform ("Platform"), you agree to
                      be bound by these Terms of Use. If you do not agree to these Terms, you should not access or use
                      the Platform.
                    </p>
                    <div className="mt-4 bg-slate-800/70 p-4 rounded-lg border-l-4 border-teal-500">
                      <p className="text-white font-medium">Important</p>
                      <p className="text-slate-300 text-sm mt-1">
                        These terms constitute a legally binding agreement between you and Inovus Labs IEDC. Please read
                        them carefully.
                      </p>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  variants={item}
                  id="description"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === "description" ? "bg-teal-900/20 border border-teal-500/30 shadow-lg" : "bg-slate-900/30"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">2. Description of Service</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">
                      The Platform provides a service for verifying the authenticity of certificates issued by Inovus
                      Labs IEDC. The Platform allows users to search for certificates by ID or recipient name and view
                      certificate details.
                    </p>
                    <div className="bg-slate-800/70 p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Key Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-teal-400" />
                          </div>
                          <span className="text-slate-300 text-sm">Certificate search and verification</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-teal-400" />
                          </div>
                          <span className="text-slate-300 text-sm">Blockchain verification</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-teal-400" />
                          </div>
                          <span className="text-slate-300 text-sm">Certificate details viewing</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="rounded-full bg-teal-500/20 p-1 mt-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-teal-400" />
                          </div>
                          <span className="text-slate-300 text-sm">Certificate sharing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  variants={item}
                  id="responsibilities"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === "responsibilities" ? "bg-teal-900/20 border border-teal-500/30 shadow-lg" : "bg-slate-900/30"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">3. User Responsibilities</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">When using the Platform, you agree to:</p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-slate-700">
                        <AccordionTrigger className="text-white hover:text-teal-300 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-teal-500/20 p-1">
                              <CheckCircle className="h-3.5 w-3.5 text-teal-400" />
                            </div>
                            <span>Provide accurate information</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300 pl-8">
                          You must provide accurate information when searching for certificates. Falsifying information
                          may result in termination of access.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2" className="border-slate-700">
                        <AccordionTrigger className="text-white hover:text-teal-300 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-teal-500/20 p-1">
                              <XCircle className="h-3.5 w-3.5 text-teal-400" />
                            </div>
                            <span>No unauthorized access</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300 pl-8">
                          You must not attempt to gain unauthorized access to any part of the Platform, including other
                          user accounts or restricted areas.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3" className="border-slate-700">
                        <AccordionTrigger className="text-white hover:text-teal-300 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-teal-500/20 p-1">
                              <XCircle className="h-3.5 w-3.5 text-teal-400" />
                            </div>
                            <span>No illegal use</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300 pl-8">
                          You must not use the Platform for any illegal or unauthorized purpose, including but not
                          limited to fraud or impersonation.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4" className="border-slate-700">
                        <AccordionTrigger className="text-white hover:text-teal-300 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-teal-500/20 p-1">
                              <XCircle className="h-3.5 w-3.5 text-teal-400" />
                            </div>
                            <span>No reverse engineering</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300 pl-8">
                          You must not attempt to decompile, reverse engineer, or disassemble any software contained on
                          the Platform.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5" className="border-slate-700">
                        <AccordionTrigger className="text-white hover:text-teal-300 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-teal-500/20 p-1">
                              <XCircle className="h-3.5 w-3.5 text-teal-400" />
                            </div>
                            <span>Respect intellectual property</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-300 pl-8">
                          You must not remove any copyright, trademark, or other proprietary notices from the Platform
                          or its content.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </motion.section>

                <motion.section
                  variants={item}
                  id="intellectual"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === "intellectual" ? "bg-teal-900/20 border border-teal-500/30 shadow-lg" : "bg-slate-900/30"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Copyright className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">4. Intellectual Property</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">
                      All content, features, and functionality of the Platform, including but not limited to text,
                      graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software,
                      are the exclusive property of Inovus Labs IEDC or its licensors and are protected by copyright,
                      trademark, and other intellectual property laws.
                    </p>
                    <div className="bg-slate-800/70 p-4 rounded-lg border border-teal-500/20">
                      <h3 className="text-white font-medium mb-2">Protected Elements Include:</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Copyright className="h-4 w-4 text-teal-400" />
                          <span>Logos</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Copyright className="h-4 w-4 text-teal-400" />
                          <span>Graphics</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Copyright className="h-4 w-4 text-teal-400" />
                          <span>UI Design</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Copyright className="h-4 w-4 text-teal-400" />
                          <span>Software</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Copyright className="h-4 w-4 text-teal-400" />
                          <span>Content</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <Copyright className="h-4 w-4 text-teal-400" />
                          <span>Certificates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  variants={item}
                  id="contact"
                  className={`p-6 rounded-lg transition-all duration-300 ${activeSection === "contact" ? "bg-teal-900/20 border border-teal-500/30 shadow-lg" : "bg-slate-900/30"}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-teal-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">11. Contact Information</h2>
                  </div>
                  <div className="pl-10">
                    <p className="text-slate-300 mb-4">
                      If you have any questions about these Terms of Use, please contact us at:
                    </p>
                    <div className="bg-slate-800/70 p-5 rounded-lg border border-teal-500/20 flex flex-col sm:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Mail className="h-5 w-5 text-teal-400" />
                          <h3 className="text-white font-medium">Email Us</h3>
                        </div>
                        <a href="mailto:contact@inovuslabs.org" className="text-teal-400 hover:underline">
                          contact@inovuslabs.org
                        </a>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="h-5 w-5 text-teal-400" />
                          <h3 className="text-white font-medium">Visit Us</h3>
                        </div>
                        <address className="text-slate-300 not-italic">
                          Rajagiri School of Engineering & Technology
                          <br />
                          Kakkanad, Kochi
                        </address>
                      </div>
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
