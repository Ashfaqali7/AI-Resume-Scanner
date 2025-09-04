import { NextResponse } from "next/server"

// In a real application, you would use a database to store users
// For now, we'll use an in-memory array to simulate user storage
let users: { id: string; name: string; email: string; password: string }[] = []

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      )
    }
    
    // Create new user
    const newUser = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      email,
      password // In a real application, you would hash the password
    }
    
    users.push(newUser)
    
    // Return success response without the password
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during signup" },
      { status: 500 }
    )
  }
}

// For testing purposes, we can get all users
export async function GET() {
  // Don't return passwords in the response
  const usersWithoutPasswords = users.map(({ password, ...user }) => user)
  return NextResponse.json(usersWithoutPasswords)
}