import cron from "node-cron";
import { MedicationSchedule } from "../models/medication_schedule.models.js";
import { sendFCM } from "../utils/sendFCM.utils.js";
import { User } from "../models/user.models.js"; // Needed for FCM token
import dayjs from "dayjs";

// Run every 5 minutes
export const startMedicationReminderCron = () => {
  cron.schedule("*/5 * * * *", async () => {
    const now = dayjs();
    const currentTime = now.format("HH:mm"); // e.g., "08:05"

    console.log("🔔 Checking for scheduled meds at:", currentTime);

    try {
      const meds = await MedicationSchedule.find({
        time: currentTime,
        start_date: { $lte: now.toDate() },
        end_date: { $gte: now.toDate() },
      });

      for (const med of meds) {
        const user = await User.findById(med.user_id);
        if (!user?.fcmToken) continue;

        await sendFCM(
          user.fcmToken,
          "💊 Medication Reminder",
          `Time to take ${med.med_name} (${med.dosage})`,
          { type: "reminder", med_id: med._id }
        );

        console.log(`✅ Reminder sent to user ${user._id} for ${med.med_name}`);
      }
    } catch (err) {
      console.error("❌ Reminder cron error:", err.message);
    }
  });
};
