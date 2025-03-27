// alert("Hi");
let num = 12;
firstName = "Adler";
console.log(firstName);
document.write("hello"); //printing of a text in a website
// alert(num); // alert

let math = 90;
let science = 91;
let english = 88;
let filipino = 85;
let AP = 100;

let average = (math + science + english + filipino + AP) / 5;

// alert(average);

var student = {
    name: "Jose",
    age: 21,
    course: 'Computer Science',
    greet: function(){
        return "Hi, My name is " + this.name;
    }
}

var name = student ['name'];
var age = student ['age'];

function sum (x,y){
    return x+y;
}

function greet(){
    console.log('hello');
}

function changeImg(img){
    document.images['logo'].src = img;
}

function changeBG() {
    document.getElementById("header").style.backgroundColor = "yellow";
    }

function fade(){
    $("#img1").fadeToggle();
}

console.log(sum(5,2));

//Declaration
var course = new Object();
course.code = 'CSARCH1';
course.name = 'Introduction to Computer Architecture and Organization';


