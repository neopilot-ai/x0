'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface RateLimitDialogProps {
  isOpen: boolean
  onClose: () => void
  resetTime?: string
  remaining?: number
}

export default function RateLimitDialog({
  isOpen,
  onClose,
  resetTime,
  remaining,
}: RateLimitDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Limit Exceeded</DialogTitle>
          <DialogDescription>
            You've reached the limit of 3 generations per 12 hours. Please try again later.
            {resetTime && <p>Reset time: {new Date(resetTime).toLocaleString()}</p>}
            {remaining !== undefined && <p>Remaining: {remaining}</p>}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() =>
              window.open(
                'https://vercel.com/new/clone?demo-description=A%20Next.js%20application%20demonstrating%20the%20v0%20Platform%20API&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F28EABpFanXbK3bENHYGPe7%2F2b37a0cf17f3f8f9a19ee23e539b62eb%2Fscreenshot.png&demo-title=v0%20Platform%20API%20Demo&demo-url=https%3A%2F%2Fv0-centered-text-om.vercel.sh%2F&from=templates&project-name=v0%20Platform%20API%20Demo&repository-name=v0-platform-api-demo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fv0-platform-api-demo&skippable-integrations=1',
                '_blank',
              )
            }
          >
            Deploy with Vercel
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
