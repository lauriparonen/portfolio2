import Link from "next/link";
import { MeshGradient } from '@paper-design/shaders-react';
import { useEffect, useState } from "react";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const gradientOpacity = Math.max(0, 1 - scrollY / 300); // Fade out over 300px of scroll

  return (
    <header className="fixed top-0 w-full z-50 text-gray-300 px-6 py-4 shadow-sm">
      <div className="absolute inset-0" style={{ opacity: gradientOpacity }}>
        <MeshGradient
          color1="#091540"
          color2="#7692ff"
          color3="#abd2fa"
          color4="#1b2cc1"
          speed={0.08}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="max-w-7xl mx-auto relative">
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
