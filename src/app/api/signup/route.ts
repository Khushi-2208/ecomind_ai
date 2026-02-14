import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            name,
            email,
            password,
            phone,
            bio,
            profile_image
        } = body;

        // Validate required fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Name, email and password are required" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result = await pool.query(
            `
      INSERT INTO users 
      (name, email, password, phone, bio, profile_image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, role, created_at
      `,
            [
                name,
                email,
                hashedPassword,
                phone || null,
                bio || null,
                profile_image || null
            ]
        );

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: result.rows[0],
            },
            { status: 201 }
        );

    } catch (error: any) {

        // Duplicate email error (Postgres error code)
        if (error.code === "23505") {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        console.error("Signup Error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
