export class Incident {
    constructor(
        public title: string,
        public content: string,
        public userName?: string,
        public id?: string,
        public status?: string
    ){}
}