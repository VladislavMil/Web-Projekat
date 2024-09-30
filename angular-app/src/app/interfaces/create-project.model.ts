export class CreateProject {
    name: string;
    description: string;
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}