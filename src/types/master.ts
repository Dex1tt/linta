export interface WorkingHours {
  daysOfWeek: Array<1 | 2 | 3 | 4 | 5 | 6 | 7>;
  start: string;
  end: string;
}

export interface Master {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  workingHours: WorkingHours;
  servicesIds: string[];
}
