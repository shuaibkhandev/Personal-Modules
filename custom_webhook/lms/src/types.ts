type Event = "purchase"

export type Webhook = {
    id: string;
    url: string;
    token: string;
    event: Event;
}

export type Payload = {
    id: string;
    name: string;
    email: string;
    course: string;
}