'use client';

import { useState } from 'react';

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert("Message sent! We'll contact you soon.");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id='contact' className='bg-white py-16'>
            <div className='container mx-auto px-4'>
                <div className='mx-auto max-w-2xl'>
                    <div className='mb-12 text-center'>
                        <h2 className='mb-4 text-4xl font-bold text-gray-900'>Send Us a Message</h2>
                        <p className='text-xl text-gray-600'>
                            Ready to source premium Ethiopian agricultural products? Get in touch.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className='rounded-2xl bg-gray-50 p-8'>
                        <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                            <div>
                                <label className='mb-2 block text-gray-700'>Full Name *</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500'
                                    placeholder='John Smith'
                                />
                            </div>

                            <div>
                                <label className='mb-2 block text-gray-700'>Email Address *</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500'
                                    placeholder='john@company.com'
                                />
                            </div>

                            <div>
                                <label className='mb-2 block text-gray-700'>Phone Number</label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500'
                                    placeholder='+1 (555) 123-4567'
                                />
                            </div>

                            <div>
                                <label className='mb-2 block text-gray-700'>Company Name</label>
                                <input
                                    type='text'
                                    name='company'
                                    value={formData.company}
                                    onChange={handleChange}
                                    className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500'
                                    placeholder='Global Foods Inc.'
                                />
                            </div>
                        </div>

                        <div className='mb-6'>
                            <label className='mb-2 block text-gray-700'>Your Message *</label>
                            <textarea
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-green-500'
                                placeholder='Tell us about your sourcing needs, product interests, or any questions...'
                            />
                        </div>

                        <div className='text-center'>
                            <button
                                type='submit'
                                className='rounded-lg bg-green-600 px-10 py-4 text-lg font-semibold text-white hover:bg-green-700'>
                                Send Message
                            </button>
                            <p className='mt-4 text-sm text-gray-500'>We typically respond within 24 hours.</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
