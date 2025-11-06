"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here you would typically send the form data to a backend
        console.log("Form submitted:", formData)
        setSubmitted(true)
        setTimeout(() => {
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
            setSubmitted(false)
        }, 3000)
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">Get in Touch With Us</h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 text-pretty leading-relaxed">
                            Have a question or feedback? We'd love to hear from you. Our team is here to help and will respond to your
                            inquiry as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {/* Email */}
                        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 shadow-sm">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600 mb-2">support@foodorder.com</p>
                            <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                        </div>

                        {/* Phone */}
                        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 shadow-sm">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                            <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
                            <p className="text-sm text-gray-500">Mon-Fri, 9am-6pm EST</p>
                        </div>

                        {/* Address */}
                        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 shadow-sm">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                            <p className="text-gray-600 mb-2">123 Food Street</p>
                            <p className="text-sm text-gray-500">New York, NY 10001</p>
                        </div>

                        {/* Hours */}
                        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 border border-orange-100 shadow-sm">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <Clock className="w-6 h-6 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hours</h3>
                            <p className="text-gray-600 mb-2">24/7 Service</p>
                            <p className="text-sm text-gray-500">Always available to serve</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                            {submitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                    <p className="text-green-700 font-semibold mb-2">Thank you for reaching out!</p>
                                    <p className="text-green-600">We've received your message and will respond shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                                            Phone Number (Optional)
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition bg-white"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="support">Customer Support</option>
                                            <option value="partnership">Partnership Inquiry</option>
                                            <option value="feedback">Feedback</option>
                                            <option value="bug">Report a Bug</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition resize-none"
                                            placeholder="Tell us how we can help..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-2"
                                    >
                                        <Send className="w-5 h-5" />
                                        Send Message
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-lg text-gray-600">Can't find what you're looking for?</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    q: "How long does delivery usually take?",
                                    a: "Average delivery time is 30 minutes, but it can vary depending on your location and the restaurant. You can see estimated delivery time before placing an order.",
                                },
                                {
                                    q: "Do you offer refunds?",
                                    a: "Yes, we offer full refunds for orders that are not delivered on time or if you're unsatisfied with your food. Contact our support team for assistance.",
                                },
                                {
                                    q: "Can I schedule orders in advance?",
                                    a: "Yes, you can schedule orders up to 7 days in advance. Simply select your preferred delivery time when placing your order.",
                                },
                                {
                                    q: "How can restaurants join the platform?",
                                    a: 'Restaurants can sign up through our partner program. Visit the "Become a Partner" page or contact our partnerships team for more information.',
                                },
                            ].map((faq, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
