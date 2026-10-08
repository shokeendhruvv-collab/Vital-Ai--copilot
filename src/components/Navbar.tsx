import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  Bell, 
  Mail, 
  Menu, 
  X, 
  Globe, 
  PhoneCall, 
  ShieldCheck, 
  ChevronDown,
  User
} from 'lucide-react';
import { NavigationPage, SupportedLanguage } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  unreadNotificationsCount: number;
  onOpenNotifications: () => void;
  onOpenEmail: () => void;
  onOpenGlobalSearch: () => void;
  onOpenProfile: () => void;
  onOpenEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenEmail,
  onOpenGlobalSearch,
  onOpenProfile,
  onOpenEmergency,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems: { id: NavigationPage; label: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'doctors', label: t.navDoctors },
    { id: 'appointments', label: t.navAppointments },
    { id: 'medical-records', label: t.navRecords },
    { id: 'medicines', label: t.navMedicines },
    { id: 'health-tools', label: t.navTools },
    { id: 'teleconsultation', label: t.navTeleconsultation },
    { id: 'about', label: t.navAbout },
    { id: 'admin', label: t.navAdmin },
  ];

  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Vital AI Logo & Branding */}
          <div 
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0878E8] via-[#0D8EF8] to-[#16B8C4] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-6 h-6 fill-white stroke-white stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-[#102A43]">
                  Vital <span className="text-[#0878E8]">AI</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-[#0878E8] border border-blue-200/60 rounded">
                  Clinical
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* CENTER: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#0878E8] font-bold'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[#0878E8] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Search, Notifications, Email, Lang, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Global Search Button */}
            <button
              onClick={onOpenGlobalSearch}
              className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 rounded-xl transition-all duration-150"
              title="Search Vital AI"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline font-medium text-slate-600">{t.searchPlaceholder.slice(0, 22)}...</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] bg-white border border-slate-300 rounded text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-colors"
                title="Select Language"
              >
                <Globe className="w-4 h-4 text-[#0878E8]" />
                <span className="uppercase font-bold">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          language === l.code 
                            ? 'bg-blue-50 text-[#0878E8] font-bold' 
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </span>
                        {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#0878E8]" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Hospital Email Center */}
            <button
              onClick={onOpenEmail}
              className="relative p-2.5 text-slate-600 hover:text-[#0878E8] hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100"
              title="Official Hospital Messages"
            >
              <Mail className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16B8C4] ring-2 ring-white" />
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 text-slate-600 hover:text-[#0878E8] hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* 24/7 Emergency Quick Action */}
            <button
              onClick={onOpenEmergency}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>112 Trauma</span>
            </button>

            {/* Patient Profile Pill */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200 rounded-2xl transition-all duration-150 text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0878E8] to-[#102A43] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                HJ
              </div>
              <div className="hidden lg:block leading-tight">
                <span className="text-xs font-bold text-slate-900 block">Harshit Jakhar</span>
                <span className="text-[10px] text-slate-500 font-medium">ID: LH982736</span>
              </div>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#0878E8] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sgt Hospital, Budhera · Gurugram
            </span>
            <button
              onClick={() => {
                onOpenEmergency();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 rounded-lg"
            >
              Emergency 112
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
