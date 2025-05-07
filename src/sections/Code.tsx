import CollapsibleSection from "@/components/CollapsibleSection";

const Code = () => (
  <CollapsibleSection title="code" defaultOpen={true}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-xl font-serif">Recent Projects</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium">Project One</h4>
            <p className="text-gray-400">Description of project one</p>
          </div>
          <div>
            <h4 className="text-lg font-medium">Project Two</h4>
            <p className="text-gray-400">Description of project two</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-serif">Skills</h3>
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
        </div>
      </div>
    </div>
  </CollapsibleSection>
);

export default Code;
  