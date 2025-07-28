Kar-Post: AI-Powered LinkedIn Content Automation
Kar-Post is a robust, full-stack application designed to automate and streamline content creation and scheduling on LinkedIn. This production-grade backend is built with Node.js and Express.js, featuring secure user authentication, a complete OAuth 2.0 integration with the LinkedIn API, and a powerful AI content generator powered by Google's Gemini API via LangChain.js.

✨ Core Features
Secure User Authentication: Full user registration and login system with JWT for session management and password hashing with bcrypt.

Safe LinkedIn Integration: Secure OAuth 2.0 flow to connect user accounts, obtain access tokens, and get permissions to post.

AI Content Generation: An intelligent service that takes a simple topic and generates a high-quality, engaging LinkedIn post using the Google Gemini API and LangChain.js.

Automated Post Scheduling: A background cron job runs every minute to automatically publish posts that have been scheduled for a future date and time.

Direct Instant Posting: Instantly publish user-provided or AI-generated content to a connected LinkedIn account.

Segregated & Scalable Architecture: A clean, modular structure that separates concerns (controllers, services, routes, models) for easy maintenance and future scalability.

🛠️ Tech Stack
Backend: Node.js, Express.js

Database: MongoDB with Mongoose

AI Framework: LangChain.js

AI Model: Google Gemini API

Authentication: JWT (JSON Web Tokens), bcryptjs

API & Networking: Axios, RESTful API design

Automation: node-cron

Utilities: cors, cookie-parser, dotenv

🚀 Getting Started
Follow these instructions to get a local copy of the project up and running for development and testing purposes.

Prerequisites
Node.js (v18.x or higher)

MongoDB (A local instance or a free cluster on MongoDB Atlas)

A LinkedIn Developer Account with an app created.

A Google AI Studio Account to get a Gemini API key.

Installation & Setup
Clone the repository:

git clone https://github.com/inum9/Kar-Post.git
cd Kar-Post

Install dependencies:

npm install

Set up Environment Variables:
Create a .env file in the root of the project and add the following variables with your own credentials.

# --- Server & Database ---
PORT=8000
MONGO_URI="your_mongodb_connection_string"

# --- JWT Secrets ---
ACCESS_TOKEN_SECRET="your_strong_access_token_secret"
ACCESS_TOKEN_EXPIRY="1d"
REFRESH_TOKEN_SECRET="your_strong_refresh_token_secret"
REFRESH_TOKEN_EXPIRY="10d"

# --- LinkedIn API Credentials ---
LINKEDIN_CLIENT_ID="your_linkedin_client_id"
LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret"

# --- Google Gemini API Key ---
GOOGLE_API_KEY="your_google_ai_studio_api_key"

Run the application:

npm run dev

The server should now be running on http://localhost:8000.



🏗️ Project Structure
The project follows a modular, scalable structure designed for maintainability.

Kar-Post/
├── src/
│   ├── controllers/    # Handles request/response logic
│   ├── services/       # Houses business logic (e.g., AI service)
│   ├── routes/         # Defines API endpoints
│   ├── models/         # Mongoose database schemas
│   ├── middlewares/    # Custom middlewares (e.g., auth)
│   ├── jobs/           # Background jobs (e.g., cron scheduler)
│   ├── utils/          # Utility classes (ApiError, ApiResponse)
│   ├── config/         # Database configuration
│   └── app.js          # Express app configuration
├── .env                # Environment variables
├── index.js            # Application entry point
└── package.json

🔮 Future Scope
Frontend Integration: Build a complete React/Vue frontend to create a full MERN-stack application.

Support for Other Platforms: Integrate APIs for other social media platforms like X (Twitter).

Post Analytics: Track engagement metrics (likes, comments) for published posts.

Advanced AI Features: Allow users to specify tone, style, and length for generated content.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License
This project is licensed under the MIT License.

✍️ Author
Chetan - inum9
