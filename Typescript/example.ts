class User {
    name: string = "";
}

function myFunction(){
    const age: number = 10;
}

//any => tüm tipleri kapsar
//boolean
//number
//biginit => numberdan daha büyük değerler için kullanılıyor
//symbol => global olarak uniqe identityfier için kullanılıyor
//string
//date
//object
//type

type Test = "Deneme1" | "Deneme"

//Explicit => Açık yöntem

let firstName: string = "Elif Tuba Korkmaz";

//Implicit => Önerme

let firstName2 = "Elif Tuba Korkmaz";

//unknown
let number3: unknown;
let number4: number;

number3 = 0;
if(typeof number3 === "number"){
    number4 = number3;
}

const names: string[] = []
names.push("Elif");
for(let n of names)
    console.log(n);

const names2: readonly string[] = ["Halil","Cumhan","Füsun"]

//infer => anlam çıkartmak

const numbers = [1,2,3,4];
numbers.push(5);

//Tuples

let ourTuple: readonly [number, boolean, string];
ourTuple = [5,true,""];

//Object

const car: {type: string, model: string, year: number} = {
    type: "Toyota",
    model: "Coralla",
    year: 2009
};

class CarModel{
    constructor(type: string, model:string, year:number) {
        this.type = type;
        this.model = model;
        this.year = year;
    }
    type: string;
    model: string;
    year: number;
}

const car2: CarModel = {
    type: "Totota",
    model: "Corolla",
    year: 2009
}

//index signatures
const nameAgeMap: {[index:string]: number} = {};

nameAgeMap.Elif = 15;
nameAgeMap.Halil = 18;

//enum
enum Card{
    Most = "Most Popular",
    Popular = 200,
    Best = 300
}

let card = Card.Popular;

//Type Aliases
type CarYear = number;
type CarType = string;
type NewCarModel = string;
type NewCar = {
    year: CarYear,
    type: CarType,
    model: NewCarModel
}

//Interface
interface Reactangle{
    height: number,
    width: number
}

interface ColorReactangle extends Reactangle{
    color: string
}

const Reactangle: Reactangle = {
    height: 20,
    width: 10
}

const colorReactangle: ColorReactangle = {
    height: 100,
    color: "red",
    width: 200
}

//union | (OR)
let newVariable: string | undefined | number | boolean;
const newVariable2: string | undefined = undefined;

//fonksiyonlar

function getTime(): number{
    return new Date().getTime();
}

function printHello(): void{
    console.log("İşlem tamamlandı")
}

function multiply(a:number, b:number, c:number = 10, d?:number): number{
    return a * b;
}

type User2 = (value: number) => number;

const userFunction: User2 = (value) => value * -1;

let x: unknown = "Hello Word";
console.log((x as string).length);