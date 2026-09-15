'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

export default function ApiKeyError() {
  const [open, setOpen] = useState(true)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>API Key Required</AlertDialogTitle>
          <AlertDialogDescription>
            Please configure your v0 API key to use this demo. You can get your API key from{' '}
            <a
              href="https://v0.dev/settings"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              v0.dev/settings
            </a>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={() => setOpen(false)}>Retry</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
