
import ComplainCard, { ComplainCardType } from "../../components/ComplainCard";
import { COMPLAIN_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home() {
  // Fetch data
  // const posts = await client.fetch(COMPLAIN_QUERY);
  const { data: posts } = await sanityFetch({ query: COMPLAIN_QUERY })

  // Transform data to match ComplainCardType
  const transformedPosts: ComplainCardType[] = posts.map((post: any) => ({
    ...post,
    author: post.author
      ? {
        _id: post.author._id,
        name: post.author.name || null,
        email: post.author.email || null,
        image: post.author.image || null,
      }
      : undefined,
  }));

  const session = await auth();
  console.log(session?.id);

  // Debug log transformed data
  // console.log("Transformed Posts:", transformedPosts);

  return (
    <>
      <section className="h-[50rem] w-full dark:bg-black bg-dark dark:bg-grid-white/[0.2] bg-grid-white/[0.2] relative flex flex-col items-center justify-center gap-7 p-8">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <h1 className="pt-36 heading">Your Voice, Your Change</h1>
        <p className="sub-heading !max-w-3xl">
          Have a concern about university policies, facilities, or experiences? Share your complaints and help us create a better campus together.
        </p>
        <button className="button-gradient">
          <Link href={"/complain/create/"}>Share Your Thoughts</Link>
        </button>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">All Posts</p>
        <ul className="mt-7 card_grid ">
          {transformedPosts?.length > 0 ? (
            transformedPosts.map((post: ComplainCardType) => (
              <ComplainCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No result found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
