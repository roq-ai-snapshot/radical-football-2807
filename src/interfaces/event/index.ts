import { AcademyInterface } from 'interfaces/academy';

export interface EventInterface {
  id?: string;
  name: string;
  description?: string;
  location?: string;
  start_time: Date;
  end_time: Date;
  academy_id: string;
  created_at?: Date;
  updated_at?: Date;

  academy?: AcademyInterface;
  _count?: {};
}
