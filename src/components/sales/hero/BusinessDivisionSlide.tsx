
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BusinessDivision {
  title: string;
  description: string;
  linkFragment: string;
}

interface BusinessDivisionSlideProps {
  division: BusinessDivision;
  image: string;
  index: number;
  total: number;
}

const BusinessDivisionSlide: React.FC<BusinessDivisionSlideProps> = ({ 
  division, 
  image, 
  index, 
  total 
}) => {
  return (
    <div className="p-1">
      <div className="overflow-hidden rounded-xl transform transition-all hover:scale-[1.02] duration-300 print:shadow-md print:hover:scale-100 group">
        <div className="relative h-60 overflow-hidden">
          {/* Enhanced gradient overlay with better colors */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-800/60 to-transparent z-10"></div>
          
          <img 
            src={image} 
            alt={division.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-2000"
            onError={(e) => {
              console.error(`Failed to load image: ${image}`);
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          
          {/* Enhanced content positioning */}
          <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors drop-shadow-lg">{division.title}</h3>
            <p className="text-gray-200 line-clamp-2 drop-shadow-md">{division.description}</p>
          </div>
          
          {/* Animated highlight line with new color */}
          <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-emerald-400 transition-all duration-500"></div>
        </div>
        
        {/* Enhanced footer with better backdrop */}
        <div className="bg-slate-800/40 backdrop-blur-sm p-4 flex items-center justify-between border-t border-emerald-400/20">
          <Link 
            to={`#${division.linkFragment}`} 
            className="text-emerald-400 flex items-center font-medium group-hover:text-cyan-400 transition-colors print:hidden"
          >
            Learn more 
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-gray-300 text-sm">{index + 1} / {total}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessDivisionSlide;
