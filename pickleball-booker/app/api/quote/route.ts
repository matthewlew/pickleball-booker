import { NextRequest, NextResponse } from 'next/server';
import { venues } from '../venues/route';

type QuoteRequest = {
  venueId: string;
  numPlayers: number;
  numCourts: number;
  hours: number;
  date?: string;
  startTime?: string;
};

export async function POST(request: NextRequest) {
  const body: QuoteRequest = await request.json();

  const venue = venues.find(v => v.id === body.venueId);
  if (!venue) {
    return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
  }

  // Simple price lookup (in real app, use date/time to match priceRule)
  const pricePerCourtHour = 100; // Default; replace with logic

  const totalPrice = pricePerCourtHour * body.numCourts * body.hours;
  const pricePerPerson = totalPrice / body.numPlayers;

  return NextResponse.json({
    venueId: body.venueId,
    totalPrice,
    pricePerPerson: Math.round(pricePerPerson * 100) / 100,
    breakdown: {
      courts: body.numCourts,
      hours: body.hours,
      pricePerCourtHour,
    },
  });
}

// Compare across venues
// POST /api/quote/compare
// Body: { numPlayers, numCourts, hours, date?, startTime? }