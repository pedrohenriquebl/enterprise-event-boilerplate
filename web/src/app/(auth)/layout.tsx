export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <header>

            </header>
            <article>
                sidebar
            </article>
            <section>
                {children}
            </section>
        </main>
    )
}