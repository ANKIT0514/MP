export type Classification = "Benign" | "SQL Injection" | "XSS" | "SSRF";
export type Severity = "Informational" | "Low" | "Medium" | "High" | "Critical";

export interface ModelPrediction {
  classification: Classification;
  confidence: number;
  probabilities: Record<Classification, number>;
}

export interface CircuitBreakerResult {
  mlPrediction: Classification;
  ruleBasedValidation: string;
  status: "Confirmed" | "Overridden" | "Passed";
  finalVerdict: Classification;
  reason: string;
}

export interface ShapFeature {
  name: string;
  contribution: number;
  direction: "risk" | "benign";
}

export interface ThreatIntelligence {
  mitreTechnique: { id: string; name: string };
  capecPattern: { id: string; name: string };
  rationale: string;
  detectedBehavior: string;
  indicators: string[];
  stixBundle?: { type: "bundle"; id: string; objectCount: number; specVersion: "2.1" };
}

export interface PayloadAnalysis {
  inspectionId: string;
  timestamp: string;
  originalPayload: string;
  normalizedPayload: string;
  classification: Classification;
  confidence: number;
  severity: Severity;
  analysisTimeMs: number;
  source: string;
  model: ModelPrediction;
  circuitBreaker: CircuitBreakerResult;
  shapExplainedClass?: Classification;
  shapFeatures: ShapFeature[];
  threatIntelligence: ThreatIntelligence;
  demo: boolean;
}

export interface ForensicReport {
  reportId: string;
  generatedAt: string;
  status: "Ready";
  analysis: PayloadAnalysis;
  pages: number;
  version: string;
}

export interface SecurityCase extends PayloadAnalysis {
  caseNumber: number;
  result: "Blocked" | "Allowed";
}

export interface DashboardData {
  shapEnabled: boolean;
  totals: Record<"requests" | "threats" | "benign" | "sqli" | "xss" | "ssrf", number>;
  distribution: Array<{ name: Classification; value: number }>;
  recentCases: SecurityCase[];
  weekly: Array<{ day: string; requests: number; threats: number }>;
}
