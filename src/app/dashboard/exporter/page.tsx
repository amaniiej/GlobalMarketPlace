// app/dashboard/exporter/page.tsx
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
    FileText,
    Globe,
    Package,
    PlusCircle,
    Search,
    Ship,
    ShoppingCart,
    TrendingUp,
    Users
} from 'lucide-react';

// app/dashboard/exporter/page.tsx

// app/dashboard/exporter/page.tsx

// app/dashboard/exporter/page.tsx

// app/dashboard/exporter/page.tsx

// app/dashboard/exporter/page.tsx

// app/dashboard/exporter/page.tsx

// Reusable Metric Card Component
function MetricCard({ title, value, change, icon: Icon, trend = 'up', description }: any) {
    return (
        <Card className='group transition-all duration-300 hover:border-emerald-300 hover:shadow-lg'>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-sm font-medium text-slate-600'>{title}</CardTitle>
                <div className={`rounded-lg p-2 ${trend === 'up' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                    <Icon className={`h-4 w-4 ${trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold text-slate-900'>{value}</div>
                <div className={`text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {trend === 'up' ? '↑' : '↓'} {change}
                </div>
                {description && <p className='mt-2 text-xs text-slate-500'>{description}</p>}
            </CardContent>
        </Card>
    );
}

export default function ExporterDashboard() {
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
                    <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-600'></div>
                    <p className='mt-4 text-emerald-700'>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='p-6 lg:p-8'>
            {/* Welcome Header */}
            <div className='container mx-auto mb-8 px-4 py-8'>
                <h1 className='mb-2 text-3xl font-bold text-emerald-900'>
                    Welcome back, {userProfile?.contact_person || 'Exporter'}! 👋
                </h1>
                <p className='text-slate-600'>Manage your Ethiopian export business from one dashboard</p>
            </div>

            {/* Quick Stats Row */}
            <div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                <MetricCard
                    title='Active Products'
                    value='3/3 slots used'
                    change='All slots used'
                    icon={Package}
                    trend='up'
                    description='Free tier limit'
                />

                <MetricCard
                    title='Buyer Interest'
                    value='12 inquiries'
                    change='+3 this week'
                    icon={Users}
                    trend='up'
                    description='From 5 countries'
                />

                <MetricCard
                    title='Saved HS Codes'
                    value='8/10 used'
                    change='2 slots remaining'
                    icon={Search}
                    trend='neutral'
                    description='Monthly reset'
                />

                <MetricCard
                    title='Market Score'
                    value='87/100'
                    change='+2 points'
                    icon={TrendingUp}
                    trend='up'
                    description='Profile completeness'
                />
            </div>

            {/* My Workspace Section */}
            <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
                {/* Saved Shipment Scenarios */}
                <Card className='lg:col-span-2'>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <div>
                                <CardTitle>My Workspace</CardTitle>
                                <CardDescription>Saved shipment scenarios & tools</CardDescription>
                            </div>
                            <Button size='sm' variant='outline'>
                                <PlusCircle className='mr-2 h-4 w-4' />
                                Add New
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {/* Saved Scenarios */}
                            <div className='flex items-center justify-between rounded-lg bg-slate-50 p-3'>
                                <div className='flex items-center space-x-3'>
                                    <div className='rounded bg-emerald-100 p-2'>
                                        <Ship className='h-4 w-4 text-emerald-600' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium'>Coffee to Germany</h4>
                                        <p className='text-sm text-slate-500'>Last saved: 2 days ago</p>
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

                            {/* Quick Landed Cost Preview */}
                            <div className='rounded-lg border border-blue-100 bg-blue-50 p-4'>
                                <div className='mb-3 flex items-center justify-between'>
                                    <h4 className='font-medium text-blue-900'>Quick Landed Cost Preview</h4>
                                    <Calculator className='h-4 w-4 text-blue-600' />
                                </div>
                                <div className='grid grid-cols-2 gap-4 text-sm'>
                                    <div>
                                        <p className='text-slate-500'>Route</p>
                                        <p className='font-medium'>ADD → FRA</p>
                                    </div>
                                    <div>
                                        <p className='text-slate-500'>Est. Cost</p>
                                        <p className='font-medium'>$4,250/TEU</p>
                                    </div>
                                </div>
                                <Button size='sm' className='mt-3 w-full bg-blue-600 hover:bg-blue-700'>
                                    Run Full Analysis (Pro)
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Document Checklist */}
                <Card>
                    <CardHeader>
                        <CardTitle>Document Checklist</CardTitle>
                        <CardDescription>EUDR & Export Requirements</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-3'>
                            {[
                                { name: 'Certificate of Origin', status: 'completed', icon: CheckCircle },
                                { name: 'Phytosanitary Certificate', status: 'pending', icon: AlertCircle },
                                { name: 'Commercial Invoice', status: 'completed', icon: CheckCircle },
                                { name: 'Packing List', status: 'completed', icon: CheckCircle },
                                { name: 'EUDR Declaration', status: 'pending', icon: AlertCircle }
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
                            Download PDF Checklist
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Live Markets Section */}
            <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {/* ECX Dashboard */}
                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <div>
                                <CardTitle>ECX Live Markets</CardTitle>
                                <CardDescription>Ethiopian Commodity Exchange - Last 30 days</CardDescription>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Coffee className='h-4 w-4 text-emerald-600' />
                                <span className='text-sm font-medium'>Coffee</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {[
                                {
                                    grade: 'Yirgacheffe Grade 1',
                                    price: 'ETB 450/kg',
                                    change: '+3.2%',
                                    volume: '1,240 MT'
                                },
                                { grade: 'Sidamo Grade 2', price: 'ETB 380/kg', change: '+1.8%', volume: '890 MT' },
                                { grade: 'Harar Longberry', price: 'ETB 520/kg', change: '+5.1%', volume: '420 MT' },
                                { grade: 'Limu Grade 1', price: 'ETB 410/kg', change: '+2.3%', volume: '680 MT' }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className='flex items-center justify-between rounded-lg p-3 hover:bg-slate-50'>
                                    <div>
                                        <h4 className='font-medium'>{item.grade}</h4>
                                        <p className='text-sm text-slate-500'>Volume: {item.volume}</p>
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
                                Updated: Today, 10:30 AM EAT
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* FX Watchlist */}
                <Card>
                    <CardHeader>
                        <CardTitle>FX Watchlist</CardTitle>
                        <CardDescription>3 currency pairs (Free Tier)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='space-y-4'>
                            {[
                                { pair: 'USD/ETB', rate: '56.45', change: '+0.12%', alert: 'Above threshold' },
                                { pair: 'EUR/ETB', rate: '61.28', change: '-0.05%', alert: 'Stable' },
                                { pair: 'GBP/ETB', rate: '71.92', change: '+0.08%', alert: 'Below threshold' }
                            ].map((fx, index) => (
                                <div key={index} className='rounded-lg border border-slate-200 p-4'>
                                    <div className='mb-2 flex items-center justify-between'>
                                        <div className='flex items-center space-x-3'>
                                            <Globe className='h-4 w-4 text-blue-600' />
                                            <span className='font-bold'>{fx.pair}</span>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-sm ${
                                                fx.alert.includes('Above')
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : fx.alert.includes('Below')
                                                      ? 'bg-amber-100 text-amber-700'
                                                      : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {fx.alert}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <p className='text-2xl font-bold'>{fx.rate}</p>
                                            <p
                                                className={`text-sm ${fx.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {fx.change} today
                                            </p>
                                        </div>
                                        <Button size='sm' variant='outline'>
                                            Set Alert (Pro)
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-4 text-sm text-slate-500'>
                            <p>Free tier includes basic rate monitoring. Upgrade for price alerts.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Essential Tools Section */}
            <Card className='mb-8'>
                <CardHeader>
                    <CardTitle>Essential Tools</CardTitle>
                    <CardDescription>Free tools to optimize your exports</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                        <Button
                            variant='outline'
                            className='flex h-32 flex-col items-center justify-center p-4 hover:border-emerald-300 hover:bg-emerald-50'>
                            <Calculator className='mb-3 h-8 w-8 text-emerald-600' />
                            <span className='font-medium'>Incoterm Comparator</span>
                            <span className='mt-1 text-xs text-slate-500'>Compare 2 Incoterms</span>
                        </Button>

                        <Button
                            variant='outline'
                            className='flex h-32 flex-col items-center justify-center p-4 hover:border-emerald-300 hover:bg-emerald-50'>
                            <Search className='mb-3 h-8 w-8 text-blue-600' />
                            <span className='font-medium'>HS Code Lookup</span>
                            <span className='mt-1 text-xs text-slate-500'>20 lookups/month</span>
                        </Button>

                        <Button
                            variant='outline'
                            className='flex h-32 flex-col items-center justify-center p-4 hover:border-emerald-300 hover:bg-emerald-50'>
                            <BarChart3 className='mb-3 h-8 w-8 text-purple-600' />
                            <span className='font-medium'>Margin Checker</span>
                            <span className='mt-1 text-xs text-slate-500'>One scenario</span>
                        </Button>

                        <Button
                            variant='outline'
                            className='flex h-32 flex-col items-center justify-center p-4 hover:border-emerald-300 hover:bg-emerald-50'>
                            <FileText className='mb-3 h-8 w-8 text-amber-600' />
                            <span className='font-medium'>Trade Guides</span>
                            <span className='mt-1 text-xs text-slate-500'>EUDR basics & tips</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Upgrade CTA */}
            <div className='rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 p-6 text-white'>
                <div className='flex flex-col items-center justify-between lg:flex-row'>
                    <div className='mb-4 lg:mb-0'>
                        <h3 className='mb-2 text-xl font-bold'>Ready to Scale Your Exports?</h3>
                        <p className='text-emerald-100'>
                            Upgrade to Pro for unlimited products, advanced analytics, and AI-powered tools.
                        </p>
                    </div>
                    <Button className='bg-white text-emerald-700 hover:bg-emerald-50'>
                        <TrendingUp className='mr-2 h-4 w-4' />
                        View Pro Features
                    </Button>
                </div>
            </div>
        </div>
    );
}
