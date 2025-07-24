
export type AdCreative = {
  framework: string;
  primaryText: string;
  headline: string;
  description: string;
  visualDescription: string;
  visualDescriptionEnglish: string;
  callToAction: string;
  imageUrl: string;
};

export type PerformancePrediction = {
  predictedCTR: number;
  predictedConversionRate: number;
  predictedCPA: number;
  aBTestingRecommendation: string;
  explanation: string;
};

export type EthicalCheck = {
    isEthical: boolean;
    explanation: string;
    suggestedAlternatives: string[];
}

export type AudienceAnalysis = {
    refinedSegments: string;
    emergingTrends: string;
    competitiveAnalysis?: string;
}

// New simplified, component-based architecture for the builder

/**
 * Represents a single, configurable section of a landing page.
 * This is the structure the AI will generate and what will be stored in Firestore.
 */
export interface Section {
  id: string;
  type: keyof typeof import('@/components/sections'); // Matches component names in /components/sections
  props: {
    [key: string]: any; // Allows for flexible properties for each component
  };
}


/**
 * Represents the entire state of a landing page in the builder.
 * It's simply an array of sections.
 */
export interface BuilderState {
  page: Section[];
}
