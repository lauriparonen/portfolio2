const Code = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-serif">projects</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium">
              <a href="https://f0tg.github.io/osic" className="hover:underline">one shot i ching</a>
            </h4>
            <p className="text-gray-400">
              A web interface for the Book of Changes.
              Generates each reading based on truly random data from <a href="random.org" className="text-blue-200 hover:underline">random.org</a>.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium">Project Two</h4>
            <p className="text-gray-400">Description of project two</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-serif">skills</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>JavaScript/TypeScript</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>React/Next.js</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>Node.js</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>Python</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-8 flex flex-col items-center">
      <div className="bg-black rounded-lg w-full max-w-[400px]">
        <div className="relative w-full" style={{ paddingBottom: '110.5%' }}>
          <iframe 
            className="p5-iframe absolute inset-0 w-full h-full"
            src="https://editor.p5js.org/lauriparonen/full/czMhcbE9e" 
            title="recursive-squares-p5"
            style={{
              display: "flex",
              justifyContent: "center",
              height: "442px",
              width: "400px",
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
      <p className="text-gray-400 mt-4 max-w-[400px] text-center">
        A recursive visualization exploring the beauty of self-similarity. Each square contains smaller squares, 
        creating an optical illusion as though the boundaries of the squares vanish into a spiral. Built with p5.js.
      </p>
    </div>
  </div>
);

export default Code;
  