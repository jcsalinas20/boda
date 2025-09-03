export interface ImageItem {
  id: string;
  url: string;
  pendingPath: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  tags: string[];
  uploadDate: Date;
  size?: number;
}

export interface ImageFilter {
  status?: 'pending' | 'approved' | 'rejected';
}