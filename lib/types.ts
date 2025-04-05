import { CoreMessage } from 'ai'

export type Message = CoreMessage & {
  id: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

export interface StartupMetrics {
  tam: number; // Total Addressable Market in USD
  marketGrowthRate: number; // Annual growth rate as percentage
  productStage: 'idea' | 'prototype' | 'beta' | 'launched' | 'scaling';
  userGrowth: {
    currentUsers: number;
    monthlyGrowthRate: number; // Percentage
    retentionRate: number; // Percentage
  };
  revenueGrowth: {
    currentRevenue: number;
    monthlyGrowthRate: number; // Percentage
    grossMargin: number; // Percentage
  };
  currentValuation: number;
  projectedExitValue: number;
  exitTimeline: number; // Months until projected exit
}

export interface PortfolioAnalysis {
  startupMetrics: StartupMetrics;
  investorProfile?: {
    riskTolerance: 'low' | 'medium' | 'high';
    investmentHorizon: 'short' | 'medium' | 'long';
    portfolioDiversification: number; // Percentage
  };
}

export interface StartupInsights {
  marketAnalysis: {
    marketSizeAssessment: string;
    growthPotential: string;
    competitivePosition: string;
  };
  financialMetrics: {
    revenueProjection: string;
    valuationAssessment: string;
    returnPotential: string;
  };
  riskAnalysis: {
    marketRisks: string[];
    operationalRisks: string[];
    financialRisks: string[];
  };
  investmentRecommendation: {
    riskLevel: 'low' | 'medium' | 'high';
    expectedReturn: string;
    timeHorizon: string;
    keyConsiderations: string[];
  };
  keyMetrics: {
    irr: number; // Internal Rate of Return
    multiple: number; // Expected return multiple
    paybackPeriod: number; // Months
    riskAdjustedReturn: number; // Percentage
  };
}
