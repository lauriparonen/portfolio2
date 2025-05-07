import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-black bg-opacity-80 text-gray-300 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="text-lg font-semibold font-serif tracking-wide text-center sm:text-left">
            lauri paronen
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
            <a href="#code" className="hover:text-white transition">code</a>
            <a href="#writing" className="hover:text-white transition">writing</a>
            <a href="#nous" className="hover:text-white transition">nous</a>
            <a href="#music" className="hover:text-white transition">music</a>
            <a href="#gallery" className="hover:text-white transition">gallery</a>
            <a href="#contact" className="hover:text-white transition">contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
