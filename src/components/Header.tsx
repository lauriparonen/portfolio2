import { useRouter } from "next/router";

type Props = {
  onSectionClick: (section: string) => void;
};

const Header = ({ onSectionClick }: Props) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    onSectionClick(section);
    router.push(`#${section}`, undefined, { shallow: true });
    
    const element = document.getElementById(section);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className="
        fixed top-0 w-full z-50
        bg-black/60 backdrop-blur-md
        text-gray-300 px-6 py-4
        border-b border-white/10
        shadow-[0_1px_6px_rgba(0,0,0,0.4)]
        transition-colors duration-500
      "
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="text-lg font-semibold font-serif tracking-wide text-center sm:text-left">
            lauri paronen
            {/* <img src="/ensologo-circle.svg" alt="enso laurel" className="inline-block h-4 w-4 ml-2" /> */}
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
            <a href="#code" onClick={(e) => handleClick(e, 'code')} className="hover:text-white transition">code</a>
            {/* <a href="#writing" onClick={(e) => handleClick(e, 'writing')} className="hover:text-white transition">writing</a> */}
            <a href="#nous" onClick={(e) => handleClick(e, 'nous')} className="hover:text-white transition">nous</a>
            <a href="#music" onClick={(e) => handleClick(e, 'music')} className="hover:text-white transition">music</a>
            <a href="#gallery" onClick={(e) => handleClick(e, 'gallery')} className="hover:text-white transition">gallery</a>
            <a href="#contact" onClick={(e) => handleClick(e, 'contact')} className="hover:text-white transition">contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
