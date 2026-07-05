export const HomeIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" />
  </svg>
);

export const UserIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 11a4 4 0 1 0-8 0v1a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-1z" />
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 15v6" opacity="0" />
  </svg>
);

export const PhoneIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M2 7a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .97.757l.7 2.8a1 1 0 0 1-.24.95l-2 2a16 16 0 0 0 6.5 6.5l2-2a1 1 0 0 1 .95-.24l2.8.7A1 1 0 0 1 22 18.72V22a2 2 0 0 1-2 2h-1C6.477 24 0 17.523 0 9V8a2 2 0 0 1 2-1h0z" />
  </svg>
);

export const MailIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6" />
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
  </svg>
);

export const LocationIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
  </svg>
);

export const SunIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
  </svg>
);

export const MoonIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const CartIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
    <circle cx="10" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </svg>
);

export const VegIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 6 6 9 6 11a6 6 0 0 0 12 0c0-2-2-5-6-9z" />
  </svg>
);

export const NonVegIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2c2 4 4 7 4 9a6 6 0 1 1-8 0c0-2 2-5 4-9z" />
  </svg>
);

export default {};
