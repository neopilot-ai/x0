import type { SplitViewConfig, CodeServerFile } from './types'

export async function createSplitView(
  leftFile: CodeServerFile,
  rightFile: CodeServerFile,
  config: SplitViewConfig,
): Promise<SplitViewConfig> {
  return {
    ...config,
    leftPath: leftFile.path,
    rightPath: rightFile.path,
  }
}

export async function toggleDiffView(
  leftFile: CodeServerFile,
  rightFile: CodeServerFile,
): Promise<boolean> {
  return leftFile.content !== rightFile.content
}

export async function splitViewHorizontal(
  leftFile: CodeServerFile,
  rightFile: CodeServerFile,
): Promise<SplitViewConfig> {
  return createSplitView(leftFile, rightFile, {
    leftPath: leftFile.path,
    rightPath: rightFile.path,
    direction: 'horizontal',
    showDiff: false,
  })
}

export async function splitViewVertical(
  leftFile: CodeServerFile,
  rightFile: CodeServerFile,
): Promise<SplitViewConfig> {
  return createSplitView(leftFile, rightFile, {
    leftPath: leftFile.path,
    rightPath: rightFile.path,
    direction: 'vertical',
    showDiff: false,
  })
}
