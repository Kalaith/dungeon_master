export interface NPC {
  id: string;
  name: string;
  class: string;
  personality: string;
  mood: number;
  description: string;
  currentRequest: string;
  portraitClass: string;
  commonRequests: string[];
}
