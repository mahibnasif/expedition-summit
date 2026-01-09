import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { TextField, SelectField } from './fields'

function TextFieldHarness({ error }: { error?: string }) {
  const { register } = useForm<{ name: string }>()
  return (
    <TextField
      id="name"
      label="Full name"
      hint="As it should appear on your badge"
      registration={register('name')}
      error={error}
    />
  )
}

describe('TextField', () => {
  it('associates the label with the input', () => {
    render(<TextFieldHarness />)
    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
  })

  it('shows the hint when there is no error', () => {
    render(<TextFieldHarness />)
    expect(screen.getByText('As it should appear on your badge')).toBeInTheDocument()
  })

  it('replaces the hint with an error message and marks the input invalid', () => {
    render(<TextFieldHarness error="Please enter your full name" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Please enter your full name')
    expect(screen.queryByText('As it should appear on your badge')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Full name')).toHaveAttribute('aria-invalid', 'true')
  })
})

function SelectFieldHarness() {
  const { register } = useForm<{ level: string }>()
  return (
    <SelectField
      id="level"
      label="Education level"
      placeholder="Select your level"
      options={[
        { value: 'hs', label: 'High school' },
        { value: 'ug', label: 'Undergraduate' },
      ]}
      registration={register('level')}
    />
  )
}

describe('SelectField', () => {
  it('renders the placeholder and all options', () => {
    render(<SelectFieldHarness />)
    const select = screen.getByLabelText('Education level')
    expect(select).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Select your level' })).toBeDisabled()
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })
})
