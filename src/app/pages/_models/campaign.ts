export class Campaign {
    id?: number;
    name?: string;
    message?: string;
    fileUrl?: string;
    sent?: number;
    read?: number;
    response: number;
    status: number;
    contactListIds: number[];
    replies?: number;
    subscribed?: number;
    delivered?: number;

    repliesPercentage?: number;
    subscribedPercentage?: number;
    readPercentage?: number;
    deliveredPercentage?: number;
}
