export default function PageLoader() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status" aria-label="Loading page">
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-navy-100 border-t-gold-400"
      />
    </div>
  )
}
