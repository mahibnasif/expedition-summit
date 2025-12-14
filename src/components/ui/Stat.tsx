export default function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-bold text-gold-400">{value}</p>
      <p className="mt-1 text-sm text-navy-200">{label}</p>
    </div>
  )
}
