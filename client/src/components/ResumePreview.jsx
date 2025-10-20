import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import { TEMPLATES } from './ResumeTemplates';

const ResumePreview = ({ resumeData, selectedTemplate, onTemplateChange }) => {
  const { personalInfo, education, experience, projects, skills, summary } = resumeData;
  const resumeRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      // Show loading state
      const button = document.querySelector('#download-btn');
      const originalText = button.textContent;
      button.textContent = 'Generating PDF...';
      button.disabled = true;

      // Capture the resume content
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Download with personalized filename
      const fileName = personalInfo.name 
        ? `${personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`
        : 'My_Resume.pdf';
      pdf.save(fileName);

      // Reset button
      button.textContent = originalText;
      button.disabled = false;
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case TEMPLATES.MODERN:
        return <ModernTemplate resumeData={resumeData} />;
      case TEMPLATES.MINIMAL:
        return <MinimalTemplate resumeData={resumeData} />;
      case TEMPLATES.CREATIVE:
        return <CreativeTemplate resumeData={resumeData} />;
      case TEMPLATES.CLASSIC:
      default:
        return <ClassicTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl h-full overflow-y-auto">
      {/* Template Selector & Download Button */}
      <div className="sticky top-0 bg-gray-800 p-4 z-10 rounded-t-xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white text-sm font-semibold">Choose Template:</h3>
          <button
            id="download-btn"
            onClick={handleDownloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(TEMPLATES).map(([key, value]) => (
            <button
              key={value}
              onClick={() => onTemplateChange(value)}
              className={`p-2 rounded-lg text-xs font-medium transition-all ${
                selectedTemplate === value
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="text-lg mb-1">
                {value === TEMPLATES.CLASSIC && '📄'}
                {value === TEMPLATES.MODERN && '🎨'}
                {value === TEMPLATES.MINIMAL && '✨'}
                {value === TEMPLATES.CREATIVE && '🚀'}
              </div>
              <div className="capitalize">{value}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Content */}
      <div className="p-4">
        <div ref={resumeRef}>
          {renderTemplate()}
        </div>

        {/* Empty State */}
        {!personalInfo.name && education.length === 0 && experience.length === 0 && 
         projects.length === 0 && skills.length === 0 && !summary && (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">Start filling out your resume on the left</p>
            <p className="text-sm mt-2">Your changes will appear here in real-time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
