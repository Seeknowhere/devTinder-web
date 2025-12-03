import { useSelector } from "react-redux";

const ViewProfile = () => {
  const user = useSelector((store) => store.user);

  if (!user?.data) return null;

  const { firstName, lastName, age, gender, about, photoUrl } = user.data;

  return (
    <div className="min-h-screen bg-[#14151a] text-white flex justify-center p-4 md:p-8 font-sans">
      
      {/* Profile Card Wrapper */}
      <div className="w-full max-w-7xl space-y-4">
        
        {/* TOP SECTION: Cover + User Details */}
        <div className="bg-[#1e232f] rounded-2xl overflow-hidden shadow-xl">
          
          {/* Cover Image */}
          <div className="h-48 md:h-64 w-full relative">
            <img 
              src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop" 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Content */}
          <div className="px-6 md:px-8 pb-6 relative">
            
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-20 gap-4 md:gap-6">
              
              {/* Avatar Image */}
              <div className="relative shrink-0">
                <img 
                  src={photoUrl}
                  alt="Profile" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#1e232f] object-cover shadow-md"
                />
              </div>

              {/* User Info */}
              <div className="flex-1 mt-2 md:mt-0 pb-2">
                <h1 className="text-3xl font-bold text-white">Aelin Galathynius</h1>
                <p className="text-gray-400 font-medium">Senior Front-End Developer</p>
                
                {/* Meta Details (Location/Gender) */}
                <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <span>Terrasen, Erilea</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <span>Female</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0 md:mb-4">
                <button className="flex-1 md:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Edit Profile
                </button>
                {/* Scissors Icon */}
                <button className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m7.841 18.246 7.482-7.482a4.407 4.407 0 0 0-6.218-6.218l-7.482 7.482m1.233 1.233a4.5 4.5 0 0 0 6.515 6.527l5.463 9.288a.75.75 0 1 0 1.227-1.312l-9.288-5.464a4.5 4.5 0 0 0-6.527-6.515Z" />
                    </svg>
                </button>
                {/* Owl Icon */}
                <button className="p-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Two Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* About Me Card */}
            <div className="bg-[#1e232f] p-6 rounded-2xl flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-bold text-white">About Me</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                        Love to read books during my spare time
                    </p>
                </div>
            </div>

            {/* Skills Card */}
            <div className="bg-[#1e232f] p-6 rounded-2xl relative overflow-hidden">
                <h2 className="text-xl font-bold text-white mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {['React', 'JavaScript', 'CSS3', 'UI/UX Design', 'Python'].map((skill) => (
                        <span key={skill} className="bg-[#2a303c] text-gray-200 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#323945] transition-colors cursor-default">
                            {skill}
                        </span>
                    ))}
                </div>
                {/* Decorative sparkle icon in bottom right */}
                <div className="absolute -bottom-2 -right-2">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="#6b7280" className="opacity-20 transform rotate-12">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                </div>
            </div>

        </div>
      </div>
      </div>
  );
};

export default ViewProfile;
