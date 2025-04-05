'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/ui/file-upload'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  BarChart,
  Shield,
  Clock,
  Trash2
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  status: 'analyzing' | 'completed' | 'error'
  progress: number
}

export default function DueDiligencePage() {
  const [activeTab, setActiveTab] = useState('upload')
  const [documents, setDocuments] = useState<Document[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileUpload = (files: File[]) => {
    const newDocuments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      status: 'analyzing' as const,
      progress: 0
    }))
    setDocuments(prev => [...prev, ...newDocuments])
    simulateAnalysis(newDocuments)
  }

  const simulateAnalysis = (docs: Document[]) => {
    setIsAnalyzing(true)
    docs.forEach(doc => {
      const interval = setInterval(() => {
        setDocuments(prevDocs => {
          const updatedDocs = prevDocs.map(d => {
            if (d.id === doc.id) {
              const newProgress = Math.min(d.progress + 20, 100)
              return {
                ...d,
                progress: newProgress,
                status: newProgress === 100 ? 'completed' : 'analyzing'
              }
            }
            return d
          })
          return updatedDocs
        })
      }, 1000)

      setTimeout(() => {
        clearInterval(interval)
        setIsAnalyzing(false)
      }, 5000)
    })
  }

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
  }

  const getAnalysisStatus = () => {
    if (documents.length === 0) return 'No documents uploaded'
    if (isAnalyzing) return 'Analysis in progress...'
    return 'Analysis complete'
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Due Diligence Analysis</h1>
          <p className="text-gray-500 mt-2">
            Comprehensive document analysis for investment and contract due diligence
          </p>
        </div>
        <Badge variant="outline" className="text-base">
          {getAnalysisStatus()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Document Upload & Analysis</CardTitle>
              <CardDescription>
                Upload contracts, financial statements, or other documents for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <FileUpload 
                  onUpload={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  maxSize={10485760} // 10MB
                />

                {documents.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div key={doc.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <span className="font-medium">{doc.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeDocument(doc.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Analysis Progress</span>
                              <span>{doc.progress}%</span>
                            </div>
                            <Progress value={doc.progress} />
                            <div className="flex items-center gap-2 text-sm">
                              {doc.status === 'analyzing' && (
                                <Clock className="h-4 w-4 text-blue-500" />
                              )}
                              {doc.status === 'completed' && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                              {doc.status === 'error' && (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              )}
                              <span>{doc.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {documents.length > 0 && documents.some(doc => doc.status === 'completed') && (
            <div className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Analysis Results</CardTitle>
                  <CardDescription>
                    Key findings and insights from the analyzed documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Key Terms Section */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Terms</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">Contract Value</p>
                          <p className="text-lg font-semibold">$1,250,000</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">Duration</p>
                          <p className="text-lg font-semibold">24 months</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Risk Analysis */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Risk Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span>Standard Terms</span>
                          </div>
                          <Badge variant="outline" className="bg-green-100">Low Risk</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            <span>Payment Terms</span>
                          </div>
                          <Badge variant="outline" className="bg-yellow-100">Medium Risk</Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Compliance Check */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Compliance Check</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>Regulatory Requirements</span>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>Legal Framework</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Documents Analyzed</span>
                  <span className="font-medium">{documents.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Risk Level</span>
                  <Badge variant="outline" className="bg-yellow-100">Medium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Compliance Status</span>
                  <Badge variant="outline" className="bg-green-100">Compliant</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full" disabled={documents.length === 0}>
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full" disabled={documents.length === 0}>
                  Export Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 