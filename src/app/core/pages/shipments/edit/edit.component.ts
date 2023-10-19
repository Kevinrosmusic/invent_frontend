import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  shipForm!: FormGroup;
  data: any = {};
  companies: any[] = [];
  id: any = '';
  constructor(
    private activeRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.shipForm = this.formBuilder.group({
      id:         new FormControl('', Validators.required),
      addressee:  new FormControl('', Validators.required),
      address:    new FormControl('', Validators.required),
      sender:     new FormControl('', Validators.required),
      weight:     new FormControl('', Validators.required),
      price:      new FormControl({ value: null, disabled: true }, Validators.required),
      company:    new FormControl({ value: null, disabled: true }, Validators.required),
      package:    new FormControl({ value: null, disabled: true }, Validators.required),
      zipcode:    new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
        Validators.pattern(/^([0-9])*$/)
      ]),
    })

    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.shipForm.controls['id'].setValue(this.id);
    this.dashboardService.getCompanies().subscribe((data: any) => {
      this.companies = data.companies;
      console.log('companies: ', this.companies);
    });
    this.dashboardService.getShipmentById(this.id!).subscribe((shipment: any) => {
      console.log('shipment: ', shipment);
      this.data = shipment.shipment;
      this.shipForm.controls['addressee'].setValue(this.data.addressee);
      this.shipForm.controls['sender'].setValue(this.data.sender);
      this.shipForm.controls['weight'].setValue(this.data.weight);
      this.shipForm.controls['price'].setValue(this.data.price);
      this.shipForm.controls['address'].setValue(this.data.address);
      this.shipForm.controls['zipcode'].setValue(this.data.zipcode);
      this.shipForm.controls['company'].setValue(this.selectCompany(this.data.zipcode));
      this.shipForm.controls['package'].setValue(this.data.package);
    });
  }

  changeZipCode(): void {
    if (this.shipForm.value.zipcode.length > 0) {
      if (this.companies[0].zipcodes.includes(this.shipForm.value.zipcode)) {
        this.shipForm.controls['company'].setValue('Mails');
      } else if (this.companies[1].zipcodes.includes(this.shipForm.value.zipcode)) {
        this.shipForm.controls['company'].setValue('Seur');
      } else {
        this.shipForm.controls['company'].setValue('Invent');
      }
    } else {
      this.shipForm.controls['company'].setValue('');
    }
  }

  selectCompany(zipcode: any): any {
    if (zipcode.length > 0) {
      if (this.companies[0].zipcodes.includes(zipcode)) {
        return 'Correos';
      } else if (this.companies[1].zipcodes.includes(this.shipForm.value.zipcode)) {
        return 'Seur';
      } else {
        return 'Invent';
      }
    } else {
      return '';
    }
  }

  changePrice(): void {
    let weigth = this.shipForm.value?.weight;
    let price = 0;
    let pack = '';
    if (weigth > 0 && weigth <= 0.1) {
      price = weigth * 5;
      pack = 'Ultra light package';
    } else if (weigth > 0.1 && weigth <= 0.3) {
      price = (weigth * 5) + 1;
      pack = 'Light Package';
    }  else if (weigth > 0.3 && weigth <= 5) {
      price = weigth * 10;
      pack = 'Standard package';
    }  else if (weigth > 5 && weigth <= 10) {
      price = (weigth * 5) + (weigth + 75);
      pack = 'Heavy package';
    }  else if (weigth > 10 && weigth <= Infinity) {
      price = (weigth - 10) * (7.5 + 130 + weigth);
      pack = 'Large volume';
    }
  
    if (this.shipForm.value.weight?.length === 0) {
      this.shipForm.controls['price'].setValue('');
      this.shipForm.controls['package'].setValue('');
    } else {
      this.shipForm.controls['price'].setValue(price);
      this.shipForm.controls['package'].setValue(pack);
    }
  }

  sendShipmentData(): void {
    this.shipForm.controls['package'].enable();
    this.shipForm.controls['company'].enable();
    this.shipForm.controls['price'].enable();
    console.log(this.shipForm.value);
    this.dashboardService.updateShipment(this.shipForm.value).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Shipment has been updated',
          confirmButtonColor: '#673ab7',
          confirmButtonText: 'Great!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['']);
          }
        });
        },
        (err) => {
          console.log('¡ERROR!', err.error.error);
          Swal.fire({
            icon: 'error',
            iconColor: '#db0007',
            title: 'An error occurred during shipment edition!',
            confirmButtonColor: '#db0007',
            confirmButtonText: 'Aceptar'
          });
        }
    );
  }
}
