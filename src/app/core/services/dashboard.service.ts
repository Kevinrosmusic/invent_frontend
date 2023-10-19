import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl: string = environment.api;

  constructor(private http: HttpClient) {}

  getCompanies() {
    return this.http.get(`${this.baseUrl}/companies/get`);
  }

  getShipments() {
    return this.http.get(`${this.baseUrl}/shipments/get`);
  }

  getCompanyById(id: string) {
    return this.http.get(`${this.baseUrl}/companies/get/${id}`);
  }

  getShipmentById(id: string) {
    return this.http.get(`${this.baseUrl}/shipments/get/${id}`);
  }

  deleteShipment(id: string) {
    return this.http.delete(`${this.baseUrl}/shipments/delete/${id}`);
  }

  deleteCompany(id: string) {
    return this.http.delete(`${this.baseUrl}/companies/delete/${id}`);
  }

  createCompany(body: any) {
    return this.http.post(`${this.baseUrl}/companies/create`, body);
  }

  createShipment(body: any) {
    return this.http.post(`${this.baseUrl}/shipments/create`, body);
  }

  updateShipment(body: any) {
    return this.http.put(`${this.baseUrl}/shipments/update`, body);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users/get`);
  }
}
