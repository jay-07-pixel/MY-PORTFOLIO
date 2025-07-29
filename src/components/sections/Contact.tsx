import React, { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from 'emailjs-com'; // Uncomment when ready to implement email functionality

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setError('');
      
      try {
        await emailjs.send(
          'service_6y4cnlj', // Service ID
          'template_yd428nr', // Template ID
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message
          },
          'aPvP-8MkWE_Y2MqTP' // Public Key
        );
        
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } catch (err) {
        setError('Failed to send message. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-bg/50">
      <div className="container-section">
        <h2 className="section-title">Contact Me</h2>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Get In Touch</h3>
            <p className="text-light-text/80 mb-8">
              Every connection begins with a conversation. If you have an idea, opportunity, or just want to say hello — feel free to reach out. I'm always happy to connect and explore what we can build together.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-glow-effect p-3 rounded-full mr-4">
                  <FaEnvelope className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="text-light-text font-semibold">Email</h4>
                  <p className="text-light-text/70">jayjobanputra007@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-glow-effect p-3 rounded-full mr-4">
                  <FaPhoneAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="text-light-text font-semibold">Phone</h4>
                  <p className="text-light-text/70">+91 9822961688</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-glow-effect p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-primary text-xl" />
                </div>
                <div>
                  <h4 className="text-light-text font-semibold">Location</h4>
                  <p className="text-light-text/70">Kopargoan, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-glow-effect rounded-lg">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Thank You!</h3>
                <p className="text-light-text">Your message has been sent successfully. I'll get back to you soon!</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-light-text mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-dark-bg border ${errors.name ? 'border-red-500' : 'border-glow-effect'} rounded-md px-4 py-3 text-light-text focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-light-text mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-dark-bg border ${errors.email ? 'border-red-500' : 'border-glow-effect'} rounded-md px-4 py-3 text-light-text focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Your Email"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-light-text mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full bg-dark-bg border ${errors.subject ? 'border-red-500' : 'border-glow-effect'} rounded-md px-4 py-3 text-light-text focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Subject"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-light-text mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-dark-bg border ${errors.message ? 'border-red-500' : 'border-glow-effect'} rounded-md px-4 py-3 text-light-text focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Your Message"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                
                {error && (
                  <div className="bg-red-500/20 text-red-500 p-3 rounded-md">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary w-full flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 