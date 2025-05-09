import React from 'react';

const Code = () => {
  const [showVisualization, setShowVisualization] = React.useState(false);

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

            <div>
              <h4 className="text-lg font-medium">recursive spiral squares</h4>
              <p className="text-gray-400">
                A p5.js sketch that visualizes recursion by drawing squares inside squares, creating an optical illusion as though the boundaries of the squares vanish into a spiral.
                View it by clicking the button below.
              </p>
              <button 
                onClick={() => setShowVisualization(!showVisualization)}
                className="mt-2 text-blue-200 hover:underline"
              >
                {showVisualization ? 'hide' : 'show'} visualization
              </button>
              {showVisualization && (
                <div className="mt-4 flex flex-col items-center">
                  <div className="bg-black rounded-lg w-full max-w-[400px]">
                    <div className="relative w-full" style={{ paddingBottom: '110.5%' }}>
                      <iframe 
                        className="p5-iframe absolute inset-0 w-full h-full"
                        src="https://editor.p5js.org/lauriparonen/full/czMhcbE9e" 
                        title="recursive-squares-p5"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          height: "100%",
                          width: "100%",
                          alignItems: "center",
                          overflow: "hidden",
                          border: "0",
                          margin: "0",
                          padding: "0"
                        }}
                        frameBorder="0"
                      />
                    </div>
                  </div>

                </div>
              )}
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
  