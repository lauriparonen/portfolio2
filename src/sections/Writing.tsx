import CollapsibleSection from "@/components/CollapsibleSection";

const Writing = () => (
  <CollapsibleSection title="writing">
    <p className="text-gray-400 max-w-xl mb-8">
      for some years now, I have had an intermittent, overarching desire to verbalize
      ideas—specifically ones pertaining to mystical philosophy and <i>ways of liberation</i>. 
      you can find my longer-form writing <a href="https://foodofthegods.substack.com/" className="text-blue-200 hover:underline">here</a>, on my Substack.
    </p>
    
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md rounded-lg overflow-hidden border border-gray-700 shadow-lg bg-neutral-900 p-2">
        <iframe
          src="https://foodofthegods.substack.com/embed"
          width="100%"
          height="320"
          className="w-full rounded-md"
          style={{
            border: 'none',
            background: 'black',
          }}
          loading="lazy"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  </CollapsibleSection>
);

export default Writing;
  