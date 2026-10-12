export interface Client {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  tags: string[];
  notes: string;
  visitsCount: number;
  totalSpent: number;
  favoriteService: string | null;
  favoriteMaster: string | null;
}
