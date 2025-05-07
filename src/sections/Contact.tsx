import CollapsibleSection from "@/components/CollapsibleSection";

const Contact = () => (
  <CollapsibleSection title="contact" defaultOpen={false}>
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
          <a href="https://github.com/lauriparonen" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
            github
          </a>
          <a href="www.linkedin.com/in/lauri-paronen-4b0651291" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
            linkedin
          </a>
          <a href="https://instagram.com/lauri.618" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors block">
            instagram
          </a>
        </div>
      </div>
    </div>
  </CollapsibleSection>
);

export default Contact;
  