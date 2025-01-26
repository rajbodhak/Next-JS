import { defineField, defineType } from "sanity";

export const complain = defineType({
    name: "complain",
    title: "Complain",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: (Rule) => Rule.min(3).max(25).required().error("Please provide a Title")
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title"
            }
        }),
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" }
        }),
        defineField({
            name: "description",
            type: "string"
        }),
        defineField({
            name: "image",
            type: "url"
        }),
        defineField({
            name: "views",
            type: "number"
        }),
        defineField({
            name: "category",
            type: "string",
        }),
        defineField({
            name: "pitch",
            type: "markdown",
        })
    ]
})