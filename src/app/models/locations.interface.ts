export interface Department {
    department_id: number;
    name: string;
}
  
export interface DepartmentResponse {
    status: string;
    title?: string;
    msg: string;
    departments: Department[];
}

export interface City {
    city_id: number;
    name: string;
}
  
export interface CityResponse {
    status: string;
    title?: string;
    msg: string;
    cities: City[];
}