

// type Person = {
// name: string;
// }
// const names: Person[] = [{name: 'ahesh'},{name: 'ahesh'}]

// function merge<T extends object, U extends keyof T>(obj1: T, obj2: U) {
//     return obj1[obj2]
// }

// let obj1 = { name: 'ahesh' }
// let obj2 = { age: 22 }
// const res = merge(obj1, 'name');


// type CourseGoal = {
//     title: string;
//     duration: number;
//     initial_date: Date;
// }

// function createCourseGoal(title: string, duration: number, initial_date: Date): CourseGoal {
//     let result: Partial<CourseGoal>= {}
//     result.title = title;
//     result.duration = duration;
//     result.initial_date = initial_date;

//     return result as CourseGoal;
// }
// function Logger(element: string, root: string) {
//     return function (constructor: any) {
//         const person = new constructor();
//         const rootEle = document.getElementById('app')!;
//         console.log(rootEle);
//         if (rootEle) {
//             rootEle.innerHTML = element;
//             document.querySelector('h1')!.innerText = person.name;
//         }
//     }
// }
// function test(target: any, name: string) {
//     console.log(target)
//     console.log(name)

// }

// function test1<T>(target: any, name: string, descriptor: TypedPropertyDescriptor<T>) {
//     console.log(target)
//     console.log(name)
//     console.log(descriptor)
// }
// // @Logger('<h1> My Object </h1>', 'app')
// function Log1() {

// }

// class Person {

//     name1: string = 'ahesh';
//     @test1
//     greet() {
//         return ` hello ${this.name1}`
//     }
// }

function Binder(_target: any, _name: string, descriptor: PropertyDescriptor) {
    const fun = descriptor.value;

    const modifiedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFun = fun.bind(this);
            return boundFun;
        }

    }
    return modifiedDescriptor;
}
const buttonHandler = document.querySelector("button")!;

class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
    @Binder
     showName() {
        console.log(this.name);
    }
}

const ahesh = new Person('ahesh');
// console.log(ahesh.name);
buttonHandler.addEventListener('click', ahesh.showName)
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[]
    }
}
const registeredValidators: ValidatorConfig = {}

function nameValidator(target: any, name: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [name]: ['required']
    }
}
function priceValidator(target: any, name: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [name]: ['positive']
    }
}

function validate(obj: any) {
    const classToValidate = registeredValidators[obj.constructor.name];
    if (!classToValidate) return true;
    let flag = true;
    for (const parameter in classToValidate) {
        for (const validate of classToValidate[parameter]) {
            

            switch (validate) {
                case 'required':
                    flag = flag && !!obj[parameter];
                    break;
                case 'positive':
                    flag = flag && obj[parameter] > 0;
                    break;
                default: return flag
            }
        }
    }
    return flag;
}

class Course {
    @nameValidator
    name: string;
    @priceValidator
    price: number;

    constructor(name: string, price: number) {

        this.name = name;
        this.price = price;
    }
}
const formHandler = document.getElementById('butt')! as HTMLButtonElement;

formHandler.addEventListener('submit', (e) => {
    const nameElememt = document.getElementById('name')! as HTMLInputElement;
    const priveElement = document.getElementById('price')! as HTMLInputElement;

    e.preventDefault();
    const course = new Course(nameElememt.value, +priveElement.value)
    console.log(course);
    if (validate(course)) {
        console.log('publish course');
    } else {
        alert('invalid input ...');
    }
})


