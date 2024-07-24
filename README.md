# Simplified Hotel Booking Chatbot

## Objective

Develop a RESTful API using Express.js that implements a chatbot capable of handling hotel booking queries. The chatbot utilizes OpenAI's API for natural language processing and maintains conversation history.

## Technical Requirements

- **Framework**: Express.js
- **NLP**: OpenAI's API
- **Database**: SQLite with Sequelize ORM
- **Functionality**: Fetch room data, simulate room booking

## Main Endpoint

- **POST /chat**: Handles user messages and returns chatbot responses

## Chatbot Flow

1. User initiates a conversation about booking a resort room.
2. Bot fetches room options from an API and responds with a list of room options.
3. User selects a room.
4. Bot provides pricing information.
5. User confirms they want to proceed with booking.
6. Bot makes a simulated API call to book the room and returns a booking confirmation with a booking ID.

## Skills Demonstrated

- Creating a RESTful API with Express.js
- Integrating and using OpenAI's API for natural language processing
- Maintaining conversation history throughout the chat session
- Implementing function calling to simulate external API interactions (room booking)

## Bonus Features

- Basic error handling for invalid user inputs or API failures
- Simple frontend interface for interacting with the chatbot (HTML, CSS, JavaScript/React)

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/harshpanchal04/Hotel-Booking-Bot.git
    cd Hotel-Booking-Bot
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up the database**:
    ```bash
    npx sequelize-cli db:migrate
    ```

4. **Set up environment variables**: Create a `.env` file in the root directory and add your OpenAI API key.
    ```
    OPENAI_API_KEY=your_openai_api_key
    ```

5. **Start the server**:
    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate to the frontend directory** (if applicable):
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the frontend server**:
    ```bash
    npm start
    ```

## API Endpoints

### List Hotel Room Options

Fetch the list of available rooms:
```bash
curl -X GET https://bot9assignement.deno.dev/rooms
