

enum Role {ADMIN, READ_ONLY, AUTHOR};
const person:{
    name: string;
    age: number;
    hobbies: string[];
    tuple: [number, string];
    role: Role;
} = {
    name: "ahesh",
    age: 22,
    hobbies: ['watching markets', 'sleeping'],
    tuple: [1, "ahesh"],
    role: Role.ADMIN

}
// for(const hobby of person.hobbies) {
//     console.log(hobby);
// }
// console.log(person);

function combine(number1: number | string , number2: number | string) {
    if(typeof number1 === "number" && typeof number2 === "number") return number1 + number2;
    return number1.toString() + number2;
}