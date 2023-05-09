import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductapiService } from '../productapi.service';
import { Observable, fromEvent, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() data: string;
  @Output() searchText: EventEmitter<any> = new EventEmitter<any>();
  userName: any;
  filteredProducts: any[] = [];
  products: any;
  headerSearch: any;
  masterProduct: any;
  valueTosearch: string = '';

  constructor(private apiService: ProductapiService) {}

  ngOnInit(): void {
    this.userName = this.data?.['email'];
    console.log('Parent data', this.data?.['email']);

    this.apiService.getdata().subscribe((res) => {
      console.log('Responce', res);
      this.masterProduct = res;
    });
    this.filteredProducts = this.masterProduct;
    fromEvent(document.getElementById('searchInput'), 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchText: string) => {
        this.valueTosearch = searchText;
        this.searchProducts();
      });
  }
  searchProducts() {
    if (!this.valueTosearch) {
      return;
    }
    this.products = this.masterProduct.filter((product) =>
      product.title.toLowerCase().includes(this.valueTosearch.toLowerCase())
    );
    console.log('hellosearch from header', this.products);
  }
  public search(event: any): void {
    this.searchText.emit(this.products);
    console.log('Emmited value', this.products);
  }
}

