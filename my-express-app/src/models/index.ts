// This file exports models that represent the data structure of the application.
// You can define your database schemas or data validation logic here.

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}