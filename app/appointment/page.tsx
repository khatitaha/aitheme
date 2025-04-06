'use client'

import React, { useState } from 'react'
// adjust imports based on your shadcn config
import { Calendar } from '../../components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '../../lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'

const AppointmentPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !file) {
      alert('Please select a date and upload a scan.')
      return
    }

    // Handle submission logic here (e.g., API call)
    console.log('Appointment Date:', date)
    console.log('Uploaded File:', file)
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Book AI Scan Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Picker */}
        <div className="space-y-2">
          <Label>Select Appointment Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="scan">Upload Chest Scan</Label>
          <Input
            type="file"
            id="scan"
            accept="image/*"
            onChange={handleFileChange}
          />
          {file && <p className="text-sm text-green-600">Selected: {file.name}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Submit Appointment
        </Button>
      </form>
    </div>
  )
}

export default AppointmentPage
