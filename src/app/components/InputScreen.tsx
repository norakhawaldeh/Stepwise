import { useState } from 'react';
import { Home, PlusCircle, Calendar, User, ArrowLeft } from 'lucide-react';

interface InputScreenProps {
  onSubmit: (data: {
    assignment: string;
    context: string;
    days: number;
    availability: string;
    timePreference: string;
  }) => void;
  onNavigate?: (screen: string) => void;
}

export function InputScreen({ onSubmit, onNavigate }: InputScreenProps) {
  const [assignment, setAssignment] = useState('');
  const [context, setContext] = useState('');
  const [timeMode, setTimeMode] = useState<'days' | 'date'>('days');
  const [days, setDays] = useState(3);
  const [availability, setAvailability] = useState('~2 hours/day');
  const [timePreference, setTimePreference] = useState('night owl');

  const handleSubmit = () => {
    onSubmit({
      assignment,
      context,
      days,
      availability,
      timePreference,
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#EAF4FB' }}>
      <div className="flex-1 max-w-[390px] mx-auto w-full px-6 py-8 pb-24">
        {/* Header */}
        <div className="mb-6">
          {onNavigate && (
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={20} color="#666" />
              <span className="text-[14px]" style={{ color: '#666' }}>Back</span>
            </button>
          )}
          <h1 className="text-[24px] font-bold mb-1" style={{ color: '#333' }}>
            {onNavigate ? 'New Task' : 'Assignment Panic'}
          </h1>
          <p className="text-[14px]" style={{ color: '#666' }}>
            Tell it what you have to do.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          {/* Assignment Input */}
          <div className="mb-5">
            <label className="block text-[13px] mb-2" style={{ color: '#666' }}>
              What's the assignment?
            </label>
            <input
              type="text"
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
              placeholder="e.g. 10-page history essay"
              className="w-full px-4 py-3 border rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#3A8DC7] focus:border-transparent"
              style={{ borderColor: '#E0E0E0' }}
            />
          </div>

          {/* Context Input */}
          <div className="mb-5">
            <label className="block text-[13px] mb-2" style={{ color: '#666' }}>
              Any extra context?
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. needs 5 sources, haven't started yet"
              rows={3}
              className="w-full px-4 py-3 border rounded-lg text-[15px] resize-none focus:outline-none focus:ring-2 focus:ring-[#3A8DC7] focus:border-transparent"
              style={{ borderColor: '#E0E0E0' }}
            />
          </div>

          {/* Time Section */}
          <div className="mb-5">
            <label className="block text-[14px] mb-3" style={{ color: '#333' }}>
              How long do you have?
            </label>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTimeMode('days')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: timeMode === 'days' ? '#3A8DC7' : 'transparent',
                  color: timeMode === 'days' ? 'white' : '#3A8DC7',
                  border: `2px solid #3A8DC7`,
                }}
              >
                Number of days
              </button>
              <button
                onClick={() => setTimeMode('date')}
                className="flex-1 py-2.5 px-4 rounded-full text-[14px] font-medium transition-all"
                style={{
                  backgroundColor: timeMode === 'date' ? '#3A8DC7' : 'transparent',
                  color: timeMode === 'date' ? 'white' : '#3A8DC7',
                  border: `2px solid #3A8DC7`,
                }}
              >
                Pick a date
              </button>
            </div>

            {/* Days Input */}
            {timeMode === 'days' && (
              <div>
                <label className="block text-[13px] mb-2" style={{ color: '#666' }}>
                  Days until due
                </label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-full px-4 py-3 border rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#3A8DC7] focus:border-transparent"
                  style={{ borderColor: '#E0E0E0' }}
                />
              </div>
            )}
          </div>

          {/* Dropdowns */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-[13px] mb-2" style={{ color: '#666' }}>
                Daily availability
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#3A8DC7] focus:border-transparent"
                style={{ borderColor: '#E0E0E0' }}
              >
                <option>~1 hour/day</option>
                <option>~2 hours/day</option>
                <option>~3 hours/day</option>
                <option>~4+ hours/day</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-[13px] mb-2" style={{ color: '#666' }}>
                You are a...
              </label>
              <select
                value={timePreference}
                onChange={(e) => setTimePreference(e.target.value)}
                className="w-full px-3 py-2.5 border rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#3A8DC7] focus:border-transparent"
                style={{ borderColor: '#E0E0E0' }}
              >
                <option>morning person</option>
                <option>night owl</option>
                <option>flexible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl text-white text-[16px] font-semibold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          style={{ backgroundColor: '#3A8DC7' }}
        >
          Build my plan →
        </button>
      </div>

      {/* Tab Bar */}
      {onNavigate && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex items-center justify-around h-16 max-w-[390px] mx-auto w-full" style={{ borderColor: '#E0E0E0' }}>
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-1 flex-1 py-2"
          >
            <Home size={20} color="#999" />
            <span className="text-[11px]" style={{ color: '#999' }}>Home</span>
          </button>
          <button
            onClick={() => onNavigate('add')}
            className="flex flex-col items-center gap-1 flex-1 py-2"
          >
            <PlusCircle size={20} color="#3A8DC7" />
            <span className="text-[11px] font-medium" style={{ color: '#3A8DC7' }}>Add Task</span>
          </button>
          <button
            onClick={() => onNavigate('schedule')}
            className="flex flex-col items-center gap-1 flex-1 py-2"
          >
            <Calendar size={20} color="#999" />
            <span className="text-[11px]" style={{ color: '#999' }}>Schedule</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 flex-1 py-2"
          >
            <User size={20} color="#999" />
            <span className="text-[11px]" style={{ color: '#999' }}>Profile</span>
          </button>
        </div>
      )}
    </div>
  );
}
