import CollapsibleSection from "@/components/CollapsibleSection";

const Contact = () => (
  <CollapsibleSection title="contact" defaultOpen={true}>
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-serif mb-2">Email</h3>
        <a href="mailto:lauri.paronen@gmail.com" className="text-gray-400 hover:text-white transition-colors">
          lauri.paronen@gmail.com
        </a>
      </div>
      <div>
        <h3 className="text-xl font-serif mb-2">Social</h3>
        <div className="space-y-2">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </CollapsibleSection>
);

export default Contact;
  