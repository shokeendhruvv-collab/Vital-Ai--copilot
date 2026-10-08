import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  brandName: string;
  brandTagline: string;
  navHome: string;
  navDoctors: string;
  navAppointments: string;
  navRecords: string;
  navMedicines: string;
  navTools: string;
  navTeleconsultation: string;
  navAbout: string;
  navAdmin: string;
  searchPlaceholder: string;
  heroBadge: string;
  heroHeadingPart1: string;
  heroHeadingHighlight: string;
  heroSubtitle: string;
  bookAppointmentBtn: string;
  exploreServicesBtn: string;
  aiCopilotTitle: string;
  aiCopilotSubtitle: string;
  emergencyTitle: string;
  emergencyDesc: string;
  emergencyCallBtn: string;
  doctorCardAvailableToday: string;
  doctorCardBookNow: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: 'Vital AI',
    brandTagline: 'Better Health. Brighter Tomorrow.',
    navHome: 'Home',
    navDoctors: 'Doctors',
    navAppointments: 'Appointments',
    navRecords: 'Medical Records',
    navMedicines: 'Medicines',
    navTools: 'Health Tools',
    navTeleconsultation: 'Teleconsultation',
    navAbout: 'About',
    navAdmin: 'Admin Panel',
    searchPlaceholder: 'Search doctors, specialties, medicines...',
    heroBadge: 'Your Health, Our Priority',
    heroHeadingPart1: 'Advanced Healthcare for a',
    heroHeadingHighlight: 'Healthier You',
    heroSubtitle: 'Access world-class doctors, manage medical records, book appointments, and receive intelligent clinical guidance with Vital AI — all in one unified platform.',
    bookAppointmentBtn: 'Book an Appointment →',
    exploreServicesBtn: 'Explore Our Services',
    aiCopilotTitle: 'AI Health Copilot',
    aiCopilotSubtitle: 'Your personal AI assistant for better health decisions.',
    emergencyTitle: 'Need Emergency Help?',
    emergencyDesc: 'Get immediate assistance from our 24/7 emergency response trauma team.',
    emergencyCallBtn: '☎ Call Emergency (112)',
    doctorCardAvailableToday: 'Available Today',
    doctorCardBookNow: 'Book Now',
  },
  hi: {
    brandName: 'Vital AI',
    brandTagline: 'बेहतर स्वास्थ्य। उज्जवल कल।',
    navHome: 'होम',
    navDoctors: 'डॉक्टर्स',
    navAppointments: 'अपॉइंटमेंट्स',
    navRecords: 'मेडिकल रिकॉर्ड्स',
    navMedicines: 'दवाइयाँ',
    navTools: 'हेल्थ टूल्स',
    navTeleconsultation: 'टेलीकंसल्टेशन',
    navAbout: 'हमारे बारे में',
    navAdmin: 'एडमिन पैनल',
    searchPlaceholder: 'डॉक्टर, विभाग, दवाइयाँ खोजें...',
    heroBadge: 'आपका स्वास्थ्य, हमारी प्राथमिकता',
    heroHeadingPart1: 'उन्नत स्वास्थ्य सेवा',
    heroHeadingHighlight: 'स्वस्थ भविष्य के लिए',
    heroSubtitle: 'शीर्ष विशेषज्ञ डॉक्टरों से परामर्श लें, रिकॉर्ड प्रबंधित करें और Vital AI स्वास्थ्य सहायक का लाभ उठाएं।',
    bookAppointmentBtn: 'अपॉइंटमेंट बुक करें →',
    exploreServicesBtn: 'हमारी सेवाएं देखें',
    aiCopilotTitle: 'एआई हेल्थ कोपायलट',
    aiCopilotSubtitle: 'सटीक स्वास्थ्य निर्णयों के लिए आपका व्यक्तिगत एआई सहायक।',
    emergencyTitle: 'आपातकालीन सहायता चाहिए?',
    emergencyDesc: 'हमारी 24/7 आपातकालीन ट्रॉमा टीम से तुरंत संपर्क करें।',
    emergencyCallBtn: '☎ आपातकालीन कॉल (112)',
    doctorCardAvailableToday: 'आज उपलब्ध',
    doctorCardBookNow: 'बुक करें',
  },
  pa: {
    brandName: 'Vital AI',
    brandTagline: 'ਬਿਹਤਰ ਸਿਹਤ। ਰੌਸ਼ਨ ਭਵਿੱਖ।',
    navHome: 'ਹੋਮ',
    navDoctors: 'ਡਾਕਟਰ',
    navAppointments: 'ਮੁਲਾਕਾਤਾਂ',
    navRecords: 'ਮੈਡੀਕਲ ਰਿਕਾਰਡ',
    navMedicines: 'ਦਵਾਈਆਂ',
    navTools: 'ਸਿਹਤ ਸੰਦ',
    navTeleconsultation: 'ਟੈਲੀਕੰਸਲਟੇਸ਼ਨ',
    navAbout: 'ਸਾਡੇ ਬਾਰੇ',
    navAdmin: 'ਐਡਮਿਨ ਪੈਨਲ',
    searchPlaceholder: 'ਡਾਕਟਰ, ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ, ਦਵਾਈਆਂ ਖੋਜੋ...',
    heroBadge: 'ਤੁਹਾਡੀ ਸਿਹਤ, ਸਾਡੀ ਤਰਜੀਹ',
    heroHeadingPart1: 'ਉੱਨਤ ਸਿਹਤ ਸੰਭਾਲ',
    heroHeadingHighlight: 'ਤੰਦਰੁਸਤ ਜੀਵਨ ਲਈ',
    heroSubtitle: 'ਚੋਟੀ ਦੇ ਡਾਕਟਰਾਂ ਦੀ ਸਲਾਹ ਲਵੋ, ਆਪਣੇ ਰਿਕਾਰਡ ਸੰਭਾਲੋ ਅਤੇ Vital AI ਨਾਲ ਸਮਾਰਟ ਸਿਹਤ ਪ੍ਰਬੰਧਨ ਕਰੋ।',
    bookAppointmentBtn: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ →',
    exploreServicesBtn: 'ਸੇਵਾਵਾਂ ਦੇਖੋ',
    aiCopilotTitle: 'ਏਆਈ ਹੈਲਥ ਕੋ-ਪਾਇਲਟ',
    aiCopilotSubtitle: 'ਤੁਹਾਡਾ ਨਿੱਜੀ ਸਿਹਤ ਸਹਾਇਕ।',
    emergencyTitle: 'ਐਮਰਜੈਂਸੀ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?',
    emergencyDesc: 'ਸਾਡੀ 24/7 ਐਮਰਜੈਂਸੀ ਟੀਮ ਨਾਲ ਤੁਰੰਤ ਸੰਪਰਕ ਕਰੋ।',
    emergencyCallBtn: '☎ ਐਮਰਜੈਂਸੀ ਕਾਲ (112)',
    doctorCardAvailableToday: 'ਅੱਜ ਉਪਲਬਧ',
    doctorCardBookNow: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ',
  },
  es: {
    brandName: 'Vital AI',
    brandTagline: 'Mejor salud. Un mañana más brillante.',
    navHome: 'Inicio',
    navDoctors: 'Médicos',
    navAppointments: 'Citas',
    navRecords: 'Historial Médico',
    navMedicines: 'Medicamentos',
    navTools: 'Herramientas',
    navTeleconsultation: 'Teleconsulta',
    navAbout: 'Nosotros',
    navAdmin: 'Panel Admin',
    searchPlaceholder: 'Buscar médicos, especialidades, recetas...',
    heroBadge: 'Su Salud, Nuestra Prioridad',
    heroHeadingPart1: 'Atención Médica Avanzada para un',
    heroHeadingHighlight: 'Futuro Más Saludable',
    heroSubtitle: 'Consulte a los mejores especialistas, gestione historiales clínicos y reciba asistencia clínica con Vital AI.',
    bookAppointmentBtn: 'Reservar Cita →',
    exploreServicesBtn: 'Explorar Servicios',
    aiCopilotTitle: 'Copiloto de Salud IA',
    aiCopilotSubtitle: 'Su asistente inteligente para decisiones médicas.',
    emergencyTitle: '¿Emergencia Médica?',
    emergencyDesc: 'Respuesta inmediata disponible 24/7.',
    emergencyCallBtn: '☎ Llamar Urgencias (112)',
    doctorCardAvailableToday: 'Disponible Hoy',
    doctorCardBookNow: 'Reservar',
  },
  fr: {
    brandName: 'Vital AI',
    brandTagline: 'Une meilleure santé. Un avenir radieux.',
    navHome: 'Accueil',
    navDoctors: 'Médecins',
    navAppointments: 'Rendez-vous',
    navRecords: 'Dossiers Médicaux',
    navMedicines: 'Médicaments',
    navTools: 'Outils Santé',
    navTeleconsultation: 'Téléconsultation',
    navAbout: 'À propos',
    navAdmin: 'Admin',
    searchPlaceholder: 'Rechercher médecins, spécialités, ordonnances...',
    heroBadge: 'Votre Santé, Notre Priorité',
    heroHeadingPart1: 'Des soins médicaux d’excellence pour un',
    heroHeadingHighlight: 'Vous en Meilleure Santé',
    heroSubtitle: 'Accédez aux meilleurs spécialistes, gérez vos dossiers et bénéficiez de l’intelligence clinique Vital AI.',
    bookAppointmentBtn: 'Prendre Rendez-vous →',
    exploreServicesBtn: 'Découvrir nos services',
    aiCopilotTitle: 'Copilote Santé IA',
    aiCopilotSubtitle: 'Votre assistant d’analyse médicale personnel.',
    emergencyTitle: 'Urgence Médicale ?',
    emergencyDesc: 'Équipe d’urgence prête à intervenir 24h/24 et 7j/7.',
    emergencyCallBtn: '☎ Appeler les Urgences (112)',
    doctorCardAvailableToday: 'Disponible Aujourd’hui',
    doctorCardBookNow: 'Réserver',
  },
  ar: {
    brandName: 'Vital AI',
    brandTagline: 'صحة أفضل. غد مشرق.',
    navHome: 'الرئيسية',
    navDoctors: 'الأطباء',
    navAppointments: 'المواعيد',
    navRecords: 'السجلات الطبية',
    navMedicines: 'الأدوية',
    navTools: 'أدوات الصحة',
    navTeleconsultation: 'الاستشارة عن بعد',
    navAbout: 'من نحن',
    navAdmin: 'لوحة التحكم',
    searchPlaceholder: 'ابحث عن طبيب، تخصص، دواء...',
    heroBadge: 'صحتكم، أولويتنا القصوى',
    heroHeadingPart1: 'رعاية صحية متطورة من أجل',
    heroHeadingHighlight: 'صحة أفضل لك',
    heroSubtitle: 'تواصل مع أفضل الاستشاريين، وتتبع ملفك الصحي بدعم من Vital AI.',
    bookAppointmentBtn: 'احجز موعداً الآن →',
    exploreServicesBtn: 'استكشف الخدمات',
    aiCopilotTitle: 'مساعد الصحة الذكي',
    aiCopilotSubtitle: 'مساعدك الشخصي للقرارات الطبية السليمة.',
    emergencyTitle: 'هل تحتاج طوارئ؟',
    emergencyDesc: 'فريق التدخل السريع متاح على مدار الساعة طوال أيام الأسبوع.',
    emergencyCallBtn: '☎ طوارئ (112)',
    doctorCardAvailableToday: 'متاح اليوم',
    doctorCardBookNow: 'احجز الآن',
  }
};
