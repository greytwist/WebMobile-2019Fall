import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CalculatorICP';
  elementsArray = [];
  equationDisplay: string = "";
  number: string = "0";

  updateEquation(number, operation){
    this.addElement(number);
    this.addElement(operation);
  }

  addElement(item){
    this.elementsArray.push(item);
    this.equationDisplay = this.equationDisplay.concat(item + " ");
  }

  pressKey(n) {

    if(this.number.includes("Answer: ")) {
      this.clearAll();
    }

    switch (n) {
      case "+":
      {
        this.updateEquation(this.number, "+");
        this.clearNumber();
        break;
      }
      case "-":
      {
        this.updateEquation(this.number, "-");
        this.clearNumber();
        break;
      }
      case "*":
      {
        this.updateEquation(this.number, "*");
        this.clearNumber();
        break;
      }
      case "/":
      {
        this.updateEquation(this.number, "/");
        this.clearNumber();
        break;
      }
      default:
      {
        if(this.number === "0") {
          this.number = n;
        } else {
          this.number = this.number.concat(n)
        }
        break;
      };

    }

  }

  clearAll() {
    this.clearEquation();
    this.clearNumber();
    this.clearEquationDisplay();
  }

  clearEquationDisplay(){
    this.equationDisplay = "";
  }
  clearEquation(){
    this.elementsArray.length = 0;
  }
  clearNumber() {
    this.number = "0";
  }

  getAnswer() {
    this.addElement(this.number);
    this.clearNumber();

    for (var i = 0; i < this.elementsArray.length; i++) {
      if (this.elementsArray[i] == "*") {
        this.multiply(i - 1, i + 1);
        i = i - 2;
      } else if (this.elementsArray[i] == "/") {
        this.divide(i - 1, i + 1);
        i = i - 2;
      }
    };
    for (var i = 0; i < this.elementsArray.length; i++) {
      if (this.elementsArray[i] == "+") {
        this.add(i - 1, i + 1);
        i = i - 2;
      } else if (this.elementsArray[i] == "-") {
        this.substract(i - 1, i + 1);
        i = i - 2;
      }
    }

    var temp = "Answer: " + this.elementsArray[0];
    this.clearAll();
    this.number = temp;

  }

   multiply(a, b) {
    var c = parseInt(this.elementsArray[a]) * parseInt(this.elementsArray[b]);
     this.elementsArray[a] = c.toString();
     this.elementsArray.splice(a + 1, 2);
  }

   divide(a, b) {
    var c = parseInt(this.elementsArray[a]) / parseInt(this.elementsArray[b]);
     this.elementsArray[a] = c.toString();
     this.elementsArray.splice(a + 1, 2);
  }

   modulo(a, b) {
    var c = parseInt(this.elementsArray[a]) % parseInt(this.elementsArray[b]);
     this.elementsArray[a] = c.toString();
     this.elementsArray.splice(a + 1, 2);
  }

   add(a, b) {
    var c = parseInt(this.elementsArray[a]) + parseInt(this.elementsArray[b]);
     this.elementsArray[a] = c.toString();
     this.elementsArray.splice(a + 1, 2);
  }

   substract(a, b) {
    var c = parseInt(this.elementsArray[a]) - parseInt(this.elementsArray[b]);
     this.elementsArray[a] = c.toString();
     this.elementsArray.splice(a + 1, 2);
  }

}


