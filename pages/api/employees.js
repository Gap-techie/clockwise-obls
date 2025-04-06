import { supabase } from '../../lib/supabaseClient';
import { authenticate } from '../../lib/auth';

export default async function handler(req, res) {
    await authenticate(req, res); // Call the authentication middleware

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('employees')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    }

    if (req.method === 'POST') {
        const { first_name, last_name, email, phone, hire_date, role } = req.body;

        const { data, error } = await supabase
            .from('employees')
            .insert([{ first_name, last_name, email, phone, hire_date, role }]);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json(data);
    }

    // Handle other HTTP methods as needed
    return res.status(405).json({ error: 'Method Not Allowed' });
} 