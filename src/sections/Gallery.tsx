import ImageCarousel from "@/components/ImageCarousel";

// Array for image filenames
const imageData = [
    "DALL·E 2023-04-30 14.31.20 - abstract painting of clouds, claude monet.png",
    "DALL·E 2023-04-30 14.31.44 - Impressionist oil painting of clouds with very subtle psychedelic details, painted by Claude Monet and Odilon Redon.png",
    "DALL·E 2023-04-30 14.31.59 - Clouds above the sea in a Monet painting, very beautiful, wistful, wonderful.png",
    "DALL·E 2023-04-30 14.32.07 - Clouds above the sea in a Monet painting, very beautiful, wistful, wonderful.png",
    "DALL·E 2023-04-30 14.32.22 - Extremely detailed oil painting of a cat by Von Wright, high definition, with subtle psychedelic details.png",
    "DALL·E 2023-04-30 14.32.38 - Impressionist oil painting of a beautiful flower, subtly psychedelic, lovely, delightful, harmonious, wonderful, delicate.png",
    "DALL·E 2023-04-30 14.32.44 - Impressionist oil painting of a beautiful flower, subtly psychedelic, lovely, delightful, harmonious, wonderful, delicate.png",
    "DALL·E 2023-04-30 14.32.52 - Impressionist oil painting of a beautiful flower, subtly psychedelic, lovely, delightful, harmonious, wonderful, delicate.png",
    "DALL·E 2023-04-30 14.33.01 - Impressionist oil painting of a beautiful flower, subtly psychedelic, lovely, delightful, harmonious, wonderful, delicate.png",
    "DALL·E 2023-04-30 14.33.09 - Impressionist oil painting of a field of beautiful flowers, subtle psychedelic details, lovely, delightful, harmonious, wonderful.png",
    "DALL·E 2023-04-30 14.33.18 - Impressionist oil painting of a field of beautiful flowers, subtle psychedelic details, lovely, delightful, harmonious, wonderful.png",
    "DALL·E 2023-04-30 14.33.29 - A very beautiful oil painting of the ocean vby Vincent Van Gogh, vivid and dreamy, .png",
    "DALL·E 2023-04-30 14.33.49 - A mysterious, blue pattern of light on a dark background, waves of light diffracted in water.png",
    "DALL·E 2023-04-30 14.33.59 - A nebula in the shape of a rose, beautiful detailed renassaince oil painting.png",
    "DALL·E 2023-04-30 14.34.21 - Spiral nebula, magnificent oil painting by Odilon Redon.png",
    "DALL·E 2023-04-30 14.34.51 - Clouds in a Monet oil painting, with subtle psychedelic details.png",
    "DALL·E 2023-04-30 14.35.04 - Extremely detailed oil painting of a cat by Von Wright, high definition.png",
    "DALL·E 2023-04-30 14.35.19 - Extremely detailed oil painting of an owl by Von Wright, high definition.png",
    "DALL·E 2023-04-30 14.35.35 - _That Nature is a Heraclitean Fire_, an impressionist oil painting.png",
    "DALL·E 2023-04-30 14.35.49 - liquid crystal absolution, impressionist oil painting, beautiful.png",
    "DALL·E 2023-04-30 14.35.55 - liquid crystal absolution, impressionist oil painting, beautiful.png",
    "DALL·E 2023-04-30 14.36.03 - liquid crystal absolution, impressionist oil painting, beautiful.png",
    "DALL·E 2023-04-30 14.36.43 - A watercolor painting of a happy cat with its eyes closed.png",
    "DALL·E 2023-04-30 14.36.53 - oil painting of a wizard cat casting a spell, Impressionism.png",
    "DALL·E 2023-05-05 14.00.56 - Black metal album cover, grainy film image of a church, black and white.png",
    "DALL·E 2023-05-05 14.01.25 - Impressionist oil painting of the cosmos, ambient album cover, beautiful, harmonious color scheme.png",
    "DALL·E 2023-05-05 14.01.37 - Impressionist oil painting of the sun setting, ambient album cover, beautiful, harmonious color scheme.png",
    "DALL·E 2023-05-05 14.01.42 - Impressionist oil painting of the sun setting, ambient album cover, beautiful, harmonious color scheme.png",
    "DALL·E 2023-05-05 14.02.10 - Impressionist oil painting of the cosmos, ambient album cover, beautiful, harmonious color scheme.png",
    "DALL·E 2023-05-05 14.03.01 - Impressionist oil painting of the sun setting, ambient album cover, beautiful, harmonious color scheme.png",
    "DALL·E 2023-05-05 14.03.07 - Impressionist oil painting of the sun setting, ambient album cover, beautiful, harmonious color scheme.png",
    "DALL·E 2023-05-05 14.03.14 - Impressionist oil painting of the cosmos, ambient album cover, beautiful, harmonious color scheme.png",
    "DALL·E 2023-05-05 14.05.33 - A jolly medieval court jester bear with a manic gaze, oil painting.png",
    "DALL·E 2023-05-05 14.05.50 - A jolly medieval court jester bear, oil painting.png",
    "DALL·E 2023-05-05 14.06.45 - A jolly medieval court jester bear, oil painting.png",
    "DALL·E 2023-05-05 14.08.04 - Dark ambient album cover, grainy film image.png",
    "DALL·E 2023-05-05 14.08.13 - Grainy black and white film image of a Northern European forest in the winter, black metal album cover.png",
    "DALL·E 2023-05-05 14.08.23 - Grainy black and white film image of a Northern European forest in the winter, black metal album cover.png",
    "DALL·E 2023-05-05 14.11.58 - watercolor painting of The Garden  of the Prophet by Kahlil Gibran, pastel colorscape, mystical, beautiful.png",
    "DALL·E 2023-05-05 14.12.08 - watercolor painting of The Garden  of the Prophet by Kahlil Gibran, pastel colorscape, mystical, beautiful.png",
    "DALL·E 2023-05-05 14.12.17 - watercolor painting of The Garden  of the Prophet by Kahlil Gibran, pastel colorscape, mystical, beautiful.png",
    "DALL·E 2023-05-05 14.12.45 - Gothic cathedral with flowers bursting out, detailed beautiful oil painting.png",
    "DALL·E 2023-05-05 14.12.53 - Gothic cathedral with flowers bursting out, detailed beautiful oil painting.png",
    "DALL·E 2023-05-05 14.12.58 - Gothic cathedral with flowers bursting out, detailed beautiful oil painting.png",
    "DALL·E 2023-05-05 14.13.18 - A watercolor painting of a gothic church painted by Vincent Van Gogh.png",
    "DALL·E 2023-05-05 14.13.23 - A watercolor painting of a gothic church painted by Vincent Van Gogh.png",
    "DALL·E 2023-05-05 14.13.30 - A watercolor painting of a gothic church painted by Vincent Van Gogh.png",
    "DALL·E 2023-05-05 14.13.44 - A watercolor painting of a sunset, by Vincent Van Gogh.png",
    "DALL·E 2023-05-05 14.13.51 - A watercolor painting of a sunset, by Vincent Van Gogh.png",
    "DALL·E 2023-05-05 14.14.11 - A watercolor painting of clouds, by Vincent Van Gogh.png",
    "DALL·E 2023-05-05 14.20.53 - watercolor painting of a koi pond in a garden, pastel colorscape, beautiful.png",
    "DALL·E 2023-05-05 14.21.00 - watercolor painting of a koi pond in a garden, pastel colorscape, beautiful.png",
    "DALL·E 2023-05-05 14.21.08 - watercolor painting of a koi pond in a garden, pastel colorscape, mystical, beautiful.png",
    "DALL·E 2023-05-05 14.27.18 - cosmic blue glow patterns emanating from the ocean, oil painting by Monet.png",
    "DALL·E 2023-05-05 14.27.45 - Jazz album cover art, an abstract oil painting of a cat.png",
    "DALL·E 2023-05-05 14.28.13 - Extremely detailed oil painting of a cat by Von Wright, high definition, with subtle psychedelic details.png",
    "DALL·E 2023-05-05 23.08.12 - Extremely detailed oil painting of a cat by Von Wright, high definition.png",
    "DALL·E 2023-05-05 23.08.23 - Extremely detailed oil painting of a cat by Von Wright, high definition.png",
    "DALL·E 2023-05-05 23.08.48 - A mysterious, blue pattern of light on a dark background, waves of light diffracted in water.png",
    "DALL·E 2023-05-05 23.08.57 - A mysterious, blue pattern of light on a dark background, waves of light diffracted in water.png",
    "DALL·E 2023-05-05 23.09.15 - The Great Wave off Kanagawa, an oil painting by Ivan Aivazovsky.png",
    "DALL·E 2023-05-05 23.09.28 - A garden of ideas, oil painting.png",
    "DALL·E 2023-05-05 23.09.40 - A garden of ideas, oil painting.png",
    "DALL·E 2023-05-05 23.09.51 - A very detailed Ivan Aivazovsky oil painting of a dragon at a stormy sea.png",
    "DALL·E 2023-05-05 23.10.41 - A view of a galaxy, oil painting by Odilon Redon.png",
    "DALL·E 2023-05-05 23.10.50 - A view of a galaxy, oil painting by Odilon Redon.png",
    "DALL·E 2023-05-05 23.10.58 - A nebula with stars in the shape of flowers, beautiful impressionist oil painting.png",
    "DALL·E 2023-05-05 23.11.16 - dreamy impressionist oil painting of the sea with the sun, beautiful and lovely.png",
    "DALL·E 2023-05-05 23.11.25 - dreamy impressionist oil painting of the sea with the sun, beautiful and lovely.png",
    "DALL·E 2023-05-05 23.27.05 - highly detailed Oriental rug with a wondrous kaleidoscopic pattern, mildly psychedelic, beautiful.png",
    "DALL·E 2023-05-05 23.27.17 - Oil painting of a subtly smiling Chinese dragon, detailed, mysterious.png",
    "DALL·E 2023-05-09 22.38.04 - abstract childlike watercolor painting, pastel colorscape, delightful.png",
    "DALL·E 2023-05-09 22.38.17 - abstract childlike watercolor painting, pastel colorscape, delightful.png",
    "DALL·E 2023-05-09 22.38.26 - abstract childlike watercolor painting, pastel colorscape, delightful.png",
    "DALL·E 2023-05-09 22.40.20 - glitter in the sky, rainbow star, abstract watercolor painting by Monet.png",
    "DALL·E 2023-05-09 22.40.30 - glitter in the sky, rainbow star, abstract watercolor painting by Monet.png",
    "DALL·E 2023-05-09 22.41.07 - glitter in the sky, rainbow star, abstract watercolor painting by Monet, pastel colorscape.png",
    "DALL·E 2023-05-09 22.47.06 - glitter in the sky, rainbow star, abstract watercolor painting by Odilon Redon, pastel colorscape.png",
    "DALL·E 2023-05-09 22.47.20 - glitter in the sky, rainbow star, abstract watercolor painting by Odilon Redon, pastel colorscape.png",
    "DALL·E 2023-05-09 22.47.25 - glitter in the sky, rainbow star, abstract watercolor painting by Odilon Redon, pastel colorscape.png"
];

const Gallery = () => (
  <div>
    <div className="flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2 max-w-xl text-gray-400 text-sm leading-relaxed">
        <p className="text-gray-400 max-w-xl mb-8">
          In 2022, OpenAI published DALL-E 2, a now-deprecated image generation model that could create images from text prompts. 
          This was a very brief period of time when AI image generation wasn&apos;t <i>slop</i> yet—each image seemed pregnant with 
          a promise of infinite possibility and creative freedom, and this potentiality fragranced each generation with a sense of aesthetic richness
          which compensated for the abundant visual inconsistencies and imperfections.
          <br /><br />
          Brian Eno noted that <a href="https://www.goodreads.com/quotes/649039-whatever-you-now-find-weird-ugly-uncomfortable-and-nasty-about"
          className="text-gray-400 hover:underline">
          &quot;whatever you now find weird, ugly, uncomfortable and nasty about a new medium will surely become its signature.&quot;</a> There
          is certainly no shortage of things to find ugly and nasty about AI image generation as a medium, and I am by no means a 
          proponent of &quot;AI art&quot;; however I chose to include these generations of mine on this site as a little token of <i>nostalgia</i>,
          to celebrate the transience of this specific model. I shall always have a soft spot in my memory for it.
        </p>
      </div>
      <ImageCarousel images={imageData} />
    </div>
  </div>
);

export default Gallery;
  