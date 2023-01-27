import { useState, useEffect } from "react";

import socket from "../services/Socket";

function dataUser() {
    const [user, setUser] = useState({
        user: {
            id: "",
            name: "",
            tell: "",
            urlImages: "",
            line: "",
        },
        status: "",
        message: "",
    });

    const ReceiveDate = () => {
        socket.on("user", (data) => {
            setUser(() => {
                if (data.user != "") {
                    return {
                        user: {
                            id: data.user._id,
                            name: data.user.name,
                            tell: data.user.tell,
                            urlImages: data.user.urlImages,
                            line: data.user.line,
                        },
                        status: data.response.status,
                        message: data.response.message,
                    };
                } else {
                    return {
                        status: data.response.status,
                        message: data.response.message,
                    };
                }
            });
        });
    };

    return { user, ReceiveDate };
}

export default dataUser;
