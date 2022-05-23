import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Employee } from './employee';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<any> {
    return this.http.get(environment.baseUrl + '/employee/getAll');
  }
  getEmployeedetails(): Observable<any> {
    return this.http.get(environment.baseUrl + '/employee/employeedetails');
  }

  saveEmployee(employee: Employee): Observable<any> {
    return this.http.post(environment.baseUrl + '/employee/save', employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(environment.baseUrl + `/employee/update/${employee.id}`, employee);
  }

  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(environment.baseUrl + `/employee/deleteEmployee/${id}`);
  }
}
