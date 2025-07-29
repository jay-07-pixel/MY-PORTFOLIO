import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

interface ConsoleProps {
  isVisible: boolean;
  onClose: () => void;
}

const Console: React.FC<ConsoleProps> = ({ isVisible, onClose }) => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<{type: 'input' | 'output', content: string}[]>([
    { type: 'output', content: 'Portfolio OS [Version 1.0.0]' },
    { type: 'output', content: 'Type "help" for available commands.' },
    { type: 'output', content: '> ' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever history updates
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  // Focus input when console becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      processCommand(input.trim());
      setInput('');
    }
  };

  const processCommand = (cmd: string) => {
    // Add command to history
    setHistory(prev => [...prev, { type: 'input', content: cmd }]);

    // Process commands
    let response: string[] = [];

    const lowerCmd = cmd.toLowerCase();

    switch(lowerCmd) {
      case 'help':
        response = [
          'Available commands:',
          '  about       - Learn about me',
          '  skills      - View my technical skills',
          '  projects    - Browse my projects',
          '  contact     - Get my contact info',
          '  goto [page] - Navigate to a section',
          '  clear       - Clear the console',
          '  exit        - Close the console'
        ];
        break;
      
      case 'about':
        response = [
          'Hi, I\'m [Your Name]!',
          'I\'m a front-end developer passionate about creating',
          'beautiful and functional web applications.',
          'I specialize in React, TypeScript, and modern CSS.',
          'Type "skills" to learn more about my technical expertise.'
        ];
        break;
      
      case 'skills':
        response = [
          'Technical Skills:',
          '• Frontend: React, TypeScript, HTML5, CSS3, Tailwind CSS',
          '• State Management: Redux, Context API',
          '• Animation: Framer Motion',
          '• Tools: Git, Webpack, npm/yarn',
          '• UI/UX: Responsive Design, Accessibility'
        ];
        break;
      
      case 'projects':
        response = [
          'Featured Projects:',
          '1. Portfolio Website',
          '   - Modern React portfolio with tech theme',
          '   - Built with React, TypeScript, Tailwind CSS',
          '2. [Project Name]',
          '   - [Project description]',
          '3. [Project Name]',
          '   - [Project description]',
          '',
          'Type "goto projects" to view more details.'
        ];
        break;
      
      case 'contact':
        response = [
          'Contact Information:',
          '• Email: jayjobanputra007@gmail.com',
          '• LinkedIn: linkedin.com/in/jay-jobanputra-1b442931b',
          '• Phone: +91 9822961688',
          '• Location: Kopargoan, Maharashtra, India'
        ];
        break;
      
      case 'clear':
        setHistory([
          { type: 'output', content: '> ' }
        ]);
        return;
      
      case 'exit':
        onClose();
        return;
        
      default:
        // Check for goto command
        if (lowerCmd.startsWith('goto ')) {
          const section = lowerCmd.substring(5).trim();
          const validSections = ['home', 'about', 'skills', 'projects', 'contact'];
          
          if (validSections.includes(section)) {
            response = [`Navigating to ${section} section...`];
            
            // Scroll to the section
            const element = document.getElementById(section);
            if (element) {
              setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
              }, 500);
            }
          } else {
            response = [`Error: Unknown section "${section}"`];
          }
        } else {
          response = [`Command not recognized: ${cmd}`, 'Type "help" for available commands.'];
        }
    }

    // Add response to history
    setTimeout(() => {
      setHistory(prev => [
        ...prev, 
        ...response.map(line => ({ type: 'output' as const, content: line })),
        { type: 'output', content: '> ' }
      ]);
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 mx-auto w-full md:w-3/4 lg:w-1/2 bg-dark-bg border border-primary/40 rounded-t-lg shadow-lg"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      style={{ maxHeight: '50vh' }}
    >
      {/* Console header */}
      <div className="flex items-center justify-between bg-gray-900 p-2 rounded-t-lg border-b border-primary/20">
        <div className="text-sm font-mono text-primary">Portfolio Terminal</div>
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
            aria-label="Close console"
          >
            <span className="text-xs text-white">&times;</span>
          </button>
        </div>
      </div>
      
      {/* Console output */}
      <div className="p-4 font-mono text-sm text-light-text overflow-y-auto" style={{ maxHeight: 'calc(50vh - 3rem)' }}>
        {history.map((entry, index) => (
          <div key={index} className={`mb-1 ${entry.type === 'input' ? 'pl-2 text-primary' : ''}`}>
            {entry.type === 'input' ? `> ${entry.content}` : entry.content}
          </div>
        ))}
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="flex-grow bg-transparent outline-none text-primary caret-primary font-mono text-sm"
            autoFocus
          />
        </div>
        <div ref={consoleEndRef} />
      </div>
    </motion.div>
  );
};

export default Console; 