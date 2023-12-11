import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';
import { createTicketSchema } from "../../validationSchemas";

export async function POST(request: NextRequest){
   const body = await request.json();
   const validation = createTicketSchema.safeParse(body);
   if (!validation.success)
   {
    return NextResponse.json(validation.error.format(), {status: 400})
   }

   const newIssue = await prisma.ticket.create({
    data: {title: body.title, description: body.description}

   });

   return NextResponse.json(newIssue, {status: 201});

}