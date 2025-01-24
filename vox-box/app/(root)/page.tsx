
export default function Home() {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-dark  dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col items-center justify-center gap-7 p-8 ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h1 className="pt-36 heading">Your Voice, Your Change</h1>
      <p className="sub-heading !max-w-3xl">
        Have a concern about university policies, facilities, or experiences? Share your complaints and help us create a better campus together.
      </p>
      <button className="button-gradient">Share Your Thoughts</button>
    </div>
  );
}
