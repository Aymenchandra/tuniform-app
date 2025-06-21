import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid order ID' }, { status: 400 });
    }

    const body = await req.json();

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('[PATCH ERROR]', error);
    return NextResponse.json({ message: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(req: Request,{ params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Invalid order ID' }, { status: 400 });
    }

    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('[DELETE ERROR]', error);
    return NextResponse.json({ message: 'Failed to delete order' }, { status: 500 });
  }
}