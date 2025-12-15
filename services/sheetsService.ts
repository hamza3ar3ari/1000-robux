/**
 * SERVICE INSTRUCTION:
 * To make this work with your Google Sheet:
 * 1. Create a Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Paste a script to handle POST requests (doGet/doPost) that appends a row.
 * 4. Deploy as Web App (Execute as: Me, Who has access: Anyone).
 * 5. Paste the 'Current web app URL' below in `GOOGLE_SCRIPT_URL`.
 */

// REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"; 

export const saveUserToSheet = async (username: string): Promise<void> => {
  console.log(`Attempting to save user: ${username}`);

  if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE") {
    console.warn("Google Sheet URL not configured. Data will not be saved.");
    return;
  }

  try {
    // We use no-cors mode because Google Scripts doesn't return standard CORS headers
    // The data is still sent, but we can't read the response.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, date: new Date().toISOString() }),
    });
    console.log("Request sent to Google Sheet");
  } catch (error) {
    console.error("Error saving to Google Sheet:", error);
  }
};
