const Nous = () => (
    <div className="min-h-screen px-6 py-20">
      <h2 className="text-3xl font-serif mb-4">Nous</h2>
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

    </div>
  );
  export default Nous;
  