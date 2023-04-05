
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
function validate(validObj: Validatable): boolean {
    let result = true;
    result = result && (typeof validObj.value === 'string' || typeof validObj.value === 'number')
    if (validObj.required)
        result = result && (validObj.value.toString().trim().length !== 0);
    if (validObj.minLength && validObj.minLength?.toString().trim().length !== 0) {
        result = result && (validObj.minLength < validObj.value.toString().trim().length)
    }
    if (validObj.maxLength && validObj.maxLength?.toString().trim().length !== 0) {
        result = result && (validObj.maxLength > validObj.value.toString().trim().length)
    }
    if (typeof validObj.value === 'number' && validObj.min && validObj.min.toString().trim().length !== 0) {
        result = result && (validObj.min < validObj.value)
    }
    if (typeof validObj.value === 'number' && validObj.max && validObj.max.toString().trim().length !== 0) {
        result = result && (validObj.max > validObj.value)
    }
    return result;
}
function AutoBinder(_target: any, _name: string, property: PropertyDescriptor) {
    const fun = property.value;

    const modifiedProperty: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const bindFun = fun.bind(this);
            return bindFun;
        }
    }
    return modifiedProperty;
}

class ProjectInput {
    templateElement: HTMLTemplateElement
    hostElememt: HTMLDivElement;
    element: HTMLFormElement;
    titleElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElememt = document.getElementById('app')! as HTMLDivElement;
        const importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild! as HTMLFormElement;
        this.element.id = 'user-input';
        this.titleElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionElement = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();

        // console.log(importNode);
    }
    private gatherUserInfo(): [string, string, number] | void {
        const title = this.titleElement.value;
        const description = this.descriptionElement.value;
        const people = this.peopleElement.value;

        if (validate({ title }) && description.trim().length === 0 && people.trim().length === 0) {
            alert("Invalid user input !");
        }

        else {
            return [title, description, +people];
        }
    }
    @AutoBinder
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInfo = this.gatherUserInfo();

        if (Array.isArray(userInfo)) {
            const [title, description, people] = userInfo;
            console.log(title, description, people);
        }

        //console.log(this.titleElement.value);
    }

    private configure() {
        // console.log(this.element);
        this.element.addEventListener('submit', this.submitHandler);
    }
    private attach() {
        this.hostElememt.insertAdjacentElement('afterbegin', this.element);
    }

}
const proj = new ProjectInput();