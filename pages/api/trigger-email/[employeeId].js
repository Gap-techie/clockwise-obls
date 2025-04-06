import { supabase } from '../../../lib/supabaseClient';
import { authenticate } from '../../../lib/auth';
import { sendEmail } from '../../../lib/email'; // Assuming you have an email utility

export default async function handler(req, res) {
    await authenticate(req, res); // Call the authentication middleware

    const { employeeId } = req.query;

    if (req.method === 'POST') {
        // Logic to retrieve employee data and send email
        const { data: employee, error } = await supabase
            .from('employees')
            .select('*')
            .eq('employee_id', employeeId)
            .single();

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // Send email logic (you need to implement sendEmail function)
        const emailSent = await sendEmail(employee.email, 'Time Summary Report', 'Your time summary...');

        if (!emailSent) {
            return res.status(500).json({ error: 'Failed to send email' });
        }

        return res.status(200).json({ message: 'Email sent successfully' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
} 