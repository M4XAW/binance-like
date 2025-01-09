import { Link } from "react-router-dom"
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="relative flex justify-center items-center flex-col h-dvh overflow-hidden">
            <h1 className="text-6xl font-medium text-white mb-2">404</h1>
            <p className="text-white">Désolé, la page que vous recherchez n'existe pas.</p>
            <Link to='/' className="absolute top-8 left-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-neutral-800 shadow-sm hover:bg-neutral-800 h-9 w-9">
                <ChevronLeft size={16} className='text-white' />
            </Link>
        </main>
    )
}
