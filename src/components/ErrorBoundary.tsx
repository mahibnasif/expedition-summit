import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Unhandled application error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="grid min-h-screen place-items-center bg-navy-950 px-4 text-center">
          <div>
            <p className="font-display text-5xl font-bold text-gold-400">Oops</p>
            <h1 className="mt-4 text-2xl font-bold text-white">Something went wrong</h1>
            <p className="mx-auto mt-2 max-w-md text-navy-200">
              An unexpected error occurred. Reloading the page usually fixes it.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full bg-gold-400 px-6 py-2.5 font-display font-semibold text-navy-950 hover:bg-gold-300"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
