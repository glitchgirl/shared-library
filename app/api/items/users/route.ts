
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Retrieve all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc"
      }
    });

    return NextResponse.json(users);

  } catch (error) {
    return NextResponse.json(
      { error: "Unable to retrieve users" },
      { status: 500 }
    );
  }
}

// POST: Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      typeof body.name !== "string" ||
      typeof body.email !== "string" ||
      !body.name.trim() ||
      !body.email.trim()
    ) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase()
      }
    });

    return NextResponse.json(user, { status: 201 });

  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "That email address is already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Unable to create user" },
      { status: 500 }
    );
  }
}
