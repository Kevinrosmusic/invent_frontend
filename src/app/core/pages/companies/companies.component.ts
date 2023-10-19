import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';

export interface CompaniesData {
  id: string;
  name: string;
  zipcodes: string;
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'zipcodes', 'options'];

  dataSource: CompaniesData[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getCompanies().subscribe((data: any) => {
      this.dataSource = data.companies;
      console.log(this.dataSource);
    });
  }

  deleteCompany(id: any): void {
    Swal.fire({
      icon: 'question',
      iconColor: '#673ab7',
      title: 'Do you want to delete the company?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#673ab7',
      confirmButtonText: 'Si',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.dashboardService.deleteCompany(id).subscribe((res) => {
          Swal.fire('Company deleted!', '', 'success').then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        });
      }
    });
  }
}
