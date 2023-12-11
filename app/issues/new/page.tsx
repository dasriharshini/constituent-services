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

type IssueForm=z.infer<typeof createTicketSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors }}= useForm<IssueForm>({
        resolver: zodResolver(createTicketSchema)
    });
    const [error, setError]= useState('');
  return (
    <div className='max-w-xl'>
        {error && <Callout.Root color='red' className=' mb-5'>
            <Callout.Text>
                {error}
            </Callout.Text>
        </Callout.Root>}
    <form className= 'space-y-5' onSubmit={handleSubmit(async(data)=> {
        try {
            await axios.post('/api/issues',data);
            router.push('/issues');
        } catch (error) {
            setError('An unexpected error occured');
        }
        
    })}>
    <TextField.Root>
    <TextField.Input placeholder="Title" {...register('title')}/>
   </TextField.Root>
   {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
   <Controller
   name="description"
   control={control}
   render={({field}) => <SimpleMDE placeholder='Write A Description' {...field}/>} 
   />
   {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
   <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default NewIssuePage