const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-800 py-10">
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">About Mr. Food</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">Delicious meals delivered fast — made with love.</p>
            </header>

            <section className="grid gap-6 md:grid-cols-2 items-center mb-8">
                <div>
                    <h2 className="text-xl font-semibold">Our Mission</h2>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">We aim to connect people with the best local restaurants and bring fresh, tasty food to your doorstep. We value quality, speed, and excellent customer experience.</p>
                </div>
                <div className="w-full h-48 bg-gray-200 dark:bg-slate-800 rounded-lg bg-center bg-cover" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80)'}} aria-hidden="true" />
            </section>

            <section className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Our Values</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800">
                        <h4 className="font-medium">Quality</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">We partner with restaurants that care about ingredients and taste.</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800">
                        <h4 className="font-medium">Speed</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Fast deliveries without compromising on food temperature.</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800">
                        <h4 className="font-medium">Community</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Supporting local businesses and building trust.</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-4">Team</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800">
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-slate-700 mb-3" style={{backgroundImage: 'url()', backgroundSize: 'cover'}} aria-hidden="true" />
                        <div className="font-medium">Mann Patel</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">Co-founder & CEO</div>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800">
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-slate-700 mb-3" style={{backgroundImage: 'url()', backgroundSize: 'cover'}} aria-hidden="true" />
                        <div className="font-medium">Darshan Patel</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">Head of Operations</div>
                        
                    </div>
                    <div className="flex flex-col items-center text-center p-4 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800">
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-slate-700 mb-3" style={{backgroundImage: 'url()', backgroundSize: 'cover'}} aria-hidden="true" />
                        <div className="font-medium">Parth Patel</div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">Customer Experience</div>
                    </div>
                </div>
            </section>
        </div>
        </div>
    );
};

export default About;