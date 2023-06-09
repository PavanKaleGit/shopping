import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/Model/address';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  private addressForm: any;
  model: Address = {
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    phonenumber: ''

  };
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
    this.api.getAddress().subscribe(res => {
      if (res.map != null) {
        this.model = res.map;
      }
    }, err => {
      console.log(err);
    });
  }

  addOrUpdateAddress() {
    console.log(this.addressForm.value);
    this.api.addOrUpdateAddress(this.addressForm.value).subscribe(res => {
      alert('Address updated!!');
      console.log(res);
      this.route.navigate(['/home']);
    });
  
    this.api.addOrUpdateAddress(this.model).subscribe(res => {
      alert('Address updated!!');
      console.log(res);
      this.route.navigate(['/home']);
    });
  }

}
