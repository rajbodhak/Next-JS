import { defineQuery } from "next-sanity";

export const COMPLAIN_QUERY = defineQuery(`*[_type == "complain" && defined(slug.current)] | order(_createdAt desc){
    _id,
  title,
  slug,
  description,
  category,
  views,
  pitch,
  "author": author->{
    _id,
    name,
    email,
    image
}
}`)