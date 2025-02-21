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

export const AUTHOR_BY_GOOGLE_ID_QUERY = `
  *[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    email,
    image
  }
`;

export const AUTHOR_BY_ID_QUERY = `
  *[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    email,
    image
  }
`;

export const COMPLAIN_BY_AUTHOR_QUERY = defineQuery(`
  *[_type == "complain" && author._ref == $id] | order(_createdAt desc) {
    _id,
    _type,
    title,
    slug,
    _createdAt,
    _updatedAt,
    _rev,
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
  }
`);