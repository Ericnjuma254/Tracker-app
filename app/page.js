"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, AlertCircle, Clock, Target, TrendingUp } from 'lucide-react';

const EcommerceTracker = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [entries, setEntries] = useState(() => {
    try {
      if (typeof window === 'undefined') return {};
      const saved = localStorage.getItem('ecommerceProgress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    completed: false,
    hoursSpent: '',
    tasksCompleted: '',
    difficulties: '',
    blockers: '',
    solution: '',
    deadline: '',
    notes: '',
    mood: 'neutral'
  });

  // Save data to memory
  useEffect(() => {
    localStorage.setItem('ecommerceProgress', JSON.stringify(entries));
  }, [entries]);

  const dailyPlan = {
    1: { week: 1, title: "Environment Setup", tasks: ["Install Node.js, npm, Cursor", "Create GitHub account", "Learn Git basics"] },
    2: { week: 1, title: "First Next.js Project", tasks: ["Create Next.js app", "Run dev server", "Customize homepage"] },
    3: { week: 1, title: "React Basics", tasks: ["Learn components, props, state", "Create ProductCard component", "Display 3 dummy products"] },
    4: { week: 1, title: "Styling with Tailwind", tasks: ["Install Tailwind CSS", "Style ProductCard", "Create Header component"] },
    5: { week: 1, title: "Supabase Setup", tasks: ["Create Supabase account", "Watch crash course", "Explore dashboard"] },
    6: { week: 1, title: "Database Design", tasks: ["Design schema on paper", "Create products table", "Add 5 sample products"] },
    7: { week: 1, title: "Week 1 Review", tasks: ["Review week's work", "Push code to GitHub", "Write down questions"] },
    8: { week: 2, title: "Connect to Supabase", tasks: ["Install Supabase client", "Create config file", "Test connection"] },
    9: { week: 2, title: "Christmas/Light Day", tasks: ["Read Supabase docs", "Experiment with queries", "Rest if needed"] },
    10: { week: 2, title: "Fetch Real Data", tasks: ["Fetch products from DB", "Handle loading states", "Handle errors"] },
    11: { week: 2, title: "Product Detail Page", tasks: ["Create dynamic route", "Fetch single product", "Display full info"] },
    12: { week: 2, title: "Product Images", tasks: ["Upload images to Storage", "Update products table", "Display images"] },
    13: { week: 2, title: "Navigation & Pages", tasks: ["Create menu", "Add Home, Shop, About, Contact", "Ensure routing works"] },
    14: { week: 2, title: "Search & Filter", tasks: ["Create search bar", "Filter by name", "Add category filter"] },
    15: { week: 3, title: "NYE - Light Day", tasks: ["Learn React Context", "Watch Context tutorial", "Plan cart structure"] },
    16: { week: 3, title: "New Year - Cart Setup", tasks: ["Create CartContext", "Set up basic structure", "Rest if needed"] },
    17: { week: 3, title: "Add to Cart", tasks: ["Add button to ProductCard", "Store items in Context", "Show cart count"] },
    18: { week: 3, title: "Cart Page", tasks: ["Create /cart page", "Display all items", "Show subtotal"] },
    19: { week: 3, title: "Cart Controls", tasks: ["Add +/- buttons", "Remove from cart button", "Persist to localStorage"] },
    20: { week: 3, title: "Cart UX", tasks: ["Empty cart state", "Continue shopping button", "Improve styling"] },
    21: { week: 3, title: "Week 2-3 Review", tasks: ["Fix bugs", "Refactor code", "Update GitHub"] },
    22: { week: 4, title: "Auth Basics", tasks: ["Learn Supabase Auth", "Create customers table", "Enable Email auth"] },
    23: { week: 4, title: "Login Page", tasks: ["Create /login", "Implement login", "Test with dummy account"] },
    24: { week: 4, title: "Sign Up Page", tasks: ["Create /signup", "Implement registration", "Add validation"] },
    25: { week: 4, title: "Auth Context", tasks: ["Create auth hook", "Protect routes", "Add logout"] },
    26: { week: 4, title: "User Profile", tasks: ["Create profile page", "Display user info", "Allow updates"] },
    27: { week: 4, title: "Password Reset", tasks: ["Forgot password flow", "Email verification", "Test auth"] },
    28: { week: 4, title: "Month 1 Milestone", tasks: ["Test everything", "Create demo video", "Celebrate! 🎉"] }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries({
      ...entries,
      [currentDay]: {
        ...formData,
        date: new Date().toISOString(),
        dayInfo: dailyPlan[currentDay]
      }
    });
    setShowForm(false);
    setFormData({
      completed: false,
      hoursSpent: '',
      tasksCompleted: '',
      difficulties: '',
      blockers: '',
      solution: '',
      deadline: '',
      notes: '',
      mood: 'neutral'
    });
  };

  const getProgress = () => {
    const completed = Object.values(entries).filter(e => e.completed).length;
    return Math.round((completed / 90) * 100);
  };

  const getStreak = () => {
    let streak = 0;
    for (let i = currentDay; i >= 1; i--) {
      if (entries[i]?.completed) streak++;
      else break;
    }
    return streak;
  };

  const dayEntry = entries[currentDay];
  const todaysPlan = dailyPlan[currentDay] || dailyPlan[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            90-Day E-Commerce Build Tracker
          </h1>
          <p className="text-gray-600">Your accountability partner for building your store</p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Calendar size={20} />
                <span className="font-semibold">Current Day</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{currentDay}/90</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <TrendingUp size={20} />
                <span className="font-semibold">Progress</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{getProgress()}%</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Target size={20} />
                <span className="font-semibold">Streak</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{getStreak()} days</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 mb-1">
                <CheckCircle size={20} />
                <span className="font-semibold">Completed</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {Object.values(entries).filter(e => e.completed).length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column - Today's Plan */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Day {currentDay} - Week {todaysPlan.week}
              </h2>
              <h3 className="text-lg font-semibold text-indigo-600 mb-3">
                {todaysPlan.title}
              </h3>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm font-semibold text-gray-700">Today&apos;s Tasks:</p>
                {todaysPlan.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Circle size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{task}</span>
                  </div>
                ))}
              </div>

              {/* Day Navigation */}
              <div className="flex items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                  className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  disabled={currentDay === 1}
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setCurrentDay(Math.min(90, currentDay + 1))}
                  className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  disabled={currentDay === 90}
                >
                  Next →
                </button>
                <button
                  onClick={() => setCurrentDay(Math.min(90, currentDay + 1))}
                  className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Go to Today
                </button>
              </div>

              {!dayEntry && !showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Check In for Day {currentDay}
                </button>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="font-bold text-gray-800 mb-3">This Week</h3>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7].map(offset => {
                  const day = Math.floor((currentDay - 1) / 7) * 7 + offset;
                  if (day > 90) return null;
                  const entry = entries[day];
                  return (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Day {day}</span>
                      {entry?.completed ? (
                        <CheckCircle size={18} className="text-green-500" />
                      ) : day < currentDay ? (
                        <AlertCircle size={18} className="text-orange-500" />
                      ) : (
                        <Circle size={18} className="text-gray-300" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Check-in Form or Entry Display */}
          <div className="md:col-span-2">
            {showForm ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Day {currentDay} Check-In
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Completion Status */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="completed"
                      checked={formData.completed}
                      onChange={(e) => setFormData({...formData, completed: e.target.checked})}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <label htmlFor="completed" className="font-semibold text-gray-700">
                      I completed today&apos;s tasks
                    </label>
                  </div>

                  {/* Hours Spent */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Hours Spent Today
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.hoursSpent}
                      onChange={(e) => setFormData({...formData, hoursSpent: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., 2.5"
                    />
                  </div>

                  {/* Mood */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How did today feel?
                    </label>
                    <div className="flex gap-2">
                      {['great', 'good', 'neutral', 'challenging', 'frustrated'].map(mood => (
                        <button
                          key={mood}
                          type="button"
                          onClick={() => setFormData({...formData, mood})}
                          className={`px-3 py-2 rounded-lg text-sm capitalize ${
                            formData.mood === mood 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                        >
                          {mood}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tasks Completed */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      What did you complete today?
                    </label>
                    <textarea
                      value={formData.tasksCompleted}
                      onChange={(e) => setFormData({...formData, tasksCompleted: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      rows="3"
                      placeholder="List what you accomplished..."
                    />
                  </div>

                  {/* Difficulties */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      What was difficult today?
                    </label>
                    <textarea
                      value={formData.difficulties}
                      onChange={(e) => setFormData({...formData, difficulties: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      rows="3"
                      placeholder="Describe any challenges..."
                    />
                  </div>

                  {/* Blockers */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      What&apos;s blocking you from moving forward?
                    </label>
                    <textarea
                      value={formData.blockers}
                      onChange={(e) => setFormData({...formData, blockers: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      rows="2"
                      placeholder="Any blockers? (Leave empty if none)"
                    />
                  </div>

                  {/* Solution Plan */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      How will you handle the problem?
                    </label>
                    <textarea
                      value={formData.solution}
                      onChange={(e) => setFormData({...formData, solution: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      rows="3"
                      placeholder="Your action plan..."
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Deadline to resolve blockers
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      rows="2"
                      placeholder="Any other thoughts..."
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
                    >
                      Save Check-In
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : dayEntry ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Day {currentDay} Summary
                  </h2>
                  <button
                    onClick={() => {
                      setFormData(dayEntry);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center gap-4">
                    {dayEntry.completed ? (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                        <CheckCircle size={18} />
                        <span className="font-semibold">Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                        <AlertCircle size={18} />
                        <span className="font-semibold">Incomplete</span>
                      </div>
                    )}
                    
                    {dayEntry.hoursSpent && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={18} />
                        <span>{dayEntry.hoursSpent} hours</span>
                      </div>
                    )}

                    <div className={`px-3 py-1 rounded-full text-sm capitalize ${
                      dayEntry.mood === 'great' ? 'bg-green-100 text-green-700' :
                      dayEntry.mood === 'good' ? 'bg-blue-100 text-blue-700' :
                      dayEntry.mood === 'neutral' ? 'bg-gray-100 text-gray-700' :
                      dayEntry.mood === 'challenging' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {dayEntry.mood}
                    </div>
                  </div>

                  {dayEntry.tasksCompleted && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">✅ Completed</h3>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                        {dayEntry.tasksCompleted}
                      </p>
                    </div>
                  )}

                  {dayEntry.difficulties && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">😓 Difficulties</h3>
                      <p className="text-gray-600 bg-orange-50 p-3 rounded-lg whitespace-pre-wrap">
                        {dayEntry.difficulties}
                      </p>
                    </div>
                  )}

                  {dayEntry.blockers && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">🚧 Blockers</h3>
                      <p className="text-gray-600 bg-red-50 p-3 rounded-lg whitespace-pre-wrap">
                        {dayEntry.blockers}
                      </p>
                    </div>
                  )}

                  {dayEntry.solution && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">💡 Solution Plan</h3>
                      <p className="text-gray-600 bg-blue-50 p-3 rounded-lg whitespace-pre-wrap">
                        {dayEntry.solution}
                      </p>
                    </div>
                  )}

                  {dayEntry.deadline && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">⏰ Deadline</h3>
                      <p className="text-gray-600 bg-purple-50 p-3 rounded-lg">
                        {new Date(dayEntry.deadline).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}

                  {dayEntry.notes && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">📝 Notes</h3>
                      <p className="text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">
                        {dayEntry.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <Circle size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No check-in yet for Day {currentDay}
                </h3>
                <p className="text-gray-500 mb-6">
                  Click the button on the left to record your progress
                </p>
              </div>
            )}

            {/* All Entries Table */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress History</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Day</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Hours</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Mood</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700">Blockers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(entries)
                      .sort(([a], [b]) => Number(b) - Number(a))
                      .slice(0, 10)
                      .map(([day, entry]) => (
                        <tr key={day} className="border-b hover:bg-gray-50 cursor-pointer"
                            onClick={() => setCurrentDay(Number(day))}>
                          <td className="py-2 px-2 text-sm">Day {day}</td>
                          <td className="py-2 px-2">
                            {entry.completed ? (
                              <CheckCircle size={18} className="text-green-500" />
                            ) : (
                              <AlertCircle size={18} className="text-orange-500" />
                            )}
                          </td>
                          <td className="py-2 px-2 text-sm">{entry.hoursSpent || '-'}</td>
                          <td className="py-2 px-2 text-sm capitalize">{entry.mood}</td>
                          <td className="py-2 px-2 text-sm">
                            {entry.blockers ? '⚠️ Yes' : '✓ None'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {Object.keys(entries).length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No entries yet. Start your journey today!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
     return <EcommerceTracker />;
   }