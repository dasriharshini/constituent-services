import React from 'react'
import {Button, Table, TableBody, TableCell, TableRow} from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusBadge from '../components/IssueStatusBadge';
import { PrismaClient } from '@prisma/client';


const IssuesPage = async () => {

  const prisma = new PrismaClient();
  const issues = await prisma?.ticket.findMany();
  return (
    <>
    <div className='mb-5'>
    <Button><Link href='/issues/new'>New Issue</Link></Button>
    </div>

    <Table.Root variant="surface">
    <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
    </Table.Row>
    </Table.Header>

    <TableBody>
      {issues?.map (issue =>(
        <TableRow key={issue.id}>
          <TableCell>
            <Link className='text-violet-900 hover:underline' href={`/issues/${issue.id}`}>
            {issue.title}
            </Link>
          <div className='block md:hidden'>
          <IssueStatusBadge status={issue.status}/>
          </div>
          </TableCell>
          
          <TableCell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></TableCell>
          <TableCell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</TableCell>

        </TableRow>

      ))}

    </TableBody>


    </Table.Root>
    </>
  

  )
}

export default IssuesPage