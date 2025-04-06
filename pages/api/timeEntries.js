import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { employee_id, project_id, job_id, date, hours, overtime } = req.body;

        const { data, error } = await supabase
            .from('time_entries')
            .insert([{ employee_id, project_id, job_id, date, hours, overtime }]);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json(data);
    }

    if (req.method === 'GET') {
        const { employeeId } = req.query; // Get employeeId from query parameters

        const { data, error } = await supabase
            .from('time_entries')
            .select('*')
            .eq('employee_id', employeeId); // Filter by employee ID

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(data);
    }

    // Handle other HTTP methods as needed
    return res.status(405).json({ error: 'Method Not Allowed' });
} 