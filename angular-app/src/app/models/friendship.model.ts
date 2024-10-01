export interface Friendship {
    id: number;
    userId: number;
    friendId: number;
    status: string;
    username: string;
    user?: any;
}