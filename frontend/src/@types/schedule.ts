interface ScheduleType {
  id: number;
  categoryId: number;
  title: string;
  startDateTime: string;
  endDateTime: string;
  memo: string;
  colorCode: string;
}

interface ScheduleResponseType {
  longTerms: Array<ScheduleType>;
  allDays: Array<ScheduleType>;
  fewHours: Array<ScheduleType>;
}

export { ScheduleResponseType, ScheduleType };
