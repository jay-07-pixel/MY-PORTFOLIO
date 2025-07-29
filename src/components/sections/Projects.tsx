import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimesCircle } from 'react-icons/fa';
import CodeSnippet from '../layout/CodeSnippet';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
  image: string;
  longDescription: string;
  demoType?: 'video' | 'link';
  codeSnippet?: {
    code: string;
    language: string;
    fileName: string;
    theme?: 'cyberpunk' | 'matrix' | 'terminal';
  };
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const projects: Project[] = [
    {
      id: 1,
      title: 'FaceAttend - Attendance System',
      description: 'A modern attendance management system for Government Offices in Hingoli sub-division using facial recognition and location verification.',
      techStack: ['Java', 'Firebase', 'ML Kit', 'Android SDK', 'Google Play Services'],
      github: 'https://github.com/jay-07-pixel/FACEATTEND--FINAL-PUSH.git',
      demo: '/videos/FACEATTEND LIVE DEMO.mp4', // Updated path for deployment
      demoType: 'video',
      image: 'bg-gradient-to-br from-primary/20 to-secondary/20',
      longDescription: 'FaceAttend is a sophisticated attendance management system designed specifically for Government Offices in the Hingoli sub-division. The application leverages facial recognition and GPS-based location verification to ensure accurate attendance tracking and prevent proxy attendance. Key features include face-based authentication, location verification with geofencing, multiple office support, comprehensive reporting, and taluka-based organization for Hingoli and Sengaon regions.',
      codeSnippet: {
        language: 'java',
        fileName: 'FaceRecognitionManager.java',
        theme: 'cyberpunk',
        code: `// Face Recognition Manager for handling face detection and verification
import com.google.mlkit.vision.face.FaceDetection;
import com.google.mlkit.vision.face.FaceDetector;
import com.google.mlkit.vision.face.FaceDetectorOptions;

public class FaceRecognitionManager {
    private FaceDetector detector;
    private static final float SIMILARITY_THRESHOLD = 0.85f;

    public FaceRecognitionManager() {
        // Configure face detector with high accuracy
        FaceDetectorOptions options = new FaceDetectorOptions.Builder()
            .setPerformanceMode(FaceDetectorOptions.PERFORMANCE_MODE_ACCURATE)
            .setLandmarkMode(FaceDetectorOptions.LANDMARK_MODE_ALL)
            .setClassificationMode(FaceDetectorOptions.CLASSIFICATION_MODE_ALL)
            .build();
        
        detector = FaceDetection.getClient(options);
    }

    public void verifyUserFace(Bitmap currentImage, String userId) {
        // Process the image and detect faces
        InputImage image = InputImage.fromBitmap(currentImage, 0);
        
        detector.process(image)
            .addOnSuccessListener(faces -> {
                if (faces.isEmpty()) {
                    notifyError("No face detected");
                    return;
                }
                
                if (faces.size() > 1) {
                    notifyError("Multiple faces detected");
                    return;
                }

                // Get stored face data for comparison
                getUserStoredFaceData(userId)
                    .addOnSuccessListener(storedFaceData -> {
                        float similarity = compareFaces(
                            faces.get(0), 
                            storedFaceData
                        );
                        
                        if (similarity >= SIMILARITY_THRESHOLD) {
                            markAttendance(userId);
                        } else {
                            notifyError("Face verification failed");
                        }
                    });
            })
            .addOnFailureListener(e -> 
                notifyError("Face detection failed: " + e.getMessage())
            );
    }

    private void markAttendance(String userId) {
        // Get current location
        locationManager.getCurrentLocation()
            .addOnSuccessListener(location -> {
                // Verify if user is within office premises
                if (isWithinOfficeRadius(location)) {
                    // Record attendance with timestamp
                    AttendanceRecord record = new AttendanceRecord(
                        userId,
                        new Date(),
                        location
                    );
                    
                    // Save to Firebase
                    firestore.collection("attendance")
                        .add(record)
                        .addOnSuccessListener(documentRef -> 
                            notifySuccess("Attendance marked successfully")
                        );
      } else {
                    notifyError("Not within office premises");
  }
});
    }
}`
      }
    },
    {
      id: 2,
      title: '3D Learning Center Management System',
      description: 'A comprehensive React Native application for managing 3D printing learning centers, built with Expo and Firebase.',
      techStack: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Razorpay'],
      github: 'https://github.com/jay-07-pixel/3D-LAST-2ND-PUSH.git',
      demo: '/videos/WhatsApp Video 2025-07-29 at 14.02.34_36112038.mp4', // Updated to local video
      demoType: 'video',
      image: 'bg-gradient-to-br from-secondary/20 to-primary/20',
      longDescription: 'A sophisticated management system for 3D printing learning centers featuring role-based access for Directors, Coordinators, and Students. Directors can manage centers, coordinators, and track finances. Coordinators handle student management, documents, and support tickets. Students can track their learning journey, attendance, and raise support tickets. The system includes real-time notifications, payment integration via Razorpay, and comprehensive reporting.',
      codeSnippet: {
        language: 'typescript',
        fileName: 'RoleBasedNavigation.tsx',
        theme: 'cyberpunk',
        code: `import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Screen imports for different roles
import DirectorDashboard from '../screens/director/Dashboard';
import CoordinatorDashboard from '../screens/coordinator/Dashboard';
import StudentDashboard from '../screens/student/Dashboard';
import CenterManagement from '../screens/director/CenterManagement';
import StudentProgress from '../screens/coordinator/StudentProgress';
import LearningJourney from '../screens/student/LearningJourney';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const { user, userRole } = useAuth();

  // Custom header styling
  const screenOptions = {
    headerStyle: {
      backgroundColor: '#1a1a1a',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  // Role-based navigation rendering
  const renderRoleBasedScreens = () => {
    switch (userRole) {
      case 'director':
        return (
          <>
            <Stack.Screen 
              name="DirectorDashboard" 
              component={DirectorDashboard}
              options={{ title: 'Director Dashboard' }}
            />
            <Stack.Screen 
              name="CenterManagement" 
              component={CenterManagement}
              options={{ title: 'Manage Centers' }}
            />
            {/* More director screens */}
          </>
        );

      case 'coordinator':
        return (
          <>
            <Stack.Screen 
              name="CoordinatorDashboard" 
              component={CoordinatorDashboard}
              options={{ title: 'Coordinator Dashboard' }}
            />
            <Stack.Screen 
              name="StudentProgress" 
              component={StudentProgress}
              options={{ title: 'Student Progress' }}
            />
            {/* More coordinator screens */}
          </>
        );

      case 'student':
        return (
          <>
            <Stack.Screen 
              name="StudentDashboard" 
              component={StudentDashboard}
              options={{ title: 'Student Dashboard' }}
            />
            <Stack.Screen 
              name="LearningJourney" 
              component={LearningJourney}
              options={{ title: 'My Learning Journey' }}
            />
            {/* More student screens */}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {renderRoleBasedScreens()}
    </Stack.Navigator>
  );
};`
      }
    },
    {
      id: 3,
      title: 'Laberlink',
      description: 'An Android application connecting farmers with agricultural laborers through real-time location-based matching.',
      techStack: ['Android', 'Java', 'Firebase', 'Google Maps API', 'Material Design'],
      github: 'https://github.com/jay-07-pixel/Laberlink', // Updated GitHub repo link
      demo: '/videos/WhatsApp Video 2025-07-29 at 14.28.24_e00770b3.mp4', // Updated to local video
      demoType: 'video',
      image: 'bg-gradient-to-br from-[#4CAF50]/30 to-[#81C784]/20',
      longDescription: 'LaberLink is an innovative Android application designed to bridge the gap between farmers and agricultural laborers. It features real-time location-based matching, comprehensive job management, weather information integration, and a knowledge base for agricultural practices. The app includes features for both farmers (finding laborers, job posting, weather updates) and laborers (profile management, job applications, work scheduling). Additional features include government scheme access, agricultural knowledge base, and multi-language chatbot support.',
      codeSnippet: {
        language: 'java',
        fileName: 'NearbyLaborersManager.java',
        theme: 'cyberpunk',
        code: `import com.google.android.gms.maps.model.LatLng;
import com.google.firebase.firestore.GeoPoint;
import com.google.firebase.firestore.Query;

public class NearbyLaborersManager {
    private static final double EARTH_RADIUS = 6371.0; // Earth's radius in kilometers
    private final FirebaseFirestore db;
    private final GeoPoint farmerLocation;
    private final double searchRadius; // in kilometers

    public NearbyLaborersManager(GeoPoint farmerLocation, double searchRadius) {
        this.db = FirebaseFirestore.getInstance();
        this.farmerLocation = farmerLocation;
        this.searchRadius = searchRadius;
    }

    public void findNearbyLaborers(List<String> requiredSkills, 
                                 OnLaborersFoundListener listener) {
        // Calculate the search bounds
        double lat = farmerLocation.getLatitude();
        double lon = farmerLocation.getLongitude();
        double angularRadius = searchRadius / EARTH_RADIUS;

        // Calculate the bounding box for initial filtering
        double minLat = lat - Math.toDegrees(angularRadius);
        double maxLat = lat + Math.toDegrees(angularRadius);
        double minLon = lon - Math.toDegrees(angularRadius / 
                       Math.cos(Math.toRadians(lat)));
        double maxLon = lon + Math.toDegrees(angularRadius / 
                       Math.cos(Math.toRadians(lat)));

        // Query Firestore for laborers within the bounding box
        db.collection("laborers")
          .whereGreaterThanOrEqualTo("location.latitude", minLat)
          .whereLessThanOrEqualTo("location.latitude", maxLat)
          .whereArrayContainsAny("skills", requiredSkills)
          .whereEqualTo("isAvailable", true)
          .get()
          .addOnSuccessListener(querySnapshot -> {
              List<Laborer> nearbyLaborers = new ArrayList<>();
              
              for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                  GeoPoint laborerLocation = document.getGeoPoint("location");
                  
                  // Calculate exact distance
                  double distance = calculateHaversineDistance(
                      farmerLocation,
                      laborerLocation
                  );
                  
                  // Only include if within exact radius
                  if (distance <= searchRadius) {
                      Laborer laborer = document.toObject(Laborer.class);
                      laborer.setDistance(distance);
                      nearbyLaborers.add(laborer);
                  }
              }
              
              // Sort by distance
              Collections.sort(nearbyLaborers, 
                  (l1, l2) -> Double.compare(l1.getDistance(), l2.getDistance())
              );
              
              listener.onLaborersFound(nearbyLaborers);
          })
          .addOnFailureListener(e -> 
              listener.onError("Failed to find nearby laborers: " + e.getMessage())
          );
    }

    private double calculateHaversineDistance(GeoPoint point1, GeoPoint point2) {
        double lat1 = Math.toRadians(point1.getLatitude());
        double lon1 = Math.toRadians(point1.getLongitude());
        double lat2 = Math.toRadians(point2.getLatitude());
        double lon2 = Math.toRadians(point2.getLongitude());

        double dLat = lat2 - lat1;
        double dLon = lon2 - lon1;

        double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                   Math.cos(lat1) * Math.cos(lat2) *
                   Math.sin(dLon/2) * Math.sin(dLon/2);
                   
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        return EARTH_RADIUS * c;
    }

    public interface OnLaborersFoundListener {
        void onLaborersFound(List<Laborer> laborers);
        void onError(String errorMessage);
  }
}`
      }
    },
    {
      id: 4,
      title: 'Sanjivani University Competition Platform',
      description: 'A modern web platform for managing and participating in university competitions, built with Firebase and modern web technologies.',
      techStack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Firebase', 'Font Awesome'],
      github: 'https://github.com/jay-07-pixel/webcompsu', // Updated GitHub repo link
      demo: '/videos/Screen Recording 2025-06-17 200117.mp4', // Updated to local video
      demoType: 'video',
      image: 'bg-gradient-to-br from-blue-500/30 to-purple-500/20',
      longDescription: 'A comprehensive platform for Sanjivani University\'s competition management. Students can register for various competitions (Technical, Cultural, Sports, Academic), track their progress, and view results. Administrators can create and manage competitions, track registrations, and announce results. The platform features secure authentication, role-based access control, responsive design, and real-time updates through Firebase.',
      codeSnippet: {
        language: 'javascript',
        fileName: 'CompetitionManager.js',
        theme: 'cyberpunk',
        code: `// Competition Management System with Firebase Integration
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, query, where, 
  addDoc, updateDoc, getDocs, orderBy 
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

class CompetitionManager {
  constructor() {
    this.db = getFirestore();
    this.auth = getAuth();
    this.competitionsRef = collection(this.db, 'competitions');
    this.registrationsRef = collection(this.db, 'registrations');
  }

  // Create a new competition (Admin only)
  async createCompetition(competitionData) {
    try {
      const user = this.auth.currentUser;
      if (!await this.isAdmin(user.uid)) {
        throw new Error('Unauthorized: Admin access required');
      }

      const competition = {
        ...competitionData,
        createdAt: new Date(),
        createdBy: user.uid,
        status: 'upcoming',
        participants: 0
      };

      const docRef = await addDoc(this.competitionsRef, competition);
      return { id: docRef.id, ...competition };
    } catch (error) {
      console.error('Error creating competition:', error);
      throw error;
    }
  }

  // Register for a competition (Students)
  async registerForCompetition(competitionId, studentData) {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('Authentication required');

      // Check if already registered
      const existingReg = query(
        this.registrationsRef,
        where('competitionId', '==', competitionId),
        where('studentId', '==', user.uid)
      );
      
      const snapshot = await getDocs(existingReg);
      if (!snapshot.empty) {
        throw new Error('Already registered for this competition');
      }

      // Validate competition availability
      const competition = await this.getCompetition(competitionId);
      if (competition.status !== 'upcoming' || 
          competition.participants >= competition.maxParticipants) {
        throw new Error('Registration not available');
      }

      // Create registration
      const registration = {
        competitionId,
        studentId: user.uid,
        studentData,
        registeredAt: new Date(),
        status: 'registered'
      };

      await addDoc(this.registrationsRef, registration);

      // Update competition participants count
      await updateDoc(this.competitionsRef, competitionId, {
        participants: competition.participants + 1
      });

      return registration;
    } catch (error) {
      console.error('Error registering for competition:', error);
      throw error;
    }
  }

  // Get upcoming competitions with filters
  async getUpcomingCompetitions(category = null) {
    try {
      let competitionsQuery = query(
        this.competitionsRef,
        where('status', '==', 'upcoming'),
        orderBy('startDate', 'asc')
      );

      if (category) {
        competitionsQuery = query(
          competitionsQuery,
          where('category', '==', category)
        );
      }

      const snapshot = await getDocs(competitionsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching competitions:', error);
      throw error;
    }
  }

  // Get student's registered competitions
  async getStudentCompetitions() {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('Authentication required');

      const registrationsQuery = query(
        this.registrationsRef,
        where('studentId', '==', user.uid)
      );

      const snapshot = await getDocs(registrationsQuery);
      const registrations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch competition details for each registration
      const competitions = await Promise.all(
        registrations.map(reg => this.getCompetition(reg.competitionId))
      );

      return competitions;
    } catch (error) {
      console.error('Error fetching student competitions:', error);
      throw error;
    }
  }

  // Helper method to check admin status
  async isAdmin(userId) {
    const adminDoc = await getDoc(doc(this.db, 'admins', userId));
    return adminDoc.exists();
  }
}`
      }
    }
  ];

  const handleDemoClick = (project: Project) => {
    if (project.demoType === 'video') {
      setShowVideo(true);
      setSelectedProject(project);
    } else {
      window.open(project.demo, '_blank');
    }
  };

  return (
    <section id="projects" className="py-20 bg-dark-bg">
      <div className="container-section">
        <h2 className="section-title">Projects</h2>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-bg border border-glow-effect rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300"
            >
              {/* Project image/placeholder */}
              <div className={`h-48 ${project.image} flex items-center justify-center`}>
                <h3 className="text-2xl font-bold text-light-text">{project.title}</h3>
              </div>
              
              <div className="p-6">
                <p className="text-light-text/80 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-glow-effect text-sm text-light-text rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => {
                      setSelectedProject(project);
                      setShowCode(false);
                    }}
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    View Details
                  </button>
                  
                  <div className="flex space-x-3">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-light-text hover:text-primary transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <FaGithub />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-light-text hover:text-primary transition-colors"
                      aria-label="Live Demo"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-bg rounded-lg overflow-hidden max-w-4xl w-full aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
                aria-label="Close video"
              >
                <FaTimesCircle size={24} />
              </button>
              
              {videoError ? (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>Error loading video. Please try again later.</p>
                </div>
              ) : (
                <video
                  controls
                  className="w-full h-full bg-black"
                  autoPlay
                  playsInline
                  onError={() => setVideoError(true)}
                  onLoadedData={() => setVideoError(false)}
                >
                  <source src={selectedProject.demo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && !showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-bg border border-glow-effect rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary">{selectedProject.title}</h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-light-text hover:text-primary transition-colors"
                  aria-label="Close modal"
                >
                  <FaTimesCircle />
                </button>
              </div>

              {!showCode ? (
                <>
                  <div className={`h-48 ${selectedProject.image} rounded-lg mb-6`}></div>
                  
                  <p className="text-light-text/90 mb-6">{selectedProject.longDescription}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-xl text-primary mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-glow-effect text-sm text-light-text rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-light-text/90 mb-6">No code snippet available for this project.</p>
              )}
              
              <div className="flex gap-4 flex-wrap">
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center gap-2"
                >
                  <FaGithub /> View Code
                </a>
                <button
                  onClick={() => handleDemoClick(selectedProject)}
                  className="btn-primary flex items-center gap-2"
                >
                  <FaExternalLinkAlt />
                  {selectedProject.demoType === 'video' ? 'Watch Demo' : 'Live Demo'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects; 