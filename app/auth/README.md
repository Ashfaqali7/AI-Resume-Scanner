# Authentication System

This project includes a complete authentication system with the following features:

## Features Implemented

1. **User Signup**
   - New users can create an account with name, email, and password
   - Password confirmation validation
   - Duplicate email checking

2. **User Signin**
   - Email and password authentication
   - Error handling for invalid credentials

3. **Forgot Password**
   - Password reset request form
   - Reset password page with token validation (simulated)

4. **Social Login**
   - Google login
   - Google Drive login (simulated)

5. **User Profile**
   - Profile page showing user information
   - Sign out functionality

## Pages

- `/auth/login` - Login page
- `/auth/signup` - Signup page
- `/auth/forgot-password` - Forgot password page
- `/auth/reset-password` - Reset password page
- `/auth/profile` - User profile page

## API Routes

- `/api/auth/[...nextauth]` - NextAuth configuration
- `/api/auth/signup` - User registration endpoint

## Implementation Notes

The authentication system is built with NextAuth.js and includes:

- JWT-based session management
- Credentials provider for email/password authentication
- Google provider for social login
- Custom pages for all authentication flows
- In-memory user storage (would be replaced with a database in production)

## Environment Variables

For Google authentication to work, you need to set up the following environment variables:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Security Considerations

In a production environment, you should:

1. Use a proper database to store user credentials
2. Hash passwords before storing them
3. Implement proper email verification
4. Add rate limiting to authentication endpoints
5. Use HTTPS in production
6. Implement proper password strength requirements
7. Add CSRF protection
8. Implement proper session management