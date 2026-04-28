import React, { JSX, useState, useCallback, useEffect, useRef } from 'react'
import { extractFileList } from '../fs'
import { motion } from 'framer-motion'
import { FolderSync, Upload } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function DropZone({
  onDrop,
}: {
  onDrop: (files: File[]) => void
}): JSX.Element {
  const [isDragging, setIsDragging] = useState(false)
  const [didDrop, setDidDrop] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const celebrateDrop = useCallback((): void => {
    setDidDrop(true)
    confetti({
      particleCount: 28,
      spread: 56,
      scalar: 0.7,
      origin: { y: 0.65 },
      colors: ['#c8a97e', '#a68b5b', '#d4b896', '#8c7e6e'],
    })
    window.setTimeout(() => setDidDrop(false), 700)
  }, [])

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()

    const currentTarget =
      e.currentTarget === window ? window.document : e.currentTarget
    if (
      e.relatedTarget &&
      currentTarget instanceof Node &&
      currentTarget.contains(e.relatedTarget as Node)
    ) {
      return
    }

    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy'
    }
  }, [])

  const handleDrop = useCallback(
    async (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer) {
        const files = await extractFileList(e)
        onDrop(files)
        celebrateDrop()
      }
    },
    [onDrop, celebrateDrop],
  )

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files)
        onDrop(files)
        celebrateDrop()
      }
    },
    [onDrop, celebrateDrop],
  )

  const handleWormholeClick = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      if (!('showDirectoryPicker' in window)) {
        alert('Your browser does not support Live Folder Sync. Try Chrome or Edge.')
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dirHandle = await (window as any).showDirectoryPicker()
      const files: File[] = []

      const readDirectory = async (dir: FileSystemDirectoryHandle, path: string = '') => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for await (const entry of (dir as any).values()) {
          if (entry.kind === 'file') {
            const fileHandle = entry as FileSystemFileHandle
            const file = await fileHandle.getFile()
            files.push(file)
          } else if (entry.kind === 'directory') {
            const newDirHandle = entry as FileSystemDirectoryHandle
            await readDirectory(newDirHandle, `${path}${entry.name}/`)
          }
        }
      }

      await readDirectory(dirHandle)
      onDrop(files)
    } catch (err) {
      console.error('Wormhole error:', err)
    }
  }, [onDrop])

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('drop', handleDrop)
    }
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop])

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
        multiple
      />
      <motion.div
        layoutId="upload-container"
        id="drop-zone-button"
        className={`group relative block cursor-pointer w-full max-w-sm md:max-w-md py-12 md:py-16 px-6 md:px-8 rounded-[2rem] transition-all duration-500 ease-out outline-none border-[2px] backdrop-blur-2xl shadow-2xl ${
          isDragging
            ? 'border-[var(--brand)] bg-[var(--brand-soft)] scale-105'
            : didDrop
              ? 'border-[var(--success)] bg-[rgba(122,183,126,0.15)]'
              : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--brand)]'
          }`}
        onClick={handleClick}
        whileHover={{ scale: 1.03, y: -5 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Warm inner glow effect */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-[var(--brand-soft)] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          <motion.div
            animate={{ scale: isDragging ? 1.2 : 1, rotate: isDragging ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
              isDragging
                ? 'border-[var(--brand)] text-brand bg-[var(--brand-soft)]'
                : didDrop
                  ? 'border-[var(--success)] text-[var(--success)] bg-[rgba(122,183,126,0.12)]'
                  : 'border-[var(--border-strong)] text-[var(--text-secondary)] bg-[var(--bg-muted)] group-hover:border-[var(--brand)] group-hover:text-brand group-hover:bg-[var(--brand-soft)]'
              }`}
          >
            {didDrop ? (
              <span className="text-4xl font-light leading-none mb-1">✓</span>
            ) : (
              <Upload className="w-8 h-8 group-hover:animate-bounce" />
            )}
          </motion.div>
          <div className="text-center space-y-3">
              <span className="block text-xl md:text-xl font-semibold text-primary tracking-tight">
                {isDragging ? 'Drop to start sharing' : didDrop ? 'Link is brewing...' : 'Drop files here to share'}
              </span>
              <span className="block text-sm text-muted font-medium">
                {isDragging ? 'Release to upload' : 'or click to browse your device'}
              </span>
            </div>
            <div className="flex justify-center mt-6 pt-4 border-t border-[var(--border-subtle)] w-full relative">
              <button
                onClick={handleWormholeClick}
                className="btn btn-ghost text-sm z-10 group/btn"
              >
                <FolderSync className="w-4 h-4 text-brand group-hover/btn:animate-spin-slow" />
                Live Folder Sync
              </button>
            </div>
          </div>
      </motion.div>
    </>
  )
}
