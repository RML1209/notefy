const CRON_URL =
  "http://localhost:3000/api/cron/reminders";

const CRON_SECRET =
  process.env.CRON_SECRET;

if (!CRON_SECRET) {
  console.error(
    "❌ CRON_SECRET is missing."
  );

  process.exit(1);
}

async function processReminders() {
  try {
    const response = await fetch(
      CRON_URL,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${CRON_SECRET}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "❌ Reminder request failed:",
        data
      );

      return;
    }

    console.log(
      `[${new Date().toLocaleTimeString()}]`,
      "Reminder check:",
      data
    );
  } catch (error) {
    console.error(
      "❌ Could not connect to Next.js:",
      error.message
    );
  }
}

/*
 * Check for reminders immediately.
 */
processReminders();

/*
 * Check every 10 seconds during development.
 */
setInterval(
  processReminders,
  10_000
);