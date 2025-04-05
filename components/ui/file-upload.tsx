'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './button'
import { Card } from './card'

interface FileUploadProps {
  onUpload: (files: File[]) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles)
    setIsDragging(false)
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: true
  })

  return (
    <Card
      {...getRootProps()}
      className={`p-8 border-2 border-dashed ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } cursor-pointer transition-colors`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            {isDragActive ? 'Drop the files here' : 'Drag and drop files here'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            or click to select files
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: PDF, DOC, DOCX, PNG, JPG, JPEG
          </p>
        </div>
        <Button variant="outline">Select Files</Button>
      </div>
    </Card>
  )
} 