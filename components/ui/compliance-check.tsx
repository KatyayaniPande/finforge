'use client'

import { File } from 'buffer'
import { Card } from './card'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface ComplianceCheckProps {
  documents: File[]
}

export function ComplianceCheck({ documents }: ComplianceCheckProps) {
  // This is a placeholder for actual compliance check results
  const complianceResults = {
    overallStatus: 'Compliant',
    checks: [
      {
        category: 'Anti-Money Laundering (AML)',
        status: 'Compliant',
        details: [
          { requirement: 'Customer Identification', status: 'Pass' },
          { requirement: 'Transaction Monitoring', status: 'Pass' },
          { requirement: 'Suspicious Activity Reporting', status: 'Pass' }
        ]
      },
      {
        category: 'Know Your Customer (KYC)',
        status: 'Partially Compliant',
        details: [
          { requirement: 'Identity Verification', status: 'Pass' },
          { requirement: 'Address Verification', status: 'Pass' },
          { requirement: 'Beneficial Ownership', status: 'Warning' }
        ]
      },
      {
        category: 'Data Privacy',
        status: 'Compliant',
        details: [
          { requirement: 'GDPR Compliance', status: 'Pass' },
          { requirement: 'Data Protection', status: 'Pass' },
          { requirement: 'Data Retention', status: 'Pass' }
        ]
      },
      {
        category: 'Financial Regulations',
        status: 'Non-Compliant',
        details: [
          { requirement: 'Capital Requirements', status: 'Fail' },
          { requirement: 'Risk Management', status: 'Pass' },
          { requirement: 'Reporting Standards', status: 'Warning' }
        ]
      }
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pass':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant':
        return 'bg-green-100 text-green-800'
      case 'partially compliant':
        return 'bg-yellow-100 text-yellow-800'
      case 'non-compliant':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Compliance Status</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complianceResults.overallStatus)}`}>
            {complianceResults.overallStatus}
          </span>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complianceResults.checks.map((check, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{check.category}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(check.status)}`}>
                {check.status}
              </span>
            </div>
            <div className="space-y-3">
              {check.details.map((detail, detailIndex) => (
                <div key={detailIndex} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{detail.requirement}</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(detail.status)}
                    <span className={`text-sm ${
                      detail.status === 'Pass' ? 'text-green-600' :
                      detail.status === 'Fail' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {detail.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 