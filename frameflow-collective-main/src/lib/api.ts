// Mock API functions - replace with real API calls later

export interface Film {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string;
  status: 'published' | 'draft';
  thumbnail?: string;
  views?: number;
  createdAt: string;
}

export interface UserProfile {
  user: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
  };
  stats: {
    filmsUploaded: number;
    classesTaken: number;
    following: number;
    followers: number;
    totalViews: number;
    avgRating: number;
  };
  recentUploads: Film[];
}

export interface AnalyticsData {
  totalViews: number;
  avgWatchTime: number;
  topFilms: Film[];
  engagementRate: number;
}

export interface CommunityItem {
  id: string;
  type: 'group' | 'film' | 'event';
  title: string;
  description: string;
  thumbnail?: string;
  date?: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'article';
  thumbnail: string;
  url: string;
  category: string[];
  duration?: string;
}

// Film API
export const createFilm = async (data: {
  title: string;
  description: string;
  videoUrl: string;
  status: 'published' | 'draft';
}, token: string): Promise<Film> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        description: data.description || null,
        createdAt: new Date().toISOString(),
        views: 0,
      });
    }, 1000);
  });
};

export const getUserFilms = async (token: string): Promise<Film[]> => {
  // Mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'My First Short Film',
          description: 'A journey into filmmaking',
          videoUrl: 'https://youtube.com/watch?v=example1',
          status: 'published',
          thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
          views: 1250,
          createdAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          title: 'Experimental Documentary',
          description: 'Exploring new techniques',
          videoUrl: 'https://youtube.com/watch?v=example2',
          status: 'draft',
          thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400',
          views: 0,
          createdAt: '2024-02-10T14:30:00Z',
        },
      ]);
    }, 800);
  });
};

// User Profile API
export const getUserProfile = async (token: string): Promise<UserProfile> => {
  // Mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 'user123',
          name: 'Jane Filmmaker',
          email: 'jane@example.com',
          avatarUrl: undefined,
          bio: 'Passionate filmmaker exploring visual storytelling',
        },
        stats: {
          filmsUploaded: 12,
          classesTaken: 8,
          following: 45,
          followers: 128,
          totalViews: 15420,
          avgRating: 4.6,
        },
        recentUploads: [
          {
            id: '1',
            title: 'My First Short Film',
            description: 'A journey into filmmaking',
            videoUrl: 'https://youtube.com/watch?v=example1',
            status: 'published',
            thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
            createdAt: '2024-01-15T10:00:00Z',
          },
        ],
      });
    }, 800);
  });
};

// Analytics API
export const getAnalytics = async (token: string): Promise<AnalyticsData> => {
  // Mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalViews: 15420,
        avgWatchTime: 4.2,
        topFilms: [
          {
            id: '1',
            title: 'My First Short Film',
            description: 'A journey into filmmaking',
            videoUrl: 'https://youtube.com/watch?v=example1',
            status: 'published',
            thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
            views: 5420,
            createdAt: '2024-01-15T10:00:00Z',
          },
        ],
        engagementRate: 68.5,
      });
    }, 800);
  });
};

// Community API
export const getTrendingCommunity = async (): Promise<CommunityItem[]> => {
  // Mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: 'group',
          title: 'Indie Filmmakers',
          description: 'Connect with independent creators',
          thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
        },
        {
          id: '2',
          type: 'event',
          title: 'Virtual Film Festival 2024',
          description: 'Submit your films now',
          date: '2024-03-15',
        },
      ]);
    }, 800);
  });
};

// Learning API
export const getLearningResources = async (): Promise<LearningResource[]> => {
  // Mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'How To Make A FILMMAKING PORTFOLIO If You\'re Just Starting',
          type: 'video',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          category: ['Distribution', 'Portfolio'],
          duration: '12:35',
        },
        {
          id: '2',
          title: 'How to Make a Short Film',
          type: 'video',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          category: ['Cinematography', 'Editing'],
          duration: '18:42',
        },
      ]);
    }, 800);
  });
};

export const addToLearning = async (resourceId: string, token: string): Promise<void> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
};
