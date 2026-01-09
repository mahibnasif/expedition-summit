import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Button, ButtonLink } from './Button'

describe('Button', () => {
  it('renders its label and handles clicks', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Register now</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Register now' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire clicks when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Submitting
      </Button>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Submitting' }))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies the selected variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass('bg-navy-900')
  })
})

describe('ButtonLink', () => {
  it('renders an anchor pointing at the target route', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/register">Register</ButtonLink>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Register' })).toHaveAttribute(
      'href',
      '/register',
    )
  })
})
