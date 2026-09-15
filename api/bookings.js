import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('bookings').select('*').order('id', { ascending: false }).limit(50);
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { name, email, dive_date, package: pkg, divers, message } = req.body || {};
      if (!name || !email || !dive_date || !pkg) return res.status(400).json({ error: 'name, email, dive_date and package are required' });
      const { data, error } = await supabase.from('bookings').insert({ name, email, dive_date, package: pkg, divers: Number(divers) || 1, message: message || '' }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
