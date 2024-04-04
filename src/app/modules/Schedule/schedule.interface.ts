export interface ISchedule {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

export interface IFilterRequest {
  startDate?: string | undefined;
  endDate?: string | undefined;
}
