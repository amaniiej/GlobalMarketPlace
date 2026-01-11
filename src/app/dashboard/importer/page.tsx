// app/dashboard/importer/page.tsx
'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';

import {
    AlertCircle,
    BarChart3,
    Calculator,
    CheckCircle,
    Clock,
    Coffee,
    DollarSign,
    Download,
    Eye,
    Filter,
    Globe,
    Heart,
    MapPin,
    MessageSquare,
    Package,
    Plus,
    Search,
    ShoppingCart,
    Star,
    TrendingUp,
    Users
} from 'lucide-react';

// app/dashboard/importer/page.tsx

// app/dashboard/importer/page.tsx

// Metric Card Component for Importer
function ImporterMetricCard({ title, value, change, icon: Icon, trend = 'up', description }: any) {
    return (
        <Card className='group transition-all duration-300 hover:border-blue-300 hover:shadow-lg'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-slate-600'>{title}</CardTitle>
                <div className={`rounded-lg p-2 ${trend === 'up' ? 'bg-blue-100' : 'bg-amber-100'}`}>
                    <Icon className={`h-4 w-4 ${trend === 'up' ? 'text-blue-600' : 'text-amber-600'}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold text-slate-900'>{value}</div>
                <div className={`text-sm ${trend === 'up' ? 'text-blue-600' : 'text-amber-600'}`}>
                    {trend === 'up' ? '↑' : '↓'} {change}
                </div>
                {description && <p className='mt-2 text-xs text-slate-500'>{description}</p>}
            </CardContent>
        </Card>
    );
}

export default function ImporterDashboard() {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const supabase = createClient();
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (user) {
                const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

                if (profile) {
                    setUserProfile(profile);
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <div className='text-center'>
                    <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
                    <p className='mt-4 text-blue-700'>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6 lg:p-8'>
            {/* Welcome Header */}
            <div className='mb-8'>
                <h1 className='mb-2 text-3xl font-bold text-blue-900'>
                    Welcome, {userProfile?.contact_person || 'Importer'}! 🌍
                </h1>
                <p className='text-slate-600'>Source authentic Ethiopian products directly from verified exporters</p>
            </div>

            {/* Quick Stats Row */}
            <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                <ImporterMetricCard
                    title='Saved Products'
                    value='24 items'
                    change='+3 this week'
                    icon={Heart}
                    trend='up'
                    description='From 8 exporters'
                />

                <ImporterMetricCard
                    title='Active Orders'
                    value='3 orders'
                    change='1 in transit'
                    icon={ShoppingCart}
                    trend='up'
                    description='$18,500 value'
                />

                <ImporterMetricCard
                    title='Cost Savings'
                    value='$3,200'
                    change='vs. traditional'
                    icon={DollarSign}
                    trend='up'
                    description='Direct sourcing benefit'
                />

                <ImporterMetricCard
                    title='Trust Score'
                    value='92/100'
                    change='+5 points'
                    icon={TrendingUp}
                    trend='up'
                    description='Verified importer'
                />
            </div>

            {/* My Workspace Section */}
            <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
                {/* Saved Sourcing Scenarios */}
                <Card className='lg:col-span-2'>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <div>
                                <CardTitle>My Workspace</CardTitle>
                                <CardDescription>Saved sourcing scenarios & calculations</CardDescription>
                            </div>
                            <Button size='sm' variant='outline'>
                                <Plus className='mr-2 h-4 w-4' />
                                New Scenario
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {/* Saved Calculations */}
                            <div className='flex items-center justify-between rounded-lg bg-slate-50 p-3'>
                                <div className='flex items-center space-x-3'>
                                    <div className='rounded bg-blue-100 p-2'>
                                        <Calculator className='h-4 w-4 text-blue-600' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium'>Coffee ROI Analysis</h4>
                                        <p className='text-sm text-slate-500'>Estimated 32% margin</p>
                                    </div>
                                </div>
                                <div className='flex space-x-2'>
                                    <Button size='sm' variant='ghost'>
                                        <Eye className='h-4 w-4' />
                                    </Button>
                                    <Button size='sm' variant='ghost'>
                                        <Download className='h-4 w-4' />
                                    </Button>
                                </div>
                            </div>

                            {/* Quick Landed Cost */}
                            <div className='rounded-lg border border-emerald-100 bg-emerald-50 p-4'>
                                <div className='mb-3 flex items-center justify-between'>
                                    <h4 className='font-medium text-emerald-900'>Quick Landed Cost Preview</h4>
                                    <Calculator className='h-4 w-4 text-emerald-600' />
                                </div>
                                <div className='grid grid-cols-3 gap-4 text-sm'>
                                    <div>
                                        <p className='text-slate-500'>From</p>
                                        <p className='font-medium'>Addis Ababa</p>
                                    </div>
                                    <div>
                                        <p className='text-slate-500'>To</p>
                                        <p className='font-medium'>{userProfile?.country || 'Your Country'}</p>
                                    </div>
                                    <div>
                                        <p className='text-slate-500'>Est. Total</p>
                                        <p className='font-medium'>$8,750/TEU</p>
                                    </div>
                                </div>
                                <Button size='sm' className='mt-3 w-full bg-emerald-600 hover:bg-emerald-700'>
                                    Run Detailed Analysis
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Import Checklist */}
                <Card>
                    <CardHeader>
                        <CardTitle>Import Checklist</CardTitle>
                        <CardDescription>EUDR & Import Requirements</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-3'>
                            {[
                                { name: 'Import License', status: 'completed', icon: CheckCircle },
                                { name: 'EUDR Due Diligence', status: 'pending', icon: AlertCircle },
                                { name: 'Customs Documentation', status: 'completed', icon: CheckCircle },
                                { name: 'Quality Certificates', status: 'pending', icon: AlertCircle },
                                { name: 'Payment Terms', status: 'completed', icon: CheckCircle }
                            ].map((doc, index) => (
                                <div key={index} className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-3'>
                                        <doc.icon
                                            className={`h-4 w-4 ${
                                                doc.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                                            }`}
                                        />
                                        <span className='text-sm'>{doc.name}</span>
                                    </div>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs ${
                                            doc.status === 'completed'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {doc.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button variant='outline' className='mt-4 w-full'>
                            <Download className='mr-2 h-4 w-4' />
                            Download Import Guide
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Recommended Products */}
            <Card className='mb-8'>
                <CardHeader>
                    <div className='flex items-center justify-between'>
                        <div>
                            <CardTitle>Recommended Ethiopian Products</CardTitle>
                            <CardDescription>Based on your sourcing history</CardDescription>
                        </div>
                        <Button size='sm' variant='outline'>
                            <Filter className='mr-2 h-4 w-4' />
                            Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                        {[
                            {
                                name: 'Yirgacheffe Coffee',
                                grade: 'Grade 1',
                                exporter: 'EthioGrow Farms',
                                price: '$8.50/kg',
                                rating: 4.9,
                                moq: '100kg',
                                location: 'Sidama, Ethiopia',
                                verified: true
                            },
                            {
                                name: 'White Sesame Seeds',
                                grade: '99.9% Purity',
                                exporter: 'AgriExport Co.',
                                price: '$3.20/kg',
                                rating: 4.7,
                                moq: '500kg',
                                location: 'Gondar, Ethiopia',
                                verified: true
                            },
                            {
                                name: 'Raw Forest Honey',
                                grade: 'Organic',
                                exporter: 'BeeEthiopia',
                                price: '$12.00/kg',
                                rating: 4.8,
                                moq: '50kg',
                                location: 'Oromia, Ethiopia',
                                verified: true
                            }
                        ].map((product, index) => (
                            <div
                                key={index}
                                className='rounded-xl border border-slate-200 p-4 transition-all hover:shadow-lg'>
                                <div className='mb-3 flex items-start justify-between'>
                                    <div className='flex items-center space-x-3'>
                                        <div className='rounded-lg bg-emerald-100 p-2'>
                                            <Coffee className='h-5 w-5 text-emerald-600' />
                                        </div>
                                        <div>
                                            <h4 className='font-bold text-slate-900'>{product.name}</h4>
                                            <p className='text-sm text-slate-600'>{product.grade}</p>
                                        </div>
                                    </div>
                                    {product.verified && (
                                        <span className='rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700'>
                                            Verified ✓
                                        </span>
                                    )}
                                </div>

                                <div className='mb-4 space-y-2'>
                                    <div className='flex items-center text-sm'>
                                        <Users className='mr-2 h-4 w-4 text-slate-400' />
                                        <span>{product.exporter}</span>
                                    </div>
                                    <div className='flex items-center text-sm'>
                                        <MapPin className='mr-2 h-4 w-4 text-slate-400' />
                                        <span>{product.location}</span>
                                    </div>
                                    <div className='flex items-center text-sm'>
                                        <Package className='mr-2 h-4 w-4 text-slate-400' />
                                        <span>MOQ: {product.moq}</span>
                                    </div>
                                </div>

                                <div className='mb-4 flex items-center justify-between'>
                                    <div>
                                        <div className='text-2xl font-bold text-emerald-700'>{product.price}</div>
                                        <div className='flex items-center'>
                                            <Star className='h-4 w-4 fill-current text-yellow-500' />
                                            <span className='ml-1 text-sm text-slate-600'>{product.rating}/5.0</span>
                                        </div>
                                    </div>
                                    <Button size='sm' className='bg-emerald-600 hover:bg-emerald-700'>
                                        <Eye className='mr-2 h-4 w-4' />
                                        View Details
                                    </Button>
                                </div>

                                <div className='flex space-x-2'>
                                    <Button variant='outline' size='sm' className='flex-1'>
                                        <MessageSquare className='mr-2 h-4 w-4' />
                                        Contact
                                    </Button>
                                    <Button variant='outline' size='sm' className='flex-1'>
                                        <Heart className='mr-2 h-4 w-4' />
                                        Save
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Market Insights Section */}
            <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {/* ECX Prices */}
                <Card>
                    <CardHeader>
                        <CardTitle>ECX Market Prices</CardTitle>
                        <CardDescription>Real-time Ethiopian commodity prices</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {[
                                {
                                    commodity: 'Coffee (Yirgacheffe)',
                                    price: 'ETB 450/kg',
                                    change: '+3.2%',
                                    demand: 'High'
                                },
                                { commodity: 'Sesame Seeds', price: 'ETB 185/kg', change: '+1.5%', demand: 'Medium' },
                                { commodity: 'Chickpeas', price: 'ETB 120/kg', change: '-0.8%', demand: 'Low' },
                                { commodity: 'Lentils', price: 'ETB 95/kg', change: '+2.1%', demand: 'High' }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between rounded-lg p-3 hover:bg-slate-50'>
                                    <div>
                                        <h4 className='font-medium'>{item.commodity}</h4>
                                        <p className='text-sm text-slate-500'>Demand: {item.demand}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='font-bold'>{item.price}</p>
                                        <p
                                            className={`text-sm ${item.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {item.change}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-4 border-t border-slate-100 pt-4'>
                            <div className='flex items-center text-sm text-slate-500'>
                                <Clock className='mr-2 h-4 w-4' />
                                Updated: Today, 11:45 AM EAT
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sourcing Tools */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sourcing Tools</CardTitle>
                        <CardDescription>Free tools for smart buying</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            <div className='cursor-pointer rounded-lg border border-slate-200 p-4 hover:bg-slate-50'>
                                <div className='mb-2 flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <Calculator className='mr-3 h-5 w-5 text-blue-600' />
                                        <h4 className='font-medium'>Incoterm Calculator</h4>
                                    </div>
                                    <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-700'>Free</span>
                                </div>
                                <p className='text-sm text-slate-600'>Compare FOB vs CIF costs for Ethiopian exports</p>
                            </div>

                            <div className='cursor-pointer rounded-lg border border-slate-200 p-4 hover:bg-slate-50'>
                                <div className='mb-2 flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <Search className='mr-3 h-5 w-5 text-emerald-600' />
                                        <h4 className='font-medium'>HS Code Finder</h4>
                                    </div>
                                    <span className='rounded bg-emerald-100 px-2 py-1 text-xs text-emerald-700'>
                                        15 left
                                    </span>
                                </div>
                                <p className='text-sm text-slate-600'>20 free lookups per month</p>
                            </div>

                            <div className='cursor-pointer rounded-lg border border-slate-200 p-4 hover:bg-slate-50'>
                                <div className='mb-2 flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <Users className='mr-3 h-5 w-5 text-purple-600' />
                                        <h4 className='font-medium'>Exporter Directory</h4>
                                    </div>
                                    <span className='rounded bg-purple-100 px-2 py-1 text-xs text-purple-700'>
                                        Free
                                    </span>
                                </div>
                                <p className='text-sm text-slate-600'>Browse 200+ verified Ethiopian exporters</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Upgrade CTA */}
            <div className='rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white'>
                <div className='flex flex-col items-center justify-between lg:flex-row'>
                    <div className='mb-4 lg:mb-0'>
                        <h3 className='mb-2 text-xl font-bold'>Unlock Premium Sourcing</h3>
                        <p className='text-blue-100'>
                            Upgrade to see exporter contact details, advanced analytics, and AI matching.
                        </p>
                    </div>
                    <Button className='bg-white text-blue-700 hover:bg-blue-50'>
                        <TrendingUp className='mr-2 h-4 w-4' />
                        View Premium Features
                    </Button>
                </div>
            </div>
        </div>
    );
}
