import React from "react";
import {CircleAlert,Info,Lightbulb} from "lucide-react";

export const FeedbackAlertsComponent = ({ feedbackItem }) => {
    let alertClass = 'flex flex-row items-center justify-center gap-5';
    let alertMessage = <></>;

    // Determine the alert type based on the score
    if (feedbackItem.score >= 4) {
        alertClass = "p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400";
        alertMessage = <Lightbulb />;
    } else if (feedbackItem.score === 3) {
        alertClass = "p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300";
        alertMessage = <Info />;
    } else if (feedbackItem.score < 3) {
        alertClass = "p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400";
        alertMessage = <CircleAlert />;
    }

    return (
        <div className={`flex flex-row gap-4 ${alertClass}`}>
            <p>
                {alertMessage}
            </p>
            <p>
                {feedbackItem.feedback}
            </p>

        </div>
    );
};