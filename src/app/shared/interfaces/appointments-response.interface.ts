export interface AppointmentsResponse {
    appointments: AppointmentElement[];
}

export interface AppointmentElement {
    appointment: AppointmentAppointment;
    services:    Service[];
}

export interface AppointmentAppointment {
    id:      string;
    date:    Date;
    time:    string;
    user_fk: UserFk;
}

export interface UserFk {
    id:          string;
    first_name:  string;
    last_name:   string;
    email:       string;
    password:    string;
    phone:       string;
    isAdmin:     boolean;
    isConfirmed: boolean;
    token:       string;
}

export interface Service {
    id:    string;
    name:  string;
    price: string;
}
