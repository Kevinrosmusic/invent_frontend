import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit {
  companyForm = new FormGroup({
    name:     new FormControl('', Validators.required),
    zipcodes: new FormControl('', Validators.required),
  });
  data: any = {};

  constructor(
    private activeRoute: ActivatedRoute,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.dashboardService.getCompanyById(id!).subscribe((res: any) => {
      this.data = res.company;
      this.companyForm.controls.name.setValue(this.data.id);
      this.companyForm.controls.zipcodes.setValue(JSON.parse(this.data.zipcodes));
    });
  }

  sendCompanyData(): void {
    if (this.companyForm.valid) {
      console.log(this.companyForm.value);
    }
  }
}
