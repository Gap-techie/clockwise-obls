import { supabase } from '../../../lib/supabaseClient';
import { authenticate } from '../../../lib/auth';

export default async function handler(req, res) {
    await authenticate(req, res); // Call the authentication middleware

    const { employeeId } = req.query;

    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('employee_id', employeeId);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    }

    if (req.method === 'PUT') {
        const { first_name, last_name, email, phone, hire_date, role } = req.body;

        const { data, error } = await supabase
            .from('employees')
            .update({ first_name, last_name, email, phone, hire_date, role })
            .eq('employee_id', employeeId);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
        const { error } = await supabase
            .from('employees')
            .delete()
            .eq('employee_id', employeeId);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(204).end(); // No content
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
} 