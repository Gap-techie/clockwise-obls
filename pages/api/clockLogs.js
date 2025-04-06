import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { employee_id, clock_in, clock_out, break_start, break_end } = req.body;

        // Handle clock-in
        if (clock_in) {
            const { data, error } = await supabase
                .from('clock_logs')
                .insert([{ employee_id, clock_in, break_start, break_end }]);

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(201).json(data);
        }

        // Handle clock-out
        if (clock_out) {
            const { data, error } = await supabase
                .from('clock_logs')
                .update({ clock_out })
                .match({ employee_id }); // Match the employee ID

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json(data);
        }
    }

    // Handle other HTTP methods as needed
    return res.status(405).json({ error: 'Method Not Allowed' });
} 