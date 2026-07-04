# StreamVault

StreamVault is a robust, production-ready backend API for a video-sharing and streaming platform similar to YouTube. Built using the Node.js, Express, and MongoDB ecosystem, it implements industry-standard practices, including secure JWT authentication, relational model schemas, aggregate pagination, and cloud-based file management via Multer and Cloudinary.


---

## 🚀 Features

### 👤 User Authentication & Management
* **Registration & Login:** Secure registration with file upload support (Avatar and Cover Image).
* **Token-based Authentication:** Employs JSON Web Tokens (JWT) for secure authentication via access and refresh tokens.
* **HttpOnly Cookies:** Session tokens are delivered securely through client-side cookie storage.
* **Profile Management:** Update user credentials, email, password, and upload new media files (Avatar/Cover Image).
* **Channel Profile:** Fetch public channel details, including subscriber counts and subscribed channels.
* **Watch History:** Tracks and returns user-specific watch histories.

### 🎥 Video Management
* **Video Publishing:** Upload video files and thumbnails directly to Cloudinary via local Multer temp storage.
* **Video Control:** Retrieve video details by ID, update titles/descriptions/thumbnails, toggle publish status, and delete videos.
* **Pagination & Querying:** Supports advanced retrieval of videos based on query strings, sorting parameters, and page limits.

### 💬 Comment System
* **Add Comments:** Post comments directly to published videos.
* **Manage Comments:** Support for updating and deleting user comments with strict authorization verification.
* **List Comments:** Fetch all comments associated with a video with page-by-page loading capabilities.

### 📊 Planned Core Features (Skeleton Modules)
* **Likes:** Toggle like status on videos, comments, and tweets.
* **Playlists:** Create, update, delete, and add/remove videos from user-curated playlists.
* **Subscriptions:** Subscribe/unsubscribe to channels and retrieve subscriber lists.
* **Tweets:** Post, read, edit, and delete short text updates (tweets).
* **Dashboard:** Admin console to view user upload history and channel statistics.

---

## 🛠️ Technology Stack

* **Runtime Environment:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/) (Version 5)
* **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
* **Media Cloud Service:** [Cloudinary](https://cloudinary.com/)
* **Local File Handling:** [Multer](https://github.com/expressjs/multer)
* **Encryption & Hashing:** [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
* **Web Tokens:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* **Dev Utility:** [Nodemon](https://nodemon.io/)
* **Code Formatting:** [Prettier](https://prettier.io/)

---

## 📂 Project Structure

```text
StreamVault/
├── public/                 # Local directory for temporary file processing
│   └── temp/               # Files uploaded via Multer before sending to Cloudinary
├── src/
│   ├── db/
│   │   └── index.js        # MongoDB connection setup
│   ├── controllers/        # Route handlers executing business logic
│   │   ├── comment.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── healthcheck.controller.js
│   │   ├── like.controller.js
│   │   ├── playlist.controller.js
│   │   ├── subscription.controller.js
│   │   ├── tweet.controller.js
│   │   ├── user.controller.js
│   │   └── video.controller.js
│   ├── models/             # Mongoose schemas & middleware hooks
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── playlist.model.js
│   │   ├── subscription.model.js
│   │   ├── tweet.model.js
│   │   ├── user.model.js
│   │   └── video.model.js
│   ├── routes/             # Route declarations linking URLs to controllers
│   │   ├── comment.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── healthcheck.routes.js
│   │   ├── like.routes.js
│   │   ├── playlist.routes.js
│   │   ├── subscription.routes.js
│   │   ├── tweet.routes.js
│   │   ├── user.routes.js
│   │   └── video.routes.js
│   ├── middlewares/        # Express middleware functions
│   │   ├── auth.middleware.js     # JWT access verification
│   │   └── multer.middleware.js   # Local file saving strategy
│   ├── utils/              # Helper utilities & custom handlers
│   │   ├── ApiError.js     # Standarized API error structure
│   │   ├── ApiResponse.js  # Standardized API response structure
│   │   ├── asyncHandler.js # Error-catching wrapper for async requests
│   │   └── cloudinary.js   # Cloudinary upload/delete utility helpers
│   ├── app.js              # Express app configuration & base routes setup
│   ├── constants.js        # Core configuration constants (e.g., DB_NAME)
│   └── index.js            # Entry point for DB connection & listening
├── .env                    # System environment variables (gitignored)
├── package.json            # Scripts & project dependencies config
└── Readme.md               # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended) and a running instance of [MongoDB](https://www.mongodb.com/) (local or MongoDB Atlas cloud cluster).

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/coderRohit620/StreamVault.git
   cd StreamVault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and define the following variables:
   ```env
   PORT=8000
   MONGODB_URL=your_mongodb_connection_string
   CORS_ORIGIN=*

   ACCESS_TOKEN_SECRET=your_access_token_secret_key
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
   REFRESH_TOKEN_EXPIRY=10d

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Run the Server:**
   * **For Development (using Nodemon):**
     ```bash
     npm run dev
     ```
   * **For Production (using standard node):**
     ```bash
     node src/index.js
     ```

---

## 📡 API Reference

All requests default to the prefix `/api/v1`.

### 1. Authentication & Users (`/users`)
| Method | Endpoint | Description | Headers / Auth | Payload / Params |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | Register a new user | `multipart/form-data` | `fullName`, `email`, `username`, `password`, `avatar` (file), `coverImage` (file) |
| **POST** | `/login` | Log in a user | None | `email` or `username`, `password` |
| **POST** | `/logout` | Log out user and clear refresh token | Access Token (JWT) | None |
| **POST** | `/refresh-token` | Renew the access token | Refresh Token | Cookie with refresh token |
| **POST** | `/change-password` | Update user password | Access Token (JWT) | `oldPassword`, `newPassword` |
| **GET** | `/current-user` | Retrieve details of current logged-in user | Access Token (JWT) | None |
| **PATCH** | `/update-account` | Update full name and email address | Access Token (JWT) | `fullName`, `email` |
| **PATCH** | `/avatar` | Update avatar image | Access Token (JWT) + Multer | `avatar` (file) |
| **PATCH** | `/cover-image` | Update cover image | Access Token (JWT) + Multer | `coverImage` (file) |
| **GET** | `/c/:username` | Retrieve channel profile data | Access Token (JWT) | `username` (params) |
| **GET** | `/watchHistory` | Retrieve watch history | Access Token (JWT) | None |

### 2. Video API (`/videos`)
| Method | Endpoint | Description | Headers / Auth | Payload / Params |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Retrieve list of all videos (paginated, sorted, filtered) | Access Token (JWT) | Query params: `page`, `limit`, `query`, `sortBy`, `sortType`, `userId` |
| **POST** | `/` | Publish a video file | Access Token (JWT) | `title`, `description`, `videoFile` (file), `thumbnail` (file) |
| **GET** | `/:videoId` | Get single video info by ID | Access Token (JWT) | `videoId` (params) |
| **PATCH** | `/:videoId` | Update video title, description, or thumbnail | Access Token (JWT) | `videoId` (params), `title`, `description`, `thumbnail` (file) |
| **DELETE** | `/:videoId` | Delete a video from DB and cloud hosting | Access Token (JWT) | `videoId` (params) |
| **PATCH** | `/toggle/publish/:videoId` | Toggle video publishing state (public/private) | Access Token (JWT) | `videoId` (params) |

### 3. Comment API (`/comments`)
| Method | Endpoint | Description | Headers / Auth | Payload / Params |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/video/:videoId` | Get comments of a video | None | `videoId` (params), Query: `page`, `limit` |
| **POST** | `/` | Add comment to a video | Access Token (JWT) | `videoId` (body), `content` |
| **PATCH** | `/:commentId` | Update a comment's content | Access Token (JWT) | `commentId` (params), `content` |
| **DELETE** | `/:commentId` | Delete a comment | Access Token (JWT) | `commentId` (params) |

---

## 📝 License
Distributed under the ISC License. See `package.json` for details.
