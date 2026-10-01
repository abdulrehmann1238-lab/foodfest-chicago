import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <main className="w-full min-h-[80vh] flex flex-col items-center justify-center p-6 text-center pt-28">
      <div className="w-16 h-16 rounded-full bg-[#1D1A17]/5 flex items-center justify-center mb-6">
        <UtensilsCrossed className="w-8 h-8 text-[#B9502F]" />
      </div>

      <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#80766A] mb-2 block">
        404 ERROR
      </span>

      <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#1D1A17] mb-4">
        This plate is empty.
      </h1>

      <p className="text-sm sm:text-base text-[#80766A] max-w-md mb-8 leading-relaxed font-sans">
        The recipe or page you’re looking for seems to have been eaten or moved to a different festival tent.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/">
          <Button size="md" variant="primary">
            Return to Main Festival
          </Button>
        </Link>
        <Link to="/tickets">
          <Button size="md" variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
            View Ticket Passes
          </Button>
        </Link>
      </div>
    </main>
  );
};
