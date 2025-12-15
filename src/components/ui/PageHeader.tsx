import Container from './Container'

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <section className="bg-navy-950 py-16 text-white sm:py-20">
      <Container>
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold tracking-widest text-gold-400 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-navy-200">{description}</p>
        )}
      </Container>
    </section>
  )
}
