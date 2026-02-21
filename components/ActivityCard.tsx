
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, CheckCircle, Clock, Eye, UserPlus, BarChart2 } from 'lucide-react';
import { Activity, ActivityStatus } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onRegister?: (activity: Activity) => void;
  onStats?: (activity: Activity) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onRegister, onStats }) => {
  const isCompleted = activity.status === ActivityStatus.COMPLETED;

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 backdrop-blur-md shadow-sm ${
          isCompleted ? 'bg-green-500/90 text-white' : 'bg-amber-600/90 text-white'
        }`}>
          {isCompleted ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
          {isCompleted ? 'نشاط منتهي' : 'قادم قريباً'}
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-amber-600 text-sm font-bold mb-3">
          <Tag className="w-4 h-4" />
          <span>{activity.category}</span>
        </div>
        
        <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
          {activity.title}
        </h3>
        
        <p className="text-gray-500 mb-8 line-clamp-3 text-lg leading-relaxed flex-grow whitespace-pre-line">
          {activity.description}
        </p>

        <div className="flex items-center text-gray-400 text-sm mb-8 bg-gray-50 p-3 rounded-xl">
          <Calendar className="w-4 h-4 ml-2" />
          <span className="font-medium">{activity.date}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link 
            to={`/activities/${activity.id}`}
            className="flex items-center justify-center gap-2 bg-amber-50 text-[#0d2137] py-4 rounded-2xl font-black hover:bg-amber-100 transition-all border border-amber-100"
          >
            <Eye className="w-5 h-5" />
            التفاصيل
          </Link>
          
          {!isCompleted ? (
            <button 
              onClick={() => onRegister?.(activity)}
              className="flex items-center justify-center gap-2 bg-amber-600 text-white py-4 rounded-2xl font-black hover:bg-amber-700 transition-all shadow-lg shadow-amber-200"
            >
              <UserPlus className="w-5 h-5" />
              سجل الآن
            </button>
          ) : (
            <button
              onClick={() => onStats?.(activity)}
              className="flex items-center justify-center gap-2 bg-[#0d2137] text-white py-4 rounded-2xl font-black hover:bg-[#162840] transition-all shadow-lg"
            >
              <BarChart2 className="w-5 h-5" />
              إحصائيات
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
