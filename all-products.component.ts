import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit {

  products:any[] = []
  categories:any[] = []
  loading:boolean = false
  cartProducts:any[] = []
  constructor(private service:ProductsService) { }

  ngOnInit(): void {
  this.getProducts()
  this.getCategories()
  }

  getProducts(){
    this.loading = true
    return this.service.getAllProducts().subscribe((res:any) => {
      this.products = res
      this.loading = false
    })
  }

  getCategories(){
    this.loading = true
    return this.service.getAllCategories().subscribe((res:any) => {
      this.categories = res
      this.loading = false
    })
  }

  filterCategory(event:any){
    let value = event.target.value;
    if(value == "all") {
      this.getProducts()
    }else {
      this.getProductsCategory(value)
    }
    
  }
  getProductsCategory(keyword:string){
    this.loading = true
    this.service.getProductsByCategory(keyword).subscribe((res:any) => {
      this.loading = false
      this.products = res
    })
  }

  AddToCart(event:any){
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("Product is already in your cart")
      }
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }else {
      this.cartProducts.push(event)
      localStorage.setItem("cart", JSON.stringify(this.cartProducts))
    }
  }
}
