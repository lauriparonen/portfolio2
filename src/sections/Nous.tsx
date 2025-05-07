import CollapsibleSection from "@/components/CollapsibleSection";

const Nous = () => (
  <CollapsibleSection title="nous" defaultOpen={true}>
    <p className="text-gray-400">below is an embed of my Cosmos page, a peer into my aesthetic and noetic sensibilities</p>

    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-4xl rounded-lg overflow-hidden border border-gray-700 bg-neutral-900 shadow-lg">
        <iframe
          src="https://cosmos.so/lauzi"
          className="w-full h-[700px]"
          loading="lazy"
          style={{
            border: "none",
          }}
        ></iframe>
      </div>
    </div>
  </CollapsibleSection>
);

export default Nous;
  