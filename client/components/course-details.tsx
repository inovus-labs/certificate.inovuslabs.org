import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, Clock, Award, GraduationCap, Globe, Info } from "lucide-react"
import type { Certificate } from "@/lib/types"

interface CourseDetailsProps {
  certificate: Certificate
}

export function CourseDetails({ certificate }: CourseDetailsProps) {
  // Check if we have enough data to show the course details
  const hasDetails = certificate.description || certificate.instructors || certificate.duration

  if (!hasDetails) {
    return null
  }

  return (
    <Card className="border-none bg-slate-800/50 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-teal-400" />
          <CardTitle className="text-white text-xl">About This Course</CardTitle>
        </div>
        <CardDescription className="text-slate-400">Details about the course and certification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-2">{certificate.courseTitle}</h3>
          {certificate.description ? (
            <p className="text-slate-300 text-sm">{certificate.description}</p>
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Info className="h-4 w-4" />
              <p>No detailed description available for this course.</p>
            </div>
          )}
        </div>

        <Separator className="bg-slate-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {certificate.instructors && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mt-0.5">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Instructors</h4>
                  <p className="text-sm text-slate-400">{certificate.instructors}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mt-0.5">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-200">Issue Date</h4>
                <p className="text-sm text-slate-400">
                  {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {certificate.duration && (
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Duration</h4>
                  <p className="text-sm text-slate-400">{certificate.duration}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mt-0.5">
                <Award className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-200">Certification Type</h4>
                <p className="text-sm text-slate-400">Course Completion</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mt-0.5">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-200">Issued By</h4>
                <p className="text-sm text-slate-400">Inovus Labs IEDC</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-teal-400 mt-0.5">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-200">Recognition</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="outline" className="border-teal-500/30 bg-teal-500/10 text-teal-300">
                    Industry Recognized
                  </Badge>
                  <Badge variant="outline" className="border-teal-500/30 bg-teal-500/10 text-teal-300">
                    Blockchain Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
