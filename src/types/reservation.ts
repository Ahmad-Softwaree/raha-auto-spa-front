import { Id } from "./global";

export type Reservation = {
  id: number;
  customer_id: number;
  customer_name: string;
  color_id: number;
  color_name: string;
  service_id: number;
  service_name: string;
  car_model_id: number;
  car_model_name: string;
  car_type_id: number;
  car_type_name: string;
  note: string | null;
  created_by: string;
  updated_by: string;
  price: number;
  date_time: Date | string;
  car_number: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted?: boolean;
  completed: boolean;
};

export type PanelReservation = {
  date_time: Date | string;
  customer_name: string;
  total_reservations: number;
  completed_reservations: number;
  not_completed_reservations: number;
  id: Id;
};

export type ReservationCardProps = Reservation & { index?: number };
export type AddReservationInputs = {
  color_id?: Id;
  car_type_id?: Id;
  service_id: Id;
  car_number: string;
  car_model_id?: Id;
  customer_id: Id;
  date_time: Date | string;
  time: Date | string;
  price: number;
  note: string;
};

export type AddReservationF = AddReservationInputs;
export type AddReservationWithFirebaseImage = AddReservationInputs;
export type UpdateReservationF = AddReservationInputs;
export type UpdateReservationWithFirebaseImage = AddReservationInputs;

export type GetReservationsQ = Reservation[];
export type AddReservationQ = Reservation;
export type DeleteReservationQ = Id[];

export type UpdateReservationQ = Reservation;
