export type ClassificationResult = {
  text: string;
  predicted_category: string;
  confidence: number;
};

export type PostWithClassification = ClassificationResult & {
  id: string;
};
