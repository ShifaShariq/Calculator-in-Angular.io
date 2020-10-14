import { Component} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Online Calculator';
  expression = new FormControl('');
  count = 0;
  operators :string[] = [];
  opr;

  clearbtn(){   
    this.expression.setValue("");
  }

  updateExpression(str){
    let currentExpression = this.expression.value;
    this.expression.setValue(currentExpression + str);
  }

  backspace(){
    let currentExpression = this.expression.value;
    currentExpression.toString;
    this.expression.setValue(currentExpression.slice(0, -1))
  }

  syntaxCheck(str: string){             //method called in appendOperator to check for syntax issues
    let currentExpression = this.expression.value;
    currentExpression = currentExpression.toString();
    const lastVal = currentExpression.slice(-1);
    if (lastVal == "+" || lastVal == "-" || lastVal == "*" || lastVal == "/" ){
      window.alert("Can't enter two operators consecutively!")}
    else if ((lastVal == "") && (str =="*" || str == "/")){
      window.alert("Expression doesn't start with these operators!")}
    else{
      console.log("else condition")
      console.log("printing str", currentExpression, str)
      this.expression.setValue(currentExpression + str); 
      return; }
  }

  appendOperator(str: string){
    console.log("start of appendOperator")
    this.syntaxCheck(str); 
    console.log("after syntax check")
    this.count = this.count+1; //count of operators in the expression
    console.log("count is", this.count);
    if (this.operators.length ===0){
      this.opr = str;
    }
    else{
      this.opr = this.operators[this.operators.length-1]; // accessing the last operator in opr
    }
    console.log("this.operators.length-1=",this.operators.length-1)
    console.log("operator is", this.opr);
    this.operators.push(str); // appending the current operator in the operators array
    console.log("printing operators", this.operators);

    if (this.count>1){
      let currentExpression = this.expression.value;
      currentExpression.toString;
      console.log("inside if block for count>1")
      this.IntermediateEval(currentExpression.slice(0, -1), str)
    }
  }

  IntermediateEval(expr, str){
    console.log("in interEvaluate method", expr);
    const splitted = expr.split(this.opr, 2);
    let num1 = splitted[0];
    let num2 = splitted[1];
    if (num1!=0 && num2!=0){
      this.zeroesCheck(num1);
      this.zeroesCheck(num2);
    }
    // console.log("zeros check done")
    // console.log("operator check", this.opr)
    let ans = eval(num1+this.opr+num2);
    this.expression.setValue(ans+str);
    this.count = this.count-1;
    this.operators.shift();
    console.log("Variables reset :)", this.count, this.operators)
    return;
  }
 
  appendZero(str: string){
    let currentExpression = this.expression.value;
    currentExpression.toString;
    const lastVal = currentExpression.slice(-1);
    if (lastVal == "/") {
        window.alert("Can't divide a number by zero!")
      }
    else{
        this.expression.setValue(currentExpression + str); 
    }
  }
  
  zeroesCheck(num){             //method called in evaluate to check for preceding zeroes
    let regexpNumber = new RegExp('^0');
    const test = regexpNumber.test(num);
    if (test === true){
      window.alert("Remove the zeroes preceding the number!");
    }
    else { return; }
  }

  evaluate(){ 
    let currentExpression = this.expression.value;
    console.log("in evaluate method", currentExpression);
    this.opr = this.operators[this.operators.length-1];
    const splitted = currentExpression.split(this.opr, 2);
    console.log("operator check", this.opr)
    let num1 = splitted[0];
    let num2 = splitted[1];
    console.log(this.opr)
    if (num1!=0 && num2!=0){
      console.log("here in evaluate")
      this.zeroesCheck(num1);
      this.zeroesCheck(num2);
    }
    console.log(num1+this.opr+num2)
    console.log(num1)
    console.log(num2)
    console.log(this.opr)

    let ans = eval(num1+this.opr+num2);
    this.expression.setValue(ans);
    this.count = 0;
    this.operators = [];
    console.log("Variables reset in evaluate :)")
  }
}