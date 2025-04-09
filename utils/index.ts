import { OpeningHours } from "@/types";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

type DayOfWeek = (typeof DAYS)[number];

interface FormattedWorkingHours {
  day: DayOfWeek;
  hours: string;
  isToday: boolean;
  isCurrentlyOpen: boolean;
}

const isCurrentlyOpen = (timeRange: string): boolean => {
  if (!timeRange) return false;

  const [start, end] = timeRange.split(",");
  const currentHour = dayjs();
  const startTime = dayjs(start, "HH:mm");
  const endTime = dayjs(end, "HH:mm");

  // Şu anki saat, başlangıç ve bitiş saatleri arasında mı?
  return currentHour.isAfter(startTime) && currentHour.isBefore(endTime);
};

const workingHours = (hours: OpeningHours): FormattedWorkingHours[] => {
  const today = dayjs().format("dddd").toLowerCase() as DayOfWeek;

  return DAYS.map((day) => {
    const dayHours = hours[day as keyof OpeningHours];
    const isToday = day === today;

    return {
      day,
      hours: dayHours ? `${dayHours.split(",").join(" - ")}` : "closed",
      isToday,
      isCurrentlyOpen: isToday && dayHours ? isCurrentlyOpen(dayHours) : false,
    };
  });
};

export { workingHours };
