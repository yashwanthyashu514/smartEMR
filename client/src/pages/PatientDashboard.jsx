import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const PatientDashboard = () => {
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id) {
            fetchPatientData();
        }
    }, [user]);

    const fetchPatientData = async () => {
        try {
            const response = await axios.get(`/patients/${user.id}`);
            setPatient(response.data.patient);
        } catch (error) {
            toast.error('Failed to load your data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!patient) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block fixed h-full z-10">
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold text-slate-900">SmartHealth</span>
                    </div>

                    <nav className="space-y-1">
                        <Link to="/patient/dashboard" className="flex items-center px-4 py-3 text-primary bg-blue-50 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Dashboard
                        </Link>
                        <Link to="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Medical Records
                        </Link>
                        <Link to="#" className="flex items-center px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                        </Link>
                    </nav>
                </div>
                <div className="absolute bottom-0 w-full p-6 border-t border-slate-200">
                    <button onClick={logout} className="flex items-center text-slate-600 hover:text-red-600 transition-colors font-medium w-full">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {patient.fullName.split(' ')[0]}</h1>
                        <p className="text-slate-500">Here's your health overview</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                            <img
                                src={patient.photoUrl ? `${import.meta.env.VITE_API_URL}${patient.photoUrl}` : `https://ui-avatars.com/api/?name=${patient.fullName}&background=0D8ABC&color=fff`}
                                alt={patient.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* AI Summary Section */}
                {patient.aiSummary && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-[1px] shadow-lg shadow-indigo-500/20"
                    >
                        <div className="bg-white rounded-[15px] p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl mr-4">
                                    ✨
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">AI Health Insights</h3>
                                    <p className="text-xs text-slate-500">
                                        Last updated: {new Date(patient.aiLastUpdatedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="prose prose-sm max-w-none text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                {patient.aiSummary}
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Medical ID Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-900">Medical ID Card</h2>
                            <div className="flex space-x-2">
                                <button
                                    onClick={async () => {
                                        try {
                                            const imageUrl = `${import.meta.env.VITE_API_URL}${patient.qrCodeUrl}`;
                                            const response = await fetch(imageUrl);
                                            const blob = await response.blob();
                                            const url = window.URL.createObjectURL(blob);
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.download = `QR-${patient.fullName.replace(/\s+/g, '-')}.png`;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                            window.URL.revokeObjectURL(url);
                                            toast.success('QR Code downloaded!');
                                        } catch (error) {
                                            console.error('Download failed:', error);
                                            toast.error('Failed to download QR Code');
                                        }
                                    }}
                                    className="p-2 text-slate-500 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Download QR"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="p-2 text-slate-500 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Print ID"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* ID Card Component */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl shadow-slate-900/20 aspect-[1.586/1] max-w-xl mx-auto lg:mx-0">
                            {/* Decorative Circles */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-16 -mb-16"></div>

                            <div className="relative p-8 h-full flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                                            </div>
                                            <span className="font-semibold tracking-wide text-sm opacity-90">MEDICAL ID</span>
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight">{patient.fullName}</h3>
                                    </div>
                                    <div className="bg-white p-1.5 rounded-xl">
                                        {patient.qrCodeUrl && (
                                            <img
                                                src={`${import.meta.env.VITE_API_URL}${patient.qrCodeUrl}`}
                                                alt="QR"
                                                className="w-16 h-16 object-contain"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 my-4">
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Age</p>
                                        <p className="font-semibold">{patient.age} Years</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Blood</p>
                                        <p className="font-semibold">{patient.bloodGroup}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Emergency</p>
                                        <p className="font-semibold text-sm truncate">{patient.emergencyContact?.phone}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">ID Number</p>
                                        <p className="font-mono text-sm opacity-80">SEQ-{patient._id?.substring(0, 8).toUpperCase()}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                                        <img
                                            src={patient.photoUrl ? `${import.meta.env.VITE_API_URL}${patient.photoUrl}` : `https://ui-avatars.com/api/?name=${patient.fullName}&background=0D8ABC&color=fff`}
                                            alt={patient.fullName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats / Info */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-900">Health Overview</h2>

                        <div className="glass-card p-6 space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Allergies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {patient.allergies?.length > 0 ? (
                                        patient.allergies.map((item, i) => (
                                            <span key={i} className="badge-high">{item}</span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-slate-400">No known allergies</span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4">
                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Conditions</h4>
                                <div className="flex flex-wrap gap-2">
                                    {patient.medicalConditions?.length > 0 ? (
                                        patient.medicalConditions.map((item, i) => (
                                            <span key={i} className="badge-medium">{item}</span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-slate-400">None recorded</span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4">
                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Medications</h4>
                                <ul className="space-y-2">
                                    {patient.medications?.length > 0 ? (
                                        patient.medications.map((item, i) => (
                                            <li key={i} className="flex items-center text-sm text-slate-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        <span className="text-sm text-slate-400">No active medications</span>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PatientDashboard;
