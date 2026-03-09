import { useState } from 'react';

type Quote = {
  venueId: string;
  totalPrice: number;
  pricePerPerson: number;
  breakdown: {
    courts: number;
    hours: number;
    pricePerCourtHour: number;
  };
};

export default function BookingForm() {
  const [numPlayers, setNumPlayers] = useState(6);
  const [numCourts, setNumCourts] = useState(1);
  const [hours, setHours] = useState(2);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);

  const calculateQuotes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numPlayers, numCourts, hours }),
      });
      const quote: Quote = await response.json();
      setQuotes([quote]); // Later: loop over all venues
    } catch (error) {
      console.error('Quote error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Pickleball Booker</h1>
      
      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium mb-2">Players</label>
          <input
            type="range"
            min="2" max="16" step="1"
            value={numPlayers}
            onChange={(e) => setNumPlayers(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <span className="text-2xl font-bold">{numPlayers}</span>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Courts</label>
          <input
            type="range"
            min="1" max="4" step="1"
            value={numCourts}
            onChange={(e) => setNumCourts(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <span className="text-2xl font-bold">{numCourts}</span>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Hours</label>
          <input
            type="range"
            min="1" max="4" step="0.5"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <span className="text-2xl font-bold">{hours}h</span>
        </div>
      </div>
      
      <button
        onClick={calculateQuotes}
        disabled={loading}
        className="w-full bg-green-600 text-white py-4 px-8 rounded-lg font-bold text-xl hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Calculating...' : `Get Quotes for ${numPlayers} players`}
      </button>
      
      {/* Results */}
      {quotes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Quotes</h2>
          {quotes.map((quote) => (
            <div key={quote.venueId} className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">CityPickle Times Square</h3>
                <span className="text-3xl font-bold text-green-600">${quote.totalPrice}</span>
              </div>
              <div className="text-lg text-gray-600 mb-4">
                ${quote.pricePerPerson.toFixed(0)} per person
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
                <div>{quote.breakdown.courts} court{quote.breakdown.courts > 1 ? 's' : ''}</div>
                <div>{quote.breakdown.hours}h</div>
                <div>${quote.breakdown.pricePerCourtHour}/hr</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}