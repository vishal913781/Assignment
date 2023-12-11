import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodsService } from '../service/methods.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private hc:MethodsService,private router:Router){}

  // this is all intialization of variables used in my code 

  base64:any;
  name:any;
  Lastname:any;
  Email:any;
  number:any;
  State:any;
  Country:any;
  Address1:any;
  Address2:any;
  tags: string[] = [];
  newTag: string = '';
  vs:string="";
  minValue = 18;
  maxValue = 100;
  selectedValue = 50;
  mydata:any;

  // this the funtion for age Selection

  onSliderChange(event: any) {
    console.log(this.selectedValue);
    this.selectedValue
  }

  // this is the code for adding tags in tag textbox

  addTag() {
    if (this.newTag.trim() !== '' && !this.tags.includes(this.newTag)) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
      console.log(this.tags)
    }
  }

  // this is the code for tag object to string convert 

  tagstring(){
    this.vs=this.tags.join(',');
    console.log(this.vs);
  }
  
  // this is the code for check the length and alphabets of first text box 

  checkMaxLength() {
    const regex = /^[a-zA-Z]{0,20}$/;

    if (!regex.test(this.name)) {
      alert('Input should have less than 5 characters and enter only alphabets');
      this.name = "";
    }
  }

  // this function for removing the tags from textbox

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  // this function is for post method for sending data in json server 
  getdata1(){
    this.hc.post1(this.name,this.Lastname,this.base64,this.Email,this.number,this.selectedValue,this.State,this.Country,this.Address1,this.Address2,this.tags,this.vs).subscribe((data)=>{this.mydata=data});
    sessionStorage.setItem("username",this.name);
    this.router.navigate(["/profile"]);
    console.log(this.base64)
  }
  // this function is for intializing post method 
  save(){
    this.tagstring();
    this.getdata1();
  }

  // this funtion is for checking the image size 

  checkImageSize(event: any) {
    let fileInput = event.target;
    let file = fileInput.files[0];

    if (file) {
      let img = new Image();
      let reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          let width = img.naturalWidth;
          let height = img.naturalHeight;
          if (width <= 310 && height <= 325) {
            this.onInputchange(event);
          } else {
            alert('Image size is greater than 310x325 pixels.');
          }
        };
      };
      reader.readAsDataURL(file);
    }
  }

  // this funtion is for converting the image file in base64 

  onInputchange(event:any){
    let targetEvent = event.target;
    let file:File = targetEvent.files[0];
    let fileReader:FileReader = new FileReader();
    
    fileReader.onload = (e) => {
      this.base64 = fileReader.result
    }
    fileReader.readAsDataURL(file)
  }
}
