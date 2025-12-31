// components/shared/SignUpModal.tsx
'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ArrowRight, Building, CheckCircle, Globe, X } from 'lucide-react';

// components/shared/SignUpModal.tsx

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const [selectedRole, setSelectedRole] = useState<'importer' | 'exporter' | null>(null);

    if (!isOpen) return null;

    const handleRoleSelect = (role: 'importer' | 'exporter') => {
        setSelectedRole(role);
        // Small delay before redirecting to show selection feedback
        setTimeout(() => {
            if (role === 'importer') {
                window.location.href = '/signup/importer';
            } else {
                window.location.href = '/signup/exporter';
            }
        }, 300);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className='fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300'
            onClick={handleOverlayClick}>
            <div className='animate-in fade-in slide-in-from-bottom-4 relative mx-4 w-full max-w-md duration-300'>
                <div className='relative overflow-hidden rounded-2xl bg-white shadow-2xl'>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className='absolute top-4 right-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
                        <X className='h-5 w-5' />
                    </button>

                    {/* Header */}
                    <div className='border-b border-gray-100 bg-linear-to-r from-emerald-50 to-green-50 p-6'>
                        <div className='text-center'>
                            <h2 className='text-2xl font-bold text-gray-900'>Join AGROSPACE</h2>
                            <p className='mt-2 text-gray-600'>Choose your account type to get started</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='p-6'>
                        <div className='space-y-4'>
                            {/* International Buyer Option */}
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 hover:border-blue-500 hover:shadow-md ${
                                    selectedRole === 'importer'
                                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-offset-2'
                                        : 'border-gray-200 bg-white'
                                }`}
                                onClick={() => handleRoleSelect('importer')}>
                                <div className='flex items-start justify-between'>
                                    <div className='flex items-start gap-4'>
                                        <div className='rounded-lg bg-blue-100 p-3'>
                                            <Globe className='h-6 w-6 text-blue-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-semibold text-gray-900'>
                                                I am an International Buyer
                                            </h3>
                                            <p className='mt-1 text-sm text-gray-600'>
                                                Source quality agricultural products from Ethiopia
                                            </p>
                                            <ul className='mt-3 space-y-2'>
                                                <li className='flex items-center gap-2 text-sm text-gray-600'>
                                                    <CheckCircle className='h-4 w-4 text-blue-500' />
                                                    <span>Access verified exporters</span>
                                                </li>
                                                <li className='flex items-center gap-2 text-sm text-gray-600'>
                                                    <CheckCircle className='h-4 w-4 text-blue-500' />
                                                    <span>Real-time market prices</span>
                                                </li>
                                                <li className='flex items-center gap-2 text-sm text-gray-600'>
                                                    <CheckCircle className='h-4 w-4 text-blue-500' />
                                                    <span>Secure payment & logistics</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {selectedRole === 'importer' && (
                                        <div className='rounded-full bg-blue-500 p-1'>
                                            <ArrowRight className='h-4 w-4 text-white' />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Ethiopian Exporter Option */}
                            <div
                                className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-300 hover:border-emerald-500 hover:shadow-md ${
                                    selectedRole === 'exporter'
                                        ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500 ring-offset-2'
                                        : 'border-gray-200 bg-white'
                                }`}
                                onClick={() => handleRoleSelect('exporter')}>
                                <div className='flex items-start justify-between'>
                                    <div className='flex items-start gap-4'>
                                        <div className='rounded-lg bg-emerald-100 p-3'>
                                            <Building className='h-6 w-6 text-emerald-600' />
                                        </div>
                                        <div>
                                            <h3 className='text-lg font-semibold text-gray-900'>
                                                I am an Ethiopian Exporter
                                            </h3>
                                            <p className='mt-1 text-sm text-gray-600'>
                                                Showcase your products to global buyers
                                            </p>
                                            <ul className='mt-3 space-y-2'>
                                                <li className='flex items-center gap-2 text-sm text-gray-600'>
                                                    <CheckCircle className='h-4 w-4 text-emerald-500' />
                                                    <span>Reach international buyers</span>
                                                </li>
                                                <li className='flex items-center gap-2 text-sm text-gray-600'>
                                                    <CheckCircle className='h-4 w-4 text-emerald-500' />
                                                    <span>Create Trust ID Card</span>
                                                </li>
                                                <li className='flex items-center gap-2 text-sm text-gray-600'>
                                                    <CheckCircle className='h-4 w-4 text-emerald-500' />
                                                    <span>Increase export opportunities</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {selectedRole === 'exporter' && (
                                        <div className='rounded-full bg-emerald-500 p-1'>
                                            <ArrowRight className='h-4 w-4 text-white' />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Already have account */}
                        <div className='mt-6 border-t border-gray-100 pt-6 text-center'>
                            <p className='text-sm text-gray-600'>
                                Already have an account?{' '}
                                <a
                                    href='/login'
                                    className='font-semibold text-emerald-600 hover:text-emerald-700 hover:underline'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onClose();
                                        window.location.href = '/login';
                                    }}>
                                    Log in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
