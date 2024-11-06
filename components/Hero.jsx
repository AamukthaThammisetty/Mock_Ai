"use client"
import React from 'react';
import Link from "next/link"

export default function Hero() {
    return (
        <section className="bg-gray-50 py-28">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="space-y-5 max-w-4xl mx-auto text-center">
                    {/* Headline Section */}
                    <h1 className="text-sm text-indigo-600 font-medium">
                        Ace Your Interviews with AI
                    </h1>
                    <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                        Prepare for your next big opportunity with
                        <span className="pl-2 text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
                            AI-powered mock interviews
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg">
                        Get personalized feedback and practice with real-world interview scenarios. Let AI guide your preparation and boost your confidence.
                    </p>

                    {/* Call to Action Buttons */}
                    <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                        <Link href={'/dashboard'} className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                            Start a Mock Interview
                        </Link>
                        <a href="javascript:void(0)" className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                            Get Started
                        </a>
                    </div>
                </div>

                {/* Image Section */}
                {/*<div className="mt-14">*/}
                {/*    <img*/}
                {/*        src="https://raw.githubusercontent.com/sidiDev/remote-assets/main/Safari%20(Big%20Sur)%20-%20Light.png"*/}
                {/*        className="w-full shadow-lg rounded-lg border"*/}
                {/*        alt="AI Mock Interview"*/}
                {/*    />*/}
                {/*</div>*/}
            </div>
        </section>
    )
}
