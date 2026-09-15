/**
 * Minimal LCS-based line diff. Returns a flat list of operations that can be
 * rendered as a standard unified-style diff (source files are tiny, so a full
 * DP table is plenty fast).
 */

export type DiffOp =
  | { kind: 'add'; oldNumber: null; newNumber: number; text: string }
  | { kind: 'remove'; oldNumber: number; newNumber: null; text: string }
  | { kind: 'context'; oldNumber: number; newNumber: number; text: string }

const MAX_MATRIX_CELLS = 2_000_000

function splitLines(value: string): string[] {
  return value === '' ? [] : value.split('\n')
}

export function diffLines(original: string, modified: string): DiffOp[] {
  const oldLines = splitLines(original)
  const newLines = splitLines(modified)
  const oldCount = oldLines.length
  const newCount = newLines.length

  if (oldCount === 0) {
    return newLines.map((text, index) => ({
      kind: 'add',
      oldNumber: null,
      newNumber: index + 1,
      text,
    }))
  }
  if (newCount === 0) {
    return oldLines.map((text, index) => ({
      kind: 'remove',
      oldNumber: index + 1,
      newNumber: null,
      text,
    }))
  }

  const useSimple = oldCount * newCount > MAX_MATRIX_CELLS
  if (useSimple) {
    const ops: DiffOp[] = []
    for (let i = 0; i < oldCount; i += 1) {
      const equal = oldLines[i] === newLines[Math.min(i, newCount - 1)]
      ops.push(
        equal
          ? { kind: 'context', oldNumber: i + 1, newNumber: i + 1, text: oldLines[i] }
          : { kind: 'remove', oldNumber: i + 1, newNumber: null, text: oldLines[i] },
      )
    }
    for (let j = oldCount; j < newCount; j += 1) {
      ops.push({ kind: 'add', oldNumber: null, newNumber: j + 1, text: newLines[j] })
    }
    return ops
  }

  const rows = oldCount + 1
  const columns = newCount + 1
  const matrix = new Int32Array(rows * columns)
  for (let i = rows - 2; i >= 0; i -= 1) {
    for (let j = columns - 2; j >= 0; j -= 1) {
      matrix[i * columns + j] =
        oldLines[i] === newLines[j]
          ? matrix[(i + 1) * columns + j + 1] + 1
          : Math.max(matrix[(i + 1) * columns + j], matrix[i * columns + j + 1])
    }
  }

  const ops: DiffOp[] = []
  let i = 0
  let j = 0
  while (i < oldCount && j < newCount) {
    if (oldLines[i] === newLines[j]) {
      ops.push({ kind: 'context', oldNumber: i + 1, newNumber: j + 1, text: oldLines[i] })
      i += 1
      j += 1
    } else if (matrix[(i + 1) * columns + j] >= matrix[i * columns + j + 1]) {
      ops.push({ kind: 'remove', oldNumber: i + 1, newNumber: null, text: oldLines[i] })
      i += 1
    } else {
      ops.push({ kind: 'add', oldNumber: null, newNumber: j + 1, text: newLines[j] })
      j += 1
    }
  }
  while (i < oldCount) {
    ops.push({ kind: 'remove', oldNumber: i + 1, newNumber: null, text: oldLines[i] })
    i += 1
  }
  while (j < newCount) {
    ops.push({ kind: 'add', oldNumber: null, newNumber: j + 1, text: newLines[j] })
    j += 1
  }
  return ops
}