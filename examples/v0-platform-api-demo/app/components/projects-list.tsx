'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface Project {
  id: string
  name?: string
}

interface ProjectsListProps {
  projects: Project[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No projects yet. Create your first project to get started!
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <h3 className="font-semibold">{project.name || 'Untitled Project'}</h3>
            <p className="text-sm text-muted-foreground mt-1">{project.id}</p>
          </div>
        ))
      )}
    </div>
  )
}
