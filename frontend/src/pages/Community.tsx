import React from 'react';
import { PostCard } from '../components/posts/PostCard';
import { posts } from '../data/posts';
export const Community: React.FC = () => {
  return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Comunidad
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Historias de rescates y adopciones exitosas de nuestra comunidad.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="btn btn-primary">Compartir mi historia</button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>;
};