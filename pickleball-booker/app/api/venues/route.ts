import { NextResponse } from 'next/server';

const venues = [
  {
    id: 'citypickle-ts',
    name: 'CityPickle Times Square',
    provider: 'podplay',
    bookingUrl: 'https://citypickle.podplay.app/book/times-square?pod=times-square-open',
    address: 'Times Square, NYC',
    courts: [
      { id: 'ts-court1', name: 'Court 1', indoor: true, maxPlayers: 6 },
      { id: 'ts-court2', name: 'Court 2', indoor: true, maxPlayers: 6 },
    ],
    priceRules: [
      { dayOfWeek: 'weekday', start: '06:00', end: '18:00', pricePerCourtHour: 90 },
      { dayOfWeek: 'weekday', start: '18:00', end: '23:00', pricePerCourtHour: 110 },
      { dayOfWeek: 'weekend', start: '09:00', end: '23:00', pricePerCourtHour: 120 },
    ],
  },
  {
    id: 'pickle1-fidi',
    name: 'Pickle1 FiDi',
    provider: 'podplay',
    bookingUrl: 'https://pickle1.podplay.app/book/fidi?pod=pickleball-court',
    address: 'Financial District, NYC',
    courts: [
      { id: 'fidi-court1', name: 'Court 1', indoor: true, maxPlayers: 6 },
    ],
    priceRules: [
      { dayOfWeek: 'weekday', start: '06:00', end: '18:00', pricePerCourtHour: 80 },
      { dayOfWeek: 'weekday', start: '18:00', end: '23:00', pricePerCourtHour: 100 },
      { dayOfWeek: 'weekend', start: '09:00', end: '23:00', pricePerCourtHour: 110 },
    ],
  },
  {
    id: 'citypickle-lic',
    name: 'CityPickle Long Island City',
    provider: 'podplay',
    bookingUrl: 'https://citypickle.podplay.app/book/long-island?pod=long-island-open',
    address: 'Long Island City, NYC',
    courts: [
      { id: 'lic-court1', name: 'Court 1', indoor: true, maxPlayers: 6 },
      { id: 'lic-court2', name: 'Court 2', indoor: true, maxPlayers: 6 },
    ],
    priceRules: [
      { dayOfWeek: 'weekday', start: '06:00', end: '18:00', pricePerCourtHour: 85 },
      { dayOfWeek: 'weekday', start: '18:00', end: '23:00', pricePerCourtHour: 105 },
      { dayOfWeek: 'weekend', start: '09:00', end: '23:00', pricePerCourtHour: 115 },
    ],
  },
  {
    id: 'pklyn',
    name: 'PKLYN Gowanus',
    provider: 'custom',
    bookingUrl: 'https://pklyn.com',
    address: 'Gowanus, Brooklyn',
    courts: [
      { id: 'pklyn-court1', name: 'Court 1', indoor: true, maxPlayers: 6 },
    ],
    priceRules: [
      { dayOfWeek: 'weekday', start: '06:00', end: '18:00', pricePerCourtHour: 95 },
      { dayOfWeek: 'weekday', start: '18:00', end: '23:00', pricePerCourtHour: 115 },
      { dayOfWeek: 'weekend', start: '09:00', end: '23:00', pricePerCourtHour: 125 },
    ],
  },
];

export async function GET() {
  return NextResponse.json(venues);
}

export async function GET(request, { params }) {
  const { venueId } = params;
  const venue = venues.find(v => v.id === venueId);
  if (!venue) {
    return NextResponse.json({ error: 'Venue not found' }, { status: 404 });
  }
  return NextResponse.json(venue);
}