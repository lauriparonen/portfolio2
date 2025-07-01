import React, { useState } from 'react';
import P5Sketch from '../components/P5Sketch';
import GradientGallery from '../components/GradientGallery';
import { sketches } from '../data/sketches';

const gradientImages = [
  'gradient-1.png',
  'gradient-2.png', 
  'gradient-3.png',
  'gradient-4.png',
  'gradient-5.png',
  'gradient-6.png',
  'gradient-7.png',
  'gradient-8.png',
  'gradient-9.png',
  'gradient-10.png',
  'gradient-11.png'
];

const Code = () => {
  const [showGradientGallery, setShowGradientGallery] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-serif">projects</h3>
          <div className="space-y-6">

            <div>
              <h4 className="text-lg font-medium underline hover:text-blue-200">
                <a href="https://lauriparonen.github.io/gradient-lab" target="_blank" rel="noopener noreferrer" className="hover:underline">gradient lab</a>
              </h4>
              <p className="text-gray-400">
                Web UI for creating and exporting grainy color gradients as images or gifs. Inspired by <a href="https://www.cosmos.so/lauzi/gradients-colors" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:underline">this Cosmos collection</a>.
                The page has a canvas which reacts to the cursor's position, creating a ripple effect which creates novelty and generativity to the gradients. 
                The color palette, ripple effect, and graininess are all dynamic and can be adjusted via a menu in the interface. The generated images make for 
                interesting wallpapers and can be used in generative art projects as well as graphic design.
              </p>
              
              <button
                onClick={() => setShowGradientGallery(!showGradientGallery)}
                className="mt-3 text-sm text-gray-400 hover:text-gray-200 transition-colors flex items-center gap-2"
              >
                <span>{showGradientGallery ? 'hide' : 'show'} examples</span>
                <span className={`transform transition-transform duration-300 ${showGradientGallery ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showGradientGallery ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="mt-4">
                  <GradientGallery images={gradientImages} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium underline hover:text-blue-200">
                <a href="https://f0tg.github.io/osic" className="hover:underline">one shot i ching</a>
              </h4>
              <p className="text-gray-400">
                A web interface for the Book of Changes.
                Generates each reading based on truly random data from <a href="random.org" className="text-blue-200 hover:underline">random.org</a>.
              </p>
            </div>

            {sketches.map((sketch) => (
              <P5Sketch
                key={sketch.id}
                title={sketch.title}
                description={sketch.description}
                sketchUrl={sketch.sketchUrl}
                height={sketch.height}
                isSquareVisualization={sketch.isSquareVisualization}
              />
            ))}

            <div>
              <h4 className="text-lg font-medium underline hover:text-blue-200">
                <a href="https://github.com/lauriparonen" target="_blank" rel="noopener noreferrer">misc projects</a>
              </h4>
              <p className="text-gray-400" >
                My GitHub for miscellaneous projects and WIPs.
              </p>
            </div>

          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-serif">skills</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-gray-200">JavaScript/TypeScript</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-gray-200">React/Next.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-gray-200">Node.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-gray-200">Python</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-gray-200">excellent natural language skills</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
              <span className="text-gray-200">creative coding with p5.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
  