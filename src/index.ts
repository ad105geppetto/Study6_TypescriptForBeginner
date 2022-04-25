// 인터페이스를 쓴다면 ts에서는 좀더 안전하다.
// 그러나 리액트나 노드, 익스프레스 등을 사용한다면 class가 필요할 수 있다.

class Human {
    public name: string;
    public age: number;
    public gender: string;
    constructor(name:string, age:number, gender:string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const lynn = new Human('lynn', 20, 'female')

const sayHi = (person:Human): string => {
    return (`Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`)
}

console.log(sayHi(lynn))
export {};