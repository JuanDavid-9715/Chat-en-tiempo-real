import { useState, useEffect } from "react";

function dataChat() {
    const [chat, setChat] = useState();

    const receiveDateChat = (data) => {
        setChat(() => {
            if (data?.chat) {
                const messages = data?.chat.messages.map((message) => {
                    return {
                        tell: message.tell,
                        message: message.message,
                        createdAt: message.createdAt,
                    };
                });

                return {
                    chat: {
                        messages: messages,
                        tellUser: data.chat.tellUser,
                        tellContact: data.chat.tellContact,
                    },
                    message: data.message,
                    status: data.status,
                };
            } else {
                return {
                    message: data.message,
                    status: data.status,
                };
            }
        });
    };

    return { chat, receiveDateChat };
}

export default dataChat;
