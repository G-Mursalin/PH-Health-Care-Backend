export interface IDoctorScheduleFilterRequest {
  searchTerm?: string | undefined;
  isBooked?: boolean | undefined;
  startDateTime: string | undefined;
  endDateTime: string | undefined;
}
