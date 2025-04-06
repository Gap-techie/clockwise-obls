import { supabase } from './supabaseClient';

export const authenticate = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    // Use the new method to get the user
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
}; 