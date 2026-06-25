export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required in request body.' });
  }

  const apiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Groq API key is not configured. Set GROQ_API_KEY (or VITE_GROQ_API_KEY) in Vercel env vars.' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are "GloryBot", the premium AI Concierge Concierge for Hotel The Glory in Sylhet, Bangladesh.
            Your tone is warm, highly polite, sophisticated, and professional.
            Always address the user as "Guest".
            
            Hotel Core Information:
            - Location: Sadik Tower, Noyasorok, Sylhet, Bangladesh.
            - Category: 3-Star Luxury Boutique Hotel.
            - Phone & WhatsApp: +8801303995511 (For instant bookings).
            - Email: info@hoteltheglory.com.
            
            Facilities & Amenities:
            1. Fine Dining Restaurant: Authentic Sylheti dishes (Shatkora beef, local fish) & international cuisines.
            2. Swimming Pool: Temperature-controlled crystal pool.
            3. Wellness Spa & Salon: Therapeutic massage treatments and salon services.
            4. Luxury Gym: Top-tier cardiovascular and strength training equipment.
            5. Conference & Event Hall: Equipped for corporate seminars, banquets, and board meetings.
            6. Travel & Tour Desk: Offering curated excursions across Sylhet.
            
            Rooms & Pricing:
            - Executive Suite: Approx BDT 4,500/night.
            - Deluxe Twin Room: Approx BDT 5,500/night.
            - Glory Royal Suite: Premium luxury setup.
            - Presidential Suite: Large spacious premium quarters.
            - Luxury Family Suite: Tailored for group stays.
            
            Curated Sylhet Tours:
            1. Jaflong Valley Adventure: Stone river beds, green hills, border views (BDT 3,500/guest).
            2. Ratargul Swamp Forest Safari: Flooded forest traditional boat ride (BDT 4,000/guest).
            3. Srimangal Tea Estate Excursion: Sprawling tea garden terraces and 7-layer tea tasting (BDT 5,500/guest).
            
            Rules:
            - Keep responses relatively brief, clear, and structured.
            - Always direct the Guest to book or make an inquiry via our hotlines (+8801303995511) or the Booking Form on the website.
            - Respond in English or Bengali depending on the Guest's language.`
          },
          ...messages
        ],
        temperature: 0.6,
        max_tokens: 500
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || 'Failed to call Groq API' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
