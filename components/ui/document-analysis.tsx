'use client'

import { File } from 'buffer'
import { Card } from './card'
import { Progress } from './progress'

interface DocumentAnalysisProps {
  documents: File[]
}

export function DocumentAnalysis({ documents }: DocumentAnalysisProps) {
  // This is a placeholder for actual analysis results
  const analysisResults = {
    totalPages: 150,
    processedPages: 75,
    keyTerms: [
      { term: 'Investment Amount', value: '$5,000,000' },
      { term: 'Term Length', value: '5 years' },
      { term: 'Interest Rate', value: '8%' },
      { term: 'Exit Strategy', value: 'IPO or Acquisition' }
    ],
    clauses: [
      { name: 'Termination Clause', risk: 'Low' },
      { name: 'Liability Clause', risk: 'Medium' },
      { name: 'Indemnity Clause', risk: 'High' }
    ]
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Document Processing</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Processing Progress</span>
                <span className="text-sm text-gray-600">
                  {analysisResults.processedPages} / {analysisResults.totalPages} pages
                </span>
              </div>
              <Progress value={(analysisResults.processedPages / analysisResults.totalPages) * 100} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Key Terms</h3>
          <div className="space-y-3">
            {analysisResults.keyTerms.map((term, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-600">{term.term}</span>
                <span className="font-medium">{term.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Clause Analysis</h3>
        <div className="space-y-4">
          {analysisResults.clauses.map((clause, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="font-medium">{clause.name}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                clause.risk === 'Low' ? 'bg-green-100 text-green-800' :
                clause.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {clause.risk} Risk
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
} 