export interface Friendship {
    id: number;
    userId: number;
    friendId: number;
    status: boolean;
    username: string;
    user?: any;
}