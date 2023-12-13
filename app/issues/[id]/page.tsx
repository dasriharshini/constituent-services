import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
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
        <Heading>{issue.title}</Heading>
        <Flex gap="6" >
        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='mt-6'>
            {issue.description}
        </Card>

    </div>
  )
}

export default IssueDetailsPage