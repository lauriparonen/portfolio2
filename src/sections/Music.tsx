import Link from "next/link";
import Visualizer3D from "@/components/Visualizer3D";

export default function Music() {
  return (
    <div className="min-h-screen px-6 py-20">
      <h2 className="text-3xl font-serif mb-4">Music</h2>

      <p className="text-gray-400 max-w-xl mb-8">
        I sometimes tinker with sound. Below is a 3‑D particle visualizer that
        dances to one of my tracks. You can also explore my music on{" "}
        <Link href="https://soundcloud.com/lamiatunes" className="underline hover:text-white">
          SoundCloud
        </Link>{" "}
        and{" "}
        <Link href="https://open.spotify.com/artist/6b1HmB9aQHT0nEXpB02pEm" className="underline hover:text-white">
          Spotify
        </Link>.
      </p>

      <Visualizer3D src="/audio/grassblades.mp3" />
    </div>
  );
}
