import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";

// Create Schedule
const createSchedule = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalTime = 30;

  const schedules = [];

  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);

  // Create schedule for every day (Start to End)
  while (startingDate <= endingDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(startingDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(startingDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    // Create schedules for that particular day
    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, intervalTime),
      };

      // Check if the schedule already exist for that day
      const isScheduleExist = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!isScheduleExist) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }

    startingDate.setDate(startingDate.getDate() + 1);
  }

  return schedules;
};

export const scheduleServices = {
  createSchedule,
};
