import { useState } from "react";
import { PhoneIcon, MailIcon, LocationIcon } from "./Icons";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Contact form submitted", form);
        setSent(true);
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-800 py-10">
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <header className="mb-6 text-center">
                <h1 className="text-2xl font-semibold">Contact Us</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Questions, feedback, or partnership inquiries — we'd love to hear from you.</p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-md bg-gray-50 dark:bg-slate-800">
                    <h3 className="font-medium flex items-center gap-2"><MailIcon className="w-4 h-4" /> Get in touch</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300"><MailIcon className="w-4 h-4 inline-block mr-2 align-middle" /> support@mrfood.example</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300"><PhoneIcon className="w-4 h-4 inline-block mr-2 align-middle" /> +91 98765 43210</p>
                    <div className="mt-4">
                        <h4 className="font-medium">Address</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300"><LocationIcon className="w-4 h-4 inline-block mr-2 align-middle" />12 Food Street, Flavor Town, India</p>
                    </div>
                    <div className="mt-4">
                        <h4 className="font-medium">Follow us</h4>
                        <div className="flex gap-3 mt-2">
                            <a className="text-blue-600 dark:text-blue-400" href="#">Twitter</a>
                            <a className="text-blue-700 dark:text-blue-300" href="#">Facebook</a>
                            <a className="text-pink-600 dark:text-pink-400" href="#">Instagram</a>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4 border border-gray-200 dark:border-slate-700 rounded-md bg-gray-50 dark:bg-slate-800">
                    {sent && <div className="mb-3 text-sm text-green-700 dark:text-green-300">Thanks — your message was sent.</div>}
                    <label className="block text-sm mb-2">
                        Name
                        <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" required />
                    </label>
                    <label className="block text-sm mb-2">
                        Email
                        <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" required />
                    </label>
                    <label className="block text-sm mb-3">
                        Message
                        <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="mt-1 w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" required />
                    </label>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded">Send Message</button>
                        <a href="mailto:support@mrfood.example" className="text-sm text-gray-600 dark:text-gray-300">Or email us directly</a>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Contact;