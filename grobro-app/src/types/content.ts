export interface Business {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  coverImageUrl: string;
  isActive: boolean;
  orderIndex: number;
}

export interface Video {
  id: string;
  businessId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  orderIndex: number;
  durationSeconds?: number;
  isPublished: boolean;
}

export interface GuideSection {
  heading: string;
  text: string;
  image?: string;
}

export interface VisualGuide {
  id: string;
  businessId: string;
  title: string;
  sections: GuideSection[];
  isPublished: boolean;
}
