import React from 'react';
import type { Question } from '../types';
import { ExternalLink } from 'lucide-react';

interface Props {
  question: Question;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onAnswerSelect: (answer: string) => void;
}

export default function QuestionCard({ question, selectedAnswer, isAnswered, onAnswerSelect }: Props) {
  if (!question || !question.facts) {
    return null;
  }

  const answers = Object.entries(question.facts);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-6">
        {answers.map(([key, value]) => (
          <button
            key={key}
            onClick={() => !isAnswered && onAnswerSelect(key)}
            disabled={isAnswered}
            className={`w-full p-4 text-left rounded-lg transition-all transform hover:scale-[1.01] ${
              isAnswered
                ? key === question.correctAnswer
                  ? 'bg-green-100 border-2 border-green-500'
                  : selectedAnswer === key
                  ? 'bg-red-100 border-2 border-red-500'
                  : 'bg-gray-100'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span className="font-semibold mr-2">{key}:</span>
            {value}
          </button>
        ))}

        {isAnswered && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-700 mb-2">{question.explanation}</p>
            <a
              href={question.wikipediaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Learn more <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}