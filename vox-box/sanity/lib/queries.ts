import { defineQuery } from "next-sanity";

export const COMPLAIN_QUERY = defineQuery(`*[_type == "complain" && defined(slug.current)] | order(_createdAt desc){
    _id,
  title,
  slug,
  _createdAt,
  description,
  category,
  views,
  pitch,
  image,
  "author": author->{
    _id,
    name,
    email,
    image
}
}`);

export const COMPLAIN_BY_ID_QUERY = defineQuery(`*[_type == "complain" && _id == $id][0]{
  _id,
  title,
  _createdAt,
  slug,
  description,
  category,
  views,
  pitch,
  image,
  "author": author->{
    _id,
    name,
    email,
    image
  }
}`);

export const COMPLAIN_VIEWS_QUERY = defineQuery(`*[_type == "complain" && _id == $id][0] {
  _id, views
}`)