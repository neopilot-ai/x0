'use client'

export function CopyButton({ code }: { code: string }) {
  return (
    <button
      type="button"
      onClick={async (event) => {
        const button = event.currentTarget
        await navigator.clipboard.writeText(code)
        const original = button.textContent
        button.textContent = 'Copied'
        setTimeout(() => (button.textContent = original), 1200)
      }}
      className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-zinc-100"
    >
      Copy
    </button>
  )
}
