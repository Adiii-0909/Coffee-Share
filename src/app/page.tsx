'use client'

import dynamic from 'next/dynamic'
import React, { JSX, useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Flame,
  Link2,
  Lock,
  Shield,
} from 'lucide-react'
import AddFilesButton from '../components/AddFilesButton'
import CancelButton from '../components/CancelButton'
import DropZone from '../components/DropZone'
import PasswordField from '../components/PasswordField'
import ParticleBackground from '../components/animations/ParticleBackground'
import StartButton from '../components/StartButton'
import TitleText from '../components/TitleText'
import UploadFileList from '../components/UploadFileList'
import Uploader from '../components/Uploader'
import TransferHistory from '../components/TransferHistory'
import WebRTCPeerProvider from '../components/WebRTCProvider'
import Wordmark from '../components/Wordmark'
import { getFileName } from '../fs'
import { UploadedFile } from '../types'
import { pluralize } from '../utils/pluralize'

const MarketingSections = dynamic(
  () => import('../components/landing/MarketingSections'),
  { loading: () => <div className="w-full h-24" /> },
)

function PageWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <div className="mesh-overlay" />
      <div className="noise-overlay" />
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[rgba(26,20,16,0.75)] backdrop-blur-xl">
        <div className="w-full flex items-center justify-between py-4 px-4 md:px-8 max-w-[1240px] mx-auto">
          <Wordmark />
          <nav className="hidden lg:flex items-center gap-2">
            <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="nav-pill">Overview</button>
            <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} className="nav-pill">Live Demo</button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="nav-pill">Features</button>
            <button onClick={() => document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' })} className="nav-pill">Security</button>
            <button onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })} className="nav-pill">FAQ</button>
          </nav>
          <button onClick={() => document.getElementById('drop-zone-button')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-hero">Start Sharing</button>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center py-10 max-w-6xl w-full mx-auto px-4 md:px-5 relative z-10">
        {children}
      </main>
    </div>
  )
}

function InitialState({
  onDrop,
}: {
  onDrop: (files: UploadedFile[]) => void
}): JSX.Element {
  return (
    <section id="hero" className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 mt-4 md:mt-10">
      {/* Left: Hero content */}
      <div className="w-full lg:w-[56%] flex flex-col items-start text-left gap-5 relative z-10 order-2 lg:order-1">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="heading-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08]"
        >
          Share like a{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand)] to-[#e8d5b8]">
            good coffee
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-lg md:text-xl text-secondary font-medium leading-relaxed max-w-xl"
        >
          Direct. Fast. Private.
          <br />
          <span className="text-muted">Your files, your connection.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={() => document.getElementById('drop-zone-button')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-hero gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Send Files
          </button>
          <button
            onClick={() => document.getElementById('drop-zone-button')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-ghost gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Receive Files
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center gap-2 text-muted text-sm mt-2"
        >
          <Lock className="w-3.5 h-3.5 text-brand" />
          End-to-end encrypted • Peer to peer
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="grid grid-cols-3 gap-3 w-full max-w-md mt-2"
        >
          <div className="panel rounded-2xl p-3 text-center">
            <div className="inline-flex items-center gap-1.5 text-muted text-[11px] uppercase tracking-wider justify-center w-full">
              <Link2 className="w-3.5 h-3.5 text-brand" />
              Link Ready
            </div>
            <p className="text-primary font-bold text-sm mt-1">~2s average</p>
          </div>
          <div className="panel rounded-2xl p-3 text-center">
            <div className="inline-flex items-center gap-1.5 text-muted text-[11px] uppercase tracking-wider justify-center w-full">
              <Shield className="w-3.5 h-3.5 text-brand" />
              Security
            </div>
            <p className="text-primary font-bold text-sm mt-1">DTLS encrypted</p>
          </div>
          <div className="panel rounded-2xl p-3 text-center">
            <div className="inline-flex items-center gap-1.5 text-muted text-[11px] uppercase tracking-wider justify-center w-full">
              <Flame className="w-3.5 h-3.5 text-brand" />
              Burn Mode
            </div>
            <p className="text-primary font-bold text-sm mt-1">One-time links</p>
          </div>
        </motion.div>
      </div>

      {/* Right: Drop zone */}
      <div className="w-full lg:w-[44%] flex justify-center lg:justify-end shrink-0 order-1 lg:order-2 relative" id="demo">
        <div className="w-full max-w-md space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full animate-[breathe_4s_ease-in-out_infinite]"
          >
            <DropZone onDrop={onDrop} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function useUploaderFileListData(uploadedFiles: UploadedFile[]) {
  return useMemo(() => {
    return uploadedFiles.map((item) => ({
      fileName: getFileName(item),
      type: item.type,
    }))
  }, [uploadedFiles])
}

function ConfirmUploadState({
  uploadedFiles,
  password,
  onChangePassword,
  onCancel,
  onStart,
  onRemoveFile,
  onAddFiles,
  burnAfterReading,
  onToggleBurn,
}: {
  uploadedFiles: UploadedFile[]
  password: string
  onChangePassword: (pw: string) => void
  onCancel: () => void
  onStart: () => void
  onRemoveFile: (index: number) => void
  onAddFiles: (files: UploadedFile[]) => void
  burnAfterReading: boolean
  onToggleBurn: () => void
}): JSX.Element {
  const fileListData = useUploaderFileListData(uploadedFiles)
  return (
    <section className="w-full max-w-3xl surface rounded-3xl p-6 md:p-8">
      <TitleText>
        You are about to share{' '}
        {pluralize(uploadedFiles.length, 'file', 'files')}.{' '}
        <AddFilesButton onAdd={onAddFiles} />
      </TitleText>
      <UploadFileList files={fileListData} onRemove={onRemoveFile} />
      <PasswordField value={password} onChange={onChangePassword} />

      <button
        type="button"
        className="flex items-center space-x-2 w-full justify-center mt-3 cursor-pointer btn btn-ghost"
        onClick={onToggleBurn}
      >
        <Flame className={`w-4 h-4 ${burnAfterReading ? 'text-brand' : 'text-muted'}`} />
        <span className="text-sm font-medium text-secondary">
          Burn after pouring (close link after 1 download)
        </span>
      </button>

      <div className="flex gap-3 justify-center mt-4">
        <CancelButton onClick={onCancel} />
        <StartButton onClick={onStart} />
      </div>
    </section>
  )
}

function UploadingState({
  uploadedFiles,
  password,
  burnAfterReading,
  onStop,
}: {
  uploadedFiles: UploadedFile[]
  password: string
  burnAfterReading: boolean
  onStop: () => void
}): JSX.Element {
  return (
    <section className="w-full max-w-4xl">
      <div className="w-full mb-5 md:mb-6 px-1">
        <h2 className="heading-display text-primary text-3xl md:text-4xl font-bold text-center md:text-left">
          You are sharing {pluralize(uploadedFiles.length, 'file', 'files')}.
        </h2>
        <p className="text-secondary text-sm md:text-base mt-2 text-center md:text-left max-w-2xl">
          Keep this tab open. CoffeeShare transfers files directly - nothing is stored.
        </p>
      </div>
      <WebRTCPeerProvider>
        <Uploader
          files={uploadedFiles}
          password={password}
          burnAfterReading={burnAfterReading}
          onStop={onStop}
        />
      </WebRTCPeerProvider>
    </section>
  )
}

export default function UploadPage(): JSX.Element {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [password, setPassword] = useState('')
  const [uploading, setUploading] = useState(false)
  const [burnAfterReading, setBurnAfterReading] = useState(false)

  const handleDrop = useCallback((files: UploadedFile[]): void => {
    setUploadedFiles(files)
  }, [])

  const handleChangePassword = useCallback((pw: string) => {
    setPassword(pw)
  }, [])

  const handleStart = useCallback(() => {
    setUploading(true)
  }, [])

  const handleToggleBurn = useCallback(() => {
    setBurnAfterReading((b) => !b)
  }, [])

  const handleStop = useCallback(() => {
    setUploading(false)
  }, [])

  const handleCancel = useCallback(() => {
    setUploadedFiles([])
    setUploading(false)
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles((fs) => fs.filter((_, i) => i !== index))
  }, [])

  const handleAddFiles = useCallback((files: UploadedFile[]) => {
    setUploadedFiles((fs) => [...fs, ...files])
  }, [])

  return (
    <PageWrapper>
      <AnimatePresence mode="popLayout">
        {!uploadedFiles.length ? (
          <motion.div
            key="initial"
            className="flex flex-col items-center w-full space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <InitialState onDrop={handleDrop} />
            <MarketingSections />
          </motion.div>
        ) : !uploading ? (
          <motion.div
            key="confirm"
            className="flex flex-col items-center w-full space-y-6 pt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <ConfirmUploadState
              uploadedFiles={uploadedFiles}
              password={password}
              onChangePassword={handleChangePassword}
              onCancel={handleCancel}
              onStart={handleStart}
              onRemoveFile={handleRemoveFile}
              onAddFiles={handleAddFiles}
              burnAfterReading={burnAfterReading}
              onToggleBurn={handleToggleBurn}
            />
          </motion.div>
        ) : (
          <motion.div
            key="uploading"
            className="flex flex-col items-center w-full space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <UploadingState
              uploadedFiles={uploadedFiles}
              password={password}
              burnAfterReading={burnAfterReading}
              onStop={handleStop}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <TransferHistory />
    </PageWrapper>
  )
}
