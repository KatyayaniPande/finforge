'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/ui/file-upload'
import { DocumentAnalysis } from '@/components/ui/document-analysis'
import { RiskAssessment } from '@/components/ui/risk-assessment'
import { ComplianceCheck } from '@/components/ui/compliance-check'

export default function DueDiligencePage() {
  const [activeTab, setActiveTab] = useState('upload')
  const [documents, setDocuments] = useState<File[]>([])

  const handleFileUpload = (files: File[]) => {
    setDocuments(prev => [...prev, ...files])
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Contract & Investment Due Diligence Tool</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="analysis">Document Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Check</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload onUpload={handleFileUpload} />
              {documents.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Uploaded Documents</h3>
                  <ul className="space-y-2">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span>{doc.name}</span>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Document Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentAnalysis documents={documents} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskAssessment documents={documents} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Check</CardTitle>
            </CardHeader>
            <CardContent>
              <ComplianceCheck documents={documents} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 