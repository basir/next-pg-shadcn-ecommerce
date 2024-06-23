'use client'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested resource</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = '/')}
        >
          Back to home
        </Button>
      </div>
    </div>
  )
}
