import cron from "node-cron";
import { MedicationSchedule } from "../models/medication_schedule.models.js";
import { IntakeLog } from "../models/intake_log.models.js";
import { User } from "../models/user.models.js";
import { sendFCM } from "../utils/sendFCM.utils.js";
import dayjs from "dayjs";

export const startMissedDoseCron = () => {
  // Run every hour
  cron.schedule("0 * * * *", async () => {
    console.log("🕐 Running missed dose detection...");

    const now = dayjs();
    const today = now.format("YYYY-MM-DD");

    try {
      // Get all today's schedules before now
      const allSchedules = await MedicationSchedule.find({
        start_date: { $lte: now.toDate() },
        end_date: { $gte: now.toDate() },
      });

      for (const med of allSchedules) {
        const medTime = dayjs(`${today} ${med.time}`);
        if (medTime.isAfter(now)) continue; // not yet due

        // Check if a log exists for this schedule for today
        const alreadyTaken = await IntakeLog.findOne({
          med_schedule_id: med._id,
          user_id: med.user_id,
          taken_at: {
            $gte: dayjs(today).startOf("day").toDate(),
            $lte: dayjs(today).endOf("day").toDate(),
          },
        });

        if (!alreadyTaken) {
          // Get user FCM token
          const user = await User.findById(med.user_id);
          if (!user?.fcmToken) continue;

          await sendFCM(
            user.fcmToken,
            "⚠️ Missed Medication",
            `You missed your dose of ${med.med_name}`,
            { type: "missed_alert", med_id: med._id }
          );

          console.log(`Sent missed alert to user ${user._id}`);
        }
      }
    } catch (err) {
      console.error("❌ Error in missed dose cron:", err);
    }
  });
};
