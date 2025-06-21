import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    
    const ids = body.ids;
    
    await prisma.order.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ message: 'Orders deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[DELETE MANY ERROR]', error);
    return NextResponse.json({ message: 'Failed to delete orders' }, { status: 500 });
  }
}