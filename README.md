# Request Header Parser Microservice

## Overview
A simple lightweight microservice built with **Node.js** and **Express.js**, developed for the **Back End Development and APIs** certification of **freeCodeCamp**. It exposes a simple REST API that inspects incoming HTTP request headers and returns details about the user's IP address, preferred language, and browser software in a standardized JSON object.

## Tech Stack
- **Language:** JavaScript
- **Runtime:** Node.js
- **Framework:** Express.js
- **Middleware:** CORS
- **Package Manager:** npm
- **Version Control:** Git
- **Editor:** VS Code

## System Architecture
- **API Design:** RESTful API returning JSON responses
- **Routing:** Endpoint-based routing (`/api/whoami`) handled via Express
- **Header Parsing:** Uses Express `req.headers` and `req.socket` to extract client metadata (`x-forwarded-for`, `accept-language`, and `user-agent`)
- **Error Handling:** Safely handles missing header parameters to prevent server errors

## Folder Structure
```
header-parser-microservice/
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## API Endpoints

### 1. Parse Request Headers
**Endpoint:** `GET /api/whoami`

No parameters required. Returns client connection info parsed directly from the HTTP request headers.

**Example Request:** `/api/whoami`

**Response:**
```json
{
  "ipaddress": "159.20.14.100",
  "language": "en-US,en;q=0.9",
  "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}
```

## Error Handling
If any specific request header is missing or unavailable, the endpoint safely returns `undefined` or falls back to standard socket address values instead of crashing the server.

## How to Run Locally

1. **Clone the repository**
```bash
   git clone https://github.com/bhuvangolhar/header-parser-microservice.git
   cd header-parser-microservice
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the server**
```bash
   node index.js
```

4. **Access the service**
   Open your browser or a tool like Thunder Client and go to:
```
   http://localhost:3000/api/whoami
```