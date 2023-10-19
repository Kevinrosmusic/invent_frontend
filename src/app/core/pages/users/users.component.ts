import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

export interface UsersData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: UsersData[] = [];

  constructor(private dashboardService: DashboardService ) {}

  ngOnInit(): void {
    this.dashboardService.getUsers().subscribe((data: any) => {
      console.log('Users: ', data.users);
      this.dataSource = data.users;
    })
  }
}
