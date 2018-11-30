export class change {
    constructor(
        public title: string,
        public description: string,
        public startTime: Date,
        public endTime: Date,
        public assignedTo: string,
        public contact: string,
        public impactService : string,
        public createdBy ?: string,
        public id?: string,
        public status?: string,
        public resolution?: string
    ){}
}
