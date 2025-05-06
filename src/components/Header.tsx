import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-black bg-opacity-80 text-gray-300 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="text-lg font-semibold font-serif tracking-wide">
        lauri paronen
      </div>
      <nav className="space-x-4 text-sm">
        <a href="#code" className="hover:text-white transition">code</a>
        <a href="#writing" className="hover:text-white transition">writing</a>
        <a href="#nous" className="hover:text-white transition">nous</a>
        <a href="#music" className="hover:text-white transition">music</a>
        <a href="#gallery" className="hover:text-white transition">gallery</a>
        <a href="#contact" className="hover:text-white transition">contact</a>
      </nav>
    </header>
  );
};

export default Header;
