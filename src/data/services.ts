import type { Service } from "@/types/service";

export const services: Service[] = [
  { id: "service-womens-haircut", name: "Женская стрижка", duration: 60, price: 2500 },
  { id: "service-coloring", name: "Окрашивание", duration: 150, price: 4500 },
  { id: "service-styling", name: "Укладка", duration: 60, price: 2000 },
  { id: "service-classic-manicure", name: "Классический маникюр", duration: 75, price: 1800 },
  { id: "service-gel-manicure", name: "Маникюр с покрытием", duration: 105, price: 2500 },
  { id: "service-barber-haircut", name: "Мужская стрижка", duration: 60, price: 2200 },
  { id: "service-beard", name: "Моделирование бороды", duration: 30, price: 1200 },
  { id: "service-brows", name: "Коррекция и окрашивание бровей", duration: 45, price: 1500 },
  { id: "service-makeup", name: "Вечерний макияж", duration: 75, price: 3000 },
  { id: "service-facial", name: "Уход для лица", duration: 90, price: 3500 },
];
