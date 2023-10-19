import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {
  createCompanyForm = new FormGroup({
    name:     new FormControl('', Validators.required),
    zipcodes: new FormControl('', Validators.required),
  });
  data: any = {};

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  sendCompanyData(): void {
    console.log(this.createCompanyForm.value);
    this.dashboardService.createCompany(this.createCompanyForm.value).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Company created!',
          confirmButtonColor: '#673ab7',
          confirmButtonText: '¡Genial!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/dashboard/companies']);
          }
        });
        },
        (err) => {
          console.log('ERROR!', err);
          Swal.fire({
            icon: 'error',
            iconColor: '#db0007',
            title: 'Ops! Something happended during company creation',
            confirmButtonColor: '#db0007',
            confirmButtonText: 'Accept'
          });
        }
    );
  }
}
