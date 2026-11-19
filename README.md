# shared-library
A way for the McGriskets to track books, tools, patterns, etc 


# What is this
This is a library service for us and our friends to share our tools, books, and whatever else :)

The frontend is react using material UI
https://react.dev/
https://mui.com/material-ui/

design system / wireframes are on figma 
won't be using tokens since this a small project

Middleware is next.js 
https://nextjs.org/

database will be document DB or something like that
https://aws.amazon.com/documentdb/ 

db schema is on figma

Auth services still need to be set up

# Getting started

Frontend
    Run the Development Server
    Run npm run dev to start the development server.
    Visit http://localhost:3000 to view your application.
    Edit app/page.tsx (or pages/index.tsx) file and save it to see the updated result in your browser
    The homepage is at / and the sample item detail page is at /item.
    SRC has the components which each have their own .tsx file and a .styles.css file if a lot of styling needs to be done, we will used styled components

Backend

Database
Absolutely! I looked at your Shared Library project. It's a React + TypeScript frontend with Next.js handling the application/backend side.

For this project, I'd recommend SQLite as your local database, rather than starting with MongoDB or AWS DocumentDB.

Here's why:
- No database server to install or maintain.
- The database is just a local file (shared-library.db).
- Supports relationships between users and items.
- Uses regular SQL, so it's easy to expand later.
- Works nicely with Next.js and TypeScript.
I'd keep the first version intentionally simple: users can register, items can be added to the library, and users can see who owns or added an item.
1. What we're building
I'd start with two database tables:
Users
Field	Type	Purpose
id	Integer	Primary key
name	String	User's name
email	String	Unique email
createdAt	DateTime	Registration date


Items
Field	Type	Purpose
id	Integer	Primary key
title	String	Item name
description	String	Item details
category	String	Book, tool, pattern, etc.
available	Boolean	Whether it can be borrowed
createdAt	DateTime	Date added
addedById	Integer	Foreign key to Users


Relationship
USER

id (PK)

One user can add many items
ITEM

id (PK) · addedById (FK)



This gives you a basic relational database without making the project unnecessarily complicated.
2. Install Prisma and SQLite
Prisma will handle communication between your Next.js application and SQLite.

Open a terminal in the root directory of your project (the same directory as package.json).

Run:
npm install @prisma/client@6
npm install -D prisma@6


Initialize Prisma:
npx prisma init --datasource-provider sqlite


This creates a prisma folder containing schema.prisma and an .env file.

In .env, make sure you have:
DATABASE_URL="file:./dev.db"


Your database will live locally at prisma/dev.db.
3. Define your database schema
Open prisma/schema.prisma.

Replace its contents with:

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())

  items     Item[]
}

model Item {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  category    String
  available   Boolean  @default(true)
  createdAt   DateTime @default(now())

  addedById   Int
  addedBy     User     @relation(fields: [addedById], references: [id])
}



A few things worth noting:
- @id establishes a primary key.
- @unique prevents duplicate email addresses.
- @default(autoincrement()) automatically generates IDs.
- @relation establishes the foreign key relationship.
- User.items allows you to retrieve all items added by a user.
- Item.addedBy allows you to retrieve the user who added an item.
4. Create the actual database
Run:
npx prisma migrate dev --name init


Then:
npx prisma generate


You now have a local SQLite database with your two tables!

You can inspect it using:
npx prisma studio


Prisma Studio opens a browser interface where you can view, add, edit, and delete database records.








egghead.io


5. Connect Next.js to the database
Create a new folder called lib in your project root.

Create lib/prisma.ts:

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}



This creates a reusable Prisma client so your development server doesn't create unnecessary database connections every time the application reloads.
6. Test that you can retrieve items
Your repository uses the Next.js app directory, so let's use its API route functionality. 
GitHub+1


Create:

app/api/items/route.ts

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



You now have two endpoints:
Method	Endpoint	Purpose
GET	/api/items	Retrieve all items
POST	/api/items	Add an item

For the POST endpoint, you'll need to create a user first because each item references an existing user.

Important: These are starter endpoints, not production-ready authentication or input validation. The User table currently stores user profiles, not login credentials. We'll address authentication separately rather than storing passwords as plain text.
7. Your project structure
After these changes, your project should look something like this:
shared-library/
│
├── app/
│   ├── api/
│   │   └── items/
│   │       └── route.ts
│   ├── page.tsx
│   └── ...
│
├── lib/
│   └── prisma.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── dev.db
│   └── migrations/
│
├── .env
├── package.json
└── tsconfig.json


Make sure .env and prisma/dev.db are in your .gitignore. You don't want to commit local database contents or environment secrets to GitHub.

# Contributing guide  
