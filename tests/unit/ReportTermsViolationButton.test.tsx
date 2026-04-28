/// <reference types="@testing-library/jest-dom" />
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CoffeeShareQueryClientProvider from '../../src/components/QueryClientProvider'

vi.mock('../../src/components/WebRTCProvider', () => ({
  useWebRTCPeer: () => ({ peer: { connect: vi.fn(() => ({ on: vi.fn(), close: vi.fn() })) } }),
}))

import ReportTermsViolationButton from '../../src/components/ReportTermsViolationButton'

describe('ReportTermsViolationButton', () => {
  it('opens modal on click', () => {
    const { getByText } = render(
      <CoffeeShareQueryClientProvider>
        <ReportTermsViolationButton uploaderPeerID="peer" slug="slug" />
      </CoffeeShareQueryClientProvider>,
    )
    fireEvent.click(getByText('Report suspicious share'))
    expect(getByText('Found a suspicious share?')).toBeInTheDocument()
  })
})
