import React, { useEffect, useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/layout/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import ScrollProgress from './components/layout/ScrollProgress';
import TechBackground from './components/layout/TechBackground';
import CircuitPattern from './components/layout/CircuitPattern';
import Console from './components/layout/Console';
import KeyboardShortcuts from './components/layout/KeyboardShortcuts';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import { Theme, Project, Skill } from './types/custom';

// Define types for state
interface AppState {
  isLoading: boolean;
  loadingProgress: number;
  showScannerEffect: boolean;
  contentVisible: boolean;
  showConsole: boolean;
}

// Define types for motion components
interface MotionDivProps extends MotionProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const App: React.FC = () => {
  // Add states for loading and transitions
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showScannerEffect, setShowScannerEffect] = useState<boolean>(false);
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [showConsole, setShowConsole] = useState<boolean>(false);

  // Function to toggle console visibility
  const toggleConsole = useCallback(() => {
    setShowConsole((prev: boolean) => !prev);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+` or Ctrl+~ (backtick/tilde key) opens console
      if ((e.key === '`' || e.key === '~') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleConsole();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleConsole]);

  useEffect(() => {
    // Simulate loading time with smoother progress
    const updateProgress = () => {
      setLoadingProgress((prev: number) => {
        // More consistent progress increments
        const increment = (100 - prev) * 0.1;
        const newProgress = prev + (increment > 0.5 ? increment : 0.5);
        return Math.min(newProgress, 99); // Cap at 99% until fully loaded
      });
    };
    
    // Update progress at a steady frame rate
    const progressInterval = setInterval(updateProgress, 100);
    
    // Complete loading after a reasonable time
    const loadingTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setLoadingProgress(100);
      
      // Small delay before removing loader to ensure 100% is visible
      setTimeout(() => {
        setIsLoading(false);
        
        // Add small delay before showing content for smoother transition
        setTimeout(() => {
          setContentVisible(true);
          
          // Show scanner effect with a small delay for visual interest
          setTimeout(() => {
            setShowScannerEffect(true);
            setTimeout(() => setShowScannerEffect(false), 2500);
          }, 300);
        }, 100);
      }, 300);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading ? (
          // Tech-themed Loading screen
          <motion.div 
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-screen w-full flex flex-col items-center justify-center bg-dark-bg relative"
          >
            {/* Simple circuit background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            {/* Binary code animation - reduced amount */}
            <div className="absolute inset-0 overflow-hidden font-mono text-xs opacity-20">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-primary whitespace-nowrap"
                  style={{
                    top: `${i * 20}%`,
                    left: `${Math.random() * 100}%`,
                    transform: `translateX(-50%)`,
                    animation: `floating ${Math.random() * 5 + 8}s linear infinite`,
                  }}
                >
                  {Array.from({ length: 15 }).map(() => 
                    Math.round(Math.random())).join('')}
                </div>
              ))}
            </div>
            
            <div className="text-center z-10">
              <div className="flex flex-col items-center space-y-4">
                <motion.div 
                  className="w-20 h-20 relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ willChange: "transform" }}
                >
                  <div className="absolute inset-0 border-2 border-primary/60 rounded-full" />
                  <div className="absolute inset-2 border-2 border-primary/40 rounded-full" />
                  <div className="absolute inset-4 border-2 border-primary/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
                
                <div className="w-64 h-2 bg-dark-bg border border-primary/30 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                    style={{ willChange: "width" }}
                  />
                </div>
                
                <div className="flex items-center font-mono">
                  <span className="text-primary text-sm">{Math.round(loadingProgress)}%</span>
                  <span className="ml-2 text-light-text/70 text-sm">Initializing system...</span>
                </div>
                
                <div className="text-xs text-primary/50 font-mono mt-4 max-w-xs text-center">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    &gt; Loading components...
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Main content with fade in animation
          <motion.div 
            className="relative"
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: contentVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Tech-themed background elements */}
            <TechBackground density={35} />
            <CircuitPattern opacity={0.15} />
            
            {/* Scanner line effect that appears briefly after loading */}
            {showScannerEffect && (
              <motion.div 
                className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 2.5, times: [0, 0.2, 1] }}
              >
                <div className="scanner-line" />
              </motion.div>
            )}
            
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
            
            {/* Terminal console */}
            <AnimatePresence>
              {showConsole && (
                <Console isVisible={showConsole} onClose={toggleConsole} />
              )}
            </AnimatePresence>
            
            {/* Console toggle button */}
            <button
              onClick={toggleConsole}
              className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-dark-bg border border-primary flex items-center justify-center shadow-lg hover:bg-gray-900 transition-colors duration-300 tech-glow"
              aria-label="Toggle terminal console"
              title="Press Ctrl+` to toggle terminal"
            >
              <span className="text-primary font-mono text-lg">{'>'}</span>
            </button>

            {/* Keyboard shortcuts component */}
            <KeyboardShortcuts />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
