export type InterviewType = 'system-design' | 'coding'
export type InterviewStatus = 'in-progress' |  'completed' | 'abandoned'

export interface Interview {
  id: string;
  user_id: string;
  type: InterviewType;
  topic: string | null;
  status: InterviewStatus;
  duration_seconds: number | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  interview_id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  interview_id: string;
  overall_score: number;
  category_scores: {
    technical: number;
    communication: number;
    problem_solving: number;
    system_design?: number;
  };
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  weak_areas: string[];
  created_at: string;
}

export interface UserStats {
  total_interviews: number;
  average_score: number;
  total_duration_seconds: number;
  current_streak: number;
}