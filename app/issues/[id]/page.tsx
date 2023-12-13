import { notFound } from 'next/navigation'
import React from 'react'

interface Props{
    params: {id:string}
}

const IssueDetailsPage = async ({params}:Props) => {

    const issue = await prisma?.ticket.findUnique({
        where:{id: parseInt(params.id)}

    })

    if(!issue){
        notFound()
    }

  return (
    <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.status}</p>
        <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetailsPage