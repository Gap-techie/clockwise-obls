
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
    const { data, error } = await supabase
        .from('employees') 
        .select('*');

        // get job_code (jobs table)and on given job code determine employees role (employees table)
        
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
}