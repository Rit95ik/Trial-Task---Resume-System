import { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import { resumeAPI, authAPI } from './utils/api';
import { TEMPLATES } from './components/ResumeTemplates';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES.CLASSIC);
  const [resumeData, setResumeData] = useState({
    personalInfo: { name: '', email: '', phone: '', linkedin: '', github: '' },
    education: [],
    experience: [],
    projects: [],
    skills: [],
    summary: '',
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authAPI.verify();
          if (response.success) {
            setUser(response.user);
            await loadResumeData();
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Load resume data from backend
  const loadResumeData = async () => {
    try {
      const response = await resumeAPI.get();
      if (response.success && response.resumeData) {
        setResumeData(response.resumeData);
      }
    } catch (error) {
      console.error('Error loading resume data:', error);
    }
  };

  const handleAuthSuccess = async (userData) => {
    setUser(userData);
    await loadResumeData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setResumeData({
      personalInfo: { name: '', email: '', phone: '', linkedin: '', github: '' },
      education: [],
      experience: [],
      projects: [],
      skills: [],
      summary: '',
    });
    showNotification('Logged out successfully', 'info');
  };

  const handleGenerateSummary = async () => {
    try {
      showNotification('Generating AI summary...', 'info');
      const response = await resumeAPI.generateSummary(resumeData);
      if (response.success) {
        setResumeData({
          ...resumeData,
          summary: response.summary,
        });
        showNotification('AI summary generated successfully!', 'success');
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Failed to generate summary',
        'error'
      );
    }
  };

  const handleSaveResume = async () => {
    try {
      showNotification('Saving resume...', 'info');
      const response = await resumeAPI.save(resumeData);
      if (response.success) {
        showNotification('Resume saved successfully!', 'success');
      }
    } catch (error) {
      showNotification(
        error.response?.data?.message || 'Failed to save resume',
        'error'
      );
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-500'
                : notification.type === 'error'
                ? 'bg-red-500'
                : 'bg-blue-500'
            } text-white`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Resume Builder</h1>
            <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Split Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div className="h-[calc(100vh-180px)]">
            <ResumeForm
              resumeData={resumeData}
              setResumeData={setResumeData}
              onGenerateSummary={handleGenerateSummary}
              onSave={handleSaveResume}
            />
          </div>

          {/* Right Side - Preview */}
          <div className="h-[calc(100vh-180px)]">
            <ResumePreview 
              resumeData={resumeData} 
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
