import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductapiService } from '../productapi.service';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
})
export class PhotoDetailsComponent implements OnInit {
  photo: any;
  ApiDetails: any;
  receivedData: any;

  constructor(
    private route: ActivatedRoute,
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
    this.route.params.subscribe((params) => {
      this.apiService.getdata().subscribe((res) => {
        console.log('Responce for photo', res);
        this.ApiDetails = res;
        console.log('dataaaa', this.ApiDetails[0].title);
        const photoId = params['photoId'];
        const phototTitle = this.ApiDetails[0].title;

        this.photo = {
          albumId: 1,
          id: photoId,
          title: this.getPhotoUrlByTitle(photoId - 1),
          url: this.getPhotoUrlByIndex(photoId - 1),
        };
      });
    });
  }
  getPhotoUrlByIndex(index: number): string {
    if (index >= 0 && index < this.ApiDetails.length) {
      return this.ApiDetails[index].url;
    }
    return '';
  }
  getPhotoUrlByTitle(index: number): string {
    if (index >= 0 && index < this.ApiDetails.length) {
      return this.ApiDetails[index].title;
    }
    return '';
  }
}
