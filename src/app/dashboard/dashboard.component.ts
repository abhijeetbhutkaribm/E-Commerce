import { Component } from '@angular/core';
import { ProductapiService } from '../productapi.service';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  products: any;
  receivedData: any;
  isloading: boolean = true;
  filteredProducts: any[] = [];
  searchTerm: string = '';
  headerSearch: any;
  masterData:any
  notFound:boolean=false;

  constructor(
    private apiService: ProductapiService,
    private dataSharingService: DataSharingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dataSharingService.getData().subscribe((data) => {
      console.log('Subject Data', data);
      this.receivedData = data;
      if(!this.receivedData.authenticationFlag){
        this.router.navigate(['/login']);
      }
    });
    this.apiService.getdata().subscribe((res) => {
      this.products = res;
      this.masterData=this.products;
      this.isloading=false;
    });
  }

  public searchText(event: any) {
    if(event.length>0){
      this.notFound=false;
      this.products = event;
    }else{
     this.notFound=true;
    }
  }
}
