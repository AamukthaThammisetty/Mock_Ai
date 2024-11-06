import { Airplay, BarChart, Lock, Code, ShieldCheck, Users } from 'lucide-react'; // import icons

export default function FeatureSection (){

    const features = [
        {
            icon: <Airplay className="w-6 h-6 text-indigo-600" />, // Fast Refresh
            title: "Instant Feedback",
            desc: "Receive real-time feedback on your responses, helping you improve your interview performance instantly."
        },
        {
            icon: <BarChart className="w-6 h-6 text-indigo-600" />, // Analytics
            title: "Detailed Analytics",
            desc: "Get a detailed analysis of your answers, including areas of strength and suggestions for improvement."
        },
        {
            icon: <Lock className="w-6 h-6 text-indigo-600" />, // Datacenter security
            title: "AI Interview Simulation",
            desc: "Simulate realistic interview scenarios with AI-powered mock interviews tailored to your desired role and industry."
        },
        {
            icon: <Code className="w-6 h-6 text-indigo-600" />, // Build on your terms
            title: "Build Your Confidence",
            desc: "Practice as many mock interviews as you want, with feedback to help you feel confident and ready for the real thing."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />, // Safe to use
            title: "Personalized Learning",
            desc: "Get feedback tailored to your performance, with suggestions on how to improve your answers and body language."
        },
        {
            icon: <Users className="w-6 h-6 text-indigo-600" />, // Flexible
            title: "Flexible Scheduling",
            desc: "Practice whenever it suits you, with the flexibility to choose your mock interview times and frequency."
        },
    ]

    return (
        <section className="py-14 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-600 md:px-8">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Ace Your Next Interview with AI
                    </h3>
                    <p className="mt-3">
                        Prepare for interviews with confidence using our AI-powered mock interview system. Improve your performance with personalized feedback and realistic simulations.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            features.map((item, idx) => (
                                <li key={idx} className="space-y-3">
                                    <div className="w-12 h-12 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-lg text-gray-800 font-semibold">
                                        {item.title}
                                    </h4>
                                    <p>
                                        {item.desc}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}
