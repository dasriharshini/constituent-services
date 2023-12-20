'use client';
import { Text,TextField,Callout,Button } from '@radix-ui/themes';
import {useForm, Controller} from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTicketSchema } from '@/app/validationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/spinner';
import { Ticket } from '@prisma/client';

type IssueFormData=z.infer<typeof createTicketSchema>;

const IssueForm = ({issue}:{issue?:Ticket}) => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors }}= useForm<IssueFormData>({
        resolver: zodResolver(createTicketSchema)
    });
    const [error, setError]= useState('');
    const [submitted,setSubmitted]= useState(false);
  return (
    <div className='max-w-xl'>
        {error && <Callout.Root color='red' className=' mb-5'>
            <Callout.Text>
                {error}
            </Callout.Text>
        </Callout.Root>}
    <form className= 'space-y-5' onSubmit={handleSubmit(async(data)=> {
        try {
            setSubmitted(true);
            await axios.post('/api/issues',data);
            router.push('/issues');
        } catch (error) {
            setSubmitted(false);
            setError('An unexpected error occured');
        }
        
    })}>
    <TextField.Root>
    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')}/>
   </TextField.Root>
   {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
   <Controller
   name="description"
   control={control}
   defaultValue={issue?.description}
   render={({field}) => <SimpleMDE placeholder='Write A Description' {...field}/>} 
   />
   {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
   <Button disabled={submitted}>Submit New Issue{submitted && <Spinner/>}</Button>
    </form>
    </div>
  )
}

export default IssueForm