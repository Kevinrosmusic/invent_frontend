import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  form!: FormGroup;
  companies: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      addressee: ['', Validators.required],
      sender: ['', Validators.required],
      weight: ['', Validators.required],
      price:  [{ value: null, disabled: true }, Validators.required],
      address: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.minLength(4)]],
      company: [{ value: null, disabled: true }, Validators.required],
      package: [{ value: null, disabled: true }, Validators.required],
    });

    this.dashboardService.getCompanies().subscribe((data: any) => {
      this.companies = data.companies;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enviarFormulario(): void {
    this.form.controls['package'].enable();
    this.form.controls['company'].enable();
    this.form.controls['price'].enable();
    this.dashboardService.createShipment(this.form.value).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'The shipment has been generated successfully!',
          confirmButtonColor: '#e94e1b',
          confirmButtonText: '¡Genial!'
        })
        },
        (err) => {
          console.log('¡ERROR!', err);
          Swal.fire({
            icon: 'error',
            iconColor: '#db0007',
            title: 'An error occurred during shipment creation!',
            confirmButtonColor: '#db0007',
            confirmButtonText: 'Aceptar'
          });
        }
    );
  }

  changeZipCode(): void {
    if (this.form.value.zipcode?.length > 0) {
      if (this.companies[0].zipcodes.includes(this.form.value.zipcode)) {
        this.form.controls['company'].setValue('Mails');
      } else if (this.companies[1].zipcodes.includes(this.form.value.zipcode)) {
        this.form.controls['company'].setValue('Seur');
      } else {
        this.form.controls['company'].setValue('Invent');
      }
    } else {
      this.form.controls['company'].setValue('');
    }
  }

  changePrice(): void {
    let weigth = this.form.value?.weight;
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
  
    if (this.form.value.weight?.length === 0) {
      this.form.controls['price'].setValue('');
      this.form.controls['package'].setValue('');
    } else {
      this.form.controls['price'].setValue(price);
      this.form.controls['package'].setValue(pack);
    }
  }
}
