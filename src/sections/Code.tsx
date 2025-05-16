import React from 'react';
import P5Sketch from '../components/P5Sketch';
import { sketches } from '../data/sketches';

const Code = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-serif">projects</h3>
          <div className="space-y-6">
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
  