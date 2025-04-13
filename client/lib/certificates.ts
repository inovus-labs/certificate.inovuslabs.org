import type { Certificate } from "./types"

// This is a mock database for demonstration purposes
// In a real application, you would connect to a database
const mockCertificates: Certificate[] = [
  {
    id: "INV-2023-001",
    referenceNumber: "REF-001-2023",
    recipientName: "John Doe",
    email: "john.doe@example.com",
    courseTitle: "Web Development Bootcamp",
    courseImage: "/placeholder.svg?height=280&width=500",
    instructors: "Jane Smith, Robert Johnson",
    issueDate: "2023-06-15",
    duration: "40 hours",
    description: "A comprehensive bootcamp covering HTML, CSS, JavaScript, and React.",
  },
  {
    id: "INV-2023-002",
    referenceNumber: "REF-002-2023",
    recipientName: "Jane Smith",
    email: "jane.smith@example.com",
    courseTitle: "Machine Learning Fundamentals",
    courseImage: "/placeholder.svg?height=280&width=500",
    instructors: "Dr. Alan Turing, Dr. Ada Lovelace",
    issueDate: "2023-07-20",
    duration: "60 hours",
    description: "An introduction to machine learning algorithms and applications.",
  },
  {
    id: "INV-2023-003",
    referenceNumber: "REF-003-2023",
    recipientName: "Robert Johnson",
    email: "robert.johnson@example.com",
    courseTitle: "Cybersecurity Essentials",
    courseImage: "/placeholder.svg?height=280&width=500",
    instructors: "Sarah Connor, John Connor",
    issueDate: "2023-08-10",
    duration: "30 hours",
    description: "Learn the fundamentals of cybersecurity and network protection.",
  },
  {
    id: "INV-2023-004",
    referenceNumber: "REF-004-2023",
    recipientName: "Emily Davis",
    email: "emily.davis@example.com",
    courseTitle: "IoT Workshop",
    courseImage: "/placeholder.svg?height=280&width=500",
    instructors: "Michael Brown",
    issueDate: "2023-09-05",
    duration: "20 hours",
    description: "Hands-on workshop on Internet of Things devices and applications.",
  },
  {
    id: "INV-2023-005",
    referenceNumber: "REF-005-2023",
    recipientName: "Sreelakshmi Anilkumar",
    email: "sreelakshmi.anilkumar@example.com",
    courseTitle: "Complete A.I. & Machine Learning, Data Science Bootcamp",
    courseImage: "/placeholder.svg?height=280&width=500",
    instructors: "Andrei Neagoie, Daniel Bourke",
    issueDate: "2024-12-12",
    duration: "44 total hours",
    description: "A comprehensive bootcamp covering AI, machine learning and data science concepts.",
  },
]

// Function to get a certificate by ID
export async function getCertificateById(id: string): Promise<Certificate | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockCertificates.find((cert) => cert.id === id) || null
}

// Function to search certificates by name
export async function searchCertificates(query: string): Promise<Certificate[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (!query) return []

  const normalizedQuery = query.toLowerCase()

  // Check if query is a certificate ID
  if (/^[a-zA-Z0-9-]+$/.test(query) && query.includes("-")) {
    const certificate = mockCertificates.find((cert) => cert.id.toLowerCase() === normalizedQuery)
    return certificate ? [certificate] : []
  }

  // Otherwise search by recipient name
  return mockCertificates.filter((cert) => cert.recipientName.toLowerCase().includes(normalizedQuery))
}
