export function getCurrentDateTimeShort() {
    const currentDate = new Date();

    const formattedTime = `${currentDate.toLocaleString("en-US", {month: "short",})} ${currentDate.getDate()} ${currentDate.getFullYear()} ${currentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    })}`;

    return formattedTime;
}