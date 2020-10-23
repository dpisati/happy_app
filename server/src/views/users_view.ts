import User from '../models/Users';

export default {
    render(user: User) {
        return { 
            id: user.id,
            name: user.name,
            created_at: user.createdAt
        }
    }
}