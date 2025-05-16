import React from 'react';

interface P5SketchProps {
  title: string;
  description: string;
  sketchUrl: string;
  height?: string;
  isSquareVisualization?: boolean;  // Flag for square visualization specific layout
}

const P5Sketch: React.FC<P5SketchProps> = ({ 
  title, 
  description, 
  sketchUrl, 
  height = '800px',
  isSquareVisualization = false
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-medium">
        {title}
      </h4>
      <div 
        className="text-gray-400"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-200 hover:text-blue-300 cursor-pointer"
      >
        <span className="flex items-center">
          {isExpanded ? 'hide visualization' : 'show visualization'}
          <span className={`ml-1 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </span>
      </button>
      
      {isExpanded && (
        <div className="mt-4">
          {isSquareVisualization ? ( // the dimensions of the sketch are hardcoded
            <div className="flex flex-col items-center">
              <div className="bg-black rounded-lg w-full max-w-[400px]">
                <div className="relative w-full" style={{ paddingBottom: '110.5%' }}>
                  <iframe 
                    className="p5-iframe absolute inset-0 w-full h-full"
                    src={sketchUrl}
                    title={`${title}-p5`}
                    style={{
                      display: "flex",
                      justifyContent: "center",
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
          ) : (
            <iframe 
              src={sketchUrl}
              title={`${title}-p5`}
              style={{
                width: "100%",
                height: height,
                border: "0"
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default P5Sketch; 