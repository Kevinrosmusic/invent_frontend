import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';

export interface ShipmentsData {
  id: string;
  name: string;
  zipcode: string;
  weight: string;
}

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
})
export class ShipmentsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'sender',
    'addressee',
    'zipcode',
    'weight',
    'address',
    'options',
  ];

  dataSource: ShipmentsData[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getShipments().subscribe((data: any) => {
      this.dataSource = data.shipments;
      console.log(this.dataSource);
    });
  }

  deleteShipment(id: any): void {
    Swal.fire({
      icon: 'question',
      iconColor: '#673ab7',
      title: 'Do you want to delete this shipment?',
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
        this.dashboardService.deleteShipment(id).subscribe((res) => {
          Swal.fire('Shipment deleted!', '', 'success').then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        });
      }
    });
  }
}
