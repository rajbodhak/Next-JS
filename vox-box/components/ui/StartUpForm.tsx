"use client"

import React, { useActionState, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from './textarea';
import { Button } from './button';
import MDEditor from '@uiw/react-md-editor';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from "zod";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/router';

const StartUpForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = React.useState("**Write Your Pitch**");
    const { toast } = useToast();
    // const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }

            await formSchema.parseAsync(formValues);

            console.log(formSchema)

            // if (result.status == "SUCCESS") {
            //     toast({
            //         title: "Success",
            //         description: "Your startup pitch has been created",
            //     })
            // }

            // router.push(`/complain/${result.id}`)
            // return result 
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;

                setErrors(fieldErrors as unknown as Record<string, string>);

                toast({
                    title: "Error",
                    description: "Please Check your inputs and try again",
                    variant: "destructive"
                })

                return { ...prevState, error: "Validation Failed", status: "ERROR" }
            }
            toast({
                title: "Error",
                description: "An unexpected error has occured",
                variant: "destructive"
            })

            return {
                ...prevState,
                error: "An unexpected error has occured",
                status: "ERROR"
            }
        }
    }
    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    })

    return <form action={formAction} className='complain-form '>
        <div>
            <label htmlFor="title" className='complain-form_label'>Title</label>
            <Input
                id='title'
                name='title'
                className='complain-form_input'
                required
                placeholder='Complain Title'
            />

            {errors.title && <p className='complain-form_error'>{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className='complain-form_label'>Description</label>
            <Textarea
                id='description'
                name='description'
                className='complain-form_textarea'
                required
                placeholder='Complain Description'
            />

            {errors.description && <p className='complain-form_error'>{errors.description}</p>}
        </div>
        <div>
            <label htmlFor="category" className='complain-form_label'>Category</label>
            <Input
                id='category'
                name='category'
                className='complain-form_input'
                required
                placeholder='Complain Category (Facilities, Academic Issues)'
            />

            {errors.category && <p className='complain-form_error'>{errors.category}</p>}
        </div>

        <div>
            <label htmlFor="Link" className='complain-form_label'>Image URL</label>
            <Input
                id='link'
                name='link'
                className='complain-form_input'
                required
                placeholder='Complain Image URL'
            />

            {errors.link && <p className='complain-form_error'>{errors.link}</p>}
        </div>

        <div data-color-mode="dark">
            <label htmlFor="Link" className='complain-form_label'>Pitch</label>
            <MDEditor
                value={pitch}
                onChange={(value) => setPitch(value as string)}
                id='pitch'
                preview='edit'
                height={300}
                style={{ borderRadius: 20, overflow: "hidden" }}
                textareaProps={{
                    placeholder: "Briefly describe your idea and what problem it solves"
                }}
                previewOptions={{
                    disallowedElements: ["style"],
                }}
            />

            {errors.link && <p className='complain-form_error'>{errors.link}</p>}
        </div>
        <Button type='submit' className='complain-form_btn' disabled={isPending}>
            {isPending ? "Submitting..." : "Submit Your Pitch"} <Send className='size-6 ml-2' />
        </Button>
    </form>
}

export default StartUpForm
