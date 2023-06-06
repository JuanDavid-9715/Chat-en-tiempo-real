function Chat({ contact, dataChat }) {
    const messages = dataChat?.chat.messages;

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mar",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Noc",
        "Dec",
    ];

    messages?.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    const listMessage = messages?.map((message, i) => {
        const date = new Date(message.createdAt);

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const dateAdjust = `${year}-${months[month]}-${day}/${hours}:${minutes}:${seconds}`;

        if (message.tell == sessionStorage.getItem("tell")) {
            return (
                <div key={i} className="chat__message chat__message--user">
                    <p className="message__date">{dateAdjust}</p>
                    <p className="message__message">{message.message}</p>
                </div>
            );
        } else {
            return (
                <div key={i} className="chat__message chat__message--contact">
                    <p className="message__message">{message.message}</p>
                    <p className="message__date">{dateAdjust}</p>
                </div>
            );
        }
    });

    return (
        <>
            {contact ? (
                <div className="chat__container">{listMessage}</div>
            ) : (
                <div className="chat__mensaje--standard">
                    <p className="chat__p">Start a new chat</p>
                </div>
            )}
        </>
    );
}

export default Chat;
