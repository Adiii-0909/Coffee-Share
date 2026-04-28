/// <reference types="@testing-library/jest-dom" />
import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CoffeeShareQueryClientProvider from '../../src/components/QueryClientProvider'

describe('QueryClientProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <CoffeeShareQueryClientProvider>
        <span>child</span>
      </CoffeeShareQueryClientProvider>,
    )
    expect(getByText('child')).toBeInTheDocument()
  })
})
