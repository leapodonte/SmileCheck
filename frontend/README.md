# SmileCheck - Next.js Authentication with NextAuth.js

A modern dental care application with secure authentication using NextAuth.js, MongoDB, and Next.js 14.

## 🚀 Features

- **NextAuth.js Integration**: Secure authentication with multiple providers
- **Email/Password Authentication**: Traditional login with email verification
- **Google OAuth**: Social login with Google (optional)
- **MongoDB Database**: Persistent user data storage
- **Email Verification**: 6-digit code verification system
- **Protected Routes**: Dashboard access control
- **Responsive Design**: Mobile-first approach
- **Session Management**: JWT-based sessions

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- Google OAuth credentials (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmileCheck/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the frontend directory:
   ```env
   # Required
   NEXTAUTH_SECRET=your-super-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/smilecheck
   
   # Optional - for Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Required Variables
- `NEXTAUTH_SECRET`: A random string for JWT encryption
- `NEXTAUTH_URL`: Your application URL (http://localhost:3000 for development)
- `MONGODB_URI`: Your MongoDB connection string

### Optional Variables
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## 🔐 Authentication Flow

### Sign Up Process
1. **Step 1**: User enters email and password
2. **Step 2**: User fills profile information (optional)
3. **Step 3**: User receives 6-digit verification code
4. **Verification**: User enters code to verify email
5. **Auto Sign-in**: User is automatically signed in after verification

### Sign In Process
1. User enters email and password
2. System validates credentials against database
3. User is redirected to dashboard on success

### Google OAuth
1. User clicks "Continue with Google"
2. Redirected to Google for authentication
3. User is signed in and redirected to dashboard

## 📁 File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.js    # NextAuth configuration
│   │   │   │   ├── signup/route.js           # User registration
│   │   │   │   └── verify-email/route.js     # Email verification
│   │   │   ├── test/route.js                 # API health check
│   │   │   └── test-db/route.js              # Database test
│   │   ├── signin/page.js                    # Sign in page
│   │   ├── signup/page.js                    # Sign up page
│   │   ├── dashboard/page.js                 # Protected dashboard
│   │   └── layout.js                         # Root layout
│   ├── components/
│   │   ├── Providers.js                      # Session provider
│   │   ├── navbar.js                         # Navigation
│   │   └── footer.js                         # Footer
│   ├── lib/
│   │   ├── db.js                             # Database connection
│   │   └── models/
│   │       └── User.js                       # User model
│   └── utils/
│       └── countries.js                      # Country data
├── public/
│   ├── icons/                                # Application icons
│   └── images/                               # Background images
└── package.json
```

## 🔌 API Routes

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-email` - Email verification
- `GET /api/auth/session` - Get current session

### Test Endpoints
- `GET /api/test` - API health check
- `GET /api/test-db` - Database connection test

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Email Verification**: Required before account activation
- **Session Management**: JWT-based secure sessions
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and logging

## 🚀 Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Set environment variables on your hosting platform

## 🧪 Testing

### Manual Testing
Use the comprehensive test guide in `TEST_CASES.md` for manual testing.

### Database Testing
Visit `/api/test-db` to verify database connectivity.

### Quick Setup Guide
1. Ensure MongoDB is running
2. Set `MONGODB_URI` in `.env.local`
3. Test database connection: `http://localhost:3000/api/test-db`
4. Test API health: `http://localhost:3000/api/test`

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check `MONGODB_URI` environment variable
   - Ensure MongoDB is running
   - Test with `/api/test-db` endpoint

2. **NextAuth Session Errors**
   - Verify `NEXTAUTH_SECRET` is set
   - Check `NEXTAUTH_URL` matches your domain
   - Clear browser cookies and try again

3. **Google OAuth Not Working**
   - Verify Google credentials are set
   - Check authorized redirect URIs in Google Console
   - Ensure HTTPS in production

4. **Email Verification Issues**
   - Check console logs for verification codes
   - Verify database connection
   - Check user model validation

### Debug Mode
Enable debug mode by setting `NODE_ENV=development` to see detailed logs.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This is a development setup. For production, ensure proper security measures, HTTPS, and environment variable management.
