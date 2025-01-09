import { Link } from "react-router-dom"
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="relative flex justify-center items-center flex-col h-dvh overflow-hidden">
            <h1 className="text-6xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-gray-50 to-zinc-500 [text-shadow:_0_2px_16px_rgb(174_207_242_/_24%)] mb-2">404</h1>
            <p className="text-transparent bg-clip-text bg-gradient-to-b from-gray-50 to-zinc-500 [text-shadow:_0_2px_16px_rgb(174_207_242_/_24%)]">Désolé, la page que vous recherchez n'existe pas.</p>
            <Link to='/' className="absolute top-8 left-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-neutral-800 shadow-sm hover:bg-neutral-800 h-9 w-9">
                <ChevronLeft size={16} className='text-white' />
            </Link>
            <div className="absolute left-1/2 -bottom-32 -translate-x-1/2 h-64 w-3/4 mx-auto blur-3xl [border-radius:_50%] bg-[radial-gradient(circle,rgba(249,250,251,0.8),rgba(0,0,0,0))]"></div>
        </main>
    )
}
