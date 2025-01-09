import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="sticky top-0 z-20 w-full border-b border-neutral-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex justify-between items-center h-16 max-w-screen-2xl md:px-8 px-4">
                <nav className="flex items-center space-x-4">
                    <Link to='/' className="group flex items-center align-center text-sm text-white font-semibold transition-colors">
                        <svg className="h-8 w-8 mr-2" width="201" height="201" viewBox="0 0 201 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100.517 200.483C155.745 200.483 200.517 155.712 200.517 100.483C200.517 45.2549 155.745 0.483337 100.517 0.483337C45.2882 0.483337 0.516663 45.2549 0.516663 100.483C0.516663 155.712 45.2882 200.483 100.517 200.483Z" fill="black"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M126.452 111.118L141.537 126.159L100.531 167.121L59.5688 126.159L74.6533 111.118L100.531 136.995L126.452 111.118ZM100.531 85.1965L115.832 100.498L100.531 115.799L85.2732 100.541V100.498L87.9607 97.8103L89.2611 96.5099L100.531 85.1965ZM48.949 85.4133L64.0335 100.498L48.949 115.539L33.8644 100.454L48.949 85.4133ZM152.113 85.4133L167.198 100.498L152.113 115.539L137.029 100.454L152.113 85.4133ZM100.531 33.8311L141.493 74.7934L126.409 89.8779L100.531 63.9568L74.6533 89.8346L59.5688 74.7934L100.531 33.8311Z" fill="#F3BA2F"/>
                        </svg>

                        Binance
                    </Link>
                    <Link to='/ordres' className="text-sm text-white/60 hover:text-white/100 transition-colors">Mes actifs</Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link to='/login' className="inline-flex items-center justify-center sm:w-auto w-9 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-gray-50 text-zinc-950 shadow hover:bg-gray-50/90 h-9 py-2 px-4">
                        Se connecter
                    </Link>
                </div>
            </div>
        </header>
    )
}
