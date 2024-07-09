const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../config');
const axios = require("axios");
const openai = new OpenAI({ apiKey: "APIKEY" });

async function getRoomOptions() {
    const roomResponse = await axios.get('https://bot9assignement.deno.dev/rooms');
    return roomResponse.data;
}

async function bookRoom(roomId, fullName, email, nights) {
    const bookingResponse = await axios.post('https://bot9assignement.deno.dev/book', {
        roomId, fullName, email, nights
    });
    return bookingResponse.data;
}

const getChatResponse = async (message, messages) => {
    console.log("Received message:", message);
    try {
        let userMessage = { role: "user", content: message };
        messages.push(userMessage);
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            tools: [
                { type: "function", function: { name: "getRoomOptions", description: "Fetch available hotel rooms" } },
                {
                    type: "function", function: {
                        name: "bookRoom", description: "Book a hotel room", parameters: {
                            type: "object", properties: {
                                roomId: { type: "integer", description: "The ID of the room to book" },
                                fullName: { type: "string", description: "Full name of the person booking the room" },
                                email: { type: "string", description: "Email address of the person booking the room" },
                                nights: { type: "integer", description: "Number of nights for the booking" }
                            }, required: ["roomId", "fullName", "email", "nights"]
                        }
                    }
                }
            ],
            tool_choice: "auto"
        });

        const responseMessage = response.choices[0].message;
        messages.push(responseMessage); // extend conversation with assistant's reply

        if (responseMessage.tool_calls) {
            const availableFunctions = { getRoomOptions, bookRoom };

            for (const toolCall of responseMessage.tool_calls) {
                const functionName = toolCall.function.name;
                const functionToCall = availableFunctions[functionName];
                const functionArgs = toolCall.function.arguments ? JSON.parse(toolCall.function.arguments) : {};
                const functionResponse = await functionToCall(functionArgs.roomId, functionArgs.fullName, functionArgs.email, functionArgs.nights);

                messages.push({
                    tool_call_id: toolCall.id,
                    role: "tool",
                    name: functionName,
                    content: JSON.stringify(functionResponse),
                }); // extend conversation with function response
            }
            
            const followUpResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });
            return followUpResponse.choices[0].message.content;
        } else {
            return responseMessage.content;
        }
    } catch (error) {
        console.error('Error while getting chat response:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get chat response');
    }
};

module.exports = { getChatResponse };
