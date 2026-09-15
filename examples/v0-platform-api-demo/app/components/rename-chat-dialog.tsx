'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface RenameChatDialogProps {
  chatId: string
  currentName: string
  onRename: (newName: string) => Promise<void>
}

export default function RenameChatDialog({ chatId, currentName, onRename }: RenameChatDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(currentName)

  const handleRename = async () => {
    if (name.trim()) {
      await onRename(name.trim())
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          Rename
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat</DialogTitle>
          <DialogDescription>Enter a new name for this chat.</DialogDescription>
        </DialogHeader>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename()
          }}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <DialogFooter>
          <Button onClick={handleRename}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
