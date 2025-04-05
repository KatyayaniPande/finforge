"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileCheck2, AlertCircle, Loader2, Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function DueDiligencePage() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [jsonOutput, setJsonOutput] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
      setResult(null)
      setJsonOutput("")
    }
  }

  const analyzeDocument = async () => {
    if (!file) {
      setError("Please select a file to analyze")
      return
    }

    try {
      setAnalyzing(true)
      setProgress(0)
      setError(null)
      setResult(null)
      setJsonOutput("")

      // Create form data
      const formData = new FormData()
      formData.append('file', file)

      // Start analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setResult(data)
      setProgress(100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSubmit = () => {
    if (result) {
      const formattedJson = JSON.stringify(result, null, 2)
      setJsonOutput(formattedJson)
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Due Diligence Analysis</h1>

      <Card className="mb-6 shadow-lg">
        <CardHeader>
          <CardTitle>Document Analysis</CardTitle>
          <CardDescription>
            Upload an investment document for AI-powered due diligence analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid w-full items-center gap-4">
              <div>
                <Label htmlFor="document" className="text-base font-semibold">Upload PDF Document</Label>
                <Input
                  id="document"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-2 cursor-pointer bg-white"
                />
              </div>

              {file && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Selected file: {file.name}
                  </p>
                  {!file.name.toLowerCase().endsWith('.pdf') && (
                    <p className="text-sm text-red-500">
                      Please select a PDF document
                    </p>
                  )}
                  <Button
                    onClick={analyzeDocument}
                    disabled={analyzing || !file.name.toLowerCase().endsWith('.pdf')}
                    className="w-full bg-[#FF4405] hover:bg-[#FF4405]/90 text-white py-6 text-lg font-semibold shadow-md"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-5 w-5" />
                        Submit PDF for Analysis
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {analyzing && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-sm text-muted-foreground">
                  Analyzing document... This may take a few minutes.
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Detailed findings from the document analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Main Analysis Message */}
              {result.data?.messages?.[0]?.content && (
                <div className="border rounded-lg p-6 bg-white shadow">
                  <div
                    className="text-base space-y-4 text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: result.data.messages[0].content
                        .replace(/\*\*/g, '')
                        .replace(/(\d+\. )(.*?):/g, '<br/><strong class="text-gray-900">$2:</strong>')
                        .replace(/\n\n/g, '<br/><br/>')
                        .replace(/^1\./m, '<br/>1.')
                    }}
                  />
                </div>
              )}

              {/* View Raw JSON Button */}
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSubmit}
                  className="bg-gray-800 hover:bg-gray-900 text-white py-5 px-6 text-base font-semibold shadow-md"
                >
                  <Send className="mr-2 h-5 w-5" />
                  View Raw JSON
                </Button>
              </div>

              {/* Raw JSON Output */}
              {jsonOutput && (
                <div className="mt-6 border rounded-lg p-6 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">Raw JSON Output</h3>
                  <pre className="text-sm bg-white p-4 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap shadow-inner">
                    {jsonOutput}
                  </pre>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 