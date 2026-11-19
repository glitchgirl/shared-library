
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all items
export async function GET() {
  try {
    const items = await prisma.item.findMany({
      include: {
        addedBy: true
      }
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to retrieve items" },
      { status: 500 }
    );
  }
}

// POST a new item
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const item = await prisma.item.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        addedById: Number(body.addedById)
      }
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create item" },
      { status: 400 }
    );
  }
}
