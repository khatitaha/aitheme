import Link from "next/link";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

const Navbar = () => {
    return (
        <nav className=" backdrop-blur-sm shadow-xl shadow-neutral-900 bg-transparent ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 ">
                        <Link href="/" className="text-xl font-bold text-white flex flex-row">
                            <Eye className=" text-base" />XVision Lab
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link href="/" className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                            <Link href="/scan" className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Scan
                            </Link>
                            <Link href="/about" className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                About
                            </Link>
                            <Link href="/contact" className="text-neutral-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* CTA Button */}
                    {/* <div className="hidden md:block">
                        <Link href="/scan">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                Start Analysis
                            </Button>
                        </Link>
                    </div> */}

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link href="/" className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        Home
                    </Link>
                    <Link href="/scan" className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        Scan
                    </Link>
                    <Link href="/about" className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        About
                    </Link>
                    <Link href="/contact" className="text-neutral-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 