import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { Card, Flex, Heading, Text,Grid, Box, Button, Link } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import Markdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { PrismaClient } from '@prisma/client'

interface Props{
    params: {id:string}
}

const IssueDetailsPage = async ({params}:Props) => {
  const prisma = new PrismaClient();

    const issue = await prisma?.ticket.findUnique({
        where:{id: parseInt(params.id)}

    })

    if(!issue){
        notFound()
    }

  return (
    <Grid columns={{
        initial: '1',
        md: '2'
      }} gap="3">
        <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="6" >
        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='mt-3'>
            <Markdown className='prose my-4' >{issue.description}</Markdown>
        </Card>
        </Box>
        <Box>
        <Link href= {`/issues/${issue.id}/edit`} ><Button><Pencil2Icon/>Edit Issue</Button></Link>
        </Box>
    

    </Grid>
  )
}

export default IssueDetailsPage