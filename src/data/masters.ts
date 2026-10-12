import type { Master } from "@/types/master";

export const masters: Master[] = [
  {
    id: "master-anna-petrova",
    name: "Анна Петрова",
    avatar: "АП",
    specialization: "Стрижки и укладки",
    workingHours: { daysOfWeek: [1, 2, 3, 4, 5, 6], start: "09:00", end: "19:00" },
    servicesIds: ["service-womens-haircut", "service-coloring", "service-styling"],
  },
  {
    id: "master-maria-kuznetsova",
    name: "Мария Кузнецова",
    avatar: "МК",
    specialization: "Маникюр",
    workingHours: { daysOfWeek: [1, 2, 3, 4, 5, 6], start: "09:00", end: "20:00" },
    servicesIds: ["service-classic-manicure", "service-gel-manicure"],
  },
  {
    id: "master-dmitry-sokolov",
    name: "Дмитрий Соколов",
    avatar: "ДС",
    specialization: "Барбер",
    workingHours: { daysOfWeek: [1, 2, 3, 4, 5, 6, 7], start: "10:00", end: "21:00" },
    servicesIds: ["service-barber-haircut", "service-beard"],
  },
  {
    id: "master-elena-volkova",
    name: "Елена Волкова",
    avatar: "ЕВ",
    specialization: "Брови и макияж",
    workingHours: { daysOfWeek: [2, 3, 4, 5, 6, 7], start: "10:00", end: "19:00" },
    servicesIds: ["service-brows", "service-makeup"],
  },
  {
    id: "master-olga-morozova",
    name: "Ольга Морозова",
    avatar: "ОМ",
    specialization: "Косметология",
    workingHours: { daysOfWeek: [1, 3, 4, 5, 6, 7], start: "10:00", end: "18:00" },
    servicesIds: ["service-facial"],
  },
];
