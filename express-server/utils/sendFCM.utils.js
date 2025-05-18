import fetch from "node-fetch";

export const sendFCM = async (fcmToken, title, body, data = {}) => {
  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + process.env.FCM_SERVER_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: fcmToken,
        notification: {
          title,
          body,
        },
        data,
        priority: "high",
      }),
    });

    const result = await response.json();
    console.log("FCM response:", result);
    return result;
  } catch (error) {
    console.error("Error sending FCM:", error.message);
    throw error;
  }
};
