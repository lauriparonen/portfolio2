const Writing = () => (
  <div>
    <p className="text-gray-400 max-w-xl mb-8">
      For some years now, I have had an intermittent, overarching desire to verbalize
      ideas—specifically ones pertaining to mystical philosophy and 
      <i> <a href="https://www.goodreads.com/quotes/9948686-the-ways-of-liberation-are-of-course-concerned-with-making" className="text-blue-200 hover:underline" target="_blank" rel="noopener noreferrer">
      ways of liberation</a></i>. 

      You can find my longer-form writing <a href="https://foodofthegods.substack.com/" className="text-blue-200 hover:underline">here</a>, on my Substack.
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
  </div>
);

export default Writing;
  