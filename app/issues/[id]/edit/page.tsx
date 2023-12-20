import { notFound } from 'next/navigation';
import React from 'react'
import IssueForm from '../../_components/IssueForm';
import { PrismaClient } from '@prisma/client';

interface Props{
    params: {id:string}
}

const EditIssuePage = async ({params}:Props) => {
    const prisma = new PrismaClient();
    
    const issue = await prisma?.ticket.findUnique({
        where: {id:parseInt(params.id)}
    });

    if(!issue){
        notFound()
    }

  return (
    <div>
        <IssueForm issue={issue}/>
    </div>
  )
}

export default EditIssuePage