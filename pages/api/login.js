import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const { user, error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: error.message });
        }

        return res.status(200).json({ user });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
} 