
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

type RouteParams = {
  params: {
    id: string;
  };
};

// GET: Retrieve one user
export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "Invalid user ID" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      items: true
    }
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// PATCH: Update a user
export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "Invalid user ID" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    const data: { name?: string; email?: string } = {};

    if (typeof body.name === "string" && body.name.trim()) {
      data.name = body.name.trim();
    }

    if (typeof body.email === "string" && body.email.trim()) {
      data.email = body.email.trim().toLowerCase();
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Provide a valid name or email" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data
    });

    return NextResponse.json(user);

  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Unable to update user" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a user
export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  const id = Number(params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "Invalid user ID" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      _count: {
        select: { items: true }
      }
    }
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  if (user._count.items > 0) {
    return NextResponse.json(
      {
        error: "Cannot delete a user who has contributed items"
      },
      { status: 409 }
    );
  }

  await prisma.user.delete({
    where: { id }
  });

  return NextResponse.json(
    { message: "User deleted successfully" }
  );
}
