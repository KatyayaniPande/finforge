'use client'

import { File } from 'buffer'
import { Card } from './card'
import { Progress } from './progress'

interface RiskAssessmentProps {
  documents: File[]
}

export function RiskAssessment({ documents }: RiskAssessmentProps) {
  // This is a placeholder for actual risk assessment results
  const riskAssessment = {
    overallRisk: 45,
    categories: [
      {
        name: 'Legal Risk',
        score: 60,
        details: [
          { item: 'Contractual Obligations', risk: 'Medium' },
          { item: 'Liability Exposure', risk: 'High' },
          { item: 'Regulatory Compliance', risk: 'Low' }
        ]
      },
      {
        name: 'Financial Risk',
        score: 40,
        details: [
          { item: 'Investment Return', risk: 'Medium' },
          { item: 'Market Volatility', risk: 'Low' },
          { item: 'Liquidity Risk', risk: 'Medium' }
        ]
      },
      {
        name: 'Operational Risk',
        score: 35,
        details: [
          { item: 'Management Team', risk: 'Low' },
          { item: 'Business Model', risk: 'Medium' },
          { item: 'Technology Risk', risk: 'Low' }
        ]
      }
    ]
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Risk Assessment</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Risk Score</span>
              <span className="text-sm text-gray-600">{riskAssessment.overallRisk}%</span>
            </div>
            <Progress 
              value={riskAssessment.overallRisk} 
              className={`${
                riskAssessment.overallRisk < 30 ? 'bg-green-500' :
                riskAssessment.overallRisk < 70 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {riskAssessment.categories.map((category, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Risk Score</span>
                  <span className="text-sm text-gray-600">{category.score}%</span>
                </div>
                <Progress 
                  value={category.score} 
                  className={`${
                    category.score < 30 ? 'bg-green-500' :
                    category.score < 70 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
              <div className="space-y-2">
                {category.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{detail.item}</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      detail.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      detail.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {detail.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 