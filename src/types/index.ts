export interface SubmitMultiEvaluationInput {
  userId: number;
  targetUserId: number;
  multiTermId: number;
  score: number;
  goodComment: string;
  improvementComment: string;
}
